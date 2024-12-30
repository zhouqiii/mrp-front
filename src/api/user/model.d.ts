export interface ReqParams {
  mobile: 'string'
  password: 'string'
}

export interface ResAuth {
  auths: string[]
  modules: string[]
  is_admin?: 0 | 1
}
export interface ReqAuth {
  userId: string
}
export interface ResResult {
  login_status: number
  st: string
  token: string
}
