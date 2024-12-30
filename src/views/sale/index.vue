<template>
  <div id="animation-demo"></div>
</template>
<script setup lang="ts">
import { drawStar } from '@/utils/drawStar'
onMounted(() => drawStar())
</script>
