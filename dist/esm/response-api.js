/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import { __assign, __awaiter, __generator } from "tslib";
import axios from 'axios';
import objectToArray from './objectToArray.js';
var CancelToken = axios.CancelToken;
export var cancelRequest = null;
export var Axios = axios;
export var apiResStructure = null;
var initialApiResStructure = {
    errKey: 'message',
    dataKey: 'data',
};
if (!apiResStructure) {
    apiResStructure = initialApiResStructure;
}
var excludeErrorKeys = [];
export var setExcludeErrorKeys = function (keys) {
    excludeErrorKeys = keys;
};
export var allKeysExist = function (obj, keys) {
    if (keys === void 0) { keys = []; }
    return keys.every(function (key) {
        if (typeof key === 'string') {
            var subKeys = key.split('||');
            return subKeys.some(function (subKey) { return obj === null || obj === void 0 ? void 0 : obj.hasOwnProperty(subKey.trim()); });
        }
        return false;
    });
};
var ResponseApi = function (url, method, data, headerData) {
    if (headerData === void 0) { headerData = {}; }
    var _a = apiResStructure || initialApiResStructure, errKey = _a.errKey, dataKey = _a.dataKey;
    return function apiFun() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1, data_1;
            return __generator(this, function (_3) {
                switch (_3.label) {
                    case 0:
                        _3.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios({
                                method: method,
                                url: url,
                                data: data,
                                headers: __assign({}, headerData),
                                cancelToken: new CancelToken(function executor(c) {
                                    cancelRequest = c;
                                }),
                            })];
                    case 1:
                        res = _3.sent();
                        if (allKeysExist(res.data, ["".concat(dataKey, "||data"), "".concat(errKey, "||message")]))
                            return [2 /*return*/, {
                                    error: false,
                                    status: res.status,
                                    data: ((_a = res.data) === null || _a === void 0 ? void 0 : _a[dataKey]) || ((_b = res.data) === null || _b === void 0 ? void 0 : _b.data),
                                    message: objectToArray({ obj: ((_c = res.data) === null || _c === void 0 ? void 0 : _c[errKey]) || ((_d = res.data) === null || _d === void 0 ? void 0 : _d.message), excludeErrorKeys: excludeErrorKeys }),
                                    fullRes: res.data,
                                }];
                        else if (allKeysExist(res.data, ["".concat(errKey, "||message")]))
                            return [2 /*return*/, {
                                    error: false,
                                    status: res.status,
                                    data: res.data,
                                    message: objectToArray({ obj: ((_e = res.data) === null || _e === void 0 ? void 0 : _e[errKey]) || ((_f = res.data) === null || _f === void 0 ? void 0 : _f.message), excludeErrorKeys: excludeErrorKeys }),
                                    fullRes: res.data,
                                }];
                        else if (allKeysExist(res.data, ["".concat(dataKey, "||data")]))
                            return [2 /*return*/, {
                                    error: false,
                                    status: res.status,
                                    data: ((_g = res.data) === null || _g === void 0 ? void 0 : _g[dataKey]) || ((_h = res.data) === null || _h === void 0 ? void 0 : _h.data),
                                    message: objectToArray({ obj: ((_j = res.data) === null || _j === void 0 ? void 0 : _j[dataKey]) || ((_k = res.data) === null || _k === void 0 ? void 0 : _k.data), excludeErrorKeys: excludeErrorKeys }),
                                    fullRes: res.data,
                                }];
                        else
                            return [2 /*return*/, {
                                    error: false,
                                    status: res.status,
                                    data: res.data,
                                    message: objectToArray({ obj: res.data, excludeErrorKeys: excludeErrorKeys }),
                                    fullRes: res.data,
                                }];
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _3.sent();
                        if (((_l = err_1.response) === null || _l === void 0 ? void 0 : _l.status) === 500) {
                            data_1 = { status: (_m = err_1.response) === null || _m === void 0 ? void 0 : _m.status, message: ['Something went wrong.'] };
                        }
                        else if (err_1.message === 'Network Error') {
                            data_1 = { status: 408, message: ['Server is not responding.'] };
                        }
                        else if (allKeysExist((_o = err_1.response) === null || _o === void 0 ? void 0 : _o.data, ["".concat(errKey, "||message")]))
                            data_1 = {
                                status: (_p = err_1.response) === null || _p === void 0 ? void 0 : _p.status,
                                message: objectToArray({
                                    obj: ((_r = (_q = err_1.response) === null || _q === void 0 ? void 0 : _q.data) === null || _r === void 0 ? void 0 : _r[errKey]) || ((_t = (_s = err_1.response) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.message),
                                    excludeErrorKeys: excludeErrorKeys,
                                }),
                            };
                        else if (allKeysExist((_u = err_1.response) === null || _u === void 0 ? void 0 : _u.data, ["".concat(dataKey, "||data")]))
                            data_1 = {
                                status: (_v = err_1.response) === null || _v === void 0 ? void 0 : _v.status,
                                message: objectToArray({ obj: ((_x = (_w = err_1.response) === null || _w === void 0 ? void 0 : _w.data) === null || _x === void 0 ? void 0 : _x[dataKey]) || ((_z = (_y = err_1.response) === null || _y === void 0 ? void 0 : _y.data) === null || _z === void 0 ? void 0 : _z.data), excludeErrorKeys: excludeErrorKeys }),
                            };
                        else
                            data_1 = { status: (_0 = err_1.response) === null || _0 === void 0 ? void 0 : _0.status, message: objectToArray({ obj: (_1 = err_1.response) === null || _1 === void 0 ? void 0 : _1.data, excludeErrorKeys: excludeErrorKeys }) };
                        return [2 /*return*/, __assign(__assign({ error: true }, data_1), { data: null, fullRes: (_2 = err_1.response) === null || _2 === void 0 ? void 0 : _2.data })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
export default ResponseApi;
//# sourceMappingURL=response-api.js.map