<template>
  <div class="chart-box-num" ref="chartRefNum"></div>
</template>
<script setup lang="ts">
import { useECharts } from '@/hooks/useECharts'
import type { ChartDataList } from '@/types/global'

const chartRefNum = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRefNum as Ref<HTMLDivElement>)
const propsData = withDefaults(defineProps<{ data: ChartDataList }>(), {
  data: () => [],
})
const toSetOptions = () => {
  const xLabelList = propsData.data.map((item) => item.label)
  const yValueList = propsData.data.map((item) => item.value)
  setOptions({
    grid: {
      left: 0,
      right: 10,
      top: 20,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: xLabelList,
      axisLabel: {
        rotate: 0,
        margin: 16,
        color: '#333',
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yValueList,
        type: 'bar',
        barWidth: '60%',
      },
    ],
  })
}
watch(
  propsData.data,
  (New, Old) => {
    toSetOptions()
  },
  { deep: true, immediate: true },
)
</script>
<style lang="scss" scoped>
.chart-box-num {
  width: 100%;
  height: 180px;
}
</style>
