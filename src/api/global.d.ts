// 接口返回 形状
export type ResData<T> = {
  code: number
  msg: string
  data: T
}

export type Response<T> = {
  status: number
  statusText: string
  data: T
}
