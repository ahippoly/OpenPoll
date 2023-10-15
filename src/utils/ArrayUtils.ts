
export const filterDuplicatesArrayObjectByProperty = (array: any[], property: string) => {
  const dataMap: {[key: string]: any} = {}

  array.forEach((item) => {
    const propertyValue = item[property]

    if (!propertyValue) return
    if (Object.prototype.hasOwnProperty.call(dataMap, propertyValue)) return

    dataMap[propertyValue] = item
  })

  return Object.values(dataMap)
}
