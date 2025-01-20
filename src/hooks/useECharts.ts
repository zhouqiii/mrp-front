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
    legendselectchanged()
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
  const setSeries = (option: EChartsOption, seriesIndex: number, pos: number) => {
    if (option.series instanceof Array) {
      option.series[seriesIndex]!.data! = (
        option.series[seriesIndex]!.data! as number[] | number[][]
      ).map((val: number[] | number, i: number) => [
        pos + i * 100,
        val instanceof Array ? val[1] : val,
      ])
    }
  }
  // echarts图表图例点击事件-折柱混合时，修改折线拐点对齐位置
  const legendselectchanged = () => {
    chartInstance?.on('legendselectchanged', function (params: any) {
      const option = getOptions.value
      if (getOptions.value.title!.text == '销售目标达成率') {
        const show = Object.entries(params.selected)
          .filter((i) => i[0].indexOf('达成率') < 0)
          .filter((i) => i[1])
        const len = show.length
        if (len == 0) {
          setSeries(option, 2, 50)
        } else if (len == 1) {
          if (show[0][0] == '发车计划') {
            setSeries(option, 2, 50)
          } else {
            if (option.series instanceof Array) {
              option.series[0].xAxisIndex = 1
            }
            setSeries(option, 0, 30)
            setSeries(option, 2, 70)
          }
        } else {
          if (option.series instanceof Array) {
            option.series[0].xAxisIndex = 0
            option.series[0].data = (option.series[0]!.data! as number[][] | number[]).map(
              (val: number[] | number) => (val instanceof Array ? val[1] : val),
            )
          }

          setSeries(option, 2, 70)
        }
        chartInstance?.setOption({
          series: option.series,
        })
      }
    })
  }
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
    chartInstance,
  }
}
