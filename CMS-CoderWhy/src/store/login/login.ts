import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAcount } from '@/types'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const userLoginStore = defineStore('login', {
  // 如何指定state的类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAcountAction(account: IAcount) {
      // 1. 点击帐号登录，调用登录接口，获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2. 获取用户登陆的详细信息（role信息）
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3. 根据用户角色请求用户权限（menus）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4. 进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      // 5. 页面跳转 (main页面)
      router.push('/main')
    }
  }
})

export default userLoginStore
