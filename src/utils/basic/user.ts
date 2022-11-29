/*
 * @Author: HULONG
 * @Date: 2022-09-27 13:35:51
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 10:04:38
 * @Description:
 */
// import { useRequest } from 'vue-request'
import { useRequest } from 'vue-request'
import { useRouter } from 'vue-router'
import { logoutApi } from '/@/api/login'
import { PageEnum } from '/@/enums/page'
import { useUserStore } from '/@/store/modules/user'

const clearUserInfo = () => {
  const userStore = useUserStore()
  userStore.resetAllState()
  sessionStorage.clear()
}
/**
 * 退出登录
 */
export const doLogout = async () => {
  const Router = useRouter()
  const userStore = useUserStore()
  if (userStore.token) {
    await useRequest(logoutApi)
  }
  clearUserInfo()
  Router.push(PageEnum.BASE_LOGIN)
}
