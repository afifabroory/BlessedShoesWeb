import { is_intOnly } from "../utils/validate"
import { showUpdate } from "../utils/admin_data"

function init_idChange() {
    const shoesID = document.querySelector("#shoesID");
    shoesID.addEventListener("change", () => {
        if (is_intOnly) {
            var data = getData()[shoesID.value];

        } else {
            alert("ID Input Are Number Only!")
        }
    });
}

export { init_idChange }