import { onUnmounted, reactive, ref, watch } from 'vue'
import '../types/global.d.ts'

export const useLocalStorage = (key: string, defaultVal: TodoItem[]) => {
  const value = ref(JSON.parse(localStorage.getItem(key) as string) || defaultVal)
  const setValue = (newVal: TodoItem[]) => {
    localStorage.setItem(key, JSON.stringify(newVal))
    value.value = newVal
  }
  const stopWatch = watch(
    () => value.value,
    (newVal) => localStorage.setItem(key, JSON.stringify(newVal)),
    { immediate: true },
  )
  onUnmounted(stopWatch)

  const clearValue = () => localStorage.removeItem(key)
  return {
    value,
    setValue,
    clearValue,
  }
}

export const useLocal = (key: string, defaultVal: LocalItem) => {
  let value = reactive(JSON.parse(localStorage.getItem(key) as string) || defaultVal)
  const setValue = (newVal: LocalItem) => {
    localStorage.setItem(key, JSON.stringify(newVal))
    value = newVal
  }
  const stopWatch = watch(
    () => value,
    (newVal) => localStorage.setItem(key, JSON.stringify(newVal)),
    { immediate: true, deep: true },
  )
  onUnmounted(stopWatch)

  const clearValue = () => localStorage.removeItem(key)
  return {
    value,
    setValue,
    clearValue,
  }
}
