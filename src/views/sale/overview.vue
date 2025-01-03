<template>
  <div>
    <Breadcrumb :routes="breadcrumb" />
    <a-card>
      <a-row justify="start" :gutter="16">
        <a-col class="gutter-row" :span="3">
          <one-button>Default</one-button>
        </a-col>
        <a-col class="gutter-row" :span="3">
          <one-button type="primary" disabled>Primary</one-button>
        </a-col>
        <a-col class="gutter-row" :span="3">
          <one-button type="danger" plain>Danger</one-button>
        </a-col>
        <a-col class="gutter-row" :span="3">
          <one-button type="success" icon="add">Success</one-button>
        </a-col>
        <a-col class="gutter-row" :span="3">
          <one-button type="warning" round>Warning</one-button>
        </a-col>
      </a-row>
      <div class="tips-group">
        <p>一些提示框</p>
        <a-row justify="start" :gutter="16">
          <a-col class="gutter-row" :span="3">
            <one-button type="primary" @click="handleNotify">Notification</one-button>
          </a-col>
          <a-col class="gutter-row" :span="3">
            <one-button type="primary" @click="handleMessage">Message</one-button>
          </a-col>
          <a-col class="gutter-row" :span="3">
            <one-button type="primary" @click="handleMessageHTML">MessageHTML</one-button>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './components/Breadcrum.vue'
type ImenuKeys = 'name' | 'path' | 'breadcrumbName'
import { useMessage } from '@/hooks/useMessage'
type Imenu = {
  [key in ImenuKeys]: string
}
const { name, path, meta } = useRoute()
const { notification, myMessage } = useMessage()

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
const handleNotify = () => {
  notification.success({ message: '成功通知' })
}
const handleMessage = () =>
  myMessage({
    type: 'info',
    content: '提示信息',
    duration: 10000000,
  })
const handleMessageHTML = () =>
  myMessage({
    type: 'warn',
    content: '<strong>这是HTML片段</strong>',
    dangerouslyUseHTMLString: true,
  })
</script>
<style lang="scss" scoped>
.tips-group {
  margin: $size-small-2 0;
}
</style>
