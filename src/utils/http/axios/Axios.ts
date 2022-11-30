/*
 * @Author: HULONG
 * @Date: 2022-11-24 15:40:17
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-30 11:00:01
 * @Description:
 */
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import type { RequestOptions, Result, UploadFileParams } from '/@/types/axios'
import type { CreateAxiosOptions } from './axiosTransform'
import axios from 'axios'
import qs from 'qs'
import { isFunction } from '/@/utils/is'
import { cloneDeep, omit } from 'lodash-es'
import { ContentTypeEnum, RequestEnum } from '/@/enums/request'

export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions
  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }
  private getTransform() {
    return this.options.transform
  }
  /**
   * 设置拦截器
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        //TODO 处理
        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options)
        }
        return config
      },
    )

    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.axiosInstance.interceptors.request.use(
        undefined,
        requestInterceptorsCatch,
      )
    }
    this.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    })
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.axiosInstance.interceptors.response.use(
        undefined,
        responseInterceptorsCatch,
      )
    }
  }
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['content-type'] || headers?.['Content-Type']
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }
  // 请求
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    let consel: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()
    const { requestOptions } = this.options
    const targetOption = Object.assign({}, requestOptions, options)
    const { beforeRequestHook, transformResponseHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      consel = beforeRequestHook(consel, targetOption)
    }
    consel.requestOptions = targetOption
    consel = this.supportFormData(consel)
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(consel)
        .then((res: AxiosResponse<Result>) => {
          //TODO 结果处理
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const targetRes = transformResponseHook(res, targetOption)
              resolve(targetRes as unknown as Promise<T>)
            } catch (error) {
              reject(error || new Error('请求失败'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((error: Error) => {
          // TODO 可以做请求错误处理
          reject(error)
        })
    })
  }
  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' }, options)
  }
  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' }, options)
  }
  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' }, options)
  }
  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' }, options)
  }
  fileUpload<T = any>(
    config: AxiosRequestConfig,
    params: UploadFileParams,
  ): Promise<T> {
    const formData = new window.FormData()

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return
        const value = params.data[key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data[key])
      })
    }
    formData.append(params.name || 'file', params.file, params.filename)
    const customParams = omit(params, 'file', 'filename', 'file')

    Object.keys(customParams).forEach((key) => {
      formData.append(key, customParams[key])
    })
    return this.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    })
  }
}
