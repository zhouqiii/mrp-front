<template>
  <div class="picture">
    <img :src="imgList[curIndex]" />
    <div class="ope-btn">
      <div class="btn" @click="prev" style="margin-right: 24px">上一张</div>
      <div class="btn" @click="next">下一张</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import bg1 from '@/assets/img/bg1.09ac1163.jpg'
import bg2 from '@/assets/img/bg2.2a344a60.jpg'
import bg3 from '@/assets/img/bg5.e370ae09.jpg'

const imgList: string[] = reactive([bg1, bg2, bg3])
const curIndex = ref<number>(0)
const prev = () => {
  if (curIndex.value == 0) {
    curIndex.value = imgList.length - 1
  } else {
    curIndex.value -= 1
  }
}
const next = () => {
  const len = imgList.length
  if (curIndex.value == len - 1) {
    curIndex.value = 0
  } else {
    curIndex.value += 1
  }
}
</script>
<style lang="scss" scoped>
.picture {
  margin: auto;
  width: 50%;
  position: relative;
  img {
    width: 100%;
  }
  .ope-btn {
    display: flex;
    text-align: center;
    position: absolute;
    bottom: 24px;
    left: calc(50% - 72px);
    .btn {
      height: 24px;
      width: 60px;
      border-radius: 4px;
      border: 1px solid grey;
      background: #ffc75f;
    }
  }
}
</style>
