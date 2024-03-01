/* eslint-disable no-throw-literal */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */

import objectToArray from './objectToArray.js'
import { allKeysExist } from './response-api.js'

type apiResStructureType = {
  errKey: string
  dataKey: string
}

let customApiResStructure: apiResStructureType = {
  errKey: 'message',
  dataKey: 'data',
}

let customExcludeErrorKeys: string[] = []

export const setCustomExcludeErrorKeys = (keys: string[]) => {
  customExcludeErrorKeys = keys
}

export const setCustomApiResStructure = (structure: apiResStructureType) => {
  customApiResStructure = structure
}

const isFunc = (fun: any) => fun instanceof Function
const customApi = (fun: any) => {
  const { errKey, dataKey }: typeof customApiResStructure = customApiResStructure
  return async function apiFun() {
    try {
      let res: any = null
      if (isFunc(fun)) {
        res = await fun()
      } else {
        res = await fun
      }
      if (res?.error)
        throw {
          response: {
            status: res?.status,
            data: res?.error,
          },
        }

      if (allKeysExist(res.data, [`${dataKey}||data`, `${errKey}||message`]))
        return {
          error: false,
          status: res.status,
          data: res.data?.[dataKey] || res.data?.data,
          message: objectToArray({
            obj: res.data?.[errKey] || res.data?.message,
            excludeErrorKeys: customExcludeErrorKeys,
          }),
          fullRes: res.data,
        }
      else if (allKeysExist(res.data, [`${errKey}||message`]))
        return {
          error: false,
          status: res.status,
          data: res.data,
          message: objectToArray({
            obj: res.data?.[errKey] || res.data?.message,
            excludeErrorKeys: customExcludeErrorKeys,
          }),
          fullRes: res.data,
        }
      else if (allKeysExist(res.data, [`${dataKey}||data`]))
        return {
          error: false,
          status: res.status,
          data: res.data?.[dataKey] || res.data?.data,
          message: objectToArray({
            obj: res.data?.[dataKey] || res.data?.data,
            excludeErrorKeys: customExcludeErrorKeys,
          }),
          fullRes: res.data,
        }
      else
        return {
          error: false,
          status: res.status,
          data: res.data,
          message: objectToArray({ obj: res.data, excludeErrorKeys: customExcludeErrorKeys }),
          fullRes: res.data,
        }
    } catch (err: any) {
      let data
      if (err.response?.status === 500) {
        data = {
          status: err.response?.status,
          message: ['Something went wrong.'],
        }
      } else if (err.message === 'Network Error') {
        data = { status: 408, message: ['Server is not responding.'] }
      } else if (allKeysExist(err.response?.data, [`${errKey}||message`]))
        data = {
          status: err.response?.status,
          message: objectToArray({
            obj: err.response?.data?.[errKey] || err.response?.data?.message,
            excludeErrorKeys: customExcludeErrorKeys,
          }),
        }
      else if (allKeysExist(err.response?.data, [`${dataKey}||data`]))
        data = {
          status: err.response?.status,
          message: objectToArray({
            obj: err.response?.data?.[dataKey] || err.response?.data?.data,
            excludeErrorKeys: customExcludeErrorKeys,
          }),
        }
      else
        data = {
          status: err.response?.status,
          message: objectToArray({ obj: err.response?.data, excludeErrorKeys: customExcludeErrorKeys }),
        }

      return { error: true, ...data, data: null, fullRes: err.response?.data }
    }
  }
}

export default customApi
