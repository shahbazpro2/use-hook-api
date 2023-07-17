export declare let cancelRequest: any;
export declare const Axios: import("axios").AxiosStatic;
export declare const apiResStructure: {
    errKey: string;
    dataKey: string;
};
export declare const allKeysExist: (obj: any, keys?: any) => any;
declare const responseApi: (url: string, method: string, data: any, headerData?: any) => () => Promise<{
    error: boolean;
    status: number;
    data: any;
    message: any;
    fullRes: any;
} | {
    data: null;
    fullRes: any;
    status: any;
    message: any;
    error: boolean;
}>;
export default responseApi;
