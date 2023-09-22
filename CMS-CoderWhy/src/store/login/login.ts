import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAcount } from '@/types'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { mapManusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const userLoginStore = defineStore('login', {
  // 如何指定state的类型
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
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

      // 5. 获取角色部门列表
      const mainStore = useMainStore()
      mainStore.fetchEntireDateAction()

      // 动态路由
      const routes = mapManusToRoutes(userMenus) //映射所有的routes
      routes.forEach((route) => router.addRoute('main', route)) //将映射出的routes加到router中

      // 5. 页面跳转 (main页面)
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1. 用户刷新时，默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 刷新再次获取角色部门列表
        const mainStore = useMainStore()
        mainStore.fetchEntireDateAction()

        // 动态添加路由
        const routes = mapManusToRoutes(userMenus) //映射所有的routes
        routes.forEach((route) => router.addRoute('main', route)) //将映射出的routes加到router中
      }
    }
  }
})

export default userLoginStore
