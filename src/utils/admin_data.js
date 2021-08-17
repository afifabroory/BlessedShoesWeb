 import { getData } from "../database/local_database"
import { createOptionEl } from "./admin_utils"
import { service_option_index, status_option_index } from "../admin/admin_const"

function showUpdate(key, isId=true) {
    var data = getData(key);
    var select = document.querySelector("#div-shoesNo>#shoesNo");
    const shoesID = document.querySelector("#div-shoesID>#shoesID");

    if (data) {
        if (isId) createOptionEl(select, data.length);   

        // Show Shoes Brand & Shoes Size Input
        var i = parseInt(select.value);
        document.querySelector("#div-shoesBrand>#shoesBrand").value = data[i].ShoesBrand;
        document.querySelector("#div-shoesSize>#shoesSize").value = data[i].Size;

        var service_option = document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option");
        service_option[service_option_index[data[i].Service]].selected = "select";

        var status_option = document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option");
        status_option[status_option_index[data[i].Status]].selected = "select";
    } else {
        if (shoesID.value.length === 0) createOptionEl(select, 1, true);
        else createOptionEl(select, 1, true, "");
        clearUpdate();
    }
}

function clearUpdate() {
    document.querySelector("#div-shoesBrand>#shoesBrand").value = "";
    document.querySelector("#div-shoesSize>#shoesSize").value = "";
    document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[0].selected = "select";
    document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[0].selected = "select";
}

function showDelete(key) {
    var data = getData(key);
    if (data) {

    }
}

export { showUpdate }