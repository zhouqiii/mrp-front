import type { ColumnProps } from 'ant-design-vue/es/table'
import { router } from '@/router'
const typeMap = new Map()
  .set('1', '销售数据')
  .set('2', '大盘数据')
  .set('3', '销售人员预测数据')
  .set('4', '商机')
const jumpTo = (row: any) => {
  if (row.forecastId) {
    router.push({
      path: '/app/result/overview',
      query: {
        forecastId: row.forecastId,
      },
    })
  }
}
const downLoadFile = (record: any) => {
  window.open(`/api/original/download?fileName=${record.fileName}&filePath=${record.filePath}`)
}
export const columns: ColumnProps[] = [
  {
    title: '文件名',
    dataIndex: 'fileName',
    width: '30%',
    ellipsis: true,
    customRender: ({ text, record }) => {
      return (
        <span style="color: #3860F4;cursor: pointer" onClick={() => downLoadFile(record)}>
          {text}
        </span>
      )
    },
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    width: '15%',
    customRender: ({ text }) => {
      const fileTypeName = typeMap.get(text)
      return fileTypeName
    },
  },
  {
    title: '文件路径',
    dataIndex: 'filePath',
    width: '15%',
    customFilterDropdown: true,
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    width: '200px',
    customFilterDropdown: true,
  },
  {
    title: '结果ID',
    dataIndex: 'forecastId', //id
    width: '10%',
    customRender: ({ text, record }) => {
      return (
        <span style="color: #3860F4;cursor: pointer" onClick={() => jumpTo(record)}>
          {text ? text : '-'}
        </span>
      )
    },
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'center',
    width: '90px',
    key: 'action',
  },
]
