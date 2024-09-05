/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom } from 'jotai'
import React from 'react'
import { StateVal } from './use-api'

interface AtomTypes {
  [key: string]: StateVal
}

interface ActionTypes {
  key: string
  value: StateVal | null
}

export const apiCacheAtom = atom<AtomTypes>({})

export const setApiCacheAtom = atom(null, (_, set, action: ActionTypes) => {
  if (action.value === null) {
    set(apiCacheAtom, (prev) => {
      const tempCache = { ...prev }
      delete tempCache[action.key]
      return tempCache
    })
    return
  }

  set(apiCacheAtom, (prev: any) => ({
    ...prev,
    [action.key]: action.value,
  }))
})

export const setExistingCacheAtom = atom(null, (_, set, action: ActionTypes) => {
  set(apiCacheAtom, (prev: any) => ({
    ...prev,
    [action.key]: {
      ...prev[action.key],
      ...action.value,
    },
  }))
})

export const getApiCache = (key?: string) => atom((get) => get(apiCacheAtom)[key || ''])

export const useApiCache = (key?: string) => {
  const [cacheval] = useAtom(React.useMemo(() => getApiCache(key), []))

  return cacheval
}
