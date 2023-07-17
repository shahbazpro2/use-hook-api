"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResStructure = exports.useSetFeedback = exports.useFeedbackState = exports.Axios = exports.useApi = exports.cancelRequest = exports.customApi = exports.responseApi = void 0;
var tslib_1 = require("tslib");
var feedback_js_1 = require("./feedback.js");
Object.defineProperty(exports, "useFeedbackState", { enumerable: true, get: function () { return feedback_js_1.useFeedbackState; } });
Object.defineProperty(exports, "useSetFeedback", { enumerable: true, get: function () { return feedback_js_1.useSetFeedback; } });
var response_api_js_1 = tslib_1.__importStar(require("./response-api.js"));
exports.responseApi = response_api_js_1.default;
Object.defineProperty(exports, "cancelRequest", { enumerable: true, get: function () { return response_api_js_1.cancelRequest; } });
Object.defineProperty(exports, "apiResStructure", { enumerable: true, get: function () { return response_api_js_1.apiResStructure; } });
Object.defineProperty(exports, "Axios", { enumerable: true, get: function () { return response_api_js_1.Axios; } });
var custom_api_js_1 = tslib_1.__importDefault(require("./custom-api.js"));
exports.customApi = custom_api_js_1.default;
var use_api_js_1 = require("./use-api.js");
Object.defineProperty(exports, "useApi", { enumerable: true, get: function () { return use_api_js_1.useApi; } });
//# sourceMappingURL=index.js.map