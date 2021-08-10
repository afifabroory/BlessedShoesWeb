export function isValidInput(inputID) {
        return inputID.length > 0;
}

export function isValidRD(rdInput) {
    for (var i = 0; i < rdInput.length; ++i) {
        if (rdInput[i].checked == true) {
            return true;
        }
    }
    return false;
}