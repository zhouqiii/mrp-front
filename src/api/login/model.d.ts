interface DynamicObject {
  [key: string]: any
}
export interface Ilogin {
  username: string
  password: string
}
export interface ReqParams {
  username: string
  password: string
}
export interface ReqAuth {
  auths: string[]
  modules: string[]
  is_admin?: 0 | 1
}

export interface ResResult<T = Array> extends DynamicObject {
  code: number
  msg: string
  token: string
  data: T
}
