import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'

import { Modal, message as Message, notification } from 'ant-design-vue'
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'

import type { NotificationArgsProps, ConfigProps } from 'ant-design-vue/lib/notification'
import { isString } from '@/utils/is'
import myMessage from '@/components/Message/index.js'

// 手动引入 message样式
import 'ant-design-vue/es/message/style'
import 'ant-design-vue/es/notification/style'

export interface NotifyApi {
  info(config: NotificationArgsProps): void
  success(config: NotificationArgsProps): void
  error(config: NotificationArgsProps): void
  warn(config: NotificationArgsProps): void
  warning(config: NotificationArgsProps): void
  open(args: NotificationArgsProps): void
  close(key: String): void
  config(options: ConfigProps): void
  destroy(): void
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
export declare type IconType = 'success' | 'info' | 'error' | 'warning'
// Omit<ModalFuncProps, 'iconType'> Omit忽略属性 这里是忽略类型ModalFuncProps中的iconType属性
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'warning' | 'success' | 'error' | 'info'
}
// Partial 设置可选属性 Partial<ModalOptionsEx>就是把类型ModalOptionsEx中的所有属性都设置成可选
// Pick从一个父类型中挑选某些属性形成子类型 Pick<ModalOptionsEx, 'content'> 就是从ModalOptionsEx中挑选content属性形成子类 等价于
// const ModalOptionsExCh = Pick<ModalOptionsEx, 'content'>等价于 interface ModalOptionsExCh { content: xx }
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>

interface ConfirmOptions {
  info: ModalFunc
  success: ModalFunc
  error: ModalFunc
  warn: ModalFunc
  warning: ModalFunc
}

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled class="modal-icon-warning" />
  } else if (iconType === 'success') {
    return <CheckCircleFilled class="modal-icon-success" />
  } else if (iconType === 'info') {
    return <InfoCircleFilled class="modal-icon-info" />
  } else {
    return <CloseCircleFilled class="modal-icon-error" />
  }
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return <div innerHTML={`<div>${content as string}</div>`}></div>
  } else {
    return content
  }
}

/**
 * @description: Create confirmation box
 */
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options),
  }
  return Modal.confirm(opt) as unknown as ConfirmOptions
}

const getBaseOptions = () => {
  return {
    okText: '确定',
    centered: true,
  }
}

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  }
}
//options配置： Modal的api配置选项
// {
//   okText: string,
//   title: string,
//   content: string | HTMLElement
//   ...
// }
function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'))
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'close'))
}

function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'))
}

function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'))
}

notification.config({
  placement: 'topRight',
  duration: 3,
})

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: Message,
    myMessage: myMessage,
    notification: notification as NotifyApi,
    createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  }
}
