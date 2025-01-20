import type { ReqParamsDetail, ResData, ReqParams, ReqColumn } from './model.d.ts'
import { get, post } from '@/utils/request.js'
import qs from 'qs'

const qsOption = {
  encode: false,
}
const qssl = (parObj: any) => {
  let param = ''
  const keysList = Object.keys(parObj)
  keysList.forEach((item, index) => {
    param += `${item}=${parObj[item]}` + `${index !== keysList.length - 1 ? '&' : ''}`
  })
  return param
}
enum URL {
  overview = '/api/result/forecastList', // 销售预测表格请求地址
  forecast = '/api/result/forecast', // 销售预测入库
  featureurl = '/api/original/fileList',
}

const overviewlist = async (data: ReqParamsDetail) => {
  return get<ResData>({
    url: `${URL.overview}?${qs.stringify(data)}`,
    data,
  })
}
const forecast = async (data: Array<Record<string, any>>) =>
  post<ResData>({ url: URL.forecast, data })

const featuredata = async (data: ReqParams) => {
  return get<ResData>({ url: `${URL.featureurl}?${qs.stringify(data)}`, data })
}
// 动态表格获取表格设置数据
const getcolumns = async (data: ReqColumn) => {
  return get<ResData>({
    url: `${URL.overview}?${qs.stringify(data)}`,
    data,
  })
}
export default { overviewlist, forecast, featuredata, getcolumns }
