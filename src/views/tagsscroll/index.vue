<template>
  <div class="tags__container">
    <!--添加按钮手动向左滚动-->
    <div @click="handleScrollMenu('left')" :class="{ active: scroll.left }">
      <el-icon><DArrowLeft /></el-icon>
    </div>
    <el-scrollbar ref="scrollbarRef" @scroll="handleScroll">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        size="large"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        class="tagitem"
      >
        {{ tag }}
      </el-tag>
    </el-scrollbar>
    <!--添加按钮手动向右滚动-->
    <div @click="handleScrollMenu('right')" :class="{ active: scroll.right }">
      <el-icon><DArrowRight /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
const scrollbarRef = ref()
const scroll = reactive({
  left: false,
  right: false,
})
const dynamicTags = ref([
  'Tag 1',
  'Tag 2',
  'Tag 3',
  'Tag 4',
  'Tag 5',
  'Tag 6',
  'Tag 7',
  'Tag 8',
  'Tag 9',
  'Tag 10',
  'Tag 11',
  'Tag 12',
  'Tag 13',
  'Tag 14',
  'Tag 15',
])
// el-scrollbar设置左右滚动需要手写鼠标滚轮滚动事件
const setScrollPos = (e: any) => {
  // 检测鼠标滚轮滚动方向和速度的属性: 旧版浏览器e.wheelDelta 新版e.deltaY 返回数值表示滚动的像素量
  const wheelDelta = e.wheelDelta || -e.deltaY * 40
  // el-scrollbar的API-setScrollLeft设置滚动条到左边的距离
  scrollbarRef.value.setScrollLeft(scrollbarRef.value.wrapRef.scrollLeft - wheelDelta)
}
onMounted(() => {
  if (scrollbarRef.value) {
    // wrapRef滚动条包裹的滚动区域ref对象
    scrollbarRef.value.wrapRef.addEventListener(
      'wheel',
      (e: any) => {
        setScrollPos(e)
      },
      {
        passive: false,
      },
    )
  }
})
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}
// 滚动时计算左右是否可操作
const handleScroll = () => {
  scroll.left = scrollbarRef.value.wrapRef.scrollLeft !== 0
  scroll.right =
    scrollbarRef.value.wrapRef.scrollWidth - scrollbarRef.value.wrapRef.offsetWidth >
    scrollbarRef.value.wrapRef.scrollLeft
}
// 点击滚动菜单
const handleScrollMenu = async (direction: string) => {
  const scrollLeftDistance = scrollbarRef.value.wrapRef.scrollLeft
  const scrollRemainDistance =
    scrollbarRef.value.wrapRef.scrollWidth -
    scrollbarRef.value.wrapRef.offsetWidth -
    scrollLeftDistance
  if (direction == 'left' && scrollLeftDistance > 0) {
    scrollbarRef.value.setScrollLeft(scrollbarRef.value.wrapRef.scrollLeft - 100)
    // 或者
    // scrollbarRef.value.wrapRef.scrollLeft = scrollbarRef.value.wrapRef.scrollLeft - 100
  }
  if (direction == 'right' && scrollRemainDistance > 0) {
    scrollbarRef.value.setScrollLeft(scrollbarRef.value.wrapRef.scrollLeft + 100)
    // 或者
    // scrollbarRef.value.wrapRef.scrollLeft = scrollbarRef.value.wrapRef.scrollLeft + 100
  }
  handleScroll()
}
</script>
<style lang="scss" scoped>
.tags__container {
  height: 70px;
  display: flex;
  align-items: center;
  :deep(.el-scrollbar) {
    flex: 1;
    width: 100%;
    white-space: nowrap;
  }
  :deep(.el-scrollbar__view) {
    display: flex;
    gap: 8px;
  }
  :deep(.el-scrollbar__bar.is-horizontal) {
    opacity: 0; // 隐藏滚动条
  }
}
.active {
  cursor: pointer;
}
</style>
