/*
 * @Author: HULONG
 * @Date: 2022-11-24 14:12:39
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-28 16:52:14
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router'
export const LOGINNAME = 'login'
export const defaultRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: () => import('/@/layouts/Index.vue'),
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: () => import('/@/views/sys/Exception.vue'),
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: LOGINNAME,
    component: () => import('/@/view/login/index.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/',
    component: () => import('../../components/layouts/Index.vue'),
  },
]
