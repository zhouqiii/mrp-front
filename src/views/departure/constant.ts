import type { ColumnProps } from 'ant-design-vue/es/table'
import type { IOptionData } from '@/views/departure/types'
import type { IColumns } from '@/components/TableSet/index.vue'

// 进销存/产销存发车计划 关键项枚举
const keyItemsEnums: string[] = [
  '期初库存',
  '分销商销售预测',
  '分销商要货预测',
  '期末库存',
  '期末DOS',
  'DOS基线',
]
const keyItemsFixEnums: string[] = ['期初库存', '期末库存', '期末DOS', 'DOS基线']

const pointField = 'keyItem' // 关键项字段定义

const fixedColumnEnums: ColumnProps[] = [
  {
    title: '关键项',
    key: pointField,
    dataIndex: pointField,
    align: 'left',
  },
  {
    title: '2025年1月',
    key: 'ym202501',
    dataIndex: 'ym202501',
    align: 'center',
  },
  {
    title: '2025年2月',
    key: 'ym202502',
    dataIndex: 'ym202502',
    align: 'center',
  },
  {
    title: '2025年3月',
    key: 'ym202503',
    dataIndex: 'ym202503',
    align: 'center',
  },
  {
    title: '2025年4月',
    key: 'ym202504',
    dataIndex: 'ym202504',
    align: 'center',
  },
]
// 要填报值的列dataIndex
const fixedDataIndexEnums: string[] = fixedColumnEnums
  .map((item: ColumnProps) => item.dataIndex)
  .filter((item: any) => item !== pointField) as string[]
const columnsDataEnums: IColumns[] = [
  {
    title: '序号',
    key: 'number',
    alignment: 'center',
    hide: '0',
    freeze: '1',
  },
  {
    title: '经销商',
    key: 'agency',
    alignment: 'left',
    hide: '0',
    freeze: '0',
  },
  {
    title: '销售型号',
    key: 'model',
    alignment: 'left',
    hide: '0',
    freeze: '0',
  },
  {
    title: '物料描述',
    key: 'description',
    alignment: 'left',
    hide: '0',
    freeze: '0',
  },
  {
    title: '增选配置',
    key: 'configuration',
    alignment: 'left',
    hide: '0',
    freeze: '0',
  },
  {
    title: '办事处',
    key: 'office',
    alignment: 'left',
    hide: '1',
    freeze: '0',
  },
  {
    title: '大区',
    key: 'region',
    alignment: 'left',
    hide: '1',
    freeze: '0',
  },
  {
    title: '区域',
    key: 'area',
    alignment: 'left',
    hide: '1',
    freeze: '0',
  },
  {
    title: '产品门类',
    key: 'pcatagory',
    alignment: 'left',
    hide: '1',
    freeze: '0',
  },
  {
    title: '产品族',
    key: 'pfamily',
    alignment: 'left',
    hide: '1',
    freeze: '0',
  },
  {
    title: '产品线',
    key: 'pline',
    alignment: 'left',
    hide: '1',
    freeze: '0',
  },
]

const testDataEnums: IOptionData = {
  agency: '山东悍马',
  model: 'XCT5L6',
  description: '汽车起重机XCT5L6(国VI)',
  configuration: '东风华神京六',
}
// [
//   {
//     agency: '山东悍马',
//     model: 'XCTBL4_1',
//     description: '汽车起重机XCTBL4_1(国VI)',
//     configuration: '东风华神京六',
//   },
// ]
export {
  keyItemsEnums,
  keyItemsFixEnums,
  fixedDataIndexEnums,
  pointField,
  fixedColumnEnums,
  columnsDataEnums,
  testDataEnums,
}
