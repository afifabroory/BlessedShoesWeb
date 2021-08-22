var storage = window.sessionStorage;

function getData(key) {
    var data =  JSON.parse(storage.getItem(key.toUpperCase()))

    //if (Array.isArray(data)) {
    //    data = data.filter((el) => {
    //        return el != null;
    //    });
    //}

    return data;
}

function storeData(key, data) {
    if (Array.isArray(data)) {
        data = data.filter((el) => {
            return el != null;
        });
    }
    storage.setItem(key.toUpperCase(), data);
}

function removeData(key) {
    storage.removeItem(key)
}

export { getData, storeData, removeData }