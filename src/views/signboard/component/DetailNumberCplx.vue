<template>
  <div class="detail-num">
    <div v-for="(item, index) in detailList" class="static-card">
      <div style="width: 40px">
        <img :src="imgList[index]" />
      </div>
      <div class="card-text">
        <div class="number">
          <span :style="{ fontSize: $style.font28, marginRight: $style.long8 }">{{
            item.num
          }}</span>
          <span>{{ item.unit }}</span>
        </div>
        <p style="flex: 1">{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import blockImg from '@/assets/Icon_Block.png'
import contractImg from '@/assets/Icon_contract.png'
import nodeImg from '@/assets/Icon_node.png'
import tradingImg from '@/assets/Icon_trading.png'
interface StatisticItem {
  title: string
  unit: string
  num: number
}
const detailList = reactive<StatisticItem[]>([
  {
    title: '计划数量',
    unit: '笔',
    num: 6,
  },
  {
    title: '计划生产种类',
    unit: '种',
    num: 10,
  },
  {
    title: '计划生产数量',
    unit: '件',
    num: 88,
  },
  {
    title: '生产任务数',
    unit: '单',
    num: 18,
  },
])
const imgList = reactive<string[]>([blockImg, contractImg, nodeImg, tradingImg])
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped>
.detail-num {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 21px;
  width: 100%;
  margin-top: $long-12;
  .static-card {
    &:first-child {
      @include slcard(linear-gradient(90deg, rgb(67, 148, 255) 0%, rgb(96, 187, 253) 100%));
    }
    &:nth-of-type(2) {
      @include slcard(linear-gradient(90deg, rgb(73, 196, 216) 0%, rgb(109, 210, 162) 100%));
    }
    &:nth-of-type(3) {
      @include slcard(linear-gradient(90deg, rgb(244, 141, 109) 0%, rgb(249, 172, 103) 100%));
    }
    &:last-child {
      @include slcard(linear-gradient(90deg, rgb(126, 139, 236) 0%, rgb(197, 175, 247) 100%));
    }
    height: 90px;
    @include flex-row(flex-start, flex-start);
    .card-text {
      @include flex-column();
      color: $color-white;
      margin-left: $long-8;
      .number {
        @include flex-row(flex-start, flex-start);
        flex: 3;
        line-height: 22px;
        margin-bottom: $long-12;
      }
    }
  }
}
</style>
