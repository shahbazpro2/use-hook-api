type apiResStructureType = {
    errKey: string;
    dataKey: string;
};
export declare const setCustomExcludeErrorKeys: (keys: string[]) => void;
export declare const setCustomApiResStructure: (structure: apiResStructureType) => void;
declare const customApi: (fun: any) => () => Promise<{
    error: boolean;
    status: any;
    data: any;
    message: any[];
    fullRes: any;
}>;
export default customApi;
