<template>
  <div>
    <Breadcrumb :routes="breadcrumb" />
    <a-card>content......</a-card>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './components/Breadcrum.vue'
type ImenuKeys = 'name' | 'path' | 'breadcrumbName'
type Imenu = {
  [key in ImenuKeys]: string
}
const { name, path, meta } = useRoute()

let breadcrumb: Imenu[] = reactive([
  {
    name: name as string,
    path,
    breadcrumbName: typeof meta?.title === 'string' ? meta?.title : '',
  },
  {
    name: name as string,
    path,
    breadcrumbName: typeof meta?.title === 'string' ? meta?.title : '',
  },
])
</script>
