export declare const apiResStructure: {
    errKey: string;
    dataKey: string;
};
declare const customApi: (fun: () => void) => () => Promise<{
    error: boolean;
    status: any;
    data: any;
    message: any;
    fullRes: any;
}>;
export default customApi;
