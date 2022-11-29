/*
 * @Author: HULONG
 * @Date: 2022-11-28 17:08:35
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-28 17:12:17
 * @Description:
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '/@/store'

export const useAppStore = defineStore('app-set', () => {
  const loading = ref(false)
  const setLoading = (load: boolean) => {
    loading.value = load
  }
  return {
    loading,
    setLoading,
  }
})

export const useAppStoreWithOut = () => useAppStore(store)
