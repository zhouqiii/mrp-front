import { createVNode, render } from 'vue'
import Message from './index.vue'

// 定义一个div容器
const div = document.createElement('div')
// 将定义的容器添加到dom上
document.body.appendChild(div)

// 定义定时器，一定时间后删除
let timer: number | null = null
export default ({
  type,
  content,
  duration = 2,
  dangerouslyUseHTMLString = false,
}: {
  type: string
  content: string
  duration?: number
  dangerouslyUseHTMLString?: boolean
}) => {
  // 调用创建虚拟dom的方法
  // 第一个参数为要创建的虚拟节点，即编写好的vue组件
  // 第二个参数为向vue组件传的props的属性
  const vnode = createVNode(Message, {
    options: { type, content, duration, dangerouslyUseHTMLString },
  })
  // 调用渲染方法，将虚拟节点渲染到dom中
  render(vnode, div)
  timer && clearTimeout(timer)
  timer = window.setTimeout(() => {
    render(null, div)
  }, duration * 1000)
}
