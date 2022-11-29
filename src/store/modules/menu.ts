import { store } from '../index'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type menuType = {
  name: string
  path: string
  key: string
  children?: menuType[]
  icon?: string
}
export const useMenuStore = defineStore('menu', () => {
  const menuList = ref<menuType[]>([])
  function setMenu(menus: menuType[]) {
    menuList.value = menus
  }
  return {
    menuList,
    setMenu,
  }
})
export const useMenuStoreWithOut = () => {
  return useMenuStore(store)
}
