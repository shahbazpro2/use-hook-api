"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objectToArray(_a) {
    var _b;
    var _c = _a.obj, obj = _c === void 0 ? {} : _c, _d = _a.arr, arr = _d === void 0 ? [] : _d, _e = _a.tempKey, tempKey = _e === void 0 ? null : _e, _f = _a.excludeErrorKeys, excludeErrorKeys = _f === void 0 ? [] : _f;
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            if (typeof (obj === null || obj === void 0 ? void 0 : obj[i]) === 'object') {
                objectToArray({ obj: obj[i], arr: arr, tempKey: tempKey, excludeErrorKeys: excludeErrorKeys });
            }
            else {
                arr.push((obj === null || obj === void 0 ? void 0 : obj[i]) || obj);
            }
        }
    }
    else if (typeof obj === 'object') {
        for (var key in obj) {
            if (!Number.isNaN(Number(key))) {
                tempKey = key;
            }
            if (typeof obj[key] === 'object') {
                objectToArray({ obj: obj[key], arr: arr, tempKey: tempKey, excludeErrorKeys: excludeErrorKeys });
            }
            else {
                if (key === 'icabbi_error' ||
                    (typeof obj[key] === 'string' && ((_b = ['This field is required.', 'This field is required']) === null || _b === void 0 ? void 0 : _b.includes(obj[key])))) {
                    arr.push("".concat(tempKey, ": ").concat(obj[key]));
                }
                else if (key !== 'code' && !excludeErrorKeys.includes(key)) {
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
exports.default = objectToArray;
//# sourceMappingURL=objectToArray.js.map