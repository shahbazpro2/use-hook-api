"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApiCache = exports.getApiCache = exports.setExistingCacheAtom = exports.setApiCacheAtom = exports.apiCacheAtom = void 0;
var jotai_1 = require("jotai");
var react_1 = __importDefault(require("react"));
exports.apiCacheAtom = (0, jotai_1.atom)({});
exports.setApiCacheAtom = (0, jotai_1.atom)(null, function (get, set, action) {
    var _a;
    var cache = get(exports.apiCacheAtom);
    if (action.value === null) {
        delete cache[action.key];
        set(exports.apiCacheAtom, cache);
        return;
    }
    set(exports.apiCacheAtom, __assign(__assign({}, cache), (_a = {}, _a[action.key] = action.value, _a)));
});
exports.setExistingCacheAtom = (0, jotai_1.atom)(null, function (get, set, action) {
    var _a;
    var cache = get(exports.apiCacheAtom);
    set(exports.apiCacheAtom, __assign(__assign({}, cache), (_a = {}, _a[action.key] = __assign(__assign({}, cache[action.key]), action.value), _a)));
});
var getApiCache = function (key) { return (0, jotai_1.atom)(function (get) { return get(exports.apiCacheAtom)[key || '']; }); };
exports.getApiCache = getApiCache;
var useApiCache = function (key) {
    var cacheval = (0, jotai_1.useAtom)(react_1.default.useMemo(function () { return (0, exports.getApiCache)(key); }, []))[0];
    return cacheval;
};
exports.useApiCache = useApiCache;
