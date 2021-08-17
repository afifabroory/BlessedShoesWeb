function is_intOnly(data) {
    return /^[0-9]+$/.test(data);
}

export { is_intOnly };