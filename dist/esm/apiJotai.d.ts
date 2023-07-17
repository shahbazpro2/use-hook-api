interface Data {
    loading: boolean;
    error: boolean;
    status: number;
    message: string;
    data: any;
    fullRes?: any;
}
interface AtomTypes {
    [key: string]: Data;
}
interface ActionTypes {
    key: string;
    value: Data | null;
}
export declare const apiCacheAtom: import("jotai").PrimitiveAtom<AtomTypes> & {
    init: AtomTypes;
};
export declare const setApiCacheAtom: import("jotai").WritableAtom<null, [action: ActionTypes], void> & {
    init: null;
};
export declare const setExistingCacheAtom: import("jotai").WritableAtom<null, [action: ActionTypes], void> & {
    init: null;
};
export declare const getApiCache: (key?: string) => import("jotai").Atom<Data>;
export declare const useApiCache: (key?: string) => Data;
export {};
