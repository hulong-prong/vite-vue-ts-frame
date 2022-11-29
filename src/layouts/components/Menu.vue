<!--
 * @Author: HULONG
 * @Date: 2022-09-26 11:13:03
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 11:05:05
 * @Description: 
-->
<template>
  <Menu theme="dark" mode="inline" :selectedKeys="selectKeys">
    <MenuItem
      v-for="menu in menuLists"
      :key="menu.key"
      @click="handleClick(menu.path, menu.key)"
    >
      <template #icon><i class="iconfont" :class="menu.icon"></i></template
      ><span>{{ menu.name }}</span>
    </MenuItem>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuItem } from 'ant-design-vue'
import { useMenuStore } from '/@/store/modules/menu'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const menuStore = useMenuStore()
// 获取根据route转化过来的菜单
const menuLists = menuStore.menuList
const selectKeys = reactive<string[]>([])
const router = useRouter()
// 获取当前路由下的key
const currentRoutePath = (router.currentRoute.value.name ??
  menuLists[0].name) as string
// 设置当前选中的菜单
selectKeys.push(currentRoutePath)
/**
 * @description: 点击切换路由和选中的menu
 * @param {*} path
 * @param {*} key
 * @return {*}
 */
const handleClick = (path: string, key: string) => {
  router.push(path)
  selectKeys.splice(0, 1, key)
}
</script>
