function objectToArray(obj, arr, tempKey) {
    var _a;
    if (arr === void 0) { arr = []; }
    if (tempKey === void 0) { tempKey = null; }
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            if (typeof (obj === null || obj === void 0 ? void 0 : obj[i]) === "object") {
                objectToArray(obj[i], arr, tempKey);
            }
            else {
                arr.push((obj === null || obj === void 0 ? void 0 : obj[i]) || obj);
            }
        }
    }
    else if (typeof obj === "object") {
        for (var key in obj) {
            if (!Number.isNaN(Number(key))) {
                tempKey = key;
            }
            if (typeof obj[key] === "object") {
                objectToArray(obj[key], arr, tempKey);
            }
            else {
                if (key === "icabbi_error" ||
                    (typeof obj[key] === "string" &&
                        ((_a = ['This field is required.', 'This field is required']) === null || _a === void 0 ? void 0 : _a.includes(obj[key])))) {
                    arr.push("".concat(tempKey, ": ").concat(obj[key]));
                }
                else if (key !== "code") {
                    arr.push(obj[key]);
                }
            }
        }
    }
    else {
        arr.push(obj);
    }
    return arr;
}
export default objectToArray;
//# sourceMappingURL=objectToArray.js.map