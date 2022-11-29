/*
 * @Author: HULONG
 * @Date: 2022-11-28 15:24:21
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 15:08:38
 * @Description:
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '..'

export const useUserStore = defineStore('user', () => {
  const userName = ref<string>()
  const token = ref<string>('测试数据')
  const setToken = (targetToken: string) => {
    token.value = targetToken
  }
  const setUserName = (name: string) => {
    userName.value = name
  }
  const resetAllState = () => {
    userName.value = ''
    token.value = ''
  }
  return {
    token,
    userName,
    setToken,
    setUserName,
    resetAllState,
  }
})
export const useUserStoreWithOut = () => useUserStore(store)
