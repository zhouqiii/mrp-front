<template>
  <div class="YSPB">
    <div class="title">排班日历</div>
    <div class="banner">
      <div class="right">
        <LeftOutlined class="has-arrow" @click="preMonth" style="margin-left: 0" />
        <span>
          {{ y }}年{{ m }}月<span class="work" v-if="workDay > 0" style="margin-right: 0">
            {{ workDay }}个工作日</span
          >
        </span>
        <RightOutlined
          :class="ifNoNextM ? 'dis-arrow' : 'has-arrow'"
          @click="nextMounth"
          style="margin-right: 0px"
        />
      </div>
    </div>
    <div class="cander" v-show="true">
      <div class="week">
        <span class="box">日</span>
        <span class="box">一</span>
        <span class="box">二</span>
        <span class="box">三</span>
        <span class="box">四</span>
        <span class="box">五</span>
        <span class="box">六</span>
      </div>
      <div class="days">
        <div
          v-for="(obj, i) in dayList"
          :key="i"
          :class="['days1', obj.isCurrent ? '' : 'days-opacity']"
        >
          <div
            :class="[
              'txt',
              obj.isLegalHoliday ? 'days-holiday' : '',
              obj.isWeek ? 'days-week' : '',
              obj.isFestival ? 'day-festival' : '',
              obj.isDayShift ? 'days-shift' : '',
              obj.isToday ? 'days-today' : '',
            ]"
          >
            <span :class="['t1']">{{ obj.day }}</span>
            <span class="t2">{{ obj.lunar }}</span>
            <div :class="['t3']" v-show="obj.isLegalHoliday">休</div>
            <div :class="['t4']" v-show="obj.isDayShift">班</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getNeighborDays, formatToDate } from '@/utils/dateUtil'
// chinese-lunar-calendar安装后启动项目node_modules/chinese-lunar-calendar/src/lunar_calendar.js报错 把declare去掉
import { getLunar } from 'chinese-lunar-calendar'
import { getHoliday, getHolidayAll } from '@/api/holidays'
import type { IDayHoliday } from '@/api/holidays'

interface Iday {
  day: number // 公历
  lunar: string // 农历
  isToday: boolean // 今天
  isWeek: boolean // 周六 日
  isWork: boolean // 工作日
  isCurrent: boolean // 是否对应当前月份
  isLegalHoliday: boolean // 法定节假日-显示"休"
  isDayShift: boolean // 调休工作日
  isFestival: boolean // 农历显示节日的
}
type IdateKey = 'year' | 'month' | 'day'
type Idate = {
  [key in IdateKey]: number
}
interface IShowDate extends Idate {
  holidaysIndex: number
}

let y = ref(new Date().getFullYear()) // 当前年
let m = ref(new Date().getMonth() + 1) // 当前月
const today = ref(formatToDate(new Date())) // 今天
let dayList = reactive<Iday[]>([])
let workDay = ref(0)
let dayHolidayList = reactive<IDayHoliday[]>([])

