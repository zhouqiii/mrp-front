<template>
  <div>
    <div class="w-screen h-screen bg-cockpit bg-no-repeat bg-center cus-bg-size text-white">
      <div class="absolute left-0 top-0 h-20 w-full tw-flex-row-center">
        <span class="font-bold">徐工机械经营分析会</span>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cus-bg-size {
  background-size: 100% 100%;
}
// 如果写在内置样式text-[48px]不会进行rem转换
.tw-flex-row-center {
  font-size: 48px;
}
</style>
