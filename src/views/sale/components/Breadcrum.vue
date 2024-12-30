<template>
  <a-card :style="{ marginBottom: $style.long24 }">
    <div>
      <span v-for="(menu, index) in currentMenus" :key="menu?.name" class="menu">
        <span>{{ menu?.breadcrumbName }}</span>
        <span class="divider-line">{{ index == currentMenus.length - 1 ? '' : '/' }}</span>
      </span>
    </div>
    <a-breadcrumb :routes="routes">
      <template #separator>
        <LeftOutlined
          :style="{
            color: $style.colorblck,
            fontSize: $style.font18,
          }"
        />
      </template>
      <template #itemRender="{ route, paths }">
        <h2 v-if="routes.indexOf(route) === routes.length - 1" class="breadcrum">
          {{ route.breadcrumbName }}
        </h2>
        <router-link v-else :to="`${route.path}`">
          <h2 class="breadcrum">{{ route.breadcrumbName }}</h2>
        </router-link>
      </template>
    </a-breadcrumb>
  </a-card>
</template>
<script setup lang="ts">
type ImenuKeys = 'name' | 'path' | 'breadcrumbName'
type Imenu = {
  [key in ImenuKeys]: string
}
const propsData = withDefaults(defineProps<{ routes: Imenu[] }>(), {
  routes: () => [],
})
const routes = computed(() => propsData.routes)
const router = useRouter()
const currentMenus = computed(
  () =>
    router.currentRoute.value.matched
      .filter((item) => !['/', '/app'].includes(item.path))
      .map((item) => ({
        name: item.name,
        path: item.path,
        breadcrumbName: item.meta.title,
      })) as Imenu[],
)
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped>
.menu {
  font-size: $font-14;
  color: $color-menu;
  .divider-line {
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.45);
  }
}
.breadcrum {
  font-size: $font-18;
  font-weight: 600;
  line-height: 28px;
  color: $color-black;
  margin: $long-12 0;
}
</style>