const ifNoNextM = computed(
  () => y.value == new Date().getFullYear() && m.value == new Date().getMonth() + 1,
)
// 格式化当前日历每天的item需要数据
const formatCalendarDay = ({ day, year, month, holidaysIndex }: IShowDate): Iday => {
  const date = `${year}-${month}-${day}`
  const lunar = getLunar(year, month, day).dateStr.split('月')
  const noFestivalLunar = lunar[1] == '初一' ? `${lunar[0]}月` : lunar[1]
  const festivalLunar = dayHolidayList[holidaysIndex].festival
    ? dayHolidayList[holidaysIndex].festival!.indexOf('compile') < 0
      ? dayHolidayList[holidaysIndex].festival
      : noFestivalLunar
    : noFestivalLunar
  return {
    day,
    lunar: festivalLunar,
    isToday: formatToDate(new Date(date)) == today.value ? true : false,
    isWeek: new Date(date).getDay() === 0 || new Date(date).getDay() === 6 ? true : false,
    isWork: dayHolidayList[holidaysIndex].status == 1 ? true : false,
    isCurrent: year == y.value && month == m.value ? true : false,
    isLegalHoliday: dayHolidayList[holidaysIndex].festival ? true : false,
    isFestival:
      dayHolidayList[holidaysIndex].festival &&
      dayHolidayList[holidaysIndex].festival!.indexOf('compile') < 0
        ? true
        : false,
    isDayShift: dayHolidayList[holidaysIndex].badDay ? true : false,
  }
}
// 获取当前月日历显示的天
const getCurrentDays = async () => {
  let monthTDaysList: Iday[] = []
  const days = new Date(y.value, m.value, 0).getDate() // 本月一共多少天
  const preMonth: Idate = getNeighborDays(y.value, m.value, 'l') // 上个月年月天数信息
  const nextMonth: Idate = getNeighborDays(y.value, m.value, 'r') // 下个月年月天数信息
  const firstDayWeek: number = new Date(`${y.value}-${m.value}-01`).getDay() // 本月第一天是周几,也表示1号之前需要补几天
  const lastDayWeek: number = new Date(`${y.value}-${m.value}-${days}`).getDay() // 本月最后一天是周几
  const compileN: number = 6 - lastDayWeek // 表示当前需要补下个月几天
  const param = `${y.value}-${m.value < 10 ? '0' + m.value : m.value}` // 当前月 2021-09
  const preParam = `${preMonth.year}-${preMonth.month < 10 ? '0' + preMonth.month : preMonth.month}` // 当前上个月 2021-08
  const nextParam = `${nextMonth.year}-${nextMonth.month < 10 ? '0' + nextMonth.month : nextMonth.month}` // 当前月下个月 2021-10
  await getCurrentHoliday(param, preParam, nextParam, firstDayWeek, compileN)
  for (let i = 1; i <= 35; i++) {
    const ifPre = i <= firstDayWeek // 当前索引是前一月补充数据
    const ifNext = i > firstDayWeek + days // 当前索引是下一月补充数据
    const date = {
      year: ifPre ? preMonth.year : ifNext ? nextMonth.year : y.value,
      month: ifPre ? preMonth.month : ifNext ? nextMonth.month : m.value,
      day: ifPre
        ? preMonth.day - firstDayWeek + i
        : ifNext
          ? i - days - firstDayWeek
          : i - firstDayWeek,
      holidaysIndex: i - 1,
    }
    monthTDaysList.push(formatCalendarDay(date))
  }
  dayList = monthTDaysList
  workDay.value = dayList.filter((item) => item.isCurrent && item.isWork).length
}
// 获取节假日数据 date preDate nextParam是月份 compileP是上月补几天  compileN是下月补几天
const getCurrentHoliday = async (
  date: string,
  preDate: string,
  nextDate: string,
  compileP: number,
  compileN: number,
) => {
  try {
    await Promise.all([
      getHoliday(preDate),
      getHoliday(date),
      getHoliday(nextDate),
      getHolidayAll(preDate),
      getHolidayAll(date),
      getHolidayAll(nextDate),
    ]).then((res) => {
      // 截取上个月后几天，和下个月前几天补充
      const holidayList = (res[0].data || [])
        .slice(res[0].data.length - compileP)
        .concat(res[1].data || [], (res[2].data || []).slice(0, compileN))
      const holidayObj = Object.assign(
        res[3].holiday || {},
        res[4].holiday || {},
        res[5].holiday || {},
      )
      // 用holidayObj里的holiday为true补充holidayList里无法判断显示日历上为"休"的数据
      holidayList.forEach((item) => {
        item['festival'] = item['festival'] ? item['festival'] : ''
        item['badDay'] = item['badDay'] ? item['badDay'] : 0
        if (holidayObj) {
          Object.values(holidayObj).forEach((ele) => {
            if (item.date == ele.date && ele.holiday && !item.festival) {
              item['festival'] = `${ele.name}-compile`
            }
          })
        }
      })
      dayHolidayList = holidayList
    })
  } catch (error) {
    throw new Error('请求失败')
  }
}
// 上一月
const preMonth = async () => {
  y.value = m.value == 1 ? y.value - 1 : y.value
  m.value = m.value == 1 ? 12 : m.value - 1
  getCurrentDays()
}
// 下一月
const nextMounth = () => {
  if (ifNoNextM.value) return
  y.value = m.value == 12 ? y.value + 1 : y.value
  m.value = m.value == 12 ? 1 : m.value + 1
  getCurrentDays()
}
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped>
$color-featival: #ed4014;
@mixin border($color: $color-text-icon, $radius: 5px) {
  border: 2px solid $color;
  border-radius: $radius;
}

