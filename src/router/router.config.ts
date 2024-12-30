import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import { KeepAlive } from 'vue'

export const accessRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: () => Layout,
    redirect: '/home',
    meta: { title: '管理平台' },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '看板',
          icon: 'DesktopOutlined',
          auth: ['home'],
          keepAlive: true,
        },
        component: () => import('@/views/signboard/index.vue'),
      },
      {
        path: '/procurement',
        name: 'procurement',
        component: () => import('@/views/procurement/index.vue'),
        meta: {
          title: '采购',
          icon: 'DollarOutlined',
          auth: ['procurement'],
          keepAlive: false,
        },
      },
      {
        path: '/sale',
        name: 'sale',
        meta: {
          title: '销售',
          icon: 'PicCenterOutlined',
          auth: ['sale'],
        },
        children: [
          {
            path: '/sale/overview',
            name: 'saleoverview',
            meta: {
              title: '销售总览',
              icon: 'PicCenterOutlined',
              auth: ['sale'],
            },
            component: () => import('@/views/sale/overview.vue'),
          },
          {
            path: '/sale/detail',
            name: 'saledetail',
            meta: {
              title: '销售明细',
              icon: 'PicCenterOutlined',
              auth: ['sale'],
            },
            component: () => import('@/views/sale/index.vue'),
          },
        ],
      },
      {
        path: '/inventory',
        name: 'inventory',
        meta: {
          title: '库存',
          icon: 'liulanqi',
          auth: ['inventory'],
          hideInMenu: true,
        },
        component: () => import('@/views/inventory/index.vue'),
      },
    ],
  },
]

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: { title: '登录' },
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/home',
    meta: {
      title: 'Root',
    },
  },
]

export const publicRoutes = [
  // 重定向组件配置了动态路由
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  // 兜底路由 (.*) 匹配任意路由 注意路由顺序
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = []

export default constantRoutes
