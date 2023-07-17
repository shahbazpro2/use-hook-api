export declare let cancelRequest: any;
export declare const apiResStructure: {
    errKey: string;
    dataKey: string;
};
declare const customApi: (fun: Function) => () => Promise<{
    error: boolean;
    status: any;
    data: any;
    message: any;
    fullRes: any;
}>;
export default customApi;
