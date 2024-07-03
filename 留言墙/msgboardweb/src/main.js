import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import {createPinia} from "pinia"
//注册组件
import RMMNB from './components/yike/index.js'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(RMMNB)
app.mount('#app')
