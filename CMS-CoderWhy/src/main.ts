import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import App from './App.vue'

createApp(App).use(router)
createApp(App).mount('#app')
