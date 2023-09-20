import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  //映射关系： path => components
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 1. 获取所有的路由
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   }
// ]
// 2. 动态的添加路由
// router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])

//导航守卫
router.beforeEach((to) => {
  // const token = localStorage.getItem(LOGIN_TOKEN)
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
})
export default router
