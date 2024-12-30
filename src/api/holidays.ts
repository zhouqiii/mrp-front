// openapi 获取法定节假日
import type { ResData } from './global.js'
import { get } from '@/utils/request'
export interface IDayHoliday {
  date: string // 日期 2024-12-26
  status: number // 1上班， 2放假
  festival?: string // 节日名称 但是比如国庆节只有10-01当天才会返回该字段，调用另一个timer接口补充将10.01-10.07全补充该字段已判断显示"休"，并且02-07该字段会显示"国庆节-compile"以区分只有10.01农历显示"国庆节"
  badDay?: number // 是否补班：1补班
  statutory?: number // 是否法定节假日：1是。 该字段返回不准确 比如国庆节10.04 该字段没有返回 所以放在festeval字段上判断
}
export interface IDayHolidayT {}
// 文档地址：https://oneapi.coderbox.cn/doc/949712861251586

export const getHoliday = async (date: string) =>
  get<ResData<IDayHoliday[]>>({
    url: `/openapi/public/holiday?date=${date}&queryType=2`,
  })
// http://timor.tech/api/holiday
// 当前接口可以把比如国庆节的7天假期都显示出来 上面接口只能显示10-01当天 两个接口结合完善日历组件
interface IHoliday {
  code: number
  holiday: object
}
export const getHolidayAll = async (date: string) =>
  get<IHoliday>({
    url: `/holiday/year/${date}`,
  })
