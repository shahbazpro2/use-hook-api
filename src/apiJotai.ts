/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useAtom, useSetAtom } from 'jotai'
import React, { useMemo } from 'react'
import { StateVal } from './use-api'

interface AtomTypes {
  [key: string]: StateVal
}

interface ActionTypes {
  key: string
  value: StateVal | null
}

export const apiCacheAtom = atom<AtomTypes>({})
export const excludeErrorKeysAtom = atom<string[]>([])

export const useSetExcludeErrorKeys = () => {
  const setExcludeErrorKeys = useSetAtom(excludeErrorKeysAtom)

  return useMemo(() => {
    return (payload: string[]) => setExcludeErrorKeys(payload)
  }, [])
}

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
