import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { watch } from 'vue'
import { useTimeoutFn } from '@/hooks/useTimeout'
import { tryOnUnmounted } from '@vueuse/core'
import type { Fn } from '@vueuse/core'
import { unref, nextTick, computed, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useEventListener } from '@/hooks/useEventListener'
import echarts from '@/utils/echarts'

export function useECharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'default',
) {
  const getDarkMode = computed(() => {
    return theme
  })
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  const cacheOptions = ref({}) as Ref<EChartsOption>
  let removeResizeFn: Fn = () => {}
  // useDebounceFn 是一个超载的服务处理：如果你继续询问他，你的请求将被忽略，直到你停下来并给他一些时间考虑你最新的询问，防抖
  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    } as EChartsOption
  })

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el)
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    })
    removeResizeFn = removeEvent
    if (el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    // 防止页面初始化渲染时，dom的高度还没有渲染出来，echarts绘制canvas的高度为0
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts()

          if (!chartInstance) return
        }
        clear && chartInstance?.clear()

        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }
  // echarts图表canvas区域改变时
  function resize() {
    chartInstance?.resize()
  }

  watch(
    () => getDarkMode.value,
    () => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts()
        setOptions(cacheOptions.value)
      }
    },
  )

  tryOnUnmounted(() => {
    if (!chartInstance) return
    removeResizeFn()
    chartInstance.dispose()
    chartInstance = null
  })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts()
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  }
}
