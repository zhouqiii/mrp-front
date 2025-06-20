// 接口返回 基本通用
export interface ResData<T = Array> {
  code: number
  msg: string
  data: T
}
// 明细表格数据 分页和明细类型
export interface ReqParamsDetail extends ReqParams {
  model: string
  algType: string
  forecastId: string
}
interface MyObj {
  [key: string]: any
}
export interface ReqParams extends MyObj {
  limit: number
  page: number
}

export interface ReqColumn {
  type: string
}
