import { defHttp } from '/@/utils/http/axios'

/*
 * @Author: HULONG
 * @Date: 2022-11-29 10:05:56
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-30 10:57:22
 * @Description:
 */
enum Api {
  login = '/login',
  logout = '/logout',
}

export const loginApi = (params: { username: string; password: string }) => {
  return defHttp.post({ url: Api.login, data: params })
}
