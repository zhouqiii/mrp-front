<template>
  <div ref="scrollContainer" @scroll="(e) => run(e)" class="content">
    <NewCalendar
      :style="{
        width: '50%',
        marginBottom: $style.long24,
      }"
    />
    <div class="plan">
      <div class="head">
        <span>上班日历</span>
        <div class="legend">
          <div v-for="item in legendEnum" class="item">
            <div :class="['item-box', item.flag]"></div>
            <span>{{ item.lable }}</span>
          </div>
        </div>
      </div>
      <div class="calendar">
        <template v-for="item in productLineList">
          <MarkCalendar :dateObj="item" class="item" />
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
.content {
  padding: $size-small-2;
  .plan {
    .head {
      margin: $size-mini-2 0;
      @include flex-row(space-between);
      span {
        font-size: $size-mini-2;
        font-weight: bolder;
      }
      .legend {
        @include flex-row();
        .item {
          @include flex-row();
          span {
            font-size: $size-mini-3;
            font-weight: normal;
          }
          .item-box {
            height: $size-mini-1;
            width: $size-mini-1;
            border: 1px solid $color-border;
            margin: 0 $size-mini-5 0 $size-small-2;
          }
        }
      }
    }
    .calendar {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
      .item {
        flex: 1;
        margin: 0 $size-mini-2 $size-mini-2 0;
        width: calc((100% - $size-mini-2 * 2) / 3);
        min-width: calc((100% - $size-mini-2 * 2) / 3); // 加入这两个后每个item的宽度就生效了
        max-width: calc((100% - $size-mini-2 * 2) / 3); // 加入这两个后每个item的宽度就生效了
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
