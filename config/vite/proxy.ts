/**
 * Generate proxy
 */

import {
  API_BASE_URL,
  API_TARGET_URL,
  API_OPENAPI_URL,
  API_TIMER_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL,
  API_OPENAPI_TARGET_URL,
  API_TIMER_TARGET_URL,
} from '../../config/constant'
import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

const ret: ProxyTargetList = {
  // test
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
  },
  [API_OPENAPI_URL]: {
    target: API_OPENAPI_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_OPENAPI_URL}`), ''),
  },
  [API_TIMER_URL]: {
    target: API_TIMER_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_TIMER_URL}`), ''),
  },
  // mock
  // [MOCK_API_BASE_URL]: {
  //   target: MOCK_API_TARGET_URL,
  //   changeOrigin: true,
  //   rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
  // },
}

export default ret
