/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */

import objectToArray from './objectToArray.js'
import { allKeysExist } from './response-api.js'

export const apiResStructure = {
  errKey: 'message',
  dataKey: 'data',
}

export const excludeErrorKeys: string[] = []

const isFunc = (fun: any) => fun instanceof Function
const customApi = (fun: any) => {
  const { errKey, dataKey }: typeof apiResStructure = apiResStructure
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
            excludeErrorKeys,
          }),
        }
      else if (allKeysExist(err.response?.data, [`${dataKey}||data`]))
        data = {
          status: err.response?.status,
          message: objectToArray({ obj: err.response?.data?.[dataKey] || err.response?.data?.data, excludeErrorKeys }),
        }
      else
        data = {
          status: err.response?.status,
          message: objectToArray({ obj: err.response?.data, excludeErrorKeys }),
        }

      return { error: true, ...data, data: null, fullRes: err.response?.data }
    }
  }
}

export default customApi
