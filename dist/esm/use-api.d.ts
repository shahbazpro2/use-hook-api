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
export declare const useApi: ({ both, errMsg, successMsg, resErrMsg, resSuccessMsg, cache, fullRes, unmount }: Props, fun?: Function, topSuccessCallback?: Function, topErrCallback?: Function) => (((fun: Function, successCallback?: Function, errCallback?: Function, config?: Config) => Promise<void>) | {
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
