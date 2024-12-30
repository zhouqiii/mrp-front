import { get, post } from '@/utils/request'
import type { Ilogin, ResResult, ReqParams } from './model'
import $config from '@/config'

enum URL {
  enpasscode = '/base-user/get-enryption',
  // login = '/base-user/login',
  login = '/v1/user/login',
}

// 获取登录加密方式
const getEnryption = async (username: string) => {
  const param = {
    params: {
      requestData: {
        username,
        loginType: 1,
        systemCode: $config.systemCode,
        loginFrom: 'PC',
      },
    },
  }
  return post<ResResult>({
    url: URL.enpasscode,
    data: param,
  })
}
// 登录
const login = async (data: ReqParams) => post<ResResult>({ url: URL.login, data })
// 中台登录
// const login = async (param: Ilogin) => {
//   const data = {
//     params: {
//       requestData: {
//         password: param.password,
//         username: param.username,
//         loginType: 1,
//         systemCode: $config.systemCode,
//         loginFrom: 'PC',
//       },
//     },
//   }
//   return post<ResResult>({
//     url: URL.login,
//     data,
//   })
// }

export default { getEnryption, login }
