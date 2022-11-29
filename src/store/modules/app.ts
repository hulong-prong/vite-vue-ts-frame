/*
 * @Author: HULONG
 * @Date: 2022-11-28 17:08:35
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 14:23:59
 * @Description:
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { store } from '/@/store'
let timeId: TimeoutHandle

export const useAppStore = defineStore('app-set', () => {
  const loading = ref(false)
  const setLoading = (load: boolean) => {
    loading.value = load
  }
  const setPageLoadingAction = async (load: boolean): Promise<void> => {
    if (load) {
      clearTimeout(timeId)
      // Prevent flicker
      timeId = setTimeout(() => {
        setLoading(load)
      }, 50)
    } else {
      setLoading(load)
      clearTimeout(timeId)
    }
  }
  return {
    loading,
    setLoading,
    setPageLoadingAction,
  }
})

export const useAppStoreWithOut = () => useAppStore(store)
