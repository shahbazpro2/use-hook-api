import { __assign, __awaiter, __generator } from "tslib";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { setApiCacheAtom, useApiCache } from './apiJotai.js';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { setFeedbackAtom } from './feedback.js';
import { generateUUid } from './generateUUid.js';
var key = generateUUid();
var cacheFunctions = new Map();
var initialState = {
    loading: false,
    error: false,
    status: null,
    message: '',
    data: null,
    fullRes: null,
};
export var useApi = function (_a, fun, topSuccessCallback, topErrCallback) {
    var _b = _a.both, both = _b === void 0 ? false : _b, _c = _a.errMsg, errMsg = _c === void 0 ? true : _c, _d = _a.successMsg, successMsg = _d === void 0 ? false : _d, resErrMsg = _a.resErrMsg, resSuccessMsg = _a.resSuccessMsg, cache = _a.cache, fullRes = _a.fullRes, unmount = _a.unmount;
    var setFeedback = useSetAtom(setFeedbackAtom);
    var setApiCache = useSetAtom(setApiCacheAtom);
    var cacheData = useApiCache(cache);
    var _e = useState({}), state = _e[0], setState = _e[1];
    useEffect(function () {
        if (fun) {
            processing({ fun: fun });
        }
        if (unmount) {
            return function () {
                clearCache();
            };
        }
        return function () { };
    }, []);
    var executeApi = function (fun, successCallback, errCallback, config) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!fun)
                return [2 /*return*/];
            processing({ fun: fun, successCallback: successCallback, errCallback: errCallback, config: config });
            return [2 /*return*/];
        });
    }); };
    var clearCache = function () {
        if (cache || key) {
            setApiCache({
                key: cache || key,
                value: null,
            });
            cacheFunctions.delete(cache || key);
            setState(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cache || key] = __assign({}, initialState), _a)));
            });
        }
    };
    var refetch = function () {
        if (cacheFunctions.get(cache || key)) {
            var _a = cacheFunctions.get(cache || key), fun_1 = _a.fun, successCallback = _a.successCallback, errCallback = _a.errCallback, config = _a.config;
            processing({ fun: fun_1, successCallback: successCallback, errCallback: errCallback, config: config });
        }
    };
    var setCacheData = function (data) {
        if (cache) {
            setApiCache({
                key: cache,
                value: __assign(__assign({}, cacheData), { data: data }),
            });
        }
        else {
            setState(function (prevState) {
                var _a;
                return (__assign(__assign({}, prevState), (_a = {}, _a[cache || key] = __assign(__assign({}, prevState[cache || key]), data), _a)));
            });
        }
    };
    var processing = function (_a) {
        var fun = _a.fun, successCallback = _a.successCallback, errCallback = _a.errCallback, config = _a.config;
        return __awaiter(void 0, void 0, void 0, function () {
            var stateVal, res;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        cacheFunctions.set(cache || key, { fun: fun, successCallback: successCallback, errCallback: errCallback, config: config });
                        stateVal = __assign(__assign({}, state[cache || key]), { apiLoading: (_b = config === null || config === void 0 ? void 0 : config.loading) !== null && _b !== void 0 ? _b : true, loading: (_c = config === null || config === void 0 ? void 0 : config.loading) !== null && _c !== void 0 ? _c : true });
                        if ((cacheData === null || cacheData === void 0 ? void 0 : cacheData.loading) === false) {
                            stateVal = __assign(__assign({}, cacheData), { loading: (_d = config === null || config === void 0 ? void 0 : config.loading) !== null && _d !== void 0 ? _d : false, apiLoading: (_e = config === null || config === void 0 ? void 0 : config.loading) !== null && _e !== void 0 ? _e : true });
                        }
                        if ((config === null || config === void 0 ? void 0 : config.loading) !== false) {
                            if (cache)
                                setApiCache({
                                    key: cache,
                                    value: stateVal,
                                });
                            else
                                setState(function (prevState) {
                                    var _a;
                                    return (__assign(__assign({}, prevState), (_a = {}, _a[cache || key] = __assign({}, stateVal), _a)));
                                });
                        }
                        res = null;
                        if (!(fun instanceof Function)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fun()];
                    case 1:
                        res = _f.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fun
                        //if res is promise
                    ];
                    case 3:
                        res = _f.sent();
                        _f.label = 4;
                    case 4:
                        if (!(res instanceof Function)) return [3 /*break*/, 6];
                        return [4 /*yield*/, res()];
                    case 5:
                        res = _f.sent();
                        _f.label = 6;
                    case 6:
                        if (res) {
                            if (res.error) {
                                stateVal = {
                                    apiLoading: false,
                                    loading: false,
                                    error: res.error,
                                    status: res.status,
                                    message: resErrMsg || res.message,
                                    data: !res.error ? res.data : null,
                                    fullRes: res === null || res === void 0 ? void 0 : res.fullRes,
                                };
                                if (!fullRes) {
                                    delete stateVal.fullRes;
                                }
                                if (cache) {
                                    setApiCache({
                                        key: cache,
                                        value: __assign({}, stateVal),
                                    });
                                }
                                else {
                                    setState(function (prevState) {
                                        var _a;
                                        return (__assign(__assign({}, prevState), (_a = {}, _a[key] = __assign({}, stateVal), _a)));
                                    });
                                }
                                if ((errMsg || both) && (config === null || config === void 0 ? void 0 : config.errMsg) !== false)
                                    setFeedback({ message: resErrMsg || res.message, type: 'error' });
                                if (errCallback)
                                    errCallback(stateVal);
                                if (topErrCallback)
                                    topErrCallback(stateVal);
                            }
                            else {
                                stateVal = {
                                    apiLoading: false,
                                    loading: false,
                                    error: res.error,
                                    status: res.status,
                                    message: resSuccessMsg || res.message,
                                    data: !res.error ? res.data : null,
                                    fullRes: res === null || res === void 0 ? void 0 : res.fullRes,
                                };
                                if (!fullRes) {
                                    delete stateVal.fullRes;
                                }
                                if (cache) {
                                    setApiCache({
                                        key: cache,
                                        value: __assign({}, stateVal),
                                    });
                                }
                                else
                                    setState(function (prevState) {
                                        var _a;
                                        return (__assign(__assign({}, prevState), (_a = {}, _a[key] = __assign({}, stateVal), _a)));
                                    });
                                if ((successMsg || both) && (config === null || config === void 0 ? void 0 : config.successMsg) !== false)
                                    setFeedback({ message: resSuccessMsg || res.message, type: 'success' });
                                if (successCallback)
                                    successCallback(stateVal);
                                if (topSuccessCallback)
                                    topSuccessCallback(stateVal);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    if (cache && cacheData)
        return [executeApi, __assign(__assign({}, cacheData), { clearCache: clearCache, refetch: refetch, setCacheData: setCacheData })];
    if (!Object.keys(state).length)
        return [executeApi, __assign(__assign({}, initialState), { clearCache: clearCache, refetch: refetch, setCacheData: setCacheData })];
    return [executeApi, __assign(__assign({}, state[key]), { clearCache: clearCache, refetch: refetch, setCacheData: setCacheData })];
};
//# sourceMappingURL=use-api.js.map