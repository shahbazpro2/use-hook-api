import { getPocApi } from './api'
import { useApi } from './hook/use-api'

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