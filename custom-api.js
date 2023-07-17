/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */

import objectToArray from "./objectToArray.js";
export let cancelRequest;

export const apiResStructure = {
  errKey: "message",
  dataKey: "data",
};

const allKeysExist = (obj, keys = []) => {
  return keys.every((key) => {
    if (typeof key === "string") {
      const subKeys = key.split("||");
      return subKeys.some((subKey) => obj?.hasOwnProperty(subKey.trim()));
    }
    return false;
  });
};

const customApi = (fun) => {
  const { errKey, dataKey } = apiResStructure;
  return async function apiFun() {
    try {
      const res = await fun;
      if (res?.error)
        throw {
          response: {
            status: res?.status,
            data: res?.error,
          },
        };

      if (allKeysExist(res.data, [`${dataKey}||data`, `${errKey}||message`]))
        return {
          error: false,
          status: res.status,
          data: res.data?.[dataKey] || res.data?.data,
          message: objectToArray(res.data?.[errKey] || res.data?.message),
          fullRes: res.data,
        };
      else if (allKeysExist(res.data, [`${errKey}||message`]))
        return {
          error: false,
          status: res.status,
          data: res.data,
          message: objectToArray(res.data?.[errKey] || res.data?.message),
          fullRes: res.data,
        };
      else if (allKeysExist(res.data, [`${dataKey}||data`]))
        return {
          error: false,
          status: res.status,
          data: res.data?.[dataKey] || res.data?.data,
          message: objectToArray(res.data?.[dataKey] || res.data?.data),
          fullRes: res.data,
        };
      else
        return {
          error: false,
          status: res.status,
          data: res.data,
          message: objectToArray(res.data),
          fullRes: res.data,
        };
    } catch (err) {
      let data;
      if (err.response?.status === 500) {
        data = {
          status: err.response?.status,
          message: ["Something went wrong."],
        };
      } else if (err.message === "Network Error") {
        data = { status: 408, message: ["Server is not responding."] };
      } else if (allKeysExist(err.response?.data, [`${errKey}||message`]))
        data = {
          status: err.response?.status,
          message: objectToArray(
            err.response?.data?.[errKey] || err.response?.data?.message
          ),
        };
      else if (allKeysExist(err.response?.data, [`${dataKey}||data`]))
        data = {
          status: err.response?.status,
          message: objectToArray(
            err.response?.data?.[dataKey] || err.response?.data?.data
          ),
        };
      else
        data = {
          status: err.response?.status,
          message: objectToArray(err.response?.data),
        };

      return { error: true, ...data, data: null, fullRes: err.response?.data };
    }
  };
};

export default customApi;
