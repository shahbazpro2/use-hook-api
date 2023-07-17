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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
var apiJotai_js_1 = require("./apiJotai.js");
var jotai_1 = require("jotai");
var react_1 = require("react");
var uuid_1 = require("uuid");
var feedback_js_1 = require("./feedback.js");
var key = (0, uuid_1.v4)();
var cacheFunctions = new Map();
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
    }, []);
    var executeApi = function (fun, successCallback, errCallback, config) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (fun) {
                processing({ fun: fun, successCallback: successCallback, errCallback: errCallback, config: config });
            }
            return [2 /*return*/];
        });
    }); };
    var clearCache = function () {
        if (cache) {
            setApiCache({
                key: cache,
                value: null
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
        return __awaiter(void 0, void 0, void 0, function () {
            var stateVal, res;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        cacheFunctions.set(cache || key, { fun: fun, successCallback: successCallback, errCallback: errCallback, config: config });
                        stateVal = __assign(__assign({}, state[cache || key]), { loading: (_b = config === null || config === void 0 ? void 0 : config.loading) !== null && _b !== void 0 ? _b : true });
                        if ((cacheData === null || cacheData === void 0 ? void 0 : cacheData.loading) === false) {
                            stateVal = __assign(__assign({}, cacheData), { loading: (_c = config === null || config === void 0 ? void 0 : config.loading) !== null && _c !== void 0 ? _c : false });
                        }
                        if ((config === null || config === void 0 ? void 0 : config.loading) !== false) {
                            if (cache)
                                setApiCache({
                                    key: cache,
                                    value: stateVal
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
                        res = _d.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, fun];
                    case 3:
                        res = _d.sent();
                        _d.label = 4;
                    case 4:
                        if (res) {
                            if (!res.error) {
                                stateVal = {
                                    loading: false,
                                    error: res.error,
                                    status: res.status,
                                    message: resSuccessMsg || res.message,
                                    data: !res.error ? res.data : null,
                                    fullRes: res === null || res === void 0 ? void 0 : res.fullRes
                                };
                                if (!fullRes) {
                                    delete stateVal.fullRes;
                                }
                                if (cache) {
                                    setApiCache({
                                        key: cache,
                                        value: __assign({}, stateVal)
                                    });
                                }
                                else
                                    setState(function (prevState) {
                                        var _a;
                                        return (__assign(__assign({}, prevState), (_a = {}, _a[key] = __assign({}, stateVal), _a)));
                                    });
                                ((successMsg || both) && (config === null || config === void 0 ? void 0 : config.successMsg) !== false) && setFeedback({ message: resSuccessMsg || res.message, type: 'success' });
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
                                        value: __assign({}, stateVal)
                                    });
                                }
                                else {
                                    setState(function (prevState) {
                                        var _a;
                                        return (__assign(__assign({}, prevState), (_a = {}, _a[key] = __assign({}, stateVal), _a)));
                                    });
                                }
                                ((errMsg || both) && (config === null || config === void 0 ? void 0 : config.errMsg) !== false) && setFeedback({ message: resErrMsg || res.message, type: 'error' });
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
    if (cache)
        return [executeApi, __assign(__assign({}, cacheData), { clearCache: clearCache, refetch: refetch })];
    return [executeApi, __assign(__assign({}, state[key]), { clearCache: clearCache, refetch: refetch })];
};
exports.useApi = useApi;
