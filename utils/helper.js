export const isEmpty = (data) => {
  const isEmptyPrimitive = typeof data === 'undefined' || data === null || data === '' || data === undefined
  const isEmptyArray = !isEmptyPrimitive && Array.isArray(data) && data.length <= 0
  const isEmptyObject = !isEmptyArray && !isEmptyPrimitive && typeof data === 'object' && Object.keys(data).length <= 0
  return (isEmptyPrimitive || isEmptyArray || isEmptyObject)
}

export const useFetch = async (url) => {
  try {
    const response = await fetch(url, { method: 'GET' })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const keyExtractor = (a, b) => {
  return ({
    firstKey: a.name,
    secondKey: b.name
  })
}

export const sortComparator = (a, b, cb) => {
  const { firstKey, secondKey } = cb(a, b)
  if (firstKey < secondKey) {
    return -1
  } else if (firstKey > secondKey) {
    return 1
  } else { return 0 }
}

export const cardItemExtractor = ({ title, description, urlToImage }) => ({ title, description, image: urlToImage })
