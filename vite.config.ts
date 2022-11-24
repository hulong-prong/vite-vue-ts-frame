/*
 * @Author: HULONG
 * @Date: 2022-11-24 10:25:29
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-24 13:59:36
 * @Description:
 */
import { ConfigEnv, defineConfig, UserConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import pluginJSX from '@vitejs/plugin-vue-jsx'
import tailWind from 'vite-plugin-windicss'
import pluginEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build' ? true : false
  return {
    resolve: {
      alias: {
        '/@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: { javascriptEnabled: true },
      },
    },
    server: {
      host: true,
      port: 8080,
      open: true,
    },
    build: {
      target: 'es2015',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1024 * 2,
    },
    esbuild: {
      drop: isBuild ? ['console', 'debugger'] : undefined,
    },
    plugins: [
      vue(),
      pluginJSX(),
      tailWind(),
      pluginEslint({
        include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      }),
    ],
  }
})
