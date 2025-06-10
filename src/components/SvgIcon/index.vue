<template>
  <svg aria-hidden="true" :width="width" :height="height" :fill="color">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
<script setup lang="ts">
const propsData = withDefaults(
  defineProps<{ name: string; width?: string; height?: string; color?: string }>(),
  {
    name: '',
    width: '1em',
    height: '1em',
    color: '#1677ff',
  },
)
</script>
<style scoped lang="scss">
svg {
  vertical-align: middle;
  /* 将svg 的fill 属性设置成currentColor后，就会根据父级的color属性来改变颜色*/
  // fill: currentColor;
}
</style>
