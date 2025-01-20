type IOptionKey = 'agency' | 'model' | 'description' | 'configuration'
type IRequireKey = 'keyItem' | 'ym202501' | 'ym202502' | 'ym202503' | 'ym202504'

export type IOptionData = {
  [key in IOptionKey]?: string
}

export type IData = {
  [key in IOptionKey]?: string
} & {
  [key in IRequireKey]: string
} & MyObj
