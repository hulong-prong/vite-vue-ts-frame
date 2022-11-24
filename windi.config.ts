/*
 * @Author: HULONG
 * @Date: 2022-11-24 11:15:20
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-24 11:17:36
 * @Description:
 */
import { defineConfig } from 'vite-plugin-windicss'
import typography from 'windicss/plugin/typography'
export default defineConfig({
  darkMode: 'class',
  plugins: [typography()],
})
