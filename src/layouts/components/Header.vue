<!--
 * @Author: HULONG
 * @Date: 2022-09-26 11:05:38
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 11:04:26
 * @Description: 
-->
<template>
  <LayoutHeader
    class="flex justify-between items-center px-[16px] bg-white h-[48px]"
  >
    <MenuUnfoldOutlined
      v-if="collapsed"
      class="trigger"
      @click="changeCollapsed"
    />
    <MenuFoldOutlined v-else class="trigger" @click="changeCollapsed" />
    <div class="cursor-pointer min-w-[80px]">
      <Dropdown placement="bottomRight">
        <div
          class="px-[10px] cursor-pointer h-[44px] leading-[44px] hover:bg-gray-300"
        >
          {{ userName }}
        </div>
        <template #overlay>
          <Menu class="min-w-[120px]" @click="handleMenuClick">
            <MenuItem key="logout"> 退出系统 </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </LayoutHeader>
</template>

<script lang="ts" setup>
import {
  LayoutHeader,
  Dropdown,
  Menu,
  MenuItem,
  MenuProps,
} from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
// import { doLogout } from '/@/utils/basic/actions'
import { useUserStore } from '/@/store/modules/user'
import { storeToRefs } from 'pinia'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['changeCollapsed'])
/**
 * @description: 修改菜单状态
 * @return {*}
 */
const changeCollapsed = () => {
  emit('changeCollapsed')
}
/**
 * @description: 点击菜单
 * @return {*}
 */
const handleMenuClick: MenuProps['onClick'] = (e) => {
  switch (e.key) {
    case 'logout':
      // doLogout()
      break
    default:
      break
  }
}

const userStore = useUserStore()
const { userName } = storeToRefs(userStore)
</script>
