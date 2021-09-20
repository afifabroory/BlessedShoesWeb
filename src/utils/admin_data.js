import { getData } from "../database/local_database"
import { createOptionEl } from "./elUtils"
import { service_option_index, status_option_index } from "../admin/admin_const"
import { is_intOnly, isValid_UpdateState, isValid_InsertState, isValid_StatusChange } from "../utils/validate"

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
    var btn = document.querySelector("#div-Btn>#updateBtn");
    btn.disabled = isChangeState;
}

function updateBox_disabled(isChangeState) {
    var length = document.querySelector("#div-shoesNo>#shoesNo").childElementCount;
    var updateStatus = document.querySelector("#div-updateStatus>#updateStatus");
    if (length > 1) updateStatus.disabled = isChangeState;
    else updateStatus.disabled = true;
    
    if (isChangeState) updateStatus.checked = false;
}

function insertBtn_disabled(state) {
    var btn = document.querySelector("#div-Btn");

    var key = document.querySelector("#div-shoesID>#shoesID").value;
    var data = getData(key);

    var isEmpty;
    if (data) {
        isEmpty = data.length === 0;
    } else {
        isEmpty = true;
    }

    btn.children[0].disabled = state;
    btn.children[1].disabled = state && isEmpty
    btn.children[2].disabled = isEmpty
}

function showUpdate(data, isId=true) {
    document.querySelector("#div-updateStatus>#updateStatus").checked = false;
    var select = document.querySelector("#div-shoesNo>#shoesNo");
    var state = !select.disabled;
    
    if (data) {
        data = data.filter((el) => { return el != null }); // Filter empty data in array
        
        if (isId) createOptionEl(select, data);
        if (isId && !state) toggle_update();

        var i = parseInt(select.value);
        document.querySelector("#div-shoesBrand>#shoesBrand").value = data[i].ShoesBrand;
        document.querySelector("#div-shoesSize>#shoesSize").value = data[i].Size;

        var service_option = document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option");
        service_option[service_option_index[data[i].Service]].selected = "select";

        var status_option = document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option");
        status_option[status_option_index[data[i].Status]].selected = "select";
    } else {
        clearUpdate();
        if (state) toggle_update();
        updateBtn_disabled(true);
    }
}

function showDelete(data, isId=true) {
    var select = document.querySelector("#div-shoesNo>#shoesNo");
    const shoesID = document.querySelector("#div-shoesID>#shoesID");
    
    var state = !select.disabled;

    if (data) {
        if (isId) { createOptionEl(select, data); }
        if (isId && !state) toggle_delete();

        var i = parseInt(select.value);
        document.querySelector("#div-shoesBrand>#shoesBrand").value = data[i].ShoesBrand;
        document.querySelector("#div-shoesSize>#shoesSize").value = data[i].Size;
        document.querySelector("#div-shoesService>#shoesService").value = data[i].Service;
        document.querySelector("#div-shoesStatus>#shoesStatus").value = data[i].Status;
    } else {
        if (shoesID.value.length === 0) createOptionEl(select, [0], true);
        else createOptionEl(select, [0], true, "");
        
        clearDelete();
        if (state) toggle_delete();
    }
}

function clearInsert() {
    document.querySelector("#div-shoesBrand>#shoesBrand").value = "";
    document.querySelector("#div-shoesSize>#shoesSize").value = "";
    document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[0].selected = "select";
    document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[0].selected = "select";
}

function clearUpdate() {
    var shoesID = document.querySelector("#div-shoesID>#shoesID");
    var select = document.querySelector("#div-shoesNo>#shoesNo");

    if (shoesID.value.length === 0) createOptionEl(select, [0], true);
    else createOptionEl(select, [0], true, "");

    document.querySelector("#div-shoesBrand>#shoesBrand").value = "";
    document.querySelector("#div-shoesSize>#shoesSize").value = "";
    document.querySelector("#div-shoesService>#shoesService").getElementsByTagName("option")[0].selected = "select";
    document.querySelector("#div-shoesStatus>#shoesStatus").getElementsByTagName("option")[0].selected = "select";
    document.querySelector("#div-updateStatus>#updateStatus").checked = false;
}

function clearDelete() {
    document.querySelector("#div-shoesBrand>#shoesBrand").value = "";
    document.querySelector("#div-shoesSize>#shoesSize").value = "";
    document.querySelector("#div-shoesService>#shoesService").value = "";
    document.querySelector("#div-shoesStatus>#shoesStatus").value = "";
    document.querySelector("#div-deleteAllCheck>#deleteAllCheck").checked = false;
}

function insert_state_listener() {
    document.querySelector("#div-shoesBrand>#shoesBrand").addEventListener("input", () => {
        insertBtn_disabled(!isValid_InsertState());
    });

    document.querySelector("#div-shoesSize>#shoesSize").addEventListener("input", () => {
        var tmp = '';
        var shoesSize = document.querySelector("#div-shoesSize>#shoesSize").value
        
        for (var i = 0; i < 3; ++i) {    
            if (is_intOnly(shoesSize.slice(i,i+1))) {
                tmp += shoesSize.slice(i,i+1);
            }
        }

        // Update content
        document.querySelector("#div-shoesSize>#shoesSize").value = tmp;
    
        insertBtn_disabled(!isValid_InsertState());
    });
}

function update_state_listener() {

    document.querySelector("#div-shoesNo>#shoesNo").addEventListener("input", () => {
        updateBtn_disabled(true);
        updateBox_disabled(true);
    });

    document.querySelector("#div-shoesBrand>#shoesBrand").addEventListener("input", () => {
        updateBtn_disabled(!isValid_UpdateState());
    });

    document.querySelector("#div-shoesSize>#shoesSize").addEventListener("input", () => {
        var shoesSize = document.querySelector("#shoesSize").value;

        var tmp = "";
        for (var i = 0; i < 3; ++i) {    
            if (is_intOnly(shoesSize.slice(i,i+1))) {
                tmp += shoesSize.slice(i,i+1);
            }
        }
        document.querySelector("#div-shoesSize>#shoesSize").value = tmp;    // Update content

        updateBtn_disabled(!isValid_UpdateState());
    });

    // Select Element
    document.querySelector("#div-shoesService>#shoesService").addEventListener("input", () => {
        updateBtn_disabled(!isValid_UpdateState());
    });

    document.querySelector("#div-shoesStatus>#shoesStatus").addEventListener("input", () => {
        updateBtn_disabled(!isValid_UpdateState());
        updateBox_disabled(!isValid_StatusChange());
    });
}

export { 
    showUpdate, 
    showDelete, 
    clearInsert, 
    clearUpdate,
    clearDelete,
    update_state_listener, 
    insert_state_listener,
    insertBtn_disabled,
    updateBtn_disabled,
    toggle_update,
    toggle_delete
}