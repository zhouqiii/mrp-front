import { Tooltip, Tag } from 'ant-design-vue'
import type { ColumnProps } from 'ant-design-vue/es/table'
import { statusClassMap, tagsTextMap, statusTextMap, tagsClassMap } from '@/utils/constant'
export const columns: ColumnProps[] = [
  {
    title: '计划状态',
    dataIndex: 'status',
    fixed: 'left',
    width: '10%',
    customRender: ({ record, text }) => (
      <div class={['plan-style', statusClassMap.get(text)]}>{statusTextMap.get(text)}</div>
    ),
  },
  {
    title: '计划标签',
    dataIndex: 'tag',
    width: '10%',
    customRender: ({ record, text }) => (
      <div class={['plan-style', tagsClassMap.get(text)]}>{tagsTextMap.get(text)}</div>
    ),
  },
  {
    title: '生产计划名称',
    dataIndex: 'name',
    width: '25%',
    ellipsis: true,
  },
  {
    title: '生产计划编号',
    dataIndex: 'numb',
    width: '25%',
    ellipsis: true,
  },
  {
    title: '计划开始时间',
    dataIndex: 'startTime',
    width: '10%',
  },
  {
    title: '计划完工时间',
    dataIndex: 'endTime',
    width: '10%',
  },
  {
    title: '订单交货日期',
    dataIndex: 'date',
    width: '10%',
  },
]
