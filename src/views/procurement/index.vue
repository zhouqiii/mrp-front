<template>
  <div ref="scrollContainer" @scroll="(e) => run(e)" class="p-6">
    <div class="w-1/2 mb-6">
      <NewCalendar />
    </div>
    <div>
      <div class="flex flex-row justify-between align-middle my-4 mx-0">
        <span class="text-base font-bold">上班日历</span>
        <div class="flex flex-row justify-start align-middle">
          <div v-for="item in legendEnum" class="flex flex-row justify-start align-middle">
            <div
              :class="[
                'h-4.5 w-4.5 border-1 border-solid border-slate-borderbase mt-0 mr-2 mb-0 ml-6',
                item.flag,
              ]"
            ></div>
            <span class="text-sm font-normal">{{ item.lable }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-start flex-wrap">
        <template v-for="item in productLineList">
          <MarkCalendar :dateObj="item" class="spe-item flex-auto mt-0 mr-4 mb-4 ml-0" />
        </template>
      </div>
    </div>
    <CalendarDetail />
  </div>
</template>
<script setup lang="ts">
import NewCalendar from '@/views/procurement/component/calendar.vue'
import { useScroll } from '@/stores/modules/scroll'
import MarkCalendar from '@/views/procurement/component/workCalendar.vue'
import type { IGetList } from './component/workCalendar.vue'
import CalendarDetail from '@/views/procurement/component/workCalendarDetail.vue'
import Steps from './component/Steps.vue'

type Ikeys = 'lable' | 'flag'
type ILegend = {
  [key in Ikeys]: string
}
const legendEnum = reactive<ILegend[]>([
  {
    lable: '休息日',
    flag: 'calendar-week',
  },
  {
    lable: '法定假日',
    flag: 'calendar-festival',
  },
  {
    lable: '维修停产',
    flag: 'calendar-shutdown',
  },
])

const scrollContainer = ref()
const { run } = useScroll(scrollContainer)
const productLineList = reactive<IGetList[]>([
  {
    workDay: 24,
    date: '2024-04',
    dayShutdownList: ['2024-04-18'],
    dayWeekList: ['2024-04-14', '2024-04-21', '2024-04-27'],
    dayFestivalList: ['2024-04-04', '2024-04-05', '2024-04-06'],
  },
  {
    workDay: 23,
    date: '2024-05',
    dayShutdownList: ['2024-05-09'],
    dayWeekList: ['2024-05-12', '2024-05-19', '2024-05-26'],
    dayFestivalList: ['2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04', '2024-05-05'],
  },
  {
    workDay: 23,
    date: '2024-06',
    dayShutdownList: ['2024-06-27'],
    dayWeekList: ['2024-06-02', '2024-06-16', '2024-06-23', '2024-06-30'],
    dayFestivalList: ['2024-06-08', '2024-06-09', '2024-06-10'],
  },
])
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped>
.spe-item {
  width: calc((100% - $size-mini-2 * 2) / 3);
  &:nth-child(3n) {
    margin-right: 0px;
  }
}
</style>
