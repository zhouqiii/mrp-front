import { defineStore } from 'pinia'
import { getTagsVisit, setTagsActive, setTagsVisit } from '@/utils/auth'

export type Itags = {
  title: string
  path: string
  query: object
  fullPath: string
  meta: object
}

interface AppConfig {
  siderCollapse: boolean | undefined // sider侧边栏是否折叠
  tagsVisit: Itags[] // 已经访问过的页面list
  tagsActive: string // 当前页签path
}
export const useApplication = defineStore({
  id: 'app-config',
  state: (): AppConfig => ({
    siderCollapse: false,
    tagsVisit: JSON.parse(getTagsVisit() || '[]'),
    tagsActive: '',
  }),
  getters: {
    getSiderCollapse(): boolean {
      return !this.siderCollapse
    },
  },
  actions: {
    setSiderCollapse(ifReverse: boolean, flag?: boolean) {
      this.siderCollapse = ifReverse ? this.getSiderCollapse : flag
    },
    setTagsVisit(info: Itags[]) {
      this.tagsVisit = info
    },
    // 新增或者更新已有页签，这里的info是route全信息
    async addTagsVisit(info: any) {
      const titleTar = { title: info.meta.title || info.title || 'no-name' }
      let tagvisitTarget = this.tagsVisit.find(
        (v) => v.path === info.path && v.fullPath === info.fullPath,
      )
      const assignTagVisit = {
        ...info,
        title: titleTar.title,
        meta: {
          ...tagvisitTarget?.meta,
          ...info.meta,
        },
      }
      // 如果路由完整路径不存在 tag 里，直接新增页签
      if (!this.tagsVisit.some((v) => v.path === info.path)) {
        this.tagsVisit.push(assignTagVisit)
      } else {
        // 如果路由路径在的, 但是页签路由参数信息改变，就需要更新页签信息
        const tagvisitTarIndex = this.tagsVisit.findIndex(
          (v) => v.fullPath !== info.fullPath && v.path === info.path,
        )
        if (tagvisitTarIndex > -1) {
          this.tagsVisit.splice(tagvisitTarIndex, 1, assignTagVisit)
        }
      }
      this.setTagsActive(assignTagVisit.path)
    },
    // 删除页签 需要删除state 删除缓存 改变activeKey
    async delTagsVisit(targetKey: string) {
      let lastIndex = 0 // 当前页签前一个index
      this.tagsVisit.forEach((pane, i) => {
        if (pane.path === targetKey) {
          lastIndex = i - 1
        }
      })
      const localTagsView = JSON.parse(getTagsVisit() || '[]')
      setTagsVisit(localTagsView.filter((item: Itags) => item.path !== targetKey))
      this.setTagsVisit(JSON.parse(getTagsVisit() || '[]'))
      if (this.tagsVisit.length && this.tagsActive === targetKey) {
        if (lastIndex >= 0) {
          this.setTagsActive(this.tagsVisit[lastIndex].path)
        } else {
          this.setTagsActive('/home')
        }
      }
    },
    setTagsActive(activeKey: string) {
      this.tagsActive = activeKey
      setTagsActive(activeKey)
    },
  },
})
