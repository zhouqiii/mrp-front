<template>
  <div class="detail-num">
    <div v-for="item in detailList" class="static-card">
      <p style="flex: 1">{{ item.title }}</p>
      <div class="number">
        <div>
          <span :style="{ fontSize: $style.font28, marginRight: $style.long8 }">{{
            item.num
          }}</span>
          <span>{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
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
  {
    title: '任务生产数量',
    unit: '件',
    num: 288,
  },
])
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped>
.detail-num {
  @include flex-row();
  width: 100%;
  .static-card {
    @include slcard($color-gray);
    @include flex-column();
    height: 130px;
    text-align: center;
    flex: 1;
    &:not(:last-child) {
      margin-right: $long-8;
    }
    .number {
      @include flex-row(center, center);
      color: $color-primary;
      flex: 3;
    }
  }
}
</style>
