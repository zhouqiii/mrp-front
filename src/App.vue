<script setup lang="ts">
import testApi from '@/api/test/test'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import './types/global.d.ts'
// 验证babel配置生效
new Promise(async (resolve) =>
  setTimeout(async () => {
    const res = await testApi.overviewlist({
      limit: 10,
      page: 1,
      model: '',
      algType: '',
      forecastId: '',
    })
    console.log('promise')
    console.log(res, 'testApi.overviewlist')
    resolve(1)
  }, 0),
)
</script>

<template>
  <div>
    <ConfigProvider :locale="zhCN">
      <router-view />
    </ConfigProvider>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
