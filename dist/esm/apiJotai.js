import { __assign } from "tslib";
/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom } from 'jotai';
import React from 'react';
export var apiCacheAtom = atom({});
export var setApiCacheAtom = atom(null, function (get, set, action) {
    var _a;
    var cache = get(apiCacheAtom);
    if (action.value === null) {
        delete cache[action.key];
        set(apiCacheAtom, cache);
        return;
    }
    set(apiCacheAtom, __assign(__assign({}, cache), (_a = {}, _a[action.key] = action.value, _a)));
});
export var setExistingCacheAtom = atom(null, function (get, set, action) {
    var _a;
    var cache = get(apiCacheAtom);
    set(apiCacheAtom, __assign(__assign({}, cache), (_a = {}, _a[action.key] = __assign(__assign({}, cache[action.key]), action.value), _a)));
});
export var getApiCache = function (key) { return atom(function (get) { return get(apiCacheAtom)[key || '']; }); };
export var useApiCache = function (key) {
    var cacheval = useAtom(React.useMemo(function () { return getApiCache(key); }, []))[0];
    return cacheval;
};
//# sourceMappingURL=apiJotai.js.map