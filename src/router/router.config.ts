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
          title: '需求计划',
          icon: 'DollarOutlined',
          auth: ['procurement'],
          keepAlive: false,
        },
      },
      {
        path: '/screen',
        name: 'screen',
        component: () => import('@/views/mocklargescreen/entry.vue'),
        meta: {
          title: '一个入口',
          icon: 'DollarOutlined',
          auth: ['screen'],
          keepAlive: false,
        },
      },
      {
        path: '/departure',
        name: 'departure',
        meta: {
          title: '发车计划',
          icon: 'PicCenterOutlined',
          auth: ['departure'],
        },
        children: [
          {
            path: '/departure/customtable',
            name: 'customtable',
            meta: {
              title: '表格动态配置列',
              icon: 'PicCenterOutlined',
              auth: ['departure'],
            },
            component: () => import('@/views/departure/customtable.vue'),
          },
          {
            path: '/departure/formfillplan',
            name: 'formfillplan',
            meta: {
              title: '填报表-行列按需展示',
              icon: 'PicCenterOutlined',
              auth: ['departure'],
            },
            component: () => import('@/views/departure/formfill.vue'),
          },
          {
            path: '/departure/complexchart',
            name: 'complexchart',
            meta: {
              title: '达成率-复杂图',
              icon: 'PicCenterOutlined',
              auth: ['departure'],
            },
            component: () => import('@/views/departure/complexchart.vue'),
          },
        ],
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
          {
            path: '/sale/pdf',
            name: 'salepdf',
            meta: {
              title: '文件测试1',
              icon: 'PicCenterOutlined',
              auth: ['sale'],
            },
            component: () => import('@/views/sale/pdfview.vue'),
          },
          {
            path: '/sale/pdfcustomize',
            name: 'salepdfcustomize',
            meta: {
              title: '文件测试2',
              icon: 'PicCenterOutlined',
              auth: ['sale'],
            },
            component: () => import('@/views/sale/pdfCustomize.vue'),
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
  {
    path: '/screenshow',
    name: 'screenshow',
    component: () => import('@/views/mocklargescreen/plan.vue'),
    meta: {
      title: '大屏展示',
      icon: 'DollarOutlined',
      auth: ['screenshow'],
      keepAlive: false,
    },
  },
  {
    path: '/screenfuncshow',
    name: 'screenfuncshow',
    component: () => import('@/views/mocklargescreen/category.vue'),
    meta: {
      title: '大屏展示',
      icon: 'DollarOutlined',
      auth: ['screenshow'],
      keepAlive: false,
    },
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
