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
type Fun = () => Promise<{
    error: boolean;
    data: null;
    status: string | number;
    message: string[];
}> | {
    error: boolean;
    data: null;
    status: string | number;
    message: string[];
};
type ReturnType = [
    (fun: Fun, successCallback?: CallbackState | null, errCallback?: CallbackState | null, config?: Config) => void,
    {
        loading: boolean;
        error: boolean;
        status: number | null;
        message: string;
        data: any;
        fullRes?: any;
        clearCache: () => void;
        refetch: () => void;
        setCacheData: (data: any) => void;
    }
];
export declare const useApi: ({ both, errMsg, successMsg, resErrMsg, resSuccessMsg, cache, fullRes, unmount }: Props, fun?: Fun, topSuccessCallback?: CallbackState | null, topErrCallback?: CallbackState | null) => ReturnType;
export {};
