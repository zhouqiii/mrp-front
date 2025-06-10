<template>
  <a-layout-sider
    width="200"
    :style="{
      position: 'fixed',
      left: 0,
      top: '50px',
      bottom: 0,
    }"
    theme="dark"
    v-model:collapsed="collapsed"
  >
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      @openChange="(keys: any[]) => (state.openKeys = keys)"
      @select="onSelect"
      theme="dark"
      mode="inline"
      :style="{
        overflow: 'auto',
        height: 'calc(100vh - 90px)',
        borderRight: 0,
        paddingBottom: '24px',
      }"
      class="menu"
    >
      <!--layout sider 折叠隐藏文字是通过.anticon+span实现的-->
      <template v-for="item in menuData">
        <a-sub-menu v-if="item.children && item.children.length" :key="item.path">
          <template #title>{{ item.meta?.title }}</template>
          <template #icon><component :is="item.meta?.icon" /></template>
          <a-menu-item v-for="child in item.children" :key="child.path">
            {{ child.meta?.title }}
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.path + ''"
          ><template #icon><component :is="item.meta?.icon" /></template
          >{{ item.meta?.title }}</a-menu-item
        >
      </template>
    </a-menu>
    <component
      :is="collapsed ? 'MenuFoldOutlined' : 'MenuUnfoldOutlined'"
      class="sider-collapse"
      @click="changeCollapse"
    />
  </a-layout-sider>
</template>
<script lang="ts" setup>
import { filterHideMenu, matchMenu } from '@/views/layout/utils/index'
import { router } from '@/router'
import { useApplication } from '@/stores/modules/app'

interface Istate {
  selectedKeys: string[] // 当前选中的菜单项 key 数组
  openKeys: any[] // 当前展开的 SubMenu 菜单项 key 数组
}

const route = useRouter()
const applicationStore = useApplication()
const collapsed = computed(() => applicationStore.siderCollapse)

let state: Istate = reactive({
  selectedKeys: [],
  openKeys: [],
})

const menuData = matchMenu(
  filterHideMenu(route.getRoutes()).filter(
    (menu) => !['/login'].includes(menu.path) && menu.path !== '/',
  ),
)
// 点击menu菜单跳转menuitem指定的key路由
const onSelect = (e: { key: string; item: { props: { routeid: number } } } | any) => {
  router.push(e.key)
}
// 点击将sider collapse置反，切换侧边栏的折叠与展开
const changeCollapse = () => {
  applicationStore.setSiderCollapse(true)
}
watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat()
    state.selectedKeys = matched.map((r) => r.path)
    state.openKeys = matched
      .filter((r) => r.path !== router.currentRoute.value.path)
      .map((r) => r.path)
  }
})
const { run } = useDebounceFn(
  () => {
    applicationStore.setSiderCollapse(false, true)
  },
  {
    wait: 300,
  },
)
// 屏幕resize的hooks事件
useEventListener('resize', () => {
  const pageWidth = document.body.offsetWidth
  if (pageWidth < 1020) {
    run()
  }
})
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style scoped lang="scss">
.sider-collapse {
  border-top: 1px solid #002140;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0px;
  height: 40px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  background: #002140;
  color: #fff;
}
</style>
