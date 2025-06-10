<template>
  <div
    class="canvas relative px-12 pt-24"
    :style="{
      color: '#ffffff',
      fontSize: '48px',
      width: canvasWidth + 'px',
      height: canvasHeight + 'px',
      ...canvasStyle,
    }"
  >
    <div>
      <img src="@/assets/mechanism.png" />
      <div>111</div>
      <div>2222</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const canvasWidth = ref(1920) // 画布宽-设计稿设置的宽
const canvasHeight = ref(1280) // 画布高-设计稿设置的高
const canvasStyle = reactive({
  transform: '',
  transformOrigin: `left top`, // 改成以左上角为变换原点
})

const handleResize = () => {
  // 当前窗口宽高比例
  let windowWidth = window.innerWidth
  let windowHeight = window.innerHeight
  let windowRatio = windowWidth / windowHeight
  // 画布原始宽高比例
  const canvasRatio = canvasWidth.value / canvasHeight.value
  // 计算画布适应后的新宽高
  let newCanvasWidth = 0
  let newCanvasHeight = 0
  if (canvasRatio > windowRatio) {
    // 画布的宽高比大于屏幕的宽高比
    // 画布的宽度调整为屏幕的宽度
    newCanvasWidth = windowWidth
    // 画布的高度根据画布原比例进行缩放
    newCanvasHeight = windowWidth / canvasRatio
  } else {
    // 画布的宽高比小于屏幕的宽高比
    // 画布的高度调整为屏幕的高度
    newCanvasHeight = windowHeight
    // 画布的宽度根据画布原比例进行缩放
    newCanvasWidth = windowHeight * canvasRatio
  }
  console.log(newCanvasWidth, newCanvasHeight, 'newcanvas')
  console.log(canvasWidth.value, canvasHeight.value, 'canvas')
  const scaleX = newCanvasWidth / canvasWidth.value
  const scaleY = newCanvasHeight / canvasHeight.value
  console.log(scaleX, scaleY, 'scaleX scaleY')
  // 窗口的宽高减去画布适应后的新宽高，即剩余的空间，再除以2进行居中显示，为什么还要除以缩放值呢，因为translate的值也会随scale进行缩放，比如translateX计算出来为100，scaleX为0.5，那么实际上最终的偏移量为100*0.5=50，这显然不对，所以我们除一个缩放值进行抵消
  const translateX = (windowWidth - newCanvasWidth) / 2 / scaleX
  const translateY = (windowHeight - newCanvasHeight) / 2 / scaleY
  console.log(translateX, translateY, 'translateX translateY')
  // canvasStyle.transform = `scale(${scaleX}, ${scaleY}) translate(${translateX}px, ${translateY}px)`
}
const debounce = (fn: any, delay: number) => {
  let timer: any
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
const cancalDebounce = debounce(handleResize, 500)
onMounted(() => {
  cancalDebounce()
  window.addEventListener('resize', cancalDebounce)
})
</script>
<style lang="scss" scoped>
.cus-bg-size {
  background-size: 100% 100%;
}
.tw-flex-row-center {
  font-size: 32px;
}
</style>
