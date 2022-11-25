/*
 * @Author: HULONG
 * @Date: 2022-11-24 14:09:38
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-24 14:11:00
 * @Description:
 */
import { createPinia } from 'pinia'
import { App } from 'vue'
const store = createPinia()
export function steupStore(app: App) {
  app.use(store)
}
export { store }
