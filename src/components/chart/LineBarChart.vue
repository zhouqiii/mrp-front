<template>
  <div>
    <div class="chart-box" ref="chartRef"></div>
  </div>
</template>
<script setup lang="ts">
import { useECharts } from '@/hooks/useECharts'
import echarts from '@/utils/echarts'
import type { ChartDataObj } from '@/types/global'

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)
// const propsData = withDefaults(defineProps<{ data: ChartDataObj; type: string; model: string }>(), {
//   data: () => ({
//     legend: [],
//     xAxisData: [],
//     yAxisData: { real: [], pre: [] },
//   }),
// })
const toSetOptions = () => {
  // const { legend, xAxisData, yAxisData } = propsData.data
  const targetData = [900, 1050, 1050, 1200, 1050, 1050, 1200, 900, 900, 1200, 1200, 950]
  const planData = [800, 900, 550, 550, 450, 350, 1200, 1100, 1000, 1200, 1200, 1000]
  setOptions({
    title: {
      show: false,
      text: '销售目标达成率',
    },
    grid: {
      left: 20,
      right: 20,
      top: 30,
      bottom: 50,
      containLabel: true,
    },
    legend: {
      x: 'right', //可设定图例在左、右、居中
      y: 'bottom', //可设定图例在上、下、居中
      padding: [10, 20, 20, 10],
      borderRadius: 0,
      data: ['销售目标', '发车计划', '销售目标达成率'],
    },
    tooltip: {
      show: false,
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月',
        ],
        axisPointer: {
          type: 'shadow',
        },
        axisTick: {
          show: true,
          //坐标轴刻度与标签对齐
          alignWithLabel: false,
        },
      },
      {
        type: 'value',
        show: false,
      },
    ],
    yAxis: [
      {
        type: 'value',
        max: 1500,
        min: 0,
        interval: 300,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '销售目标',
        type: 'bar',
        barWidth: '30%',
        data: targetData,
        z: 1,
        label: {
          show: true, //开启显示
          position: 'insideBottom',
          color: '#333333',
          fontSize: 12,
          formatter: function ({ value }) {
            return value instanceof Array ? value[1] : value
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色 1指100%处的颜色
              color: '#5a1db8',
            },
            {
              offset: 1,
              color: '#827ef1',
            },
          ]),
        },
      },
      {
        name: '发车计划',
        type: 'bar',
        barWidth: '30%',
        data: planData,
        z: 1,
        label: {
          show: true, //开启显示
          position: 'insideBottom',
          color: '#333333',
          fontSize: 12,
          formatter: function ({ value }: { value: number }) {
            return value
          },
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色 1指100%处的颜色
              color: '#3264c5',
            },
            {
              offset: 1,
              color: '#85abf8',
            },
          ]),
        },
      },
      // {
      //   xAxisIndex: 1,
      //   name: '线1',
      //   type: 'line',
      //   itemStyle: {
      //     normal: {
      //       lineStyle: {
      //         type: 'solid', //'dotted'虚线 'solid'实线
      //       },
      //     },
      //   },
      //   data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3].map((x, i) => [
      //     30 + i * 100,
      //     x,
      //   ]),
      // },
      // {
      //   xAxisIndex: 1,
      //   name: '销售目标达成率',
      //   type: 'line',
      //   itemStyle: {
      //     normal: {
      //       lineStyle: {
      //         type: 'solid',
      //       },
      //     },
      //   },
      //   data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3].map((x, i) => [
      //     70 + i * 100, // 这里的70和100是偏移量固定的有规律的设置，所以折线才能对到柱状图顶部
      //     x,
      //   ]),
      // },
      {
        name: '销售目标达成率',
        type: 'line',
        xAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' %'
          },
        },
        lineStyle: {
          width: 1,
          type: 'solid',
          color: '#5ad8a6',
        },
        symbolSize: 10,
        symbol: 'circle',
        label: {
          show: true, //开启显示
          position: 'top', //在上方显示
          color: '#666666',
          fontSize: 12,
          formatter: function ({ dataIndex }: { dataIndex: number }) {
            return `${Math.ceil((planData[dataIndex] / targetData[dataIndex] / 100) * 10000)}%`
          },
        },
        itemStyle: {
          // 设置symbol的颜色
          color: '#5ad8a6',
          borderColor: '#ffffff', //拐点边框颜色
          borderWidth: 1, //拐点边框大小
        },
        data: planData.map((x, i) => [
          70 + i * 100, // 这里的70和100是偏移量固定的有规律的设置，所以折线才能对到柱状图顶部
          x,
        ]),
      },
    ],
  })
}
onMounted(() => toSetOptions())
// watch(
//   propsData.data,
//   (New, Old) => {
//     toSetOptions()
//   },
//   { deep: true, immediate: true },
// )
</script>
<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: 280px;
}
</style>
