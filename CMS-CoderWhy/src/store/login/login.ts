import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAcount } from '@/types'

const userLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localStorage.getItem('token') ?? '',
    name: ''
  }),
  actions: {
    async loginAcountAction(account: IAcount) {
      // 1. 帐号登录，获取token等信息
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name

      // 2。 进行本地缓存
      localStorage.setItem('token', this.token)
    }
  }
})

export default userLoginStore
