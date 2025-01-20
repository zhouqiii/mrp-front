<template>
  <div class="plan">
    <div class="btn">
      <one-button type="primary" :disabled="disabled" @click="markProduct">停产维修</one-button>
    </div>
    <div class="calendarDay">
      <MarkCalendar :dateObj="dateMonthObj" :ifMonth="true" ref="calendar">
        <template #checkbox="{ record }">
          <a-checkbox
            v-if="record.dayIndex"
            v-model:checked="record.checked"
            @change="handleChange(record)"
            class="checkbox"
          ></a-checkbox>
        </template>
        <template #txt="{ record }">
          <div class="daybeat" v-if="record.dayIndex">
            <div class="left">
              <span>班次版本:</span>
              <span>版本:</span>
              <span>版本:</span>
            </div>
            <div class="right">
              <span>10+10</span>
              <span>0.9</span>
              <span>30</span>
            </div>
          </div>
        </template>
      </MarkCalendar>
    </div>
  </div>
</template>
<script setup lang="ts">
import MarkCalendar from '@/views/procurement/component/workCalendar.vue'
import type { IGetList, IHandleDay } from './workCalendar.vue'

const calendar = ref() // ref元素
const selectDays = ref<string[]>([])
// let disabled = ref(true)
let dateMonthObj = reactive<IGetList>({
  workDay: 0,
  date: '2024-04',
  dayShutdownList: [],
  dayWeekList: [],
  dayFestivalList: [],
})
// 任一日的checkbox选项改变时
const handleChange = (row: IHandleDay) => {
  const list = calendar.value.dayList.filter((item: IHandleDay) => item.checked == true) || []
  selectDays.value = list.length > 0 ? list.map((item: IHandleDay) => item.date) : []
}
const disabled = computed(() => (selectDays.value.length > 0 ? false : true))
// 选中日标记为停产日
const markProduct = () => {
  dateMonthObj.dayShutdownList.push(...selectDays.value)
}
// const disabled = computed(() => )
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped>
.plan {
  .btn {
    margin-bottom: $size-mini-4;
  }
  .calendarDay {
    .checkbox {
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: 12px;
    }
    .daybeat {
      font-size: $size-mini-4;
      margin: $size-mini-5 0;
      @include flex-row();
      .left {
        @include flex-column(unset);
        text-align: right;
        color: $color-text-base;
      }
      .right {
        @include flex-column(unset);
        text-align: left;
        margin-left: $size-mini-5;
        span {
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
