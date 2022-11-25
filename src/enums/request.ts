/*
 * @Author: HULONG
 * @Date: 2022-11-24 15:46:51
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-24 15:51:49
 * @Description:
 */

/**
 * 结果类型
 */
export enum ResultEnum {
  SUCCESS = 'SUCCESS',
  PARAM_ERROR = 'PARAM_ERROR',
  BIZ_ERROR = 'BIZ_ERROR',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TIMEOUT = 'TIMEOUT',
}

/**
 * 请求方式
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
/**
 * 请求体内容格式
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
