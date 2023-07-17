"use strict";
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allKeysExist = exports.apiResStructure = exports.Axios = exports.cancelRequest = void 0;
var axios_1 = __importDefault(require("axios"));
var objectToArray_js_1 = __importDefault(require("./objectToArray.js"));
var CancelToken = axios_1.default.CancelToken;
exports.cancelRequest = null;
exports.Axios = axios_1.default;
exports.apiResStructure = {
    errKey: 'message',
    dataKey: 'data',
};
var allKeysExist = function (obj, keys) {
    if (keys === void 0) { keys = []; }
    return keys.every(function (key) {
        if (typeof key === 'string') {
            var subKeys = key.split('||');
            return subKeys.some(function (subKey) { return obj === null || obj === void 0 ? void 0 : obj.hasOwnProperty(subKey.trim()); });
        }
        return false;
    });
};
exports.allKeysExist = allKeysExist;
var responseApi = function (url, method, data, headerData) {
    if (headerData === void 0) { headerData = {}; }
    var errKey = exports.apiResStructure.errKey, dataKey = exports.apiResStructure.dataKey;
    return function apiFun() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1, data_1;
            return __generator(this, function (_3) {
                switch (_3.label) {
                    case 0:
                        _3.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: method,
                                url: url,
                                data: data,
                                headers: __assign({}, headerData),
                                cancelToken: new CancelToken(function executor(c) {
                                    exports.cancelRequest = c;
                                })
                            })];
                    case 1:
                        res = _3.sent();
                        if ((0, exports.allKeysExist)(res.data, ["".concat(dataKey, "||data"), "".concat(errKey, "||message")]))
                            return [2 /*return*/, { error: false, status: res.status, data: ((_a = res.data) === null || _a === void 0 ? void 0 : _a[dataKey]) || ((_b = res.data) === null || _b === void 0 ? void 0 : _b.data), message: (0, objectToArray_js_1.default)(((_c = res.data) === null || _c === void 0 ? void 0 : _c[errKey]) || ((_d = res.data) === null || _d === void 0 ? void 0 : _d.message)), fullRes: res.data }];
                        else if ((0, exports.allKeysExist)(res.data, ["".concat(errKey, "||message")]))
                            return [2 /*return*/, { error: false, status: res.status, data: res.data, message: (0, objectToArray_js_1.default)(((_e = res.data) === null || _e === void 0 ? void 0 : _e[errKey]) || ((_f = res.data) === null || _f === void 0 ? void 0 : _f.message)), fullRes: res.data }];
                        else if ((0, exports.allKeysExist)(res.data, ["".concat(dataKey, "||data")]))
                            return [2 /*return*/, { error: false, status: res.status, data: ((_g = res.data) === null || _g === void 0 ? void 0 : _g[dataKey]) || ((_h = res.data) === null || _h === void 0 ? void 0 : _h.data), message: (0, objectToArray_js_1.default)(((_j = res.data) === null || _j === void 0 ? void 0 : _j[dataKey]) || ((_k = res.data) === null || _k === void 0 ? void 0 : _k.data)), fullRes: res.data }];
                        else
                            return [2 /*return*/, { error: false, status: res.status, data: res.data, message: (0, objectToArray_js_1.default)(res.data), fullRes: res.data }];
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _3.sent();
                        if (((_l = err_1.response) === null || _l === void 0 ? void 0 : _l.status) === 500) {
                            data_1 = { status: (_m = err_1.response) === null || _m === void 0 ? void 0 : _m.status, message: ['Something went wrong.'] };
                        }
                        else if (err_1.message === "Network Error") {
                            data_1 = { status: 408, message: ['Server is not responding.'] };
                        }
                        else if ((0, exports.allKeysExist)((_o = err_1.response) === null || _o === void 0 ? void 0 : _o.data, ["".concat(errKey, "||message")]))
                            data_1 = { status: (_p = err_1.response) === null || _p === void 0 ? void 0 : _p.status, message: (0, objectToArray_js_1.default)(((_r = (_q = err_1.response) === null || _q === void 0 ? void 0 : _q.data) === null || _r === void 0 ? void 0 : _r[errKey]) || ((_t = (_s = err_1.response) === null || _s === void 0 ? void 0 : _s.data) === null || _t === void 0 ? void 0 : _t.message)) };
                        else if ((0, exports.allKeysExist)((_u = err_1.response) === null || _u === void 0 ? void 0 : _u.data, ["".concat(dataKey, "||data")]))
                            data_1 = { status: (_v = err_1.response) === null || _v === void 0 ? void 0 : _v.status, message: (0, objectToArray_js_1.default)(((_x = (_w = err_1.response) === null || _w === void 0 ? void 0 : _w.data) === null || _x === void 0 ? void 0 : _x[dataKey]) || ((_z = (_y = err_1.response) === null || _y === void 0 ? void 0 : _y.data) === null || _z === void 0 ? void 0 : _z.data)) };
                        else
                            data_1 = { status: (_0 = err_1.response) === null || _0 === void 0 ? void 0 : _0.status, message: (0, objectToArray_js_1.default)((_1 = err_1.response) === null || _1 === void 0 ? void 0 : _1.data) };
                        return [2 /*return*/, __assign(__assign({ error: true }, data_1), { data: null, fullRes: (_2 = err_1.response) === null || _2 === void 0 ? void 0 : _2.data })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
exports.default = responseApi;
