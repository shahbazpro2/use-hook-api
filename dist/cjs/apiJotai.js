"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiCache = exports.getApiCache = exports.setExistingCacheAtom = exports.setApiCacheAtom = exports.apiCacheAtom = void 0;
var tslib_1 = require("tslib");
/* eslint-disable react-hooks/exhaustive-deps */
var jotai_1 = require("jotai");
var react_1 = tslib_1.__importDefault(require("react"));
exports.apiCacheAtom = (0, jotai_1.atom)({});
exports.setApiCacheAtom = (0, jotai_1.atom)(null, function (get, set, action) {
    var _a;
    var cache = get(exports.apiCacheAtom);
    if (action.value === null) {
        delete cache[action.key];
        set(exports.apiCacheAtom, cache);
        return;
    }
    set(exports.apiCacheAtom, tslib_1.__assign(tslib_1.__assign({}, cache), (_a = {}, _a[action.key] = action.value, _a)));
});
exports.setExistingCacheAtom = (0, jotai_1.atom)(null, function (get, set, action) {
    var _a;
    var cache = get(exports.apiCacheAtom);
    set(exports.apiCacheAtom, tslib_1.__assign(tslib_1.__assign({}, cache), (_a = {}, _a[action.key] = tslib_1.__assign(tslib_1.__assign({}, cache[action.key]), action.value), _a)));
});
var getApiCache = function (key) { return (0, jotai_1.atom)(function (get) { return get(exports.apiCacheAtom)[key || '']; }); };
exports.getApiCache = getApiCache;
var useApiCache = function (key) {
    var cacheval = (0, jotai_1.useAtom)(react_1.default.useMemo(function () { return (0, exports.getApiCache)(key); }, []))[0];
    return cacheval;
};
exports.useApiCache = useApiCache;
//# sourceMappingURL=apiJotai.js.map