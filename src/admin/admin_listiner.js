import { is_intOnly } from "../utils/validate"

function init_idChange(fn) {
    var shoesID = document.querySelector("#shoesID");
    
    shoesID.addEventListener("input", () => {
        var key = shoesID.value;

        if (is_intOnly(key)) {
            fn(key);
        } else {
            shoesID.value = shoesID.value.slice(0, -1);
            alert("ID Input Are Number Only!")
        }
    });
}

function init_noChange(fn) {
    var shoesID = document.querySelector("#shoesID");
    var shoesNo = document.querySelector("#div-shoesNo>#shoesNo");

    shoesNo.addEventListener("change", () => {
        var key = shoesID.value;
        fn(key, false);
    });
}

export { init_idChange, init_noChange }