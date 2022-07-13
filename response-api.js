/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import axios from "axios"
const CancelToken = axios.CancelToken
export let cancelRequest

function objectToArray(obj, arr = []) {
    if (typeof obj === 'object') {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                objectToArray(obj[key], arr);
            } else {
                if (key !== 'code')
                    arr.push(obj[key]);
            }
        }
        return arr

    }
    arr.push(obj)
    return arr
}

export const Axios = axios

const responseApi = async (url, method, data, headerData = {}) => {
    if (!navigator.onLine)
        return {
            error: true,
            data: ["Oops! You're offline. Please check your network connection..."]
        }

    try {
        const res = await axios({
            method,
            url,
            data,
            headers: { ...headerData },
            cancelToken: new CancelToken(function executor(c) {
                cancelRequest = c;
            })
        })
        return { error: false, status: res.status, data: res.data?.data, message: objectToArray(res.data?.message), res: res.data }

    } catch (err) {
        let data
        if (err.response?.status === 500) {
            data = { status: err.response?.status, message: ['Something went wrong.'] }
        }
        else if (err.message === "Network Error") {
            data = { status: 408, message: ['Server is not responding.'] }
        } else if (err.response?.data.hasOwnProperty('message'))
            data = { status: err.response?.status, message: objectToArray(err.response?.data?.message) }
        else
            data = { status: err.response?.status, message: objectToArray(err.response?.data) }

        return { error: true, ...data, data: null }
    }

}

export default responseApi