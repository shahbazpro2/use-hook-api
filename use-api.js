/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const useApi = (apiFun, callback) => {
    const [state, setState] = useState({
        loading: false,
        error: null,
        data: null,
        message: null
    })

    useEffect(() => {
        if (apiFun) {
            processing(apiFun, callback)
        }
    }, [])

    const executeApi = async (fun, callback) => {
        if (fun) {
            processing(fun, callback)
        }

    }

    const processing = async (api, callback) => {
        setState({ ...state, loading: true })
        let res = null
        if (api instanceof Function)
            res = await api()
        else
            res = await api

        setState({
            loading: false,
            error: res.error,
            message: res.message,
            data: !res.error ? res.data : null
        })
        if (callback)
            callback(res)
    }
    const { data, message, error, loading } = state
    return [executeApi, { data, message, error, loading }]
}

export default useApi