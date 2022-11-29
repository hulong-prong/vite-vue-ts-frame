<!--
 * @Author: HULONG
 * @Date: 2022-09-26 11:05:23
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 11:09:01
 * @Description: 
-->
<template>
  <Layout class="h-full">
    <Slider :collapsed="collapsed"><Menu></Menu></Slider>
    <Layout>
      <Header
        :collapsed="collapsed"
        @changeCollapsed="changeCollapsed"
      ></Header>
      <Content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      ></Content>
      <Footer v-if="false"></Footer>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { Layout } from 'ant-design-vue'
import Content from './components/Content.vue'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
import Slider from './components/Sider.vue'
import { ref } from 'vue'

// 设置头部控制菜单收叠
const collapsed = ref(false)
/**
 * @description: 修改状态
 * @return {*}
 */
const changeCollapsed = () => {
  console.log('执行了的')
  collapsed.value = !collapsed.value
}
</script>
<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
