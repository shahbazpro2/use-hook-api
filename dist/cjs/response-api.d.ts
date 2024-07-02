export declare let cancelRequest: any;
type apiResStructureType = {
    errKey: string;
    dataKey: string;
};
export declare const Axios: import("axios").AxiosStatic;
export declare const setExcludeErrorKeys: (keys: string[]) => void;
export declare const setApiResStructure: (structure: apiResStructureType) => void;
export declare const allKeysExist: (obj: any, keys?: any) => any;
declare const ResponseApi: (url: string, method: string, data?: any, headerData?: any) => () => Promise<{
    error: boolean;
    status: number;
    data: any;
    message: any[];
    fullRes: any;
} | {
    data: null;
    fullRes: any;
    status: any;
    message: any[];
    error: boolean;
}>;
export default ResponseApi;
