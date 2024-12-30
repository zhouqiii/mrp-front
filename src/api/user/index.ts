import type { ResAuth, ReqAuth, ReqParams, ResResult } from './model'
import { get, post } from '@/utils/request'

enum URL {
  login = '/v1/user/login',
  permission = '/v1/user/permission',
}

const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data })

const permission = async (data: ReqAuth) => get<ResAuth>({ url: URL.permission, data }) // 获取用户信息和用户权限信息

export default { login, permission }
