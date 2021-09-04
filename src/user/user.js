"use strict";

import {read} from "../database/database";
import {getData, storeData, removeData, itsExpire, itExists} from "../database/local_database";
import {fetchListMedia, fetchMediaByID, fetchAlbumByID} from "../utils/instagram";
import {status_option_index} from "../admin/admin_const";

function displayIGMedia() {
    var dataSession = itExists("_MEDIA");
    var mediaType = itExists("_MEDIATYPE");

    if (itsExpire("_MEDIAEXPIRE")) {
        var KEY = ["_MEDIA", "_MEDIATYPE", "_MEDIAURL"]
        for (var idx in KEY) removeData(KEY[idx]);
    }

    if (!dataSession || !mediaType) {
        fetchListMedia().then((listMedia) => {
            var dataArr = listMedia["data"]
            for (var idx in dataArr) {
                var feed = dataArr[idx];

                mediaType = feed["media_type"];
                if (mediaType === "IMAGE" || mediaType === "CAROUSEL_ALBUM") {
                    storeData("_MEDIAURL", JSON.stringify(feed["permalink"]));
                    fetchMediaByID(feed["id"]).then((media) => {
                        storeData("_MEDIA", JSON.stringify(media)); 
                        displayMedia();
                    }).catch(() => {console.log("ERROR FETCH")});
                    break;
                }
                /*if (mediaType === "IMAGE") {
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
                }*/
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

    /*if (mediaType === "CAROUSEL_ALBUM") {
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
    }*/
    if (mediaType === "IMAGE" || mediaType === "CAROUSEL_ALBUM") {
        var data = getData("_MEDIA");

        var div = document.createElement("div");
        div.setAttribute("class", "ig-content");

        var link = document.createElement("a");
        link.setAttribute("href", imageURL);
        link.setAttribute("target", "_blank");

        var img = document.createElement("img");
        img.setAttribute("src", data["media_url"])
        img.setAttribute("onerror", "this.src='https://images.unsplash.com/photo-1629976002376-3bccae77037d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'")

        var desc = document.createElement("p");
        desc.innerText = "Klik untuk informasi lebih lanjut";

        link.append(img);
        link.append(desc);
        div.append(link);
        mediaDiv.append(div);
    }

    document.getElementById("board-info").style.display = "block";
}

function clearTable() {
    var childTotal = document.querySelector(".rwd-table>tbody").childElementCount;

    for (var i = 1; i < childTotal; i++) {
        document.querySelector(".rwd-table>tbody").children[1].remove();
    }
}

var inputState = true;
document.querySelector("#inputBtn").addEventListener("click", () => {
    var input = document.querySelector("#inputID").value.toUpperCase();

    if (input.length === 3) {
        clearTable();
        read(input).then((data) => {
            if (data) {
                console.log(data);
                document.querySelector(".content").style.display = "none";
                document.getElementById("board-info").style.display = "none";
                document.getElementById("board-code").innerText = `#${input}`;
                document.getElementById("board-code").style.display = "";
                document.querySelector(".statusResponse").style.display = "";
                document.querySelector(".popup .detailTitle").innerText = `#${input}`;

                var isInProgress = false;
                for (var idx in data) {
                    var template = document.querySelector("#detailTable").content.cloneNode(true).children;
                    var tr = document.createElement("tr");

                    template.no.innerText = (parseInt(idx)+1);
                    tr.append(template.no);
                    template.status.innerText = data[idx].Status;
                    tr.append(template.status);
                    template.layanan.innerText = data[idx].Service;
                    tr.append(template.layanan);
                    template.merk.innerText = data[idx].ShoesBrand;
                    tr.append(template.merk);
                    template.ukuran.innerText = data[idx].Size;
                    tr.append(template.ukuran);

                    if (status_option_index[data[idx].Status] === 0)  isInProgress = true;
                    document.querySelector(".rwd-table>tbody").append(tr);
                }

                if (isInProgress) {
                    document.getElementById("done").style.display = "none";
                    document.querySelector("#statusMessage").innerText = "IN PROGRESS"
                    document.getElementById("inprogress").style.display = "";
                } else {
                    document.getElementById("inprogress").style.display = "none";
                    document.querySelector("#statusMessage").innerText = "DONE"
                    document.getElementById("done").style.display = "";
                }

                document.querySelector("#detailStatus").addEventListener('click', () => {
                    document.querySelector('.popup-container').classList.remove('hide');
                })

                document.querySelector('#ok').addEventListener('click', () => {
                    document.querySelector('.popup-container').classList.add('hide');
                });
            } else {
                document.querySelector(".input-message").innerText = "Kode transaksi yang anda masukkan tidak ditemukan.";
                inputState = false;
            }
        })
    } else {
        document.querySelector(".input-message").innerText = "Kode transaksi yang anda masukkan tidak ditemukan.";
        inputState = false;
    }
});

document.querySelector("#inputID").addEventListener("input", () => {
    if (!inputState) {
        document.querySelector(".input-message").innerText = "Cek status pengerjaan sepatu Anda, dengan memasukkan kode transaksi pada kotak diatas.";
        inputState = true;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");
    displayIGMedia();
});
