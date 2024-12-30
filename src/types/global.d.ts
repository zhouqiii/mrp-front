declare interface TodoItem {
  finished: boolean
  title: string
}
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare interface LocalItem {
  tabs: string
}
// 表格scroll设置
declare interface TableScroll {
  x: number
  y: number
}
// 折线图areaStyle里color设置
declare interface AreaColor {
  offset: number
  color: string
}

declare interface ChartItem {
  value: string | number
  label: string
}

interface YAxisDouble {
  real: string[]
  pre: string[]
}
declare interface ChartData {
  legend: string[]
  yAxisData: YAxisDouble
  xAxisData: string[]
}

export type ChartDataObj = ChartData
export type AreaColorList = Array<AreaColor>
export type ChartDataList = Array<ChartItem>
