/*
 * @Author: HULONG
 * @Date: 2022-11-28 15:24:21
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-30 10:31:32
 * @Description:
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '..'
const token_key = 'OPS_CACHE_TOKEN'
export const catchToken = (token: string) => {
  if (token) {
    localStorage.setItem(token_key, token)
  } else {
    localStorage.removeItem(token_key)
  }
}
export const useUserStore = defineStore('user', () => {
  const userName = ref<string>()
  const token = ref<string>('')
  const setToken = (targetToken: string) => {
    token.value = targetToken
    catchToken(targetToken)
  }
  // 设置初始token
  const initToken = localStorage.getItem(token_key)
  initToken && setToken(initToken)
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
