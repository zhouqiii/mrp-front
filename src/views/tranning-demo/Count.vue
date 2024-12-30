<template>
  <div class="count">
    <div :class="isSubtrac ? 'ope-color' : 'dis-color'" @click="onSubtrac">-</div>
    <div class="num-color">{{ count }}</div>
    <div :class="isAdd ? 'ope-color' : 'dis-color'" @click="onAdd">+</div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
const count = ref<number>(0)
const isAdd = computed(() => count.value < 5)
const isSubtrac = computed(() => count.value > -5)
const onSubtrac = () => {
  if (count.value > -5) {
    count.value--
  }
}
const onAdd = () => {
  if (count.value < 5) {
    count.value++
  }
}
</script>
<style lang="scss" scoped>
.ope-color {
  background-color: $ope-color;
}
.dis-color {
  background-color: $dis-color;
  cursor: not-allowed;
}
.count {
  margin: auto;
  width: 150px;
  height: 50px;
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  div {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
  }
  .num-color {
    background-color: $num-color;
  }
}
</style>
