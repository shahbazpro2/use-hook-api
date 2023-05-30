import { atom, useAtom } from "jotai"
import React from "react"

export const apiCacheAtom = atom({})

export const setApiCacheAtom = atom(null, (get, set, action) => {
    const cache = get(apiCacheAtom)
    set(apiCacheAtom, {
        ...cache,
        [action.key]: action.value
    })
})

export const setExistingCacheAtom = atom(null, (get, set, action) => {
    const cache = get(apiCacheAtom)
    set(apiCacheAtom, {
        ...cache,
        [action.key]: {
            ...cache[action.key],
            ...action.value
        }
    })
})

export const getApiCache = (key) => atom((get) => get(apiCacheAtom)[key])

export const useApiCache = (key) => {
    const [cacheval] = useAtom(
        React.useMemo(
            () => getApiCache(key),
            []
        )
    )

    return cacheval
}

