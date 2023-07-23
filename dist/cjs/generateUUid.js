"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUid = void 0;
var generateUUid = function () {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};
exports.generateUUid = generateUUid;
//# sourceMappingURL=generateUUid.js.map