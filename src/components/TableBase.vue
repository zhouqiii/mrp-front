<template>
  <!--:scroll="{ x: 500, y: 180 }"-->
  <!--table如果设置了scroll x上会受到父元素flex布局的影响 需要给父元素设置width table的scroll x才会生效 -->
  <a-table
    bordered
    :dataSource="dataSource"
    :columns="columns"
    :scroll="scroll"
    size="middle"
    :row-class-name="(_, index) => (index % 2 === 1 ? 'table-striped' : '')"
  />
</template>
<script lang="ts" setup>
import type { ColumnProps } from 'ant-design-vue/es/table'
import { tableBaseData } from '@/views/signboard/constant'
import { computed, reactive } from 'vue'
import { columns } from './context'
import '@/types/global.d.ts'
const dataSource = reactive(tableBaseData)
const propsData = withDefaults(defineProps<{ scroll?: TableScroll }>(), {
  scroll: () => ({}),
})
const scroll = computed(() => propsData.scroll)
</script>
<style scoped lang="scss"></style>
