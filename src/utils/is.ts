/*
 * @Author: HULONG
 * @Date: 2022-11-24 15:44:54
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-24 16:10:07
 * @Description:
 */
const toString = Object.prototype.toString
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}
export function isString(val: unknown): val is string {
  return is(val, 'String')
}
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}