.dis-arrow {
  color: $color-text-icon !important;
  cursor: not-allowed;
}
.has-arrow {
  color: $color-text-black;
  cursor: pointer;
}
.YSPB {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;

  .title {
    // line-height: 110px;
    text-align: center;
    background-color: $color-white;
    font-size: $size-mini-2;
    font-weight: bold;
    color: $color-text-black;
    border-bottom: 1px solid #ddd;
    padding: 10px 0px;
  }

  .banner {
    @include flex-row(space-between);
    background-color: $color-white;
    font-size: $size-mini-2;
    font-weight: bold;
    padding: 20px $size-small-2;
    .right {
      flex: 2;
      @include flex-row(space-between);
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
    .left {
      flex: 1;
      border: 2px solid $color-primary;
      border-radius: 5px;
    }
  }

  .cander {
    background-color: $color-white;
    padding: 0 $size-small-2 $size-small-2;

    .week {
      height: 62px;
      border-radius: 31px;
      background-color: #f0f0f0;
      display: flex;

      .box {
        /* 每个项占宽度的 14% */
        width: 14.285714285714286%;
        font-size: $size-mini-3;
        display: flex;
        align-items: center;
        justify-content: center;
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
        padding-top: $size-mini-5;
        width: 14.285714285714286%;
        display: flex;
        align-items: center;
        justify-content: center;
        .txt {
          padding: 10px 14px;
          position: relative;
          text-align: center;
          color: $color-text-black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px solid transparent;
          border-radius: 5px;
          &:hover {
            @include border($color-border);
          }
          .t1 {
            display: inline-block;
            font-size: $size-mini-3;
            color: $color-text-main;
            line-height: 14px;
          }

          .t2 {
            display: block;
            font-size: 12px;
            color: $color-text-base;
            line-height: 18px;
          }

          .t3,
          .t4 {
            position: absolute;
            top: 2px;
            right: 2px;
            font-size: 12px;
          }
          .t3 {
            color: $color-featival;
          }
        }
        .days-week {
          .t1 {
            color: $color-featival;
          }
        }
        .days-today {
          @include border($color-primary);
          &:hover {
            @include border($color-primary);
          }
        }
        .days-holiday {
          background-color: #fdf7f4;
          &:hover {
            @include border($color-featival);
          }
          .t1 {
            color: $color-featival !important;
          }
        }
        .day-festival {
          @include border($color-featival);
        }
        .days-shift {
          background: rgba(221, 221, 221, 0.4);
          .t1 {
            color: $color-text-main;
          }
        }

        /* 设置每一行的第一位的文字颜色为红色 */

        .old {
          opacity: 0.5;

          /* 淡化子元素背景色 */
          .t1,
          .t2 {
            color: #b3b3b3;
          }
        }
      }
    }
  }
}

.legend {
  margin-top: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
.holiday {
  background-color: #fdf7f4;
}
.shiftday {
  background-color: rgba(221, 221, 221, 0.4);
}
.weekend {
  background-color: $color-featival;
}
.t1 {
  font-weight: bold;
  font-size: 20px !important;
}

.t2 {
  font-size: 12px !important;
}
</style>
