<template>
  <div class="WorkClendar">
    <div class="banner">
      <div class="right">
        <span>
          {{ date.year }}年{{ date.month }}月<span style="margin-left: 12px">
            (上班{{ dateObj.workDay }}天)</span
          >
        </span>
      </div>
    </div>
    <div class="cander" v-show="true">
      <div class="week">
        <span class="box">一</span>
        <span class="box">二</span>
        <span class="box">三</span>
        <span class="box">四</span>
        <span class="box">五</span>
        <span class="box">六</span>
        <span class="box">日</span>
      </div>
      <div class="days">
        <div
          v-for="(obj, i) in dayList"
          :key="i"
          :class="[
            'days1',
            obj.isFestival ? 'calendar-festival' : '',
            obj.isWeek ? 'calendar-week' : '',
            obj.isShutdown ? 'calendar-shutdown' : '',
          ]"
        >
          <div :class="['txt']">
            <span :class="['t1', ifMonth ? 'fontWeight' : '']" v-if="obj.dayIndex">{{
              obj.dayIndex
            }}</span>
            <slot name="txt" :record="obj"> </slot>
          </div>
          <slot name="checkbox" :record="obj"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface IHandleDay extends IDay {
  isFestival: boolean // 农历显示节日的
  isWeek: boolean // 周末的休息日
  isShutdown: boolean // 停机维修日
}
type IDay = {
  dayIndex: number
  date: string
} & IObj

interface IObj {
  [key: string]: any
}
export interface IGetList {
  workDay: number // 工作日
  date: string // 2024-04格式的年月
  dayShutdownList: string[] // 停机维修list标识 ['2024-03-01']
  dayWeekList: string[] // 休息日 list标识 ['2025-01-05']
  dayFestivalList: string[] // 法定假日list标识 ['2025-01-01']
}
const propsData = withDefaults(defineProps<{ dateObj: IGetList; ifMonth?: boolean }>(), {
  dateObj: () => ({
    workDay: 0,
    date: '',
    dayShutdownList: [],
    dayWeekList: [],
    dayFestivalList: [],
  }),
  ifMonth: false,
})
let dayList = ref<IHandleDay[]>([])
const date = computed(() => ({
  year: Number(propsData.dateObj.date.split('-')[0]),
  month: Number(propsData.dateObj.date.split('-')[1]),
}))
// 格式化当前日历每天的item需要数据
const formatCalendarDay = ({ dayIndex, date }: IDay): IHandleDay => {
  const { dayShutdownList, dayWeekList, dayFestivalList } = propsData.dateObj
  return {
    dayIndex,
    date,
    isShutdown: dayShutdownList.includes(date) ? true : false,
    isWeek: dayWeekList.includes(date) ? true : false,
    isFestival: dayFestivalList.includes(date) ? true : false,
    checked: dayList.value
      ? dayList.value.find((item: IHandleDay) => item.date == date)?.checked
      : false,
  }
}
// 获取当前月日历显示的天
const getCurrentDays = async () => {
  const { year, month } = date.value
  let monthTDaysList: IHandleDay[] = []
  const days = new Date(year, month, 0).getDate() // 本月一共多少天
  const firstDayWeek: number = new Date(`${year}-${month}-01`).getDay() // 本月第一天是周几
  const lastDayWeek: number = new Date(`${year}-${month}-${days}`).getDay() // 本月最后一天是周几
  const dayNumber: number =
    days + (firstDayWeek == 0 ? 6 : firstDayWeek - 1) + (lastDayWeek == 0 ? 0 : 7 - lastDayWeek) // 当前日历格子显示多少个
  for (let i = 1; i <= dayNumber; i++) {
    const preDay = firstDayWeek == 0 ? 6 : firstDayWeek - 1 // 补充几天
    const idxday = i - preDay
    const date = {
      dayIndex: i <= preDay || i > preDay + days ? 0 : idxday,
      date:
        i <= preDay || i > preDay + days
          ? ''
          : `${year}-${month < 10 ? '0' + month : month}-${idxday < 10 ? '0' + idxday : idxday}`,
      checked: false,
    }
    monthTDaysList.push(formatCalendarDay(date))
  }
  dayList.value = monthTDaysList
}
onMounted(() => getCurrentDays())
watch(
  () => propsData.dateObj,
  () => getCurrentDays(),
  {
    deep: true,
  },
)
// 暴露出当月日历每天数据dayList
defineExpose({
  dayList,
})
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss">
@mixin border($color: $color-text-icon, $radius: 5px) {
  border: 2px solid $color;
  border-radius: $radius;
}
.WorkClendar {
  width: 100%;
  background-color: #f8f8f8;
  .banner {
    background-color: $color-bg1;
    font-size: $size-mini-3;
    font-weight: bold;
    padding: $size-mini-5 $size-small-2;
    text-align: center;
    .right {
      .work {
        font-size: 14px;
        color: $color-text-base;
      }
      span {
        display: inline-block;
        margin: 0 $size-small-2;
        color: $color-text-black;
      }
    }
  }

  .cander {
    background-color: $color-white;
    border: 1px solid $color-border;
    .week {
      height: 45px;
      border-radius: 31px;
      display: flex;

      .box {
        /* 每个项占宽度的 14% */
        width: 14.285714285714286%;
        font-size: $size-mini-3;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $color-border;
        border-right: 1px solid $color-border;
        &:last-child {
          border-right: none;
        }
      }
    }

    .days {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .days-opacity {
        opacity: 0.4;
      }
      .days1 {
        position: relative;
        width: 14.285714285714286%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid $color-border;
        border-right: 1px solid $color-border;
        &:nth-child(7n) {
          border-right: none;
        }
        .txt {
          padding: 10px 14px;
          position: relative;
          text-align: center;
          color: $color-text-main;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px solid transparent;
          .t1 {
            display: inline-block;
            font-size: $size-mini-3;
            color: $color-text-main;
            line-height: 14px;
          }
        }
      }
    }
  }
}
.fontWeight {
  font-weight: bolder;
}
</style>
