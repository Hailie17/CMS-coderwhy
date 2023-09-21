import { createPinia } from 'pinia'
import type { App } from 'vue'
import userLoginStore from './login/login'
const pinia = createPinia()

function registerStore(app: App<Element>) {
  // 1. use pinia
  app.use(pinia)
  //   2.加载本地数据
  const loginStore = userLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
