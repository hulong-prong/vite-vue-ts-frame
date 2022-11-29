<!--
 * @Author: HULONG
 * @Date: 2022-09-26 11:06:38
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 14:16:19
 * @Description: 
-->
<script lang="ts" setup>
import { LayoutContent } from 'ant-design-vue'
import Loading from '/@/components/Loading/Loading.vue'
import { useAppStore } from '/@/store/modules/app'
const appStore = useAppStore()
</script>
<template>
  <LayoutContent class="relative">
    <Loading :absolute="true" :loading="appStore.loading" size="large">
      <div class="bg-white min-h-[360px]">
        <RouterView>
          <template #default="{ Component, route }">
            <transition
              enter-active-class="transition ease-out duration-300 transform"
              enter-from-class="-translate-x-100 opacity-0"
              enter-to-class="translate-x-0 opacity-100"
              leave-active-class="transition ease-in duration-300 transform"
              leave-from-class="transition ease-out duration-0 transform opacity-0"
              leave-to-class="transition ease-in duration-0 transform opacity-100"
              mode="out-in"
              appear
            >
              <div :key="route.fullPath">
                <component :is="Component" />
              </div>
            </transition>
          </template>
        </RouterView>
      </div>
    </Loading>
  </LayoutContent>
</template>
