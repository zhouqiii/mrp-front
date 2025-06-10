<template>
  <div class="tw-flex-row-start">
    <one-button class="mr-[48px]" type="primary" @click="toScreenShow('screenshow')"
      >大屏展示demo1</one-button
    >
    <one-button type="primary" @click="toScreenShow('screenfuncshow')">大屏展示demo2</one-button>
  </div>
</template>
<script setup lang="ts">
const toScreenShow = (pathname: string) => {
  const port = window.location.host
  window.open(`http://${port}/${pathname}`)
}
</script>
