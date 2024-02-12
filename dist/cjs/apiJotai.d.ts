import { StateVal } from './use-api';
interface AtomTypes {
    [key: string]: StateVal;
}
interface ActionTypes {
    key: string;
    value: StateVal | null;
}
export declare const apiCacheAtom: import("jotai").PrimitiveAtom<AtomTypes> & {
    init: AtomTypes;
};
export declare const excludeErrorKeysAtom: import("jotai").PrimitiveAtom<string[]> & {
    init: string[];
};
export declare const useSetExcludeErrorKeys: () => (payload: string[]) => void;
export declare const setApiCacheAtom: import("jotai").WritableAtom<null, [action: ActionTypes], void> & {
    init: null;
};
export declare const setExistingCacheAtom: import("jotai").WritableAtom<null, [action: ActionTypes], void> & {
    init: null;
};
export declare const getApiCache: (key?: string) => import("jotai").Atom<StateVal>;
export declare const useApiCache: (key?: string) => StateVal;
export {};
