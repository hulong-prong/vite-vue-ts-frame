/*
 * @Author: HULONG
 * @Date: 2022-11-24 10:25:29
 * @LastEditors: [you name]
 * @LastEditTime: 2022-11-29 09:48:20
 * @Description:
 */
import { createApp } from 'vue'
import './style.css'
import 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { steupStore } from './store'
import { transformMenusRoute } from '/@/router/guard/routeToMenus'
import { routes } from '/@/router/route/defineRoute'
import { router, steupRouter } from '/@/router'
import { setupRouterGuard } from '/@/router/guard'

const app = createApp(App)
steupStore(app)
steupRouter(app)
transformMenusRoute(routes)
setupRouterGuard(router)
app.mount('#app')
