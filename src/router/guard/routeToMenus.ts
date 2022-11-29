/*
 * @Author: HULONG
 * @Date: 2022-11-28 15:21:51
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-28 15:21:51
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'
import { menuType } from '/@/store/modules/menu'
import { useMenuStore } from '/@/store/modules/menu'

const menuStore = useMenuStore()
// 通过router转化为menu
const setMenuByRoutes = (routerList: RouteRecordRaw[]): menuType[] => {
  const menus: menuType[] = []
  routerList.forEach((route) => {
    if (!route.meta?.hideMenu) {
      const targetMenu: menuType = {
        name: (route.meta?.title ?? route.name) as string,
        path: route.path,
        icon: route.meta?.icon as string,
        key: route.name as string,
      }
      if (route.children?.length) {
        targetMenu.children = setMenuByRoutes(route.children)
      }
      if (route.path === '/' && route.redirect && targetMenu.children) {
        menus.push(...targetMenu.children)
      } else {
        menus.push(targetMenu)
      }
    }
  })
  return menus
}

export const transformMenusRoute = (routerList: RouteRecordRaw[]) => {
  const targetMenus = setMenuByRoutes(routerList)
  menuStore.setMenu(targetMenus)
}
