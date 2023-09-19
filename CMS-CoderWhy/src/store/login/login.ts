import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import type { IAcount } from '@/types'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

const userLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {}
  }),
  actions: {
    async loginAcountAction(account: IAcount) {
      // 1. 点击帐号登录，调用登录接口，获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 2. 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 3. 获取用户登陆的详细信息（role信息）
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      // 4. 页面跳转 (main页面)
      router.push('/main')
    }
  }
})

export default userLoginStore
