/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const useApi = (apiFun, callback, errCallback) => {
    const [state, setState] = useState({
        loading: false,
        error: null,
        data: null,
        res: null,
        message: null
    })

    useEffect(() => {
        if (apiFun) {
            processing(apiFun, callback, errCallback)
        }
    }, [])

    const executeApi = async (fun, callback, errCallback) => {
        if (fun) {
            processing(fun, callback, errCallback)
        }

    }

    const processing = async (api, callback, errCallback) => {
        setState({ ...state, loading: true })
        let res = null
        if (api instanceof Function) res = await api()
        else res = await api
        if (res) {
            setState({
                loading: false,
                error: res.error,
                message: res.message,
                data: !res.error ? res.data : null,
                res: res.res
            })

            if (!res.error) {
                if (callback) callback(res)
            }
            if (res.error) {
                if (errCallback) errCallback(res)
            }
        }
    }
    return [executeApi, { ...state }]
}

export default useApi