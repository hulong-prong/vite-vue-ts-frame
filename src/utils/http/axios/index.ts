/*
 * @Author: HULONG
 * @Date: 2022-11-24 15:40:17
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-24 16:47:10
 * @Description:
 */
import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '/@/types/axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './Axios'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/request'
import { isString } from '/@/utils/is'
import { setObjToUrlParams, deepMerge } from '/@/utils'
import { joinTimestamp } from './helper'
/**
 * 从环境变量中获取代理前缀，和接口统一前缀
 */
const { VITE_GLOB_API_URL: proxyUrl, VITE_GLOB_API_URL_PREFIX: prefixUrl } = import.meta.env
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 请求结果处理
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 是否需要错误处理 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回
    const { data } = res
    if (!data) {
      throw new Error('请求出错，请稍候重试')
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result, message, subMessage, subCode } = data

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      return result
    }
    //TODO 响应异常处理
  },

  // 请求发起之前处理数据
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options
    if (joinPrefix) {
      config.url = `${prefixUrl}${config.url}`
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    //TODO 追加token
    return config
  },
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptorsCatch(error: any) {
    //TODO 请求错误处理
    return Promise.reject(error)
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    //TODO 响应拦截处理数据
    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时'
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常'
      }

      if (errMessage) {
        //TODO 异常处理可以
        return Promise.reject(error)
      }
    } catch (error: any) {
      throw new Error(error)
    }
    //TODO 根据状态码，响应错误
    return Promise.reject(error)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: 60 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,
        // 接口可能会有通用的地址部分，可以统一抽取出来
        urlPrefix: prefixUrl,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: proxyUrl,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  )
}
export const defHttp = createAxios()
