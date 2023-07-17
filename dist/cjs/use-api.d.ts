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
interface StateVal {
    loading: boolean;
    error: boolean;
    status: number;
    message: string;
    data: any;
    fullRes?: any;
}
type CallbackState = (state: StateVal) => StateVal | Promise<any>;
export declare const useApi: ({ both, errMsg, successMsg, resErrMsg, resSuccessMsg, cache, fullRes, unmount }: Props, fun?: () => any | Promise<any>, topSuccessCallback?: CallbackState, topErrCallback?: CallbackState) => (((fun: () => any | Promise<any>, successCallback?: CallbackState, errCallback?: CallbackState, config?: Config) => Promise<void>) | {
    clearCache: () => void;
    refetch: () => void;
    loading: boolean;
    error: boolean;
    status: number;
    message: string;
    data: any;
    fullRes?: any;
})[];
export {};
