/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */

import axios from 'axios'
import objectToArray from './objectToArray.js'
const CancelToken = axios.CancelToken
export let cancelRequest: any = null
type apiResStructureType = {
  errKey: string
  dataKey: string
}

export const Axios = axios
let apiResStructure: apiResStructureType | null = null
const initialApiResStructure = {
  errKey: 'message',
  dataKey: 'data',
}

if (!apiResStructure) {
  apiResStructure = initialApiResStructure
}

let excludeErrorKeys: string[] = []

export const setExcludeErrorKeys = (keys: string[]) => {
  excludeErrorKeys = keys
}

export const setApiResStructure = (structure: apiResStructureType) => {
  apiResStructure = structure
}

export const allKeysExist = (obj: any, keys: any = []) => {
  return keys.every((key: any) => {
    if (typeof key === 'string') {
      const subKeys = key.split('||')
      return subKeys.some((subKey) => obj?.hasOwnProperty(subKey.trim()))
    }
    return false
  })
}

const ResponseApi = (url: string, method: string, data: any, headerData: any = {}) => {
  const { errKey, dataKey }: apiResStructureType = apiResStructure || initialApiResStructure
  return async function apiFun() {
    try {
      const res = await axios({
        method,
        url,
        data,
        headers: { ...headerData },
        cancelToken: new CancelToken(function executor(c) {
          cancelRequest = c
        }),
      })

      if (allKeysExist(res.data, [`${dataKey}||data`, `${errKey}||message`]))
        return {
          error: false,
          status: res.status,
          data: res.data?.[dataKey] || res.data?.data,
          message: objectToArray({ obj: res.data?.[errKey] || res.data?.message, excludeErrorKeys }),
          fullRes: res.data,
        }
      else if (allKeysExist(res.data, [`${errKey}||message`]))
        return {
          error: false,
          status: res.status,
          data: res.data,
          message: objectToArray({ obj: res.data?.[errKey] || res.data?.message, excludeErrorKeys }),
          fullRes: res.data,
        }
      else if (allKeysExist(res.data, [`${dataKey}||data`]))
        return {
          error: false,
          status: res.status,
          data: res.data?.[dataKey] || res.data?.data,
          message: objectToArray({ obj: res.data?.[dataKey] || res.data?.data, excludeErrorKeys }),
          fullRes: res.data,
        }
      else
        return {
          error: false,
          status: res.status,
          data: res.data,
          message: objectToArray({ obj: res.data, excludeErrorKeys }),
          fullRes: res.data,
        }
    } catch (err: any) {
      let data
      if (err.response?.status === 500) {
        data = { status: err.response?.status, message: ['Something went wrong.'] }
      } else if (err.message === 'Network Error') {
        data = { status: 408, message: ['Server is not responding.'] }
      } else if (allKeysExist(err.response?.data, [`${errKey}||message`]))
        data = {
          status: err.response?.status,
          message: objectToArray({
            obj: err.response?.data?.[errKey] || err.response?.data?.message,
            excludeErrorKeys,
          }),
        }
      else if (allKeysExist(err.response?.data, [`${dataKey}||data`]))
        data = {
          status: err.response?.status,
          message: objectToArray({ obj: err.response?.data?.[dataKey] || err.response?.data?.data, excludeErrorKeys }),
        }
      else
        data = { status: err.response?.status, message: objectToArray({ obj: err.response?.data, excludeErrorKeys }) }

      return { error: true, ...data, data: null, fullRes: err.response?.data }
    }
  }
}

export default ResponseApi
