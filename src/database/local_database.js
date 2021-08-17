var storage = window.sessionStorage;

function getData() {
    return JSON.parse(storage.getItem("firebaseRealtimeDatabase"));
}

function storeData(key, data) {
    storage.setItem(key, data);
}

export { getData, storeData }