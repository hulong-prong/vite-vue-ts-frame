/*
 * @Author: HULONG
 * @Date: 2022-11-28 17:03:27
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 14:32:36
 * @Description:
 */
import { Router } from 'vue-router'
import { LOGINNAME } from '../route/defineRoute'
import { PageEnum } from '/@/enums/page'
import { useAppStore } from '/@/store/modules/app'
import { useUserStore } from '/@/store/modules/user'

const pageCheckToken = (router: Router) => {
  router.beforeEach(async (to) => {
    if (to.name === LOGINNAME) return true
    const token = useUserStore().token
    if (!token) {
      return PageEnum.BASE_LOGIN
    }
    return true
  })
}

const loginPageReset = (router: Router) => {
  router.afterEach((to) => {
    if (to.path === PageEnum.BASE_LOGIN) {
      useUserStore()?.resetAllState()
    }
  })
}
const createPageGuard = (router: Router) => {
  const loadedPageMap = new Map<string, boolean>()
  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path)
    return true
  })
  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}
const createPageLoadingGuard = (router: Router) => {
  const userStore = useUserStore()
  const appStore = useAppStore()
  router.beforeEach(async (to) => {
    if (!userStore.token) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }
    appStore.setPageLoadingAction(true)
    return true
  })
  router.afterEach(async () => {
    setTimeout(() => {
      appStore.setLoading(false)
    }, 200)
    return true
  })
}

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  pageCheckToken(router)
  loginPageReset(router)
}
