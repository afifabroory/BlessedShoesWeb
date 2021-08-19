function init_idChange(fn) {
    var shoesID = document.querySelector("#shoesID");
    
    shoesID.addEventListener("input", () => {
        var key = shoesID.value;
        fn(key);
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