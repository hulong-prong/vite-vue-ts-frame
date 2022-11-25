import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { defaultRoute, routes } from './route/defineRoute'

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: routes.concat(defaultRoute),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

//mount router
export function steupRouter(app: App) {
  app.use(router)
}
