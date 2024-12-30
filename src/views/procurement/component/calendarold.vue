<template>
  <div class="YSPB">
    <div class="title">排班日历</div>
    <div class="banner">
      <span class="iconfont icon-youjiantou" @click="nextMounth('l')">{{ '{' }}</span>
      <span>{{ y }}年{{ m }}月</span>
      <span class="iconfont icon-youjiantou" @click="nextMounth('r')">{{ '}' }}</span>
    </div>
    <div class="cander" v-show="show">
      <div class="week">
        <span class="box" style="color: #ff0000a1">日</span>
        <span class="box">一</span>
        <span class="box">二</span>
        <span class="box">三</span>
        <span class="box">四</span>
        <span class="box">五</span>
        <span class="box" style="color: #ff0000a1">六</span>
      </div>
      <div class="days">
        <div class="days1" v-for="(obj, i) in dateList" :key="i">
          <div
            :class="[
              'txt',
              obj.day == today ? (obj.bool ? 'sel' : '') : '',
              obj.bool ? '' : 'old',
              obj.isWork == '上午'
                ? 'shangwuColor'
                : obj.isWork == '下午'
                  ? 'xiawuColor'
                  : obj.isWork == '全天'
                    ? 'quantianColor'
                    : '',
              obj.label == '左'
                ? 'Color_l'
                : obj.label == '中'
                  ? 'Color_z'
                  : obj.label == '右'
                    ? 'Color_r'
                    : '',
            ]"
            @click="selClick(obj.day, obj.bool, obj)"
          >
            <span v-if="obj.isWork == '上午'" class="t1">{{ obj.day }}</span>
            <span v-if="obj.isWork == '上午'" class="t2">{{ obj.lunar }}</span>
            <!-- <div :class="['t3', obj.isWork == '上午' ? 't4' : '']" v-show="(obj.day != today) && obj.bool && obj.isWork == '上午'">上午</div> -->

            <span v-if="obj.isWork == '下午'" class="t1">{{ obj.day }}</span>
            <span v-if="obj.isWork == '下午'" class="t2">{{ obj.lunar }}</span>
            <!-- <div :class="['t3', obj.isWork == '下午' ? 't4' : '']" v-show="(obj.day != today) && obj.bool && obj.isWork == '下午'">下午</div> -->

            <span v-if="obj.isWork == '全天'" class="t1">{{ obj.day }}</span>
            <span v-if="obj.isWork == '全天'" class="t2">{{ obj.lunar }}</span>
            <!-- <div :class="['t3', obj.isWork == '全天' ? 't4' : '']" v-show="(obj.day != today) && obj.bool && obj.isWork == '全天'">全天</div> -->

            <span v-if="!obj.isWork" class="t1">{{ obj.day }}</span>
            <span v-if="!obj.isWork" class="t2">{{ obj.lunar }}</span>
            <div :class="['t3']" v-show="obj.day != today && obj.bool && !obj.isWork">休</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot">注意：所有排班不可自行更改，如需更改排班，请联系医院管理人员进行更改</div>
    <div class="forterColor">
      <div class="forterColor1">
        <div class="shangwuColor_qiu"></div>
        <span>上午班</span>
      </div>
      <div class="forterColor1">
        <div class="xiawuColor_qiu"></div>
        <span>下午班</span>
      </div>
      <div class="forterColor1">
        <div class="quantianColor_qiu"></div>
        <span>全天班</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cu-divClick',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    clickAction: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      show: true,
      dateList: [],
      today: new Date().getDate(),
      y: new Date().getFullYear(),
      m: new Date().getMonth() + 1,
      pbList: [], //排班列表
    }
  },
  mounted() {
    this.dateList = this.getTime()
    this.pbList = [
      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-02',
        timeType: '全天',
      },
      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-03',
        timeType: '全天',
      },
      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-15',
        timeType: '上午',
      },
      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-16',
        timeType: '上午',
      },
      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-17',
        timeType: '上午',
      },
      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-18',
        timeType: '下午',
      },

      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-26',
        timeType: '全天',
      },
      {
        doctorCode: '10015',
        doctorName: '韩辰份',
        resourcesDate: '2024-09-27',
        timeType: '全天',
      },
    ]
    this.pbList = this.labelArray(this.pbList)
    console.log('this.pbList:', this.pbList)
    this.isWork()
  },
  watch: {
    dateList: {
      handler(newval) {
        this.isWork()
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    isWork() {
      this.show = false
      this.dateList.forEach((val) => {
        this.pbList.forEach((item) => {
          const date = this.y + '-' + this.m + '-' + val.day
          if (val.timeDate == item.resourcesDate && item.timeType == '上午') {
            val.isWork = '上午'
            console.log(date + val.isWork)
            val.label = item.label
          } else if (val.timeDate == item.resourcesDate && item.timeType == '下午') {
            val.isWork = '下午'
            console.log(date + val.isWork)
            val.label = item.label
          } else if (val.timeDate == item.resourcesDate && item.timeType == '全天') {
            val.isWork = '全天'
            console.log(date + val.isWork)
            val.label = item.label
          }
        })
      })

      this.show = true
    },

    areConsecutiveDates(date1, date2) {
      let d1 = new Date(date1)
      let d2 = new Date(date2)
      let oneDay = 24 * 60 * 60 * 1000
      return Math.round((d2 - d1) / oneDay) === 1
    },
    labelArray(arr) {
      let result = []
      let i = 0
      while (i < arr.length) {
        let start = i
        let end = i
        while (
          end + 1 < arr.length &&
          arr[end].timeType === arr[end + 1].timeType &&
          this.areConsecutiveDates(arr[end].resourcesDate, arr[end + 1].resourcesDate)
        ) {
          end++
        }
        if (start === end) {
          result.push(arr[start])
        } else {
          result.push({ ...arr[start], label: '左' }) // 上午/下午/全天-左边元素
          for (let j = start + 1; j < end; j++) {
            result.push({ ...arr[j], label: '中' }) // 上午/下午/全天-中间元素
          }
          result.push({ ...arr[end], label: '右' }) // 上午/下午/全天-右边元素
        }
        i = end + 1
      }
      return result
    },

    /* 日历 ----------------------------------*/
    // 选中日期
    selClick(day, flag, obj) {
      console.log(obj)
      if (!flag) return
      this.today = day
    },
    //获取当月天数
    getMounthNum(m) {
      let days = 0
      if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
        days = 31
      } else if (m == 4 || m == 6 || m == 9 || m == 11) {
        days = 30
      } else if (m == 2) {
        if ((this.y % 4 == 0 && this.y % 100 != 0) || this.y % 400 == 0) {
          days = 29
        } else {
          days = 28
        }
      }
      return days
    },
    //获取当月每一天对应周几
    getTime() {
      const date = new Date(this.y + '/' + this.m + '/' + '1')
      const arr = []
      const start = date.getDay()
      const end = new Date(this.y + '/' + this.m + '/' + this.getMounthNum(this.m)).getDay()
      for (let i = 1 - start; i <= this.getMounthNum(this.m) + 6 - end; i++) {
        let day = '',
          week = '',
          lunar = '',
          bool = true,
          m = '',
          y = this.y,
          today = this.today
        if (i < 1) {
          m = this.m - 1
          if (m < 1) {
            y--
            m = 12
          }
          day = this.getMounthNum(m) + i
        } else if (i >= 1 && i <= this.getMounthNum(this.m)) {
          m = this.m
          day = i
        } else if (i > this.getMounthNum(this.m)) {
          m = this.m + 1
          if (m > 12) {
            y++
            m = 1
          }
          day = i - this.getMounthNum(this.m)
        }
        week = this.setWeek(new Date(y + '/' + m + '/' + day).getDay())
        day = day >= 10 ? day.toString() : '0' + day
        const ary = this.$cu.test.getLunar(new Date(y + '/' + m + '/' + day))
        if (day < this.today || i < 1 || i > this.getMounthNum(this.m)) {
          bool = false
        }
        console.log('y')
        m = m >= 10 ? m.toString() : '0' + m
        let timeDate = y + '-' + m + '-' + day
        arr.push({
          day,
          week,
          lunar: ary[1],
          nl: ary[0],
          bool,
          timeDate,
        })
      }
      return arr
    },
    setWeek(val) {
      switch (val) {
        case 0:
          val = '周日'
          break
        case 1:
          val = '周一'
          break
        case 2:
          val = '周二'
          break
        case 3:
          val = '周三'
          break
        case 4:
          val = '周四'
          break
        case 5:
          val = '周五'
          break
        case 6:
          val = '周六'
          break
      }
      return val
    },
    // 下一月或上一月
    nextMounth(val) {
      if (this.y == new Date().getFullYear() && this.m == new Date().getMonth() + 1 && val == 'l')
        return
      this.show = false
      if (val == 'l') {
        this.m--
        if (this.m < 1) {
          this.y--
          this.m = 12
        }
      } else if (val == 'r') {
        this.m++
        if (this.m > 12) {
          this.y++
          this.m = 1
        }
      }
      if (this.m != new Date().getMonth() + 1) {
        this.today = null
      } else {
        this.today = new Date().getDate()
      }
      this.dateList = this.getTime()
      this.show = true
    },
    /* 日历 ----------------------------------*/
  },
}
</script>

