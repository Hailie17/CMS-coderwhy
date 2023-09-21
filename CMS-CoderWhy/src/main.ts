import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import store from './store'
import App from './App.vue'
import registerIcons from './global/register-icons'
// 全局引入elementplus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)
import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
app.use(registerIcons)
app.use(store)
app.use(router)
app.mount('#app')
