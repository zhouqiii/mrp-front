import type { Itags } from '@/stores/modules/app'
import { useRoute } from 'vue-router'

const TokenKey = 'x-auth-token'
const ReTokenKey = 'x-refresh-token'
const UserId = 'userId'
const TagVisitKey = 'tag_visit'
const TagActiveKey = 'tagActive'

export function getToken() {
  return localStorage.getItem(TokenKey) || ''
}

export function setToken(token: string) {
  localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  localStorage.setItem(TokenKey, '')
}
export function setRefreshToken(token: string) {
  localStorage.setItem(ReTokenKey, token)
}
export function getRefreshToken() {
  localStorage.getItem(ReTokenKey)
}
export const getUserId = () => {
  return localStorage.getItem(UserId) || ''
}

export const setUserId = (userid: string) => {
  return localStorage.setItem(TokenKey, userid)
}

// 获取页签缓存
export const getTagsVisit = () => {
  return localStorage.getItem(TagVisitKey)
}
// 清除页签缓存
export function removeTagsVisit() {
  return localStorage.removeItem(TagVisitKey)
}
// 设置页签缓存
export function setTagsVisit(data: Itags[]) {
  localStorage.setItem(TagVisitKey, JSON.stringify(data))
}
// 获取当前路由path对应页签key
export const getTagsActive = () => {
  return localStorage.getItem(TagActiveKey)
}
// 设置当前路由path对应页签key
export const setTagsActive = (activeKey: string) => {
  return localStorage.setItem(TagActiveKey, activeKey)
}
// 删除当前路由path对应页签key
export const removeTagsActive = () => {
  return localStorage.removeItem(TagActiveKey)
}

// 解决页面content是一个容器，切换页面滚动条会互相影响，所以把当前页面滚动条存储在会话里
// session开始
// 会话存储当前scroll,设置会话的key统一以路由名称拼接Scroll，即name+Scroll
export const setSessionY = (pathname: string, y: number) => {
  const sessionScrollKey = `${pathname}Scroll`
  return sessionStorage.setItem(sessionScrollKey, Math.ceil(y).toString())
}
export const getSessionY = (pathname: string) => {
  const sessionScrollKey = `${pathname}Scroll`
  return Number(sessionStorage.getItem(sessionScrollKey) || 0)
}
export const removeSessionY = (pathname: string) => {
  const sessionScrollKey = `${pathname}Scroll`
  setSessionY(pathname, 0)
  return sessionStorage.removeItem(sessionScrollKey)
}
// session结束
