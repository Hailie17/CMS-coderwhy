import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
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
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

//导航守卫
router.beforeEach((to) => {
  if (to.path === '/main') {
    // const token = localStorage.getItem(LOGIN_TOKEN)
    const token = localCache.getCache(LOGIN_TOKEN)
    if (!token) {
      return '/login'
    }
  }
})
export default router
