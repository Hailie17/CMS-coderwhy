import type { RouteRecordRaw } from 'vue-router'
function loadLocalRoutes() {
  // 动态路由
  const localRoutes: RouteRecordRaw[] = []
  // 1.读取router/main下的所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })
  // 2. 将加载的对象放到localRoutes里去
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapManusToRoutes(userMenus: any) {
  const localRoutes = loadLocalRoutes()
  // 3. 根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route) //类型缩小，因为route有可能为空
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 *根据路径去匹配需要显示的菜单
 * @param path 要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapRouteToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) return submenu
    }
  }
}
