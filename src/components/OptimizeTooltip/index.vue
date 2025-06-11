<template>
  <div>
    <el-tooltip :content="contentText" :disabled="isDisabledTooltip" placement="top">
      <div class="content" @mouseover="onMouseOver($event)">
        {{ contentText }}
      </div>
    </el-tooltip>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{ contentText: string }>(), {
  contentText: '',
})
const isDisabledTooltip = ref(true)
const onMouseOver = (e: any) => {
  const ev = e.target
  const evWeight = ev.scrollWidth // 表示元素内容区的实际宽度，包括由于溢出而不可见的部分
  const contentWidth = ev.clientWidth // 表示元素内容区的宽度，包括内边距,反映用户可以直接看到的内容区域的宽度
  isDisabledTooltip.value = evWeight > contentWidth ? false : true
}
</script>
<style lang="scss" scoped>
.content {
  font-size: 14px;
  color: #161e2e;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
