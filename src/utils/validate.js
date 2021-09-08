import { getData } from "../database/local_database"

function is_intOnly(data) {
    return /^[0-9]*$/.test(data);
}

function is_alpnum(data) {
    return /^[0-9A-Z]+$/.test(data)
}

function isValid_UpdateState() {
    var key = document.querySelector("#div-shoesID>#shoesID").value;
    var index = document.querySelector("#div-shoesNo>#shoesNo").selectedIndex;
    
    var data = getData(key);
    data = data.filter((el) => { return el != null });

    var shoesBrand = document.querySelector("#shoesBrand");
    var shoesSize = document.querySelector("#shoesSize");
    var shoesService = document.querySelector("#div-shoesService>#shoesService");
    var shoesStatus = document.querySelector("#div-shoesStatus>#shoesStatus");

    var shoesBrandState = shoesBrand.value !== data[index].ShoesBrand && shoesBrand.value !== '';
    var shoesSizeState = shoesSize.value !== data[index].Size && shoesSize.value !== '';
    var shoesServiceState = shoesService.value !== data[index].Service;
    var shoesStatusState = shoesStatus.value !== data[index].Status;

    return shoesBrandState || shoesSizeState || shoesServiceState || shoesStatusState;
}

function isValid_StatusChange() {
    var key = document.querySelector("#div-shoesID>#shoesID").value;
    var index = document.querySelector("#div-shoesNo>#shoesNo").selectedIndex;
    
    var data = getData(key);
    data = data.filter((el) => { return el != null });
    
    return shoesStatus.value !== data[index].Status;;
}

function isValid_InsertState() {
    var shoesSize = document.querySelector("#div-shoesSize>#shoesSize").value
    var shoesBrand = document.querySelector("#div-shoesBrand>#shoesBrand").value

    return shoesSize !== '' && shoesBrand !== ''
}

function validateInsertData(data) {
    return data.ShoesBrand.length > 0 && data.Size.length > 0;
}

export { is_intOnly, is_alpnum, isValid_InsertState, isValid_UpdateState, validateInsertData, isValid_StatusChange };