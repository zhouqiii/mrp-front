<template>
  <div>
    <a-tooltip>
      <template #title>{{ action.label }}</template>
      <a-button
        :type="opeAuth() ? 'primary' : 'default'"
        :disabled="!opeAuth()"
        size="small"
        @click="handleEmit"
      >
        <template #icon>
          <component :is="action.icon" :class="opeAuth() ? 'has-auth' : 'dis-auth'"></component>
        </template>
      </a-button>
    </a-tooltip>
  </div>
</template>
<script setup lang="ts">
import type { AAction } from './types'
export interface RecordRow {
  status?: string
}

const emit = defineEmits(['handleClick'])
const propsData = withDefaults(defineProps<{ action: AAction; record: RecordRow }>(), {
  action: () => ({
    icon: '',
    label: '',
  }),
  record: () => ({
    status: '',
  }),
})
const action = computed(() => propsData.action)
const record = computed(() => propsData.record)
// 判断当前操作是否有权限
const opeAuth = () => {
  if (action.value.label == '明细') {
    return record.value.status == '3' ? true : false
  }
  return true
}
const handleEmit = () => {
  emit('handleClick')
}
</script>
<style lang="scss" scoped>
.has-auth {
  color: #ffffff;
  cursor: pointer;
}
.dis-auth {
  color: #000000d9;
  cursor: not-allowed;
}
</style>
