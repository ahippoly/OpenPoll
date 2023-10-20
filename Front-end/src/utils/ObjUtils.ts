export function clone<T> (obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function stringifyObject (obj: any): string {
  return JSON.stringify(obj, null, 2)
}
