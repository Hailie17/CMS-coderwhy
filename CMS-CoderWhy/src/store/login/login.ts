import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAcount } from '@/types'
import router from '@/router'
const LOGIN_TOKEN = 'login/token'

const userLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localStorage.getItem(LOGIN_TOKEN) ?? '',
    name: ''
  }),
  actions: {
    async loginAcountAction(account: IAcount) {
      // 1. 帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name

      // 2. 进行本地缓存
      localStorage.setItem(LOGIN_TOKEN, this.token)

      // 3. 页面跳转 (main页面)
      router.push('/main')
    }
  }
})

export default userLoginStore
