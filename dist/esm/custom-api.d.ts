export declare const apiResStructure: {
    errKey: string;
    dataKey: string;
};
declare const customApi: (fun: any) => () => Promise<{
    error: boolean;
    status: any;
    data: any;
    message: any;
    fullRes: any;
}>;
export default customApi;
