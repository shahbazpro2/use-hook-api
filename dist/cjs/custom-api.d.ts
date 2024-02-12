export declare const customApiResStructure: {
    errKey: string;
    dataKey: string;
};
export declare const customExcludeErrorKeys: string[];
declare const customApi: (fun: any) => () => Promise<{
    error: boolean;
    status: any;
    data: any;
    message: any[];
    fullRes: any;
}>;
export default customApi;
