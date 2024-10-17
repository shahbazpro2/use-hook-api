/* eslint-disable react-hooks/exhaustive-deps */
import { useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { setApiCacheAtom, useApiCache } from './apiJotai'
import { setFeedbackAtom } from './feedback'
import { generateUUid } from './generateUUid'

const key = generateUUid()
const cacheFunctions = new Map()

interface Props {
  both?: boolean
  errMsg?: boolean
  successMsg?: boolean
  resErrMsg?: string
  resSuccessMsg?: string
  cache?: string
  fullRes?: boolean
  unmount?: boolean
}

interface Config {
  loading?: boolean
  successMsg?: boolean
  errMsg?: boolean
}

export interface StateVal {
  apiLoading: boolean
  loading: boolean
  error: boolean
  status: number | null
  message: string
  data: any
  customData?: any
  fullRes?: any
}
//state has key and value
interface State {
  [key: string]: StateVal
}

type CallbackState = (state: StateVal) => void
type Fun = () =>
  | Promise<{ error: boolean; data: null; status: string | number; message: string[] }>
  | { error: boolean; data: null; status: string | number; message: string[] }
interface Params {
  fun: Fun
  successCallback?: CallbackState | null
  errCallback?: CallbackState | null
  config?: Config
  cacheFunKey?: string
}

type ReturnType = [
  (fun: Fun, successCallback?: CallbackState | null, errCallback?: CallbackState | null, config?: Config) => void,
  {
    loading: boolean
    apiLoading: boolean
    error: boolean
    status: number | null
    message: string
    data: any
    fullRes?: any
    customData?: any
    clearCache: () => void
    refetch: () => void
    setCacheData: (data: any) => void
    onRefetchApis: (cacheKeys: string[]) => void
    onClearCaches: (cacheKeys: string[]) => void
    onSetCacheData: (keysValues: { key: string; data: any }[]) => void
  },
]

const initialState = {
  apiLoading: false,
  loading: false,
  error: false,
  status: null,
  message: '',
  data: null,
  fullRes: null,
}

export const useApi = (
  { both = false, errMsg = true, successMsg = false, resErrMsg, resSuccessMsg, cache, fullRes, unmount }: Props,
  fun?: Fun,
  topSuccessCallback?: CallbackState | null,
  topErrCallback?: CallbackState | null,
): ReturnType => {
  const setFeedback = useSetAtom(setFeedbackAtom)
  const setApiCache = useSetAtom(setApiCacheAtom)
  const cacheData = useApiCache(cache)
  const [state, setState] = useState<State>({})

  useEffect(() => {
    if (fun) {
      processing({ fun })
    }

    if (unmount) {
      return () => {
        clearCache()
      }
    }
    return () => { }
  }, [])

  const executeApi = useMemo(
    () => (fun: Fun, successCallback?: CallbackState | null, errCallback?: CallbackState | null, config?: Config) => {
      if (!fun) return
      processing({ fun, successCallback, errCallback, config })
    },
    [],
  )

  const clearFun = (cacheKey: string) => {
    if (cacheKey) {
      setApiCache({
        key: cacheKey,
        value: null,
      })
      cacheFunctions.delete(cacheKey)
    }
  }

  const clearCache = useMemo(
    () => () => {
      clearFun(cache || key)
    },
    [],
  )

  const refetch = useMemo(
    () => () => {
      if (cacheFunctions.get(cache || key)) {
        const { fun, successCallback, errCallback, config }: Params = cacheFunctions.get(cache || key)
        processing({ fun, successCallback, errCallback, config })
      }
    },
    [],
  )

  const setCacheData = useMemo(
    () => (payload: any) => {
      if (!payload || payload === undefined) return
      if (cache) {
        setApiCache({
          key: cache,
          value: structuredClone({ ...cacheData, data: payload, customData: payload }),
        })
      } else if (cache || key) {
        setState((prevState: State) => ({
          ...prevState,
          [cache || key]: structuredClone({ ...state[cache || key], data: payload, customData: payload }),
        }))
      }
    },
    [],
  )

  const onRefetchApis = useMemo(() => {
    return (cacheKeys: string[]) => {
      cacheKeys?.forEach((cacheKey) => {
        if (cacheFunctions.get(cacheKey)) {
          const { fun, successCallback, errCallback, config }: Params = cacheFunctions.get(cacheKey)
          processing({ fun, successCallback, errCallback, config, cacheFunKey: cacheKey })
        }
      })
    }
  }, [])

  const onClearCaches = useMemo(() => {
    return (cacheKeys: string[]) => {
      cacheKeys?.forEach((cacheKey) => {
        clearFun(cacheKey)
      })
    }
  }, [])

  const onSetCacheData = useMemo(() => {
    return (keysValues: { key: string; data: any }[]) => {
      keysValues?.forEach(({ key, data }) => {
        if (key) {
          setApiCache({
            key: key,
            value: structuredClone({ ...cacheData, data, customData: data }),
          })
        }
      })
    }
  }, [])

  const processing = async ({ fun, successCallback, errCallback, config, cacheFunKey }: Params) => {
    const cacheKey = cacheFunKey || cache
    cacheFunctions.set(cacheKey, { fun, successCallback, errCallback, config })
    let stateVal = {
      ...state[cacheKey || key],
      apiLoading: config?.loading ?? true,
      loading: config?.loading ?? true,
    }

    if (cacheData?.loading === false) {
      stateVal = { ...cacheData, loading: config?.loading ?? false, apiLoading: config?.loading ?? true }
    }

    if (config?.loading !== false) {
      if (cacheKey)
        setApiCache({
          key: cacheKey,
          value: stateVal,
        })
      else setState((prevState: State) => ({ ...prevState, [key]: { ...stateVal } }))
    }

    let res = null

    //check fun have callback or not
    if (fun instanceof Function) res = await fun()
    else res = await fun

    //if res is promise
    if (res instanceof Function) {
      res = await res()
    }

    if (!res) return

    const commonStateVal = {
      apiLoading: false,
      loading: false,
      error: res.error,
      status: res.status,
      data: !res.error ? res.data : null,
      fullRes: res?.fullRes,
    }

    if (res.error) {
      stateVal = {
        ...commonStateVal,
        message: resErrMsg || res.message,
      }
      if ((errMsg || both) && config?.errMsg !== false)
        !cacheFunKey && setFeedback({ message: resErrMsg || res.message, type: 'error' })

      if (errCallback) errCallback(stateVal)
      if (topErrCallback) topErrCallback(stateVal)
    } else {
      stateVal = {
        ...commonStateVal,
        message: resSuccessMsg || res.message,
      }
      if ((successMsg || both) && config?.successMsg !== false)
        !cacheFunKey && setFeedback({ message: resSuccessMsg || res.message, type: 'success' })

      if (successCallback) successCallback(stateVal)
      if (topSuccessCallback) topSuccessCallback(stateVal)
    }

    if (!fullRes) {
      delete stateVal.fullRes
    }

    if (cacheKey) {
      setApiCache({
        key: cacheKey,
        value: structuredClone(stateVal),
      })
      return
    }

    setState((prevState: State) => ({
      ...prevState,
      [key]: structuredClone(stateVal),
    }))
  }

  const commonReturns = {
    clearCache,
    refetch,
    setCacheData,
    onRefetchApis,
    onClearCaches,
    onSetCacheData,
  }

  if (cache && cacheData) return [executeApi, { ...cacheData, ...commonReturns }]
  if (!Object.keys(state).length) return [executeApi, { ...initialState, ...commonReturns }]
  return [executeApi, { ...state[key], ...commonReturns }]
}
