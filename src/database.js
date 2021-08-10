import {
    db,
    serverValue
} from "./firebaseInit";


// Admin & User
export function read(id) {
    const idRef = db.ref(id);

    const data = idRef.once("value").then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
            console.log(dataSnapshot.val());
            return dataSnapshot.val();
        } else {
            return false;
        }
    }).catch(() => {
        console.log("Something wrong!");
    });

    return data;
}

/** 
 * Admin only 
 */
export function insert(id, data) {
    
    const dtArr = [];
    var dt;
    
    console.log(serverValue.TIMESTAMP);
    for (var i = 0; i < data.length; ++i) {
        dt = data[i];
        dtArr.push({
            "No"        : (i+1),
            "ShoesBrand": dt.brand,
            "Service"   : dt.service,
            "Size"      : dt.size,
            "Status"    : dt.status,
            "TimestampIn" : serverValue.TIMESTAMP,
            "TimestampOut": "-"
        });
    }

    db.ref(id).set(dtArr).then(() => {
        console.log("Success");
    }).catch(() => {
        console.log("Something wrong!");
    });
}

export function update(id, data) {
    db.ref(id).update(data);
}
export function remove(id) {
    db.ref(id).remove();
}