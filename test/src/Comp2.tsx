import React, { useEffect } from 'react'
import { useApi } from './hook/use-api'
import { getPocApi } from './api'

const Comp2 = () => {
    const [callApi, { data, loading, clearCache }] = useApi({ errMsg: true })

    const onClick = () => {
        callApi(getPocApi(2))
    }

    const onClearCache = () => {
        clearCache()
    }
    console.log('comp2', data, loading)
    return (
        <div>Comp2
            {data?.height}
            <button onClick={onClick}>Call2api</button>
            <button onClick={onClearCache}>clearCache2</button>
        </div>
    )
}

export default Comp2