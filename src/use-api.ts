/* eslint-disable react-hooks/exhaustive-deps */
import { useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { setApiCacheAtom, useApiCache } from './apiJotai'
import { setFeedbackAtom } from './feedback'
import { generateUUid } from './generateUUid'

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

interface State {
  [key: string]: StateVal
}

interface Config {
  apiLoading?: boolean
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
  cacheData?: StateVal
  showFeedback?: boolean
}

interface Processing {
  both?: boolean
  errMsg?: boolean
  successMsg?: boolean
  resErrMsg?: string
  resSuccessMsg?: string
  fullRes?: boolean
  topErrCallback?: CallbackState | null
  topSuccessCallback?: CallbackState | null
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
  key: string
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

export const useProcessing = ({
  resErrMsg,
  errMsg,
  resSuccessMsg,
  successMsg,
  both,
  topErrCallback,
  topSuccessCallback,
  fullRes,
  state,
  setState,
  key,
}: Processing) => {
  const setFeedback = useSetAtom(setFeedbackAtom)
  const setApiCache = useSetAtom(setApiCacheAtom)

  const onProcessing = async ({
    fun,
    successCallback,
    errCallback,
    config,
    cacheFunKey,
    cacheData,
    showFeedback,
  }: Params) => {
    const cacheKey = cacheFunKey
    cacheFunctions.set(cacheKey || key, { fun, successCallback, errCallback, config })
    let stateVal: StateVal | any = {
      apiLoading: config?.apiLoading ?? true,
      loading: config?.loading ?? true,
    }

    if (config?.loading !== false || config?.apiLoading !== false) {
      if (cacheKey)
        setApiCache({
          key: cacheKey,
          value: {
            ...cacheData,
            ...stateVal,
            loading: config?.loading ?? cacheData?.loading ?? true,
          },
        })
      else setState((prevState: State) => ({ ...prevState, [key]: { ...prevState[key], ...stateVal } }))
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
        showFeedback && setFeedback({ message: resErrMsg || res.message, type: 'error' })

      if (errCallback) errCallback(stateVal)
      if (topErrCallback) topErrCallback(stateVal)
    } else {
      stateVal = {
        ...commonStateVal,
        message: resSuccessMsg || res.message,
      }
      if ((successMsg || both) && config?.successMsg !== false)
        showFeedback && setFeedback({ message: resSuccessMsg || res.message, type: 'success' })

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

  return {
    onProcessing,
    state,
  }
}

export const useApi = (
  { both = false, errMsg = true, successMsg = false, resErrMsg, resSuccessMsg, cache, fullRes, unmount }: Props,
  fun?: Fun,
  topSuccessCallback?: CallbackState | null,
  topErrCallback?: CallbackState | null,
): ReturnType => {
  const stateKey = useMemo(generateUUid, [])
  const setApiCache = useSetAtom(setApiCacheAtom)
  const cacheData = useApiCache(cache)
  const [state, setState] = useState<State>({})
  const { onProcessing } = useProcessing({
    both,
    errMsg,
    successMsg,
    resErrMsg,
    resSuccessMsg,
    fullRes,
    topErrCallback,
    topSuccessCallback,
    state,
    setState,
    key: stateKey,
  })

  useEffect(() => {
    if (fun) {
      onProcessing({ fun, showFeedback: true, cacheData, cacheFunKey: cache })
    }

    if (unmount) {
      return () => {
        clearCache()
      }
    }
    return () => {}
  }, [])

  const executeApi = useCallback(
    (fun: Fun, successCallback?: CallbackState | null, errCallback?: CallbackState | null, config?: Config) => {
      if (!fun) return
      onProcessing({ fun, successCallback, errCallback, config, showFeedback: true, cacheData, cacheFunKey: cache })
    },
    [cacheData, cache],
  )

  const clearFun = (cacheKey?: string) => {
    if (cacheKey) {
      setApiCache({
        key: cacheKey,
        value: null,
      })
      cacheFunctions.delete(cacheKey)
    } else {
      setState((prevState: State) => {
        const newState = { ...prevState }
        delete newState[stateKey]
        return newState
      })
    }
  }

  const clearCache = useCallback(() => {
    clearFun(cache)
  }, [cache, stateKey])

  const refetch = useCallback(() => {
    if (cacheFunctions.get(cache || stateKey)) {
      const { fun, successCallback, errCallback, config }: Params = cacheFunctions.get(cache || stateKey)
      onProcessing({ fun, successCallback, errCallback, config, showFeedback: true, cacheData, cacheFunKey: cache })
    }
  }, [cache, cacheData, stateKey])

  const setCacheData = useCallback(
    (payload: any) => {
      if (!payload || payload === undefined) return
      if (cache) {
        setApiCache({
          key: cache,
          value: structuredClone({ ...cacheData, data: payload, customData: payload }),
        })
      } else {
        setState((prevState: State) => ({
          ...prevState,
          [stateKey]: structuredClone({ ...state[stateKey], data: payload, customData: payload }),
        }))
      }
    },
    [cache, cacheData],
  )

  const onRefetchApis = useCallback((cacheKeys: string[]) => {
    cacheKeys?.forEach((cacheKey) => {
      if (cacheFunctions.get(cacheKey)) {
        const { fun, successCallback, errCallback, config }: Params = cacheFunctions.get(cacheKey)
        onProcessing({
          fun,
          successCallback,
          errCallback,
          config: {
            ...config,
            loading: false,
          },
          cacheFunKey: cacheKey,
        })
      }
    })
  }, [])

  const onClearCaches = useCallback((cacheKeys: string[]) => {
    cacheKeys?.forEach((cacheKey) => {
      clearFun(cacheKey)
    })
  }, [])

  const onSetCacheData = useCallback(
    (keysValues: { key: string; data: any }[]) => {
      keysValues?.forEach(({ key, data }) => {
        if (key) {
          setApiCache({
            key: key,
            value: structuredClone({ ...cacheData, data, customData: data }),
          })
        }
      })
    },
    [cacheData],
  )

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
  return [executeApi, { ...state[stateKey], ...commonReturns }]
}
