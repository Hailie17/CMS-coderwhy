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
      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route) //类型缩小，因为route有可能为空
      }
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

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射到id列表
 * @param menuList
 */
export function mapManusToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }

  recurseGetId(menuList)

  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单列表
 * @returns 权限数组
 */
export function mapMenusListToPermissions(menuList: any[]) {
  const permissions: string[] = []
  //递归
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      //按钮权限在第三级
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        //item.children有可能为null或undefined会报错，赋值为[]不会遍历也不会报错
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return permissions
}
