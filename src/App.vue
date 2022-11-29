<script setup lang="ts">
import { useUserStore } from './store/modules/user'
const userStore = useUserStore()
const handleSetToken = () => {
  userStore.setToken('设置新的token ')
}
</script>

<template>
  <div>
    <p>{{ userStore.token }}</p>
    <div @click="handleSetToken">点击操作</div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
