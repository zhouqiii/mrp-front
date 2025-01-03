import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { getToken, getRefreshToken } from './auth'
import { useMessage } from '@/hooks/useMessage'
import { API_PREFIX } from '../../config/constant'
const { createMessage, notification } = useMessage()

enum RequestEnums {
  TIMEOUT = 10000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}

// baseURL

const instance = axios.create({
  baseURL: '', // API_PREFIX as string,
  timeout: RequestEnums.TIMEOUT as number,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    // 接口权限拦截
    // const store = usePermissioStoreWithOut();
    // const { url = '' } = config;
    // if (!WhiteList.includes(url) && store.getIsAdmin === 0) {
    //   if (!store.getAuths.includes(url)) {
    //     console.log('url', url, store.getIsAdmin);
    //     return Promise.reject('没有操作权限');
    //   }
    // }
    // 请求头 token配置
    const token = getToken()
    const reftoken = getRefreshToken()
    if (token) {
      config.headers['authorization'] = token
      config.headers['refresh-authorization'] = reftoken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, config } = response // 解构
    if (data.code === RequestEnums.OVERDUE) {
      // 登录信息失效，应跳转到登录页面，并清空本地的token
      localStorage.setItem('token', '')
      return Promise.reject(data)
    }
    // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
    if (data.code && data.code !== RequestEnums.SUCCESS) {
      createMessage.error(data) // 此处也可以使用组件提示报错信息
      return Promise.reject(data)
    }
    return data
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      handleCode(response.status)
      return
    }
    if (!window.navigator.onLine) {
      createMessage.error('网络连接失败')
      return
      // 可以跳转到错误页面，也可以不做操作
      // return router.replace({
      //   path: '/404'
      // });
    }
    createMessage.error('请求超时，稍后再试吧')
  },
)
const handleCode = (code: number): void => {
  switch (code) {
    case 401:
      createMessage.error('登录失败，请重新登录')
      break
    default:
      createMessage.error('请求失败')
      break
  }
}
const request = <T = any>(
  config: AxiosRequestConfig | string,
  options?: AxiosRequestConfig,
): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      })
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      })
    }
  } else {
    return instance.request<T, T>(config)
  }
}
export function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' }, options)
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'POST' }, options)
}

export default request
export type { AxiosInstance, AxiosResponse }
