interface FeedbackType {
    message: string | string[] | null;
    type: string;
}
export declare const feedbackAtom: import("jotai").PrimitiveAtom<FeedbackType> & {
    init: FeedbackType;
};
export declare const setFeedbackAtom: import("jotai").WritableAtom<null, [payload: FeedbackType], void> & {
    init: null;
};
export declare const clearFeedbackAtom: import("jotai").WritableAtom<null, [], void> & {
    init: null;
};
export declare const useSetFeedback: () => (message: string | string[], type: string) => void;
export declare const useFeedbackState: () => {
    feedbackState: FeedbackType;
    clearFeedback: () => void;
};
export {};
