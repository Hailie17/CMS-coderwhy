import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import App from './App.vue'
import pinia from './store'
import registerIcons from './global/register-icons'
// 全局引入elementplus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount('#app')
