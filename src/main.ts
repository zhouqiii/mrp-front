import './assets/main.css'
import '@/styles/index.scss'
import 'ant-design-vue/dist/reset.css'
import './public-path'
import * as Icons from '@ant-design/icons-vue'
import NewModal from '@/components/Modal/index.vue'
import NewUpload from '@/components/Upload/index.vue'
import './router/permission'
import config from '@/config/index' // 全局配置
import { reqIsSucceed } from '@/utils'
import { useMessage } from '@/hooks/useMessage' // 全局提示
import OneButton from '@/components/Button/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import './index.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'

import vue3TreeOrg from 'vue3-tree-org'
import 'vue3-tree-org/lib/vue3-tree-org.css'

// 根据屏幕大小动态设置根元素font-size
import '@/utils/rem'
/**
 * 手动引入组件注册
 * 如果在意unplugin-vue-components插件的自动引入性能问题，可以考虑该方式
 */
import {
  Tooltip,
  Upload,
  Checkbox,
  Alert,
  Anchor,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  Layout,
  Modal,
  Menu,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
  Table as AntdTable,
  Drawer,
  Switch,
  Flex,
} from 'ant-design-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import './twclass.ts'
const icons: any = Icons
let instance: any = null
const { createMessage } = useMessage()

function render(props: any = {}) {
  const { container } = props
  instance = createApp(App)
  instance.config.globalProperties.$config = config
  instance.config.globalProperties.reqIsSucceed = reqIsSucceed
  instance.config.globalProperties.createMessage = createMessage
  instance.use(router)
  instance.component('OneModal', NewModal)
  instance.component('Upload', NewUpload)
  // 自定义组件
  instance.component('OneButton', OneButton)
  instance.component('SvgIcon', SvgIcon)

  for (let i in icons) {
    instance.component(i, icons[i])
  }
  instance.use(vue3TreeOrg)
  instance
    .use(createPinia())
    .use(Checkbox)
    .use(Alert)
    .use(Anchor)
    .use(Avatar)
    .use(Breadcrumb)
    .use(Button)
    .use(Card)
    .use(Col)
    .use(DatePicker)
    .use(Divider)
    .use(Dropdown)
    .use(Form)
    .use(Input)
    .use(Layout)
    .use(Menu)
    .use(Popconfirm)
    .use(Row)
    .use(Select)
    .use(Space)
    .use(Spin)
    .use(Tabs)
    .use(AntdTable)
    .use(Tooltip)
    .use(Modal)
    .use(Upload)
    .use(Drawer)
    .use(Switch)
    .use(Flex)
  instance?.mount(container ? container.querySelector('#base') : '#base')
}
renderWithQiankun({
  async mount(props: any) {
    console.log('子应用获取与主应用的通信方法', props)
    await props.onGlobalStateChange((state: any) => {
      console.log('子应用接收的参数', state, state.tag.name)
    }, true)
    render(props)
  },
  bootstrap() {
    console.log('%c', 'color:green;', ' ChildOne bootstrap')
  },
  update() {
    console.log('%c', 'color:green;', ' ChildOne update')
  },
  unmount(props: any) {
    console.log('unmount', props)
    instance.unmount()
    instance._container.innerHTML = ''
    instance = null
  },
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('并不是qiankun渲染')
  render()
}
