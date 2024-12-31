<template>
  <div>
    <Breadcrumb :routes="breadcrumb" />
    <a-card>
      <div class="btn-groups">
        <one-button>Default</one-button>
        <one-button type="primary" disabled>Primary</one-button>
        <one-button type="danger" plain>Danger</one-button>
        <one-button type="success" icon="add">Success</one-button>
        <one-button type="warning" round>Warning</one-button>
      </div>
    </a-card>
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
<style lang="scss" scoped>
.btn-groups {
  @include flex-row();
}
</style>