<style lang="less" scoped>
.YSPB {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;

  .title {
    // line-height: 110px;
    text-align: center;
    background-color: #fff;
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    border-bottom: 1px solid #ddd;
    padding: 10px 0px;
  }

  .banner {
    display: flex;
    align-items: center;
    // line-height: 110px;
    text-align: center;
    background-color: #fff;
    font-size: 24px;
    font-weight: bold;
    padding: 20px 0px;

    .iconfont {
      flex: 1;
      color: #999;
      cursor: pointer;
      -moz-user-select: none;
      /*mozilar*/
      -webkit-user-select: none;
      /*webkit*/
      -ms-user-select: none;
      /*IE*/
      user-select: none;
    }

    .right {
      display: inline-block;
      transform: rotate(180deg);
    }

    span {
      display: inline-block;
      margin: 0 30px;
      color: #000;
    }
  }

  .cander {
    background-color: #fff;
    padding: 0 27px 50px;

    .week {
      height: 62px;
      border-radius: 31px;
      background-color: #f0f0f0;
      display: flex;

      .box {
        /* 每个项占宽度的 14% */
        width: 14.285714285714286%;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .days {
      width: 100%;
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;

      .days1 {
        padding-top: 30px;
        /* 每个项占宽度的 14% */
        width: 14.285714285714286%;
        display: flex;
        align-items: center;
        justify-content: center;

        .txt {
          padding: 10px 14px;
          position: relative;
          text-align: center;
          color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .t1 {
            display: inline-block;
            font-size: 20px;
            color: #333;
            line-height: 20px;
          }

          .t2 {
            display: block;
            font-size: 12px;
            color: #666;
            line-height: 12px;
          }

          .t3 {
            position: absolute;
            top: 0;
            right: 0;
            color: #00af46;
            font-size: 12px;
          }

          .t4 {
            color: #f8764e;
          }
        }

        /* 设置每一行的第一位和第七位的文字颜色为红色 */

        .old {
          opacity: 0.5;

          /* 淡化子元素背景色 */
          .t1,
          .t2 {
            color: #b3b3b3;
          }
        }
      }

      .days1:nth-child(7n + 1),
      .days1:nth-child(7n) {
        .txt {
          span {
            color: #ff0000a1;
          }
        }
      }
    }
  }

  .forterColor1 {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }
}

.sel {
  border-radius: 50%;
  border: 1px solid #dddddd;
}

.shangwuColor_qiu {
  margin-top: 4px;
  width: 18px;
  height: 18px;
  background-color: #ed4014;
  border-radius: 50%;
}

.xiawuColor_qiu {
  margin-top: 4px;
  width: 18px;
  height: 18px;
  background-color: #19be6b;
  border-radius: 50%;
}

.quantianColor_qiu {
  margin-top: 4px;
  width: 18px;
  height: 18px;
  background-color: #2d8cf0;
  border-radius: 50%;
}

.bot {
  padding: 10px 30px;
  font-size: 16px;
  color: #999;
  // line-height: 34px;
  text-align: justify;
}

.forterColor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  font-size: 16px;
}

.shangwuColor {
  margin-top: 4px;
  background-color: #ed4014;
  border-radius: 50%;

  .t1,
  .t2 {
    color: #fff !important;
  }
}

.xiawuColor {
  margin-top: 4px;
  background-color: #19be6b;
  border-radius: 50%;

  .t1,
  .t2 {
    color: #fff !important;
  }
}

.quantianColor {
  margin-top: 4px;
  background-color: #2d8cf0;
  border-radius: 50%;

  .t1,
  .t2 {
    color: #fff !important;
  }
}

.Color_l {
  border-radius: 140px 0 0 140px;
  width: 100% !important;
}

.Color_z {
  border-radius: 0 0 0 0;
  width: 100% !important;
}

// .Color_z::before {
//   content: "";
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.1);
//   /* 半透明覆盖层 */
//   z-index: 1;
// }

.Color_r {
  border-radius: 0 140px 140px 0;
  width: 100% !important;
}

.t1 {
  font-weight: bold;
  font-size: 20px !important;
}

.t2 {
  font-size: 12px !important;
}
</style>
