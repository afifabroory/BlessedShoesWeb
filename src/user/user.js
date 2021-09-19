"use strict";

import {
  getData,
  storeData,
  removeData,
  itsExpire,
  itExists,
} from "../database/local_database";
import { fetchListMedia, fetchMediaByID } from "../utils/instagram";
import { is_alpnum } from "../utils/validate";

function displayIGMedia() {
  var dataSession = itExists("_MEDIA");
  var mediaType = itExists("_MEDIATYPE");

  if (itsExpire("_MEDIAEXPIRE")) {
    var KEY = ["_MEDIA", "_MEDIATYPE", "_MEDIAURL"];
    for (var idx in KEY) removeData(KEY[idx]);
  }

  if (!dataSession || !mediaType) {
    fetchListMedia().then((listMedia) => {
      var dataArr = listMedia["data"];
      for (var idx in dataArr) {
        var feed = dataArr[idx];

        mediaType = feed["media_type"];
        if (mediaType === "IMAGE" || mediaType === "CAROUSEL_ALBUM") {
          storeData("_MEDIAURL", JSON.stringify(feed["permalink"]));
          fetchMediaByID(feed["id"])
            .then((media) => {
              storeData("_MEDIA", JSON.stringify(media));
              displayMedia();
            })
            .catch(() => {
              console.log("ERROR FETCH");
            });
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

  console.log(mediaType);

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
    img.setAttribute("src", data["media_url"]);
    img.setAttribute("onerror", "handleErrorLoad()");

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

function warnError() {
  var warn1 = document.querySelector(".input-message");
  var warn2 = document.querySelector(".flex-form");

  warn1.classList.add("input-error");
  warn2.classList.add("input-error");

  var x = setInterval(() => {
    warn1.classList.remove("input-error");
    warn2.classList.remove("input-error");
    clearInterval(x);
  }, 900);
}

function inputHandling() {
  var input = document.querySelector("#inputID").value.toUpperCase();
  var errorMessage = `Kode transaksi "${input}" tidak ditemukan. Mohon coba lagi.`;

  if (input.length === 3 && is_alpnum(input)) {
    document.querySelector(".popup-container").style.display = "";
    import("../database/database").then((db) => {
      db.read(input).then((data) => {
        if (data) {
          document.querySelector(".input-message").innerText =
            "Cek status pengerjaan sepatu Anda, dengan memasukkan kode transaksi pada kotak diatas.";
          clearTable();
          document.querySelector(".content").style.display = "none";
          document.getElementById("board-info").style.display = "none";
          document.getElementById("board-code").innerText = `#${input}`;
          document.getElementById("board-code").style.display = "";
          document.querySelector(".statusResponse").style.display = "";
          document.querySelector(".popuptitle").innerText = `#${input}`;

          var isInProgress = false;
          for (var idx in data) {
            if (idx === "timestampIn") {
              var dates = new Date(data[idx]);
              document.querySelector(
                "#tanggalTransaksi"
              ).innerText = `${dates.toLocaleDateString("id", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`;
            } else if (idx === "timestampOut") {
              isInProgress = data[idx] === 0;
            } else if (idx === "Status") {
              document.querySelector("#statusTransaksi").innerText = data[idx];
            } else {
              var template = document
                .querySelector("#detailTable")
                .content.cloneNode(true).children;
              var tr = document.createElement("tr");

              template.no.innerText = parseInt(idx) + 1;
              tr.append(template.no);
              //template.status.innerText = data[idx].Status;
              //tr.append(template.status);
              template.layanan.innerText = data[idx].Service;
              tr.append(template.layanan);
              template.merk.innerText = data[idx].ShoesBrand;
              tr.append(template.merk);
              template.ukuran.innerText = data[idx].Size;
              tr.append(template.ukuran);

              // Update this one!
              import("../admin/admin_const").then((utils) => {
                console.log(data[idx].Status);
                if (utils.status_option_index[data[idx].Status] === 0)
                  isInProgress = true;
              });
              document.querySelector(".rwd-table>tbody").append(tr);
            }
          }

          if (isInProgress) {
            document.getElementById("done").style.display = "none";
            document.querySelector("#statusMessage").innerText = "IN PROGRESS";
            document.getElementById("inprogress").style.display = "";
          } else {
            document.getElementById("inprogress").style.display = "none";
            document.querySelector("#statusMessage").innerText = "DONE";
            document.getElementById("done").style.display = "";
          }

          document
            .querySelector("#detailStatus")
            .addEventListener("click", () => {
              document
                .querySelector(".popup-container")
                .classList.remove("hide");
            });

          document.querySelector("#ok").addEventListener("click", () => {
            document.querySelector(".popup-container").classList.add("hide");
          });

          document.querySelector("#board").scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else {
          document.querySelector(".input-message").innerText = errorMessage;
          warnError();
        }
      });
    });
  } else {
    document.querySelector(".input-message").innerText = errorMessage;
    warnError();
  }
}

document.querySelector("#inputBtn").addEventListener("click", () => {
  inputHandling();
});
document.querySelector("#inputID").addEventListener("keypress", (event) => {
  if (event.keyCode === 13 || event.which === 13) inputHandling();
});
document.querySelector("#inputID").addEventListener("input", (e) => {
  var insertText = document.querySelector("#inputID").value;
  var insertLength = insertText.length;
  if (insertLength < 9) {
    document.querySelector("#inputID").value = insertText.toUpperCase();
  } else {
    // InsertLength not exceeded 50 char then remove char using while loop
    // Otherwise override input test to empty.
    if (insertLength > 50) {
      document.querySelector("#inputID").value = "";
    } else {
      while (insertLength > 8) {
        document.querySelector("#inputID").value = insertText.slice(0, -1);
        insertText = document.querySelector("#inputID").value;
        insertLength = insertText.length;
      }
    }
  }
});

window.addEventListener("load", () => {
  console.log("DOM Loaded");
  document.querySelector(".preload-page").style.display = "none";
  document.querySelector(".container").style.display = "";
  displayIGMedia();

  document.querySelector("#location").addEventListener("click", () => {
    document.querySelector("#maps").scrollIntoView({
      behavior: "smooth",
      block: "center"
    })
  })
});
