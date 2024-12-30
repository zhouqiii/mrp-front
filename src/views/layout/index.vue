<template>
  <a-layout>
    <AHeader />
    <a-layout class="lay-below">
      <Sidebar />
      <a-layout
        class="lay-below-right"
        :style="{
          marginLeft: marginLeft,
        }"
      >
        <TagsView />
        <ContentMain />
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import AHeader from './header/index.vue'
import Sidebar from './sider/index.vue'
import TagsView from './tags/index.vue'
import ContentMain from './ContentMain.vue'
import { useApplication } from '@/stores/modules/app'

const application = useApplication()
const marginLeft = computed(() => (application.siderCollapse ? '80px' : '200px'))
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style scoped lang="scss">
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.lay-below {
  padding-top: $long-50;
  .lay-below-right {
    position: relative;
    overflow: hidden;
  }
}
</style>
