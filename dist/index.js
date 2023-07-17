"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResStructure = exports.useSetFeedback = exports.useFeedbackState = exports.Axios = exports.useApi = exports.cancelRequest = exports.customApi = exports.responseApi = void 0;
var feedback_js_1 = require("./feedback.js");
Object.defineProperty(exports, "useFeedbackState", { enumerable: true, get: function () { return feedback_js_1.useFeedbackState; } });
Object.defineProperty(exports, "useSetFeedback", { enumerable: true, get: function () { return feedback_js_1.useSetFeedback; } });
var response_api_js_1 = __importStar(require("./response-api.js"));
exports.responseApi = response_api_js_1.default;
Object.defineProperty(exports, "cancelRequest", { enumerable: true, get: function () { return response_api_js_1.cancelRequest; } });
Object.defineProperty(exports, "apiResStructure", { enumerable: true, get: function () { return response_api_js_1.apiResStructure; } });
Object.defineProperty(exports, "Axios", { enumerable: true, get: function () { return response_api_js_1.Axios; } });
var custom_api_js_1 = __importDefault(require("./custom-api.js"));
exports.customApi = custom_api_js_1.default;
var use_api_js_1 = require("./use-api.js");
Object.defineProperty(exports, "useApi", { enumerable: true, get: function () { return use_api_js_1.useApi; } });
