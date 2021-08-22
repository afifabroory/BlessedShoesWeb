"use strict";

import {
    read,
    insert,
    update,
    remove,
    db
} from "../database/database";

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

function isValidRD(rdInput) {
    for (var i = 0; i < rdInput.length; ++i) {
        if (rdInput[i].checked == true) {
            return true;
        }
    }
    return false;
}

inputBtn.addEventListener("click", () => {
    const    input = inputID.value;

    if ((input.length > 0) && isValidRD(rdBtn)) {
        if (rdBtn[0].checked) {
            db.goOnline();
            const response = read(input);
            response.then((data) => {
                console.log(data);
                showData(data);
            });
            db.goOffline();
        } else if (rdBtn[1].checked) {
            var data = [
                {"brand": "Nike", "service": "Deep Clean", "size": "47", "status": "In Progress"},
                {"brand": "Puma", "service": "Fast Clean", "size": "67", "status": "Done"}
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