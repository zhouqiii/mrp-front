<template>
  <div class="chart-box-num" ref="chartRefNum"></div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onMounted } from 'vue'
import echarts from '@/utils/echarts'
import { useECharts } from '@/hooks/useECharts'
import { staticNumItem } from '@/views/signboard/constant'
import dayjs from 'dayjs'
import type { AreaColorList } from '@/types/global'

const chartRefNum = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRefNum as Ref<HTMLDivElement>)
const propsData = withDefaults(defineProps<{ areaColor?: AreaColorList; series?: object }>(), {
  // 数组类型必须使用函数返回，其它不用
  areaColor: () => [
    {
      offset: 0,
      color: 'rgba(56, 96, 244, 1)',
    },
    {
      offset: 1,
      color: 'rgba(255, 255, 255, 1)',
    },
  ],
  series: () => ({}),
})
onMounted(() => {
  setOptions({
    grid: {
      left: 0,
      right: 10,
      top: 20,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      type: 'axis',
    },
    xAxis: {
      type: 'category',
      data: staticNumItem.map((n) => dayjs(n.time).format('YYYY年MM月DD')),
      axisLabel: {
        rotate: 0,
        margin: 16,
        color: '#333',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 16,
        color: '#333',
      },
    },
    series: [
      {
        data: staticNumItem.map((n) => n.num),
        type: 'line',
        smooth: false,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, propsData.areaColor),
        },
        ...propsData.series,
      },
    ],
  })
})
</script>
<style lang="scss" scoped>
.chart-box-num {
  width: 100%;
  height: 180px;
}
</style>
