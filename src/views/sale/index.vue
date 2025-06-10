<template>
  <div id="animation-demo">
    <div class="font-nopx">
      饼图嵌套自定义内容graphic:{elements} 在element里定义自定义要显示的内容
    </div>
    <div class="font">饼图嵌套自定义内容graphic:{elements} 在element里定义自定义要显示的内容</div>
  </div>
</template>
<script setup lang="ts">
import { drawStar } from '@/utils/drawStar'
onMounted(() => drawStar())
</script>
<style lang="scss" scoped>
/* 两种方式设置px不转换rem */
.font-nopx {
  font-size: 24px;
}
.font {
  font-size: 24px; /*no*/
}
</style>
