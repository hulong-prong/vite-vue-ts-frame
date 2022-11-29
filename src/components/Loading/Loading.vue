<!--
 * @Author: HULONG
 * @Date: 2022-09-26 11:23:37
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 14:15:11
 * @Description: 
-->
<template>
  <section class="full-loading" :class="{ absolute }">
    <Spin
      v-bind="$attrs"
      wrapperClassName="loading_box"
      :tip="tip"
      :size="size"
      :spinning="loading"
    >
      <slot></slot>
    </Spin>
  </section>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Spin } from 'ant-design-vue'
defineProps({
  tip: {
    type: String,
    default: '',
  },
  absolute: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  background: {
    type: String as PropType<string>,
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  delay: {
    type: Number,
    default: 200,
  },
})
</script>

<style lang="less" scoped>
.full-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  width: 100%;
  height: 100%;
  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 300;
  }
  .loading_box {
    height: 100%;
  }
}
:deep(.ant-spin-nested-loading > div > .ant-spin) {
  max-height: none;
}
</style>
