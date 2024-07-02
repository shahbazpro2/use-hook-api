"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeedbackState = exports.useSetFeedback = exports.clearFeedbackAtom = exports.setFeedbackAtom = exports.feedbackAtom = void 0;
/* eslint-disable react-hooks/exhaustive-deps */
var jotai_1 = require("jotai");
var react_1 = require("react");
exports.feedbackAtom = (0, jotai_1.atom)({
    message: null,
    type: 'error',
});
exports.setFeedbackAtom = (0, jotai_1.atom)(null, function (_get, set, payload) {
    set(exports.feedbackAtom, payload);
});
exports.clearFeedbackAtom = (0, jotai_1.atom)(null, function (_get, set) {
    set(exports.feedbackAtom, { message: null, type: 'error' });
});
var useSetFeedback = function () {
    var setFeedback = (0, jotai_1.useSetAtom)(exports.setFeedbackAtom);
    return (0, react_1.useMemo)(function () {
        return function (message, type) {
            return setFeedback({
                message: message ? (Array.isArray(message) ? message : [message]) : null,
                type: type || 'error',
            });
        };
    }, []);
};
exports.useSetFeedback = useSetFeedback;
var useFeedbackState = function () {
    var feedbackState = (0, jotai_1.useAtomValue)(exports.feedbackAtom);
    var clearState = (0, jotai_1.useSetAtom)(exports.clearFeedbackAtom);
    var clearFeedback = (0, react_1.useMemo)(function () {
        return function () { return clearState(); };
    }, []);
    return {
        feedbackState: feedbackState,
        clearFeedback: clearFeedback,
    };
};
exports.useFeedbackState = useFeedbackState;
//# sourceMappingURL=feedback.js.map