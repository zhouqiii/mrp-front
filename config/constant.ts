/**
 * @name Config
 * @description 项目配置
 */

// 应用名
export const APP_TITLE = 'ZQ-DEMO'
// 本地服务端口
export const VITE_PORT = 5173

// api 前缀 作为BASE_URL 这里生产和测试前缀都是/api
export const API_PREFIX = '/api'

// serve 这里本地和线上代理api 前缀都是/api
export const API_BASE_URL = '/api'
// 获取法定节假日接口的代理api前缀
export const API_OPENAPI_URL = '/openapi'
export const API_OPENAPI_TARGET_URL = 'https://oneapi.coderbox.cn/openapi'
// 获取法定节假日可连续标注接口的代理api前缀
export const API_TIMER_URL = '/holiday'
export const API_TIMER_TARGET_URL = 'http://timor.tech/api/holiday'
export const API_TARGET_URL = 'http://10.189.91.107:8280' // http://192.168.3.156:8281

// 本地 test
export const MOCK_API_BASE_URL = '/mock/api'
export const MOCK_API_TARGET_URL = 'http://localhost:3000'

// iconfontUrl
export const ICONFONTURL = '//at.alicdn.com/t/c/font_4768367_dfozzw1fyxn.js'

// 包依赖分析
export const ANALYSIS = true

// 代码压缩
export const COMPRESSION = true

// 删除 console
export const VITE_DROP_CONSOLE = true
