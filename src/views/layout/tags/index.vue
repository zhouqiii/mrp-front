<template>
  <a-tabs
    v-model:activeKey="activeKey"
    hide-add
    type="editable-card"
    @edit="onEdit"
    @change="onChange"
    class="tags"
  >
    <a-tab-pane v-for="pane in panes" :key="pane.path" :tab="pane.title"> </a-tab-pane>
  </a-tabs>
</template>
<script setup lang="ts">
import { cloneDeep } from 'lodash'
import { useApplication } from '@/stores/modules/app'
import type { Itags } from '@/stores/modules/app'
import { getTagsVisit, setTagsVisit, removeSessionY } from '@/utils/auth'

// 主页看板路由信息
const HOME_PAGE_ROUTE = reactive<Itags>({
  title: '看板',
  path: '/home',
  fullPath: '/home',
  query: {},
  meta: {
    title: '看板',
    icon: 'DesktopOutlined',
    auth: ['home'],
  },
})
const router = useRouter()
const application = useApplication()

const panes = computed(() => application.tagsVisit)
const activeKey = computed(() => application.tagsActive)
// tab页签切换时触发
const onChange = (activeKey: string) => {
  router.push({ path: activeKey })
  application.setTagsActive(activeKey)
}
// tab页签删除时触发的回调
const onEdit = (targetKey: string) => {
  if (targetKey == '/home') {
    return
  }
  // targetKey是path tagsKey是路由 name
  // 我的路由name 都是以path去/符号命名的 所以这里这样识别删除
  const routename = targetKey.replace(/\//g, '')
  application.delTagsVisit(targetKey)
  removeSessionY(routename) // 当前页面会话存储的scroll清除
  router.push({ path: activeKey.value })
}
// 本地保存标签记录, 防止刷新后消失
const localSave = async () => {
  const tsgsVisit = panes.value.map(({ title, path, query, fullPath, meta }) => ({
    title,
    path,
    query,
    fullPath,
    meta,
  }))
  setTagsVisit(tsgsVisit)
}
// 将当前路由格式成Itags形式
const formatSaveRoute = (route: any) => {
  const { title, path, fullPath, meta, query } = route
  return {
    title,
    path,
    fullPath,
    meta,
    query,
  }
}
// 切换tags的时候设置对应的浏览器标题
const setDocumentTitle = (route: any) => {
  const title: string = route.meta.title || route.title || 'no-name'
  document.title = title
}
// 当前路由和local里路由对比，执行对应的添加页签和缓存操作
// 1.向state添加或者更新格式路由 2.向local添加当前路由 3.添加或者删除当前路由的时候都需要修改activeKey的state和local 4.修改document
const handleAddTagFromRouteChange = async () => {
  const currentRouteVal = router.currentRoute.value
  let currentRoute = formatSaveRoute(currentRouteVal)
  const localeTagsVisit: Itags[] = JSON.parse(getTagsVisit() || '[]')
  const targetRoute = localeTagsVisit?.find((item) => currentRoute.fullPath === item.fullPath) || {}
  currentRoute = { ...currentRoute, ...targetRoute }
  // 拿到当前格式化之后的路由信息，执行添加页签操作和缓存操作
  if (currentRoute) {
    const route = { ...currentRouteVal, ...currentRoute }
    setDocumentTitle(route)
    await application.addTagsVisit(route)
    await localSave()
    // initTags()
  }
}
// 将home看板页面路由挂在tags上
const initTags = () => {
  let localTagsVisit: Itags[] = JSON.parse(getTagsVisit() || '[]')
  // 默认添加主页标签
  if (!localTagsVisit || localTagsVisit.length < 1) {
    localTagsVisit = [cloneDeep(HOME_PAGE_ROUTE)]
    application.setTagsVisit(localTagsVisit)
  } else {
    // 有缓存的tag信息，检查有没有包含主页
    if (!localTagsVisit.some((view) => view.path === '/home')) {
      localTagsVisit.unshift(cloneDeep(HOME_PAGE_ROUTE))
    }
    application.setTagsVisit(localTagsVisit)
  }
}
// 监听路由变化
watch(
  () => router.currentRoute.value.path,
  (val) => handleAddTagFromRouteChange(),
  {
    immediate: true,
    deep: true,
  },
)
</script>
<style lang="scss" scoped>
::v-deep .ant-tabs-tab-active {
  background: $color-backround !important;
}
::v-deep .ant-tabs {
  background: $color-white;
}
::v-deep .ant-tabs-nav {
  margin-bottom: 0px;
  background: $color-white !important;
  .ant-tabs-tab {
    background: $color-white;
  }
}

// .tags-list {
//   position: absolute;
// }
</style>
