import { defineStore } from 'pinia'
import { store } from '@/stores'
import type { Ilogin, ReqParams, ResResult } from '@/api/login/model'
import fetchApi from '@/api/login/login'
// import { encryptByDES } from '/@/utils/crypto';
import { getToken, setToken, removeToken, setRefreshToken, setUserId } from '@/utils/auth'
import { router } from '@/router'
import { useMessage } from '@/hooks/useMessage'

const { createMessage } = useMessage()

interface UserState {
  token: string
  auths: string[]
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // token
    token: '',
    // auths
    auths: [],
  }),
  getters: {
    getToken(): string {
      return this.token || getToken()
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info ?? '' // for null or undefined value
      setToken(info)
    },
    setAuth(auths: string[]) {
      this.auths = auths
    },
    resetState() {
      this.token = ''
      this.auths = []
    },
    /**
     * @description: login
     */
    // mock 登录接口
    async mockReq(params: ReqParams): Promise<ResResult> {
      return new Promise((resolve) =>
        setTimeout(() => {
          this.setToken('mockToken')
          resolve({
            data: null,
            code: 0,
            msg: '请求成功',
            token: 'mockToken',
          })
        }, 500),
      )
    },
    // 登录接口
    async login(params: ReqParams) {
      // 密码加密
      // params.password = encryptByDES(params.password);
      const res = await fetchApi.login(params)
      if (res) {
        // save token
        this.setToken(res.token)
      }
      return res
    },
    // 中台接口
    // async login(params: Ilogin) {
    //   try {
    //     const res = await fetchApi.login(params)
    //     const data = res
    //     if (data && data.data) {
    //       const userData = data.data
    //       const token = res.data['authorization'] || res.token
    //       const refreshtoken = data.data['refresh-authorization'] || ''
    //       setToken(token)
    //       setRefreshToken(refreshtoken)
    //       setUserId(userData.userId)
    //     }
    //     return res
    //   } catch (error) {
    //     createMessage.error('登录失败')
    //   }
    // },

    /**
     * @description: logout
     */
    async logout() {
      this.resetState()
      removeToken()
      router.replace('/login')
      // 路由表重置
      location.reload()
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
