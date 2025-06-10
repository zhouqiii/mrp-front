<template>
  <a-flex class="w-full">
    <div v-for="item in planlist" :key="item.h1" class="w-1/5">
      <div class="tw-flex-col-center">
        <img :src="item.img" class="mb-[16px]" />
        <!-- border设置的作用是覆盖div衔接处中间空白 -->
        <div class="h-[10px] w-full bg-[#0f6fc6] text-center border border-solid border-[#0f6fc6]">
          <div class="h-[16px] w-[16px] bg-[#4fceff] rounded-[8px] mx-auto -mt-[3px]"></div>
        </div>
        <div class="firtitle mt-[16px] font-bold underline underline-offset-8">{{ item.h1 }}</div>
        <div
          class="tw-flex-col-start mt-[80px] indent-[1em] font-bold leading-loose underline underline-offset-8"
        >
          <span v-for="text in item.h2">{{ text }}&nbsp;&nbsp;>>></span>
        </div>
      </div>
    </div>
  </a-flex>
</template>
<script setup lang="ts">
import excavator from '@/assets/excavator.png'
import anylysis from '@/assets/analysis.png'
import achievement from '@/assets/achievement.png'
import project from '@/assets/project.png'
import budget from '@/assets/budget.png'
interface IPlan {
  img: string
  h1: string
  h2: string[]
}
const planlist = reactive<IPlan[]>([
  {
    img: excavator,
    h1: '行业分析',
    h2: [],
  },
  {
    img: achievement,
    h1: '经营业绩',
    h2: ['经营综合分析', '关键指标下钻', '关键指标明细'],
  },
  {
    img: project,
    h1: '海外专项',
    h2: ['海外经营总览', '海外关键指标分析'],
  },
  {
    img: anylysis,
    h1: '专题分析',
    h2: ['市场分析专题', '盈利分析专题', '现金流分析专题 ', '风险分析专题', '存货分析专题'],
  },
  {
    img: budget,
    h1: '滚动预算',
    h2: [],
  },
])
</script>
<style lang="scss" scoped>
.firtitle {
  font-size: 48px;
}
.tw-flex-col-center {
  font-size: 32px;
}
</style>
