type ObjectToArray = {
    obj: any;
    arr?: any[];
    tempKey?: any;
    excludeErrorKeys: string[];
};
declare function objectToArray({ obj, arr, tempKey, excludeErrorKeys }: ObjectToArray): any[];
export default objectToArray;
