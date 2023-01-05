import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import '@/global/global.css'

createApp(App).use(store).use(router).mount('#app')
