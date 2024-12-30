import type { RouteRecord, RouteRecordRaw } from 'vue-router'
// 过滤hideInMenu控制的不需要显示的菜单
export const filterHideMenu = (menuData: RouteRecord[] | RouteRecordRaw[]): RouteRecordRaw[] => {
  const filterHideMenus = menuData
    .map((item: RouteRecord | RouteRecordRaw) => {
      if (!item.name || item.meta?.hideInMenu) {
        return null
      }
      if (item && item.children) {
        if (
          item.children.some(
            (child: RouteRecord | RouteRecordRaw) => child.name && !child.meta?.hideInMenu,
          )
        ) {
          return {
            ...item,
            children: filterHideMenu(item.children),
          }
        }
        return {
          ...item,
          children: [],
        }
      }
      return {
        ...item,
        children: [],
      }
    })
    .filter((item) => item) as RouteRecordRaw[]
  return filterHideMenus
}
// 过滤在children里的路由放在children层级显示, 在router.getRoutes()的第一层级筛掉
export const matchMenu = (menuData: RouteRecordRaw[]): RouteRecordRaw[] => {
  let childPath: string[] = []
  menuData.forEach((item: RouteRecordRaw) => {
    if (item.children && item.children.length > 0) {
      item.children.forEach(({ path }) => childPath.push(path))
    }
  })
  return menuData.filter((item) => !childPath.includes(item.path))
}
