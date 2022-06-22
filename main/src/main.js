import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { subNavList } from './store/sub'
import { registerApp } from './util'

registerApp(subNavList) // 注册子应用列表,和开启微前端框架

createApp(App).use(router()).mount('#micro_web_main_app')
