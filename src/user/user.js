"use strict";

import {read} from "../database/database";
import {getData, storeData} from "../database/local_database";
import {fetchListMedia, fetchMediaByID, fetchAlbumByID} from "../utils/instagram";

function displayIGMedia() {
    var dataSession = getData("_MEDIA");
    var mediaType = getData("_MEDIATYPE");

    if (!dataSession || !mediaType) {
        fetchListMedia().then((listMedia) => {
            var dataArr = listMedia["data"]
            for (const idx in dataArr) {
                var feed = dataArr[idx];
                
                mediaType = feed["media_type"];
                if (mediaType === "IMAGE") {
                    storeData("_MEDIAURL", JSON.stringify(feed["permalink"]));
                    fetchMediaByID(feed["id"]).then((media) => {
                        storeData("_MEDIA", JSON.stringify(media)); 
                        displayMedia(mediaType);
                    });
                    break;
                } else if (mediaType === "CAROUSEL_ALBUM") {
                    storeData("_MEDIAURL", JSON.stringify(feed["permalink"]));
                    fetchAlbumByID(feed["id"]).then((media) => { 
                        storeData("_MEDIA", JSON.stringify(media["data"])); 
                        displayMedia(mediaType);
                    });
                    break;
                }
            }
            storeData("_MEDIATYPE", JSON.stringify(mediaType));
        });
    } else {
        displayMedia(mediaType);
    }
}

function displayMedia(mediaType) {
    var mediaDiv = document.querySelector(".content");

    if (mediaType === "CAROUSEL_ALBUM") {
        //var imageURL = getData("_MEDIAURL");
        var dataArr = getData("_MEDIA");

        for (const idx in dataArr) {
            var data = dataArr[idx];
        
            if (data["media_type"] !== "VIDEO") {
                var div = document.createElement("div");
                div.setAttribute("class", "ig-content");
            
                var img = document.createElement("img");
                img.setAttribute("src", data["media_url"])
            
                if (idx !== "0") div.style.display = "none";

                div.append(img);
                mediaDiv.append(div);
            }
        }
    } else if (mediaType === "IMAGE") {
        var dataArr = getData("_MEDIA");

        var div = document.createElement("div");
        div.setAttribute("id", `instagram`);

        var img = document.createElement("img");
        img.setAttribute("src", data["media_url"])

        img.append(div);
        mediaDiv.append(div);
    }

    document.getElementById("board-info").style.display = "block";
}

document.querySelector("#inputBtn").addEventListener("click", () => {
    var input = document.querySelector("#inputID").value;
    var data = read(input);
    data.then((data) => {
        console.log(data);
    })
});

document.addEventListener("DOMContentLoaded", () => {
    displayIGMedia();
});