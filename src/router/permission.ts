/**
 * @name permission
 * @description 全局路由过滤、权限过滤
 */

import { router } from '.'
import { getToken } from '../utils/auth'
import { usePermissioStoreWithOut } from '@/stores/modules/permission'

const permissioStore = usePermissioStoreWithOut()
const whiteList = ['/login'] // no redirect whitelist

// 获取开始时间
let startTime = Date.now()
localStorage.setItem('time', JSON.stringify(startTime))

router.beforeEach(async (to: any, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    // 已登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      let currentTime = Date.now()
      const prePage_browTime = parseInt(String((currentTime - startTime) / 1000)) + 's'
      // 用户由${String(from.name)}页面跳转到${to.name}
      console.log(
        `上报页面埋点: 停留时间-停留了${currentTime - startTime}毫秒,转换成秒数约为:${prePage_browTime}`,
      )
      console.log(`埋点key: ${String(from.name)}页面`)
      console.log(`${to.name}页面浏览次数+1`)
      //每次都要初始化一下 startTime
      startTime = Date.now()
      localStorage.setItem('time', JSON.stringify(startTime))

      //是否获取过用户信息
      const isGetUserInfo = permissioStore.getIsGetUserInfo
      if (isGetUserInfo) {
        next()
      } else {
        // 没有获取，请求数据
        // await permissioStore.fetchAuths()
        await permissioStore.mockReq()
        // 过滤权限路由
        const routes = await permissioStore.buildRoutesAction()
        // 404 路由一定要放在 权限路由后面
        routes.forEach((route) => {
          router.addRoute(route)
        })
        // hack 方法
        // 不使用 next() 是因为，在执行完 router.addRoute 后，
        // 原本的路由表内还没有添加进去的路由，会 No match
        // replace 使路由从新进入一遍，进行匹配即可
        next({ ...to, replace: true })
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login') // 这里可能需要携带重定向路由信息
    }
  }
})
