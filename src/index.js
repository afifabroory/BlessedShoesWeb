"use strict";

import {
    isValidInput,
    isValidRD
} from "./validation";
import "./database";
import {
    read,
    insert,
    update,
    remove
} from "./database";

const dataResponse = document.querySelectorAll("div.response>p");
const rdBtn = document.getElementsByName("option");
const inputID = document.querySelector("div>#inputID");
const inputBtn = document.querySelector("div>#inputBtn");

document.addEventListener('DOMContentLoaded', () => {
    inputID.disabled = false;
    for (var i = 0; i < rdBtn.length; ++i) { rdBtn[i].disabled = false; }
    inputBtn.disabled = false;
});

// Development purpose
function showData(data) {
    if (data !== false) {
        dataResponse[0].textContent = "Merk Sepatu: " + data.ShoesBrand;
        dataResponse[1].textContent = "Size: " + data.Size;
        dataResponse[2].textContent = "Service: " + data.Service;
        dataResponse[3].textContent = "Status: " + data.Status;
        dataResponse[4].textContent = "Timestamp: " + data.Timestamp;
    } else {
        dataResponse[0].textContent = "Merk Sepatu: null";
        dataResponse[1].textContent = "Size: null";
        dataResponse[2].textContent = "Service: null";
        dataResponse[3].textContent = "Status: null";
        dataResponse[4].textContent = "Timestamp: null";
    }
}

inputBtn.addEventListener("click", () => {

    var input = inputID.value;

    if (isValidInput(input) && isValidRD(rdBtn)) {
        if (rdBtn[0].checked) {
            const response = read(input);
            response.then((data) => {
                showData(data);
            });
        } else if (rdBtn[1].checked) {
            var data = [
                {"brand": "Nike", "service": "Deepclean", "size": "47", "status": "On Process"},
                {"brand": "Puma", "service": "FastClean", "size": "67", "status": "Done"}
            ]
            insert(input,data);
        } else if (rdBtn[2].checked) {
            update(input, {
                "ShoesBrand": "Nike"
            });
        } else if (rdBtn[3].checked) {
            remove(input);
        } else {
            console.log("Something wrong...")
        }
    } else {
        console.log("Input ID dan Opsi harus dipilih! ")
    }

});