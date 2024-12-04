type ObjectToArray = {
  obj: any
  arr?: any[]
  tempKey?: any
  excludeErrorKeys: string[]
}

function isValidNumber(input: any) {
  if (typeof input === 'number' && !isNaN(input)) {
    return true
  }

  if (typeof input === 'string' && /^-?\d+(\.\d+)?$/.test(input.trim())) {
    return !isNaN(Number(input))
  }

  return false
}

function objectToArray({ obj = {}, arr = [], tempKey = null, excludeErrorKeys = [] }: ObjectToArray) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (typeof obj?.[i] === 'object') {
        if (!excludeErrorKeys.includes(tempKey)) objectToArray({ obj: obj[i], arr, tempKey, excludeErrorKeys })
      } else {
        if (
          tempKey &&
          typeof obj?.[i] === 'string' &&
          (obj?.[i].includes('This field') ||
            obj?.[i].includes('is required') ||
            obj?.[i].includes('is invalid') ||
            obj?.[i].includes('is not valid') ||
            obj?.[i].includes('choice'))
        ) {
          if (!excludeErrorKeys.includes(tempKey)) arr.push(`${tempKey}: ${obj?.[i] || obj}`)
        } else {
          if (!excludeErrorKeys.includes(tempKey)) arr.push(obj?.[i] || obj)
        }
      }
    }
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      if (!isValidNumber(key)) {
        tempKey = key
      }
      if (typeof obj[key] === 'object') {
        if (!excludeErrorKeys.includes(key)) objectToArray({ obj: obj[key], arr, tempKey, excludeErrorKeys })
      } else {
        if (
          key === 'icabbi_error' ||
          (typeof obj[key] === 'string' &&
            (obj[key].includes('This field') ||
              obj[key].includes('is required') ||
              obj[key].includes('is invalid') ||
              obj[key].includes('is not valid') ||
              obj[key].includes('choice')))
        ) {
          arr.push(`${tempKey}: ${obj[key]}`)
        } else if (key !== 'code' && !excludeErrorKeys.includes(key)) {
          arr.push(obj[key])
        }
      }
    }
  } else {
    if (!excludeErrorKeys.includes(tempKey)) arr.push(obj)
  }

  return arr
}

export default objectToArray
