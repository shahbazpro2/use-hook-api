import React, { useEffect } from 'react'
import { useApi } from './hook/use-api'
import { getPocApi } from './api'

const Comp1 = () => {
    const [callApi, { data, loading, clearCache }] = useApi({ errMsg: true })


    console.log('comp1', data, loading)

    const onClick = () => {
        callApi(getPocApi(1))
    }

    const onClearCache = () => {
        clearCache()
    }

    return (
        <div>Comp1
            {data?.height}
            <button onClick={onClick}>Call1api</button>
            <button onClick={onClearCache}>clearCache1</button>
        </div>
    )
}

export default Comp1