/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { setApiCacheAtom, useApiCache } from './apiJotai.js'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { setFeedbackAtom } from './feedback.js'
import { generateUUid } from './generateUUid.js'

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
  loading: boolean
  error: boolean
  status: number | null
  message: string
  data: any
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
}

type ReturnType = [
  (fun: Fun, successCallback?: CallbackState | null, errCallback?: CallbackState | null, config?: Config) => void,
  {
    loading: boolean
    error: boolean
    status: number | null
    message: string
    data: any
    fullRes?: any
    clearCache: () => void
    refetch: () => void
    setCacheData: (data: any) => void
  },
]

const initialState = {
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
    return () => {}
  }, [])

  const executeApi = async (
    fun: Fun,
    successCallback?: CallbackState | null,
    errCallback?: CallbackState | null,
    config?: Config,
  ) => {
    if (!fun) return
    processing({ fun, successCallback, errCallback, config })
  }

  const clearCache = () => {
    if (cache || key) {
      setApiCache({
        key: cache || key,
        value: null,
      })
      cacheFunctions.delete(cache || key)
      setState((prevState: State) => ({ ...prevState, [cache || key]: { ...initialState } }))
    }
  }

  const refetch = () => {
    if (cacheFunctions.get(cache || key)) {
      const { fun, successCallback, errCallback, config }: Params = cacheFunctions.get(cache || key)
      processing({ fun, successCallback, errCallback, config })
    }
  }

  const setCacheData = (data: any) => {
    if (cache) {
      setApiCache({
        key: cache,
        value: {
          ...cacheData,
          data,
        },
      })
    } else {
      setState((prevState: State) => ({ ...prevState, [cache || key]: { ...prevState[cache || key], ...data } }))
    }
  }

  const processing = async ({ fun, successCallback, errCallback, config }: Params) => {
    cacheFunctions.set(cache || key, { fun, successCallback, errCallback, config })
    let stateVal = {
      ...state[cache || key],
      apiLoading: config?.loading ?? true,
      loading: config?.loading ?? true,
    }

    if (cacheData?.loading === false) {
      stateVal = { ...cacheData, loading: config?.loading ?? false, apiLoading: config?.loading ?? true }
    }

    if (config?.loading !== false) {
      if (cache)
        setApiCache({
          key: cache,
          value: stateVal,
        })
      else setState((prevState: State) => ({ ...prevState, [cache || key]: { ...stateVal } }))
    }

    let res = null

    //check fun have callback or not
    if (fun instanceof Function) res = await fun()
    else res = await fun

    //if res is promise
    if (res instanceof Function) {
      res = await res()
    }
    if (res?.error && !res?.status) return

    if (res) {
      if (res.error) {
        stateVal = {
          apiLoading: false,
          loading: false,
          error: res.error,
          status: res.status,
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
            value: { ...stateVal },
          })
        } else {
          setState((prevState: State) => ({
            ...prevState,
            [key]: {
              ...stateVal,
            },
          }))
        }
        if ((errMsg || both) && config?.errMsg !== false)
          setFeedback({ message: resErrMsg || res.message, type: 'error' })

        if (errCallback) errCallback(stateVal)
        if (topErrCallback) topErrCallback(stateVal)
      } else {
        stateVal = {
          apiLoading: false,
          loading: false,
          error: res.error,
          status: res.status,
          message: resSuccessMsg || res.message,
          data: !res.error ? res.data : null,
          fullRes: res?.fullRes,
        }

        if (!fullRes) {
          delete stateVal.fullRes
        }

        if (cache) {
          setApiCache({
            key: cache,
            value: { ...stateVal },
          })
        } else setState((prevState: State) => ({ ...prevState, [key]: { ...stateVal } }))
        if ((successMsg || both) && config?.successMsg !== false)
          setFeedback({ message: resSuccessMsg || res.message, type: 'success' })

        if (successCallback) successCallback(stateVal)
        if (topSuccessCallback) topSuccessCallback(stateVal)
      }
    }
  }

  if (cache && cacheData) return [executeApi, { ...cacheData, clearCache, refetch, setCacheData }]
  if (!Object.keys(state).length) return [executeApi, { ...initialState, clearCache, refetch, setCacheData }]
  return [executeApi, { ...state[key], clearCache, refetch, setCacheData }]
}
