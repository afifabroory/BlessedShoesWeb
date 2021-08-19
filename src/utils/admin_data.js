import { getData } from "../database/local_database"
import { createOptionEl } from "./admin_utils"
import { service_option_index, status_option_index } from "../admin/admin_const"
import { is_intOnly } from "../utils/validate"

function toggle_delete() {
    var shoesNo = document.querySelector("#div-shoesNo>#shoesNo");
    shoesNo.disabled = !shoesNo.disabled;

    var check = document.querySelector("#div-deleteAllCheck>#deleteAllCheck");
    check.disabled = !check.disabled;

    var btn = document.querySelector("#div-Btn>#deleteBtn");
    btn.disabled = !btn.disabled;
}

function toggle_update() {
    var shoesNo = document.querySelector("#div-shoesNo>#shoesNo");
    shoesNo.disabled = !shoesNo.disabled;

    var shoesBrand = document.querySelector("#div-shoesBrand>#shoesBrand");
    shoesBrand.disabled = !shoesBrand.disabled;   

    var shoesSize = document.querySelector("#div-shoesSize>#shoesSize");
    shoesSize.disabled = !shoesSize.disabled;   

    var shoesService = document.querySelector("#div-shoesService>#shoesService");
    shoesService.disabled = !shoesService.disabled;   

    var shoesStatus = document.querySelector("#div-shoesStatus>#shoesStatus");
    shoesStatus.disabled = !shoesStatus.disabled;   
}

function updateBtn_disabled(isChangeState) {
    var updateStatus = document.querySelector("#div-updateStatus>#updateStatus");
    var btn = document.querySelector("#div-Btn>#updateBtn");

    if (isChangeState) {
        updateStatus.disabled = false;
        btn.disabled = false;
    } else {
        updateStatus.disabled = true;
        btn.disabled = true;
    }
}

function insertBtn_disabled(state) {
    var btn = document.querySelector("#div-Btn");

    btn.children[0].disabled = state;
    btn.children[1].disabled = state;
}

function showUpdate(key, isId=true) {
    var data = getData(key);
    
    var select = document.querySelector("#div-shoesNo>#shoesNo");
    const shoesID = document.querySelector("#div-shoesID>#shoesID");

    var state = !select.disabled;

    if (data) {
        if (isId) createOptionEl(select, data.length);
        if (isId && !state) toggle_update();

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
        if (state) toggle_update();
    }
    updateBtn_disabled(false);
}

function clearUpdate() {
    document.querySelector("#div-shoesBrand>#shoesBrand").value = "";
    document.querySelector("#div-shoesSize>#shoesSize").value = "";
    document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[0].selected = "select";
    document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[0].selected = "select";
}

function showDelete(key, isId=true) {
    var data = getData(key);

    var select = document.querySelector("#div-shoesNo>#shoesNo");
    const shoesID = document.querySelector("#div-shoesID>#shoesID");
    
    var state = !select.disabled;

    if (data) {
        if (isId) { createOptionEl(select, data.length); }
        if (isId && !state) toggle_delete();

        var i = parseInt(select.value);
        document.querySelector("#div-shoesBrand>#shoesBrand").value = data[i].ShoesBrand;
        document.querySelector("#div-shoesSize>#shoesSize").value = data[i].Size;
        document.querySelector("#div-shoesService>#shoesService").value = data[i].Service;
        document.querySelector("#div-shoesStatus>#shoesStatus").value = data[i].Status;
    } else {
        if (shoesID.value.length === 0) createOptionEl(select, 1, true);
        else createOptionEl(select, 1, true, "");
        
        clearDelete();
        if (state) toggle_delete();
    }
}

function clearDelete() {
    document.querySelector("#div-shoesBrand>#shoesBrand").value = "";
    document.querySelector("#div-shoesSize>#shoesSize").value = "";
    document.querySelector("#div-shoesService>#shoesService").value = "";
    document.querySelector("#div-shoesStatus>#shoesStatus").value = "";
}

var key;
var index;
var data;
function helperProcedure() {
    key = document.querySelector("#div-shoesID>#shoesID").value;
    index = document.querySelector("#div-shoesNo>#shoesNo").selectedIndex;
    data = getData(key);
}

function insert_state_listener() {
    document.querySelector("#div-shoesBrand>#shoesBrand").addEventListener("input", () => {
        var shoesSize = document.querySelector("#div-shoesSize>#shoesSize").value
        var shoesBrand = document.querySelector("#div-shoesBrand>#shoesBrand").value

        if ((shoesSize.length > 0) && (shoesBrand.length > 0)) {
            insertBtn_disabled(false);
        } else {
            insertBtn_disabled(true);
        }
    });

    document.querySelector("#div-shoesSize>#shoesSize").addEventListener("input", () => {
        var shoesSize = document.querySelector("#div-shoesSize>#shoesSize").value
        var shoesBrand = document.querySelector("#div-shoesBrand>#shoesBrand").value
        
        var tmp = "";
        for (var i = 0; i < 3; ++i) {    
            if (is_intOnly(shoesSize.slice(i,i+1))) {
                tmp += shoesSize.slice(i,i+1);
            }
        }

        // Update content
        document.querySelector("#div-shoesSize>#shoesSize").value = tmp;
        shoesSize = document.querySelector("#div-shoesSize>#shoesSize").value
        shoesBrand = document.querySelector("#div-shoesBrand>#shoesBrand").value
        if ((shoesSize.length > 0) && (shoesBrand.length > 0)) {
            insertBtn_disabled(false);
        } else {
            insertBtn_disabled(true);
        }
    });
}

function update_state_listener() {

    document.querySelector("#div-shoesBrand>#shoesBrand").addEventListener("input", () => {
        var shoesBrand = document.querySelector("#shoesBrand");
        helperProcedure();

        var shoesBrandState = shoesBrand.value !== data[index].ShoesBrand;

        updateBtn_disabled(shoesBrandState);
    });

    document.querySelector("#div-shoesSize>#shoesSize").addEventListener("input", () => {
        var shoesSize = document.querySelector("#shoesSize");
        helperProcedure();

        var tmp = "";
        for (var i = 0; i < 3; ++i) {    
            if (is_intOnly(shoesSize.slice(i,i+1))) {
                tmp += shoesSize.slice(i,i+1);
            }
        }
        
        document.querySelector("#div-shoesSize>#shoesSize").value = tmp;    // Update content

        var shoesSizeState = tmp !== data[index].Size;
        updateBtn_disabled(shoesSizeState);
    });

    document.querySelector("#div-shoesService>#shoesService").addEventListener("input", () => {
        var shoesService = document.querySelector("#div-shoesService>#shoesService");
        helperProcedure();

        var shoesServiceState = shoesService.value !== data[index].Service;
        
        updateBtn_disabled(shoesServiceState);
    });

    document.querySelector("#div-shoesStatus>#shoesStatus").addEventListener("input", () => {
        var shoesStatus = document.querySelector("#div-shoesStatus>#shoesStatus");
        helperProcedure();

        var shoesStatusState = shoesStatus.value !== data[index].Status;
        
        updateBtn_disabled(shoesStatusState);
    });
}

export { showUpdate, showDelete, update_state_listener, insert_state_listener }