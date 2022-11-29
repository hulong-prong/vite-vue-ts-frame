<!--
 * @Author: HULONG
 * @Date: 2022-09-26 11:06:18
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 10:54:59
 * @Description: 
-->
<template>
  <LayoutSider :collapsed="collapsed" :trigger="null" collapsible class="z-500">
    <div
      class="logo h-[50px] leading-[30px] flex p-[10px] overflow-hidden items-center"
      :class="[collapsed ? 'justify-center' : '']"
    >
      <img class="w-[30px]" :src="logo" alt="logo" />
      <span v-if="!collapsed" class="text-light-50 ml-[16px] text-[16px]"
        >License授权</span
      >
    </div>
    <Menu></Menu>
  </LayoutSider>
</template>

<script lang="ts" setup>
import { LayoutSider } from 'ant-design-vue'
import Menu from './Menu.vue'
import logo from '/@/assets/logo.png'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" scoped></style>
