import { setSessionY, getSessionY } from '@/utils/auth'

export const useScroll = (elRef: Ref<HTMLDivElement>) => {
  const route = useRoute()
  const routename = String(route.name)
  const scrollPosition = ref(0)
  const scrollContainer = elRef
  const { run } = useDebounceFn(
    (event: any) => {
      scrollPosition.value = event.target.scrollTop
    },
    {
      wait: 500,
    },
  )
  const getScrollY = () => {
    const scrollPos = getSessionY(routename)
    scrollContainer.value.scrollTo(0, scrollPos)
  }
  onMounted(() => getScrollY())
  // 销毁回话缓存放在当前路由对应的tabs删除动作里
  // onUnmounted(() => sessionStorage.removeItem(localScrollKey))
  onBeforeRouteLeave(() => setSessionY(routename, scrollPosition.value))
  return {
    run,
  }
}
