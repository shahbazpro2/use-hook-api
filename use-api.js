/* eslint-disable react-hooks/exhaustive-deps */
import { setApiCacheAtom, useApiCache } from "./apiJotai.js"
import { useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { setFeedbackAtom } from "./feedback.js"

const key = uuid()
const cacheFunctions = new Map()
export const useApi = (
    { both, errMsg, successMsg, resErrMsg, resSuccessMsg, cache, fullRes, unmount } = { both: false, errMsg: true, resErrMsg: "", resSuccessMsg: "", fullRes: false },
    fun,
    topSuccessCallback,
    topErrCallback
) => {
    const setFeedback = useSetAtom(setFeedbackAtom)
    const setApiCache = useSetAtom(setApiCacheAtom)
    const cacheData = useApiCache(cache)
    const [state, setState] = useState({})




    useEffect(() => {
        if (fun) {
            processing({ fun, topSuccessCallback, topErrCallback })
        }

        if (unmount) {
            return () => {
                clearCache()
            }
        }
    }, [])

    const executeApi = async (fun, successCallback, errCallback, config) => {
        if (fun) {
            processing({ fun, successCallback, errCallback, config })
        }
    }

    const clearCache = () => {
        if (cache) {
            setApiCache({
                key: cache,
                value: {}
            })
            cacheFunctions.delete(cache)
        }
    }



    const refetch = () => {
        const { fun, callback, errCallback, config } = cacheFunctions.get(cache || key)
        processing({ fun, callback, errCallback, config })
    }


    const processing = async ({ fun, successCallback, errCallback, config }) => {
        cacheFunctions.set(cache || key, { fun, successCallback, errCallback, config })
        let stateVal = {
            ...state[cache || key], loading: config?.loading ?? true
        }

        if (cacheData?.loading === false) {
            stateVal = { ...cacheData, loading: config?.loading ?? false }
        }

        if (config?.loading !== false) {
            if (cache) setApiCache({
                key: cache,
                value: stateVal
            })
            else
                setState(prevState => ({ ...prevState, [cache || key]: { ...stateVal } }))
        }


        let res = null

        //check fun have callback or not
        if (fun instanceof Function) res = await fun()
        else res = await fun

        if (res) {
            if (!res.error) {
                stateVal = {
                    loading: false,
                    error: res.error,
                    message: resSuccessMsg || res.message,
                    data: !res.error ? res.data : null,
                    fullRes: res?.fullRes
                }

                if (!fullRes) {
                    delete stateVal.fullRes
                }

                if (cache) {
                    setApiCache({
                        key: cache,
                        value: { ...stateVal }
                    })
                } else
                    setState(prevState => ({ ...prevState, [key]: { ...stateVal } }));



                ((successMsg || both) && config?.successMsg !== false) && setFeedback({ message: resSuccessMsg || res.message, type: 'success' })
            } else if (res.error) {
                stateVal = {
                    loading: false,
                    error: res.error,
                    message: resErrMsg || res.message,
                    data: !res.error ? res.data : null,
                    fullRes: res?.fullRes,
                }
                if (!fullRes) {
                    delete stateVal.fullRes
                }
                if (cache) {
                    setApiCache({
                        key: cache,
                        value: { ...stateVal }
                    })
                } else {
                    setState(prevState => ({
                        ...prevState,
                        [key]: {
                            ...stateVal,
                        }
                    }));
                }

                ((errMsg || both) && config?.errMsg !== false) && setFeedback(resErrMsg || res.message, true)
            }
            if (!res.error) {
                if (successCallback) successCallback(stateVal)
                if (topSuccessCallback) topSuccessCallback(stateVal)
            }
            if (res.error) {
                if (errCallback) errCallback(stateVal)
                if (topErrCallback) topErrCallback(stateVal)
            }
        }
    }

    if (cache)
        return [executeApi, { ...cacheData, clearCache, refetch }]

    return [executeApi, { ...state[key], clearCache, refetch }]

}
