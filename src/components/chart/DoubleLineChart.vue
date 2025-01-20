<template>
  <div>
    <div class="chart-box" ref="chartRef"></div>
  </div>
</template>
<script setup lang="ts">
import { useECharts } from '@/hooks/useECharts'
import type { ChartDataObj } from '@/types/global'

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
const propsData = withDefaults(defineProps<{ data: ChartDataObj; type: string; model: string }>(), {
  data: () => ({
    legend: [],
    xAxisData: [],
    yAxisData: { real: [], pre: [] },
  }),
})
const toSetOptions = () => {
  const { legend, xAxisData, yAxisData } = propsData.data
  setOptions({
    title: {
      show: false, //false
      text: `${propsData.type}针对${propsData.model}的预测展示`,
      textStyle: {
        color: '#333',
        fontWeight: 'bolder',
        fontFamily: 'sans-serif',
        fontSize: 16,
        lineHeight: 16,
      },
    },
    legend: {
      x: 'right', //可设定图例在左、右、居中
      y: 'top', //可设定图例在上、下、居中
      itemHeight: 0, // 圆点大小
      itemWidth: 20,
      padding: [10, 20, 20, 10],
      data: legend,
    },
    grid: {
      left: 20,
      right: 30,
      top: 30,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: {
        color: '#333333',
      },
    },
    yAxis: {
      type: 'value',
      // 一根坐标轴线
      axisLine: {
        show: true,
      },
      // 突出的坐标轴刻度
      axisTick: {
        show: true,
      },
      // 内部网格线
      splitLine: {
        show: false,
      },
      // 坐标轴上的文字
      axisLabel: {
        color: '#333333',
        // formatter: '{value} %',
      },
    },
    series: [
      {
        name: legend[0],
        data: yAxisData.real,
        type: 'line',
        // stack: 'Total',
        symbol: 'none',
        itemStyle: {
          color: 'rgba(91, 144, 194, 1)', // 设置线的颜色
        },
        // itemStyle: {
        //   //折线点上方显示数值
        //   normal: {
        //     label: {
        //       show: true, //开启显示
        //       position: 'top', //在上方显示
        //       formatter: (params) => Number(params.data).toFixed(2),
        //       textStyle: {
        //         //数值样式
        //         fontSize: 12,
        //       },
        //     },
        //   },
        // },
      },
      {
        name: legend[1],
        data: yAxisData.pre,
        type: 'line',
        // stack: 'Total',
        symbol: 'none', // 去掉圆点
        itemStyle: {
          color: 'rgba(98, 78, 255, 1)', // 设置线的颜色
        },
        // 指示线
        markLine: {
          symbol: ['', ''], // 指示线上下图标
          symbolSize: [14, 17],
          label: {
            show: true,
            padding: [0, 0, 5, 0],
            color: 'rgba(4, 4, 19, 0.56)',
            formatter() {
              return '' // 虚线显示文字
            },
          },
          data: [
            {
              xAxis: xAxisData[yAxisData.pre.length - 4], // 预测值是pre的最后四个，第一个开始的地方显示指示线
            },
          ],
          lineStyle: {
            width: 2,
            color: '#f55c47',
          },
        },
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
.chart-box {
  width: 100%;
  height: 280px;
}
</style>
