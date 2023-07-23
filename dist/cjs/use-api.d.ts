interface Props {
    both?: boolean;
    errMsg?: boolean;
    successMsg?: boolean;
    resErrMsg?: string;
    resSuccessMsg?: string;
    cache?: string;
    fullRes?: boolean;
    unmount?: boolean;
}
interface Config {
    loading?: boolean;
    successMsg?: boolean;
    errMsg?: boolean;
}
export interface StateVal {
    loading: boolean;
    error: boolean;
    status: number | null;
    message: string;
    data: any;
    fullRes?: any;
}
type CallbackState = (state: StateVal) => void;
type ReturnType = [
    (fun: Function, successCallback?: CallbackState, errCallback?: CallbackState, config?: Config) => void,
    {
        loading: boolean;
        error: boolean;
        status: number | null;
        message: string;
        data: any;
        fullRes?: any;
        clearCache: () => void;
        refetch: () => void;
    }
];
export declare const useApi: ({ both, errMsg, successMsg, resErrMsg, resSuccessMsg, cache, fullRes, unmount }: Props, fun?: any, topSuccessCallback?: CallbackState, topErrCallback?: CallbackState) => ReturnType;
export {};
