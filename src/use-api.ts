/* eslint-disable react-hooks/exhaustive-deps */
import { setApiCacheAtom, useApiCache } from './apiJotai.js'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { setFeedbackAtom } from './feedback.js'

const key = uuid()
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

//state has key and value
interface State {
  [key: string]: {
    loading: boolean
    error: boolean
    status: number
    message: string
    data: any
    fullRes?: any
  }
}

type CallbackState = (state: State) => State | Promise<any>
interface Params {
  fun: () => any | Promise<any>
  successCallback?: CallbackState
  errCallback?: CallbackState
  config?: Config
}

export const useApi = (
  { both = false, errMsg = true, successMsg = false, resErrMsg, resSuccessMsg, cache, fullRes, unmount }: Props,
  fun?: () => any | Promise<any>,
  topSuccessCallback?: CallbackState,
  topErrCallback?: CallbackState,
) => {
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
    fun: () => any | Promise<any>,
    successCallback?: CallbackState,
    errCallback?: CallbackState,
    config?: Config,
  ) => {
    processing({ fun, successCallback, errCallback, config })
  }

  const clearCache = () => {
    if (cache) {
      setApiCache({
        key: cache,
        value: null,
      })
      cacheFunctions.delete(cache)
    }
  }

  const refetch = () => {
    const { fun, successCallback, errCallback, config }: Params = cacheFunctions.get(cache || key)
    processing({ fun, successCallback, errCallback, config })
  }

  const processing = async ({ fun, successCallback, errCallback, config }: Params) => {
    cacheFunctions.set(cache || key, { fun, successCallback, errCallback, config })
    let stateVal = {
      ...state[cache || key],
      loading: config?.loading ?? true,
    }

    if (cacheData?.loading === false) {
      stateVal = { ...cacheData, loading: config?.loading ?? false }
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

    if (res) {
      if (!res.error) {
        stateVal = {
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

        ;(successMsg || both) &&
          config?.successMsg !== false &&
          setFeedback({ message: resSuccessMsg || res.message, type: 'success' })
      } else if (res.error) {
        stateVal = {
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

        ;(errMsg || both) &&
          config?.errMsg !== false &&
          setFeedback({ message: resErrMsg || res.message, type: 'error' })
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

  if (cache) return [executeApi, { ...cacheData, clearCache, refetch }]

  return [executeApi, { ...state[key], clearCache, refetch }]
}
