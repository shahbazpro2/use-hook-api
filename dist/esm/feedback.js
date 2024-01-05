/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
export var feedbackAtom = atom({
    message: null,
    type: 'error',
});
export var setFeedbackAtom = atom(null, function (_get, set, payload) {
    set(feedbackAtom, payload);
});
export var clearFeedbackAtom = atom(null, function (_get, set) {
    set(feedbackAtom, { message: null, type: 'error' });
});
export var useSetFeedback = function () {
    var setFeedback = useSetAtom(setFeedbackAtom);
    return useMemo(function () {
        return function (payload) {
            return setFeedback({
                message: payload === null || payload === void 0 ? void 0 : payload[0],
                type: (payload === null || payload === void 0 ? void 0 : payload[1]) || 'error',
            });
        };
    }, []);
};
export var useFeedbackState = function () {
    var feedbackState = useAtomValue(feedbackAtom);
    var clearState = useSetAtom(clearFeedbackAtom);
    var clearFeedback = useMemo(function () {
        return function () { return clearState(); };
    }, []);
    return {
        feedbackState: feedbackState,
        clearFeedback: clearFeedback,
    };
};
//# sourceMappingURL=feedback.js.map