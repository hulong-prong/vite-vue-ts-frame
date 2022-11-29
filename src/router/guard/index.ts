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
    appStore.setLoading(true)
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
  createPageLoadingGuard(router)
  pageCheckToken(router)
  loginPageReset(router)
}
