<template>
  <div ref="scrollContainer" @scroll="(e) => run(e)">
    <NewCalendar
      :style="{
        width: '50%',
        marginBottom: $style.long24,
      }"
    />
    <!-- <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p>
    <p>对图标消失，通过移</p> -->
  </div>
</template>
<script setup lang="ts">
import NewCalendar from '@/views/procurement/component/calendar.vue'
import { useScroll } from '@/stores/modules/scroll'

const scrollContainer = ref()
const { run } = useScroll(scrollContainer)
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped></style>
