/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom } from 'jotai'
import React from 'react'

interface Data {
  loading: boolean
  error: boolean
  status: number
  message: string
  data: any
  fullRes?: any
}

interface AtomTypes {
  [key: string]: Data
}

interface ActionTypes {
  key: string
  value: Data | null
}

export const apiCacheAtom = atom<AtomTypes>({})

export const setApiCacheAtom = atom(null, (get, set, action: ActionTypes) => {
  const cache = get(apiCacheAtom)
  if (action.value === null) {
    delete cache[action.key]
    set(apiCacheAtom, cache)
    return
  }
  set(apiCacheAtom, {
    ...cache,
    [action.key]: action.value,
  })
})

export const setExistingCacheAtom = atom(null, (get, set, action: ActionTypes) => {
  const cache = get(apiCacheAtom)
  set(apiCacheAtom, {
    ...cache,
    [action.key]: {
      ...cache[action.key],
      ...action.value,
    },
  })
})

export const getApiCache = (key?: string) => atom((get) => get(apiCacheAtom)[key || ''])

export const useApiCache = (key?: string) => {
  const [cacheval] = useAtom(React.useMemo(() => getApiCache(key), []))

  return cacheval
}
