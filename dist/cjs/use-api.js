"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = void 0;
var tslib_1 = require("tslib");
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
var apiJotai_js_1 = require("./apiJotai.js");
var jotai_1 = require("jotai");
var react_1 = require("react");
var feedback_js_1 = require("./feedback.js");
var generateUUid_js_1 = require("./generateUUid.js");
var key = (0, generateUUid_js_1.generateUUid)();
var cacheFunctions = new Map();
var initialState = {
    loading: false,
    error: false,
    status: null,
    message: '',
    data: null,
    fullRes: null,
};
var useApi = function (_a, fun, topSuccessCallback, topErrCallback) {
    var _b = _a.both, both = _b === void 0 ? false : _b, _c = _a.errMsg, errMsg = _c === void 0 ? true : _c, _d = _a.successMsg, successMsg = _d === void 0 ? false : _d, resErrMsg = _a.resErrMsg, resSuccessMsg = _a.resSuccessMsg, cache = _a.cache, fullRes = _a.fullRes, unmount = _a.unmount;
    var setFeedback = (0, jotai_1.useSetAtom)(feedback_js_1.setFeedbackAtom);
    var setApiCache = (0, jotai_1.useSetAtom)(apiJotai_js_1.setApiCacheAtom);
    var cacheData = (0, apiJotai_js_1.useApiCache)(cache);
    var _e = (0, react_1.useState)({}), state = _e[0], setState = _e[1];
    (0, react_1.useEffect)(function () {
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
    var executeApi = function (fun, successCallback, errCallback, config) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            processing({ fun: fun, successCallback: successCallback, errCallback: errCallback, config: config });
            return [2 /*return*/];
        });
    }); };
    var clearCache = function () {
        if (cache) {
            setApiCache({
                key: cache,
                value: null,
            });
            cacheFunctions.delete(cache);
        }
    };
    var refetch = function () {
        var _a = cacheFunctions.get(cache || key), fun = _a.fun, successCallback = _a.successCallback, errCallback = _a.errCallback, config = _a.config;
        processing({ fun: fun, successCallback: successCallback, errCallback: errCallback, config: config });
    };
    var processing = function (_a) {
        var fun = _a.fun, successCallback = _a.successCallback, errCallback = _a.errCallback, config = _a.config;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var stateVal, res;
            var _b, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        cacheFunctions.set(cache || key, { fun: fun, successCallback: successCallback, errCallback: errCallback, config: config });
                        stateVal = tslib_1.__assign(tslib_1.__assign({}, state[cache || key]), { loading: (_b = config === null || config === void 0 ? void 0 : config.loading) !== null && _b !== void 0 ? _b : true });
                        if ((cacheData === null || cacheData === void 0 ? void 0 : cacheData.loading) === false) {
                            stateVal = tslib_1.__assign(tslib_1.__assign({}, cacheData), { loading: (_c = config === null || config === void 0 ? void 0 : config.loading) !== null && _c !== void 0 ? _c : false });
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
                                    return (tslib_1.__assign(tslib_1.__assign({}, prevState), (_a = {}, _a[cache || key] = tslib_1.__assign({}, stateVal), _a)));
                                });
                        }
                        res = null;
                        if (!(fun instanceof Function)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fun()];
                    case 1:
                        res = _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fun
                        //if res is promise
                    ];
                    case 3:
                        res = _d.sent();
                        _d.label = 4;
                    case 4:
                        if (!(res instanceof Function)) return [3 /*break*/, 6];
                        return [4 /*yield*/, res()];
                    case 5:
                        res = _d.sent();
                        _d.label = 6;
                    case 6:
                        if (res) {
                            if (!res.error) {
                                stateVal = {
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
                                        value: tslib_1.__assign({}, stateVal),
                                    });
                                }
                                else
                                    setState(function (prevState) {
                                        var _a;
                                        return (tslib_1.__assign(tslib_1.__assign({}, prevState), (_a = {}, _a[key] = tslib_1.__assign({}, stateVal), _a)));
                                    });
                                (successMsg || both) &&
                                    (config === null || config === void 0 ? void 0 : config.successMsg) !== false &&
                                    setFeedback({ message: resSuccessMsg || res.message, type: 'success' });
                            }
                            else if (res.error) {
                                stateVal = {
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
                                        value: tslib_1.__assign({}, stateVal),
                                    });
                                }
                                else {
                                    setState(function (prevState) {
                                        var _a;
                                        return (tslib_1.__assign(tslib_1.__assign({}, prevState), (_a = {}, _a[key] = tslib_1.__assign({}, stateVal), _a)));
                                    });
                                }
                                if ((errMsg || both) && (config === null || config === void 0 ? void 0 : config.errMsg) !== false)
                                    setFeedback({ message: resErrMsg || res.message, type: 'error' });
                            }
                            if (!res.error) {
                                if (successCallback)
                                    successCallback(stateVal);
                                if (topSuccessCallback)
                                    topSuccessCallback(stateVal);
                            }
                            if (res.error) {
                                if (errCallback)
                                    errCallback(stateVal);
                                if (topErrCallback)
                                    topErrCallback(stateVal);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    if (cache && cacheData)
        return [executeApi, tslib_1.__assign(tslib_1.__assign({}, cacheData), { clearCache: clearCache, refetch: refetch })];
    if (!Object.keys(state).length)
        return [executeApi, tslib_1.__assign(tslib_1.__assign({}, initialState), { clearCache: clearCache, refetch: refetch })];
    return [executeApi, tslib_1.__assign(tslib_1.__assign({}, state[key]), { clearCache: clearCache, refetch: refetch })];
};
exports.useApi = useApi;
//# sourceMappingURL=use-api.js.map