"use strict";

import {read} from "../database/database";
import {getData, storeData, removeData, itsExpire, itExists} from "../database/local_database";
import {fetchListMedia, fetchMediaByID, fetchAlbumByID} from "../utils/instagram";

function displayIGMedia() {
    var dataSession = itExists("_MEDIA");
    var mediaType = itExists("_MEDIATYPE");

    if (itsExpire("_MEDIAEXPIRE")) {
        var KEY = ["_MEDIA", "_MEDIATYPE", "_MEDIAURL"]
        for (var idx in KEY) removeData(KEY[idx]);
    }

    console.log(dataSession);
    console.log(mediaType);
    if (!dataSession || !mediaType) {
        fetchListMedia().then((listMedia) => {
            var dataArr = listMedia["data"]
            for (var idx in dataArr) {
                var feed = dataArr[idx];

                mediaType = feed["media_type"];
                if (mediaType === "IMAGE") {
                    storeData("_MEDIAURL", JSON.stringify(feed["permalink"]));
                    fetchMediaByID(feed["id"]).then((media) => {
                        storeData("_MEDIA", JSON.stringify(media)); 
                        displayMedia();
                    });
                    break;
                } else if (mediaType === "CAROUSEL_ALBUM") {
                    storeData("_MEDIAURL", JSON.stringify(feed["permalink"]));
                    fetchAlbumByID(feed["id"]).then((media) => { 
                        storeData("_MEDIA", JSON.stringify(media["data"])); 
                        displayMedia();
                    });
                    break;
                }
            }
            storeData("_MEDIATYPE", JSON.stringify(mediaType));
        });
    } else {
        displayMedia();
    }
}

function displayMedia() {
    var mediaDiv = document.querySelector(".content");
    var imageURL = getData("_MEDIAURL");
    var mediaType = getData("_MEDIATYPE");

    console.log(mediaType)

    if (mediaType === "CAROUSEL_ALBUM") {
        var dataArr = getData("_MEDIA");
        console.log("CAROUSEL")


        for (const idx in dataArr) {
            var data = dataArr[idx];
        
            if (data["media_type"] !== "VIDEO") {
                var div = document.createElement("div");
                div.setAttribute("class", "ig-content");

                var link = document.createElement("a");
                link.setAttribute("href", imageURL);
                link.setAttribute("target", "_blank");
            
                var img = document.createElement("img");
                img.setAttribute("src", data["media_url"])
                
                var desc = document.createElement("p");
                desc.innerText = "Klik untuk informasi lebih lanjut";

                link.append(img);
                link.append(desc);
                div.append(link);
                mediaDiv.append(div);
            }
        }

        document.querySelector("#pagination").style.display="flex";
    } else if (mediaType === "IMAGE") {
        var data = getData("_MEDIA");

        var div = document.createElement("div");
        div.setAttribute("class", "ig-content");

        var link = document.createElement("a");
        link.setAttribute("href", imageURL);
        link.setAttribute("target", "_blank");

        var img = document.createElement("img");
        img.setAttribute("src", data["media_url"])

        var desc = document.createElement("p");
        desc.innerText = "Klik untuk informasi lebih lanjut";

        link.append(img);
        link.append(desc);
        div.append(link);
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
    console.log("DOM Loaded")
    displayIGMedia();
});
