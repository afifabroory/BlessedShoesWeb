var storage = window.sessionStorage;

function getData(data) {
    return JSON.parse(storage.getItem(data));
}

function storeData(key, data) {
    storage.setItem(key, data);
}

function removeData(key) {
    storage.removeItem(key)
}

export { getData, storeData, removeData }