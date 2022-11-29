/*
 * @Author: HULONG
 * @Date: 2022-11-24 14:12:39
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 14:34:56
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
      component: () => import('/@/view/sys/Exception.vue'),
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
    component: () => import('/@/view/login/Index.vue'),
    meta: { title: '登录', hideMenu: true },
  },
  {
    path: '/',
    component: () => import('/src/layouts/Index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('/@/view/home/Index.vue'),
        meta: { title: '测试' },
      },
      {
        path: '/home2',
        component: () => import('/@/view/home/Index2.vue'),
        meta: { title: '测试2' },
      },
    ],
  },
]
