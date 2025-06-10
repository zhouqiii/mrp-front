import { useDebounceFn } from '@vueuse/core'
const baseSize = 16
export const setDomFontSize = () => {
  const scaleX = document.documentElement.clientWidth / 1920 // 这里按照1920*1280设计稿设置
  const scaleY = document.documentElement.clientHeight / 1280

  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * Math.min(scaleX, scaleY, 2) + 'px'
}

let setDomFontSizeDebounce = useDebounceFn(setDomFontSize, 100)
window.addEventListener('resize', setDomFontSizeDebounce)
setDomFontSize()
