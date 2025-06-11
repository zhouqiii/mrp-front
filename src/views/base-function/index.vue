<template>
  <div>
    <el-card style="max-width: 480px">
      <template v-for="item in testContentList">
        <AutoTooltip :content-text="item" />
      </template>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import AutoTooltip from '@/components/OptimizeTooltip/index.vue'
const testContentList = ref<string[]>([
  '这是一段超长长长长长长长长长长长长长长长长文本',
  '这是一段短文本',
  '这是一段超长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长文本',
])
</script>
