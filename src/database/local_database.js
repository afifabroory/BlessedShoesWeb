var storage = window.sessionStorage;

function getData(key) {
    var data = storage.getItem(key.toUpperCase());
    
    if (typeof(data) === "undefined") {
        return null 
    } else {
        return JSON.parse(data);
    }
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