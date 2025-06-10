<template>
  <div class="signboard">
    <div class="tw-flex-row-between mb-4 p-2 bg-white">
      <div class="flex-1 rounded" :style="{ flex: 2 }">
        <div class="text-l font-bold mb-2">计划状态</div>
        <div class="tw-flex-row-between">
          <a-button
            v-for="item in statusList"
            class="flex-1 mr-2 last:mr-0 rounded"
            :type="planStatus == item.value ? 'primary' : 'default'"
            @click="planStatus = item.value"
            >{{ item.label }}</a-button
          >
        </div>
      </div>
      <div class="flex-1 pl-4 rounded">
        <div class="text-l mb-2">生产计划名称</div>
        <a-select ref="select" v-model:value="planName" class="w-full">
          <a-select-option v-for="item in optionList" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </div>
      <div class="flex-1 rounded">
        <div class="text-l mb-2">计划完工日期</div>
        <a-select ref="select" v-model:value="planName" class="w-full">
          <a-select-option v-for="item in optionList" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </div>
      <div class="flex-1 rounded">
        <div class="text-l mb-2">销售订单名称</div>
        <a-select ref="select" v-model:value="planName" class="w-full">
          <a-select-option v-for="item in optionList" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="p-2 bg-white rounded">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="statistic" tab="生产计划统计">
          <div class="tw-flex-row-between mb-6">
            <div :style="{ flex: 1, marginRight: $style.long24 }">
              <h1 style="font-weight: 700">实时数据总览</h1>
              <DetailNumberCplx />
            </div>
            <div style="flex: 2">
              <h1 style="font-weight: 700">计划生产数量趋势</h1>
              <LineCharts />
            </div>
          </div>
          <TableBase />
        </a-tab-pane>
        <a-tab-pane key="detail" tab="生产计划明细" force-render>
          <DetailNumberBase />
          <div class="flex mt-3">
            <div class="flex-1 w-9/20 bg-white rounded p-2 mr-3">
              <h1 style="font-weight: 700">计划生产数量趋势</h1>
              <LineCharts :areaColor="areaColorNum" :series="speChartSeriesOption" />
            </div>
            <div class="flex-1 w-9/20 bg-white rounded p-2">
              <h1 style="font-weight: 700">计划生产任务数量趋势</h1>
              <BarCharts :data="barChartData" v-if="activeKey == 'detail'" />
            </div>
          </div>
          <ATable />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { AreaColorList, ChartDataList } from '@/types/global'
import TableBase from '@/components/TableBase.vue'
import LineCharts from '@/components/chart/LineCharts.vue'
import BarCharts from '@/components/chart/BarCharts.vue'
import DetailNumberBase from './component/DetailNumberBase.vue'
import DetailNumberCplx from './component/DetailNumberCplx.vue'
import testApi from '@/api/test/test'
import ATable from '../files/index.vue'

interface StatusItem {
  value: string
  label: string
}
const planStatus = ref<string>('toPlan')
const planName = ref<string>('')
const activeKey = ref<string>('statistic')
let barChartData = reactive<ChartDataList>([])
const statusList = ref<StatusItem[]>([
  {
    label: '待计划',
    value: 'toPlan',
  },
  {
    label: '已计划',
    value: 'doPlan',
  },
  {
    label: '已完结',
    value: 'finishPlan',
  },
])
const optionList = reactive<StatusItem[]>([
  {
    label: '第十月',
    value: '10',
  },
])
const areaColorNum: AreaColorList = reactive([
  {
    offset: 0,
    color: 'rgb(67, 148, 255, 1)',
  },
  {
    offset: 1,
    color: 'rgb(96, 187, 253, 0.1)',
  },
])
const speChartSeriesOption: object = reactive({
  lineStyle: {
    width: 1,
    type: 'solid',
    color: '#267dff',
  },
  symbolSize: 8,
  symbol: 'circle',
  itemStyle: {
    // 设置symbol的颜色
    normal: {
      color: '#267dff',
    },
  },
  smooth: true,
})
const getBarChartData = async () => {
  const res = await testApi.overviewlist({
    limit: 10,
    page: 1,
    model: '',
    algType: '',
    forecastId: '',
  })
  if (res.code == 0) {
    const getTestData = res.data[0].accRateStr
    const val = JSON.parse(JSON.stringify(getTestData))
    const accuracyDataOrig = getTestData ? JSON.parse(val.replace(/\'/g, '"')) : {}
    for (const [key, val] of Object.entries(accuracyDataOrig)) {
      barChartData.push({ value: val as string, label: key })
    }
  }
}
onMounted(() => getBarChartData())
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
