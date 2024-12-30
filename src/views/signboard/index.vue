<template>
  <div class="signboard">
    <div class="condition">
      <div class="option" :style="{ flex: 2 }">
        <div class="title" style="font-weight: bold">计划状态</div>
        <div class="btns">
          <a-button
            v-for="item in statusList"
            :type="planStatus == item.value ? 'primary' : 'default'"
            @click="planStatus = item.value"
            >{{ item.label }}</a-button
          >
        </div>
      </div>
      <div class="option">
        <div class="title">生产计划名称</div>
        <a-select ref="select" v-model:value="planName" class="sel">
          <a-select-option v-for="item in optionList" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </div>
      <div class="option">
        <div class="title">计划完工日期</div>
        <a-select ref="select" v-model:value="planName">
          <a-select-option v-for="item in optionList" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </div>
      <div class="option">
        <div class="title">销售订单名称</div>
        <a-select ref="select" v-model:value="planName">
          <a-select-option v-for="item in optionList" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="board">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="statistic" tab="生产计划统计" class="statistic">
          <div class="over">
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
        <a-tab-pane key="detail" tab="生产计划明细" force-render class="detail">
          <DetailNumberBase />
          <div class="over">
            <div :style="{ flex: 1, marginRight: $style.long12 }" class="chart">
              <h1 style="font-weight: 700">计划生产数量趋势</h1>
              <LineCharts :areaColor="areaColorNum" :series="speChartSeriesOption" />
            </div>
            <div style="flex: 1" class="chart">
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
<style lang="scss" scoped>
.signboard {
  // padding: $long-16 $long-24;
  .condition {
    @include slcard;
    @include flex-row();
    margin-bottom: $long-24;
    .option {
      @include slcard;
      flex: 1;
      .title {
        margin-bottom: $long-8;
      }
      .btns {
        @include flex-row();
        ::v-deep .ant-btn:not(:last-child) {
          margin-right: $long-8;
        }
        ::v-deep .ant-btn {
          border-radius: 4px;
          flex: 1;
        }
      }
      ::v-deep .ant-select {
        width: 100%;
      }
    }
  }
  .board {
    @include slcard;
    .over {
      @include flex-row();
      margin-bottom: $long-24;
    }
    .detail {
      .over {
        margin-top: $long-12;
        .chart {
          width: 45%;
          @include slcard($color-gray);
        }
      }
    }
  }
}
</style>
