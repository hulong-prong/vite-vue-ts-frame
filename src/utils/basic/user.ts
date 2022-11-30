/*
 * @Author: HULONG
 * @Date: 2022-09-27 13:35:51
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-30 10:35:51
 * @Description:
 */
import { useRequest } from 'vue-request'
import { useRouter } from 'vue-router'
import { logoutApi } from '/@/api/login'
import { PageEnum } from '/@/enums/page'
import { useUserStoreWithOut } from '/@/store/modules/user'

const clearUserInfo = () => {
  const userStore = useUserStoreWithOut()
  userStore.resetAllState()
  sessionStorage.clear()
}
/**
 * 退出登录
 */
export const doLogout = async () => {
  const Router = useRouter()
  const userStore = useUserStoreWithOut()
  if (userStore.token) {
    await useRequest(logoutApi)
  }
  clearUserInfo()
  Router.push(PageEnum.BASE_LOGIN)
}
