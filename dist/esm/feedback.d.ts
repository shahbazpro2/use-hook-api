interface FeedbackType {
    message: string | null;
    type: string;
}
type SetFeedbackType = [string | null, string];
export declare const feedbackAtom: import("jotai").PrimitiveAtom<FeedbackType> & {
    init: FeedbackType;
};
export declare const setFeedbackAtom: import("jotai").WritableAtom<null, [payload: FeedbackType], void> & {
    init: null;
};
export declare const clearFeedbackAtom: import("jotai").WritableAtom<null, [], void> & {
    init: null;
};
export declare const useSetFeedback: () => (payload: SetFeedbackType) => void;
export declare const useFeedbackState: () => (FeedbackType | (() => void))[];
export {};
