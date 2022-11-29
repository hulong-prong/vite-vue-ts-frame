<!--
 * @Author: HULONG
 * @Date: 2022-09-23 17:25:54
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 10:48:16
 * @Description: 
-->
<template>
  <ConfigProvider :locale="locale">
    <div class="w-full h-full"><router-view /></div>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import locale from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
</script>
