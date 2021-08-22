const default_attrs = [{
    0: "Insert",
    1: "Update",
    2: "Delete"
}, {
    id: "shoesID",
    type: "text",
    autocomplete: "off",
    maxlength: "3"
}, {
    sheoesNo: [{
        id: "shoesNo",
        type: "text",
        autocomplete: "off",
        value: "1"
    }, "No: ", 1],
    shoesBrand: [{
        id: "shoesBrand",
        type: "text",
        autocomplete: "off"
    }, "Shoes Brand: ", !1],
    shoesSize: [{
        id: "shoesSize",
        type: "text",
        autocomplete: "off",
        pattern: "\\d*",
        maxlength: "3"
    }, "Shoes Size: ", !1]
}, {
    service: [{
        "Deep Clean": "Deep Clean",
        "Fast Clean": "Fast clean",
        "Whitening Treatment": "Whitening Treatment",
        Repaint: "Repaint",
        Reglue: "Reglue"
    }, "shoesService", "Service: "],
    status: [{
        "In Progress": "In Progress",
        Done: "Done",
        Canceled: "Canceled"
    }, "shoesStatus", "Status: "]
}, {
    addBtn: [{
        id: "addBtn"
    }, "ADD", 1],
    insertBtn: [{
        id: "insertBtn"
    }, "INSERT", 1],
    cancelBtn: [{
        id: "cancelBtn",
    }, "CANCEL", 1]
}];

const update_attrs = [{
    0: "- ENTER ID FIRST -"
}, {
    id: "updateStatus",
    type: "checkbox"
}, {
    updateBtn: [{
        id: "updateBtn"
    }, "UPDATE", 1]
}]

const delete_attrs = [{
    0: "- ENTER ID FIRST -"
}, {
    id: "deleteAllCheck",
    type: "checkbox",
}, {
    shoesService: [{
        id: "shoesService",
        type: "text",
        autocomplete: "off"
    }, "Service: ", 1],
    shoesStatus: [{
        id: "shoesStatus",
        type: "text",
        autocomplete: "off"
    }, "Status", 1]
}, {
    deleteBtn: [{
        id: "deleteBtn"
    }, "DELETE", 1]
}];

const service_option_index = {
    "Deep Clean": 0,
    "Fast Clean": 1,
    "Whitening Treatment": 2,
    Repaint: 3,
    Regluer: 4
}

const status_option_index = {
    "In Progress": 0,
    Done: 1,
    Canceled: 2
}

export { 
    default_attrs, 
    update_attrs,
    delete_attrs,
    service_option_index,
    status_option_index
}