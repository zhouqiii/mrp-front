<template>
  <div>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :bordered="true"
        :expandedRowKeys="expandedRowKeys"
        :loading="loading"
        @expand="getInnerData"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <template #expandedRowRender="{ record, index }">
          <div>{{ JSON.stringify(record) }}</div>
          <div>{{ index }}</div>
          <div>{{ inndata }}</div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'operation'">
            <a>Publish{{ record.name }}</a>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import type { ColumnProps } from 'ant-design-vue/es/table'
import type { TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import type { FilterValue } from 'ant-design-vue/es/table/interface'
import { usePagination } from 'vue-request'
import fetchApi from '@/api/test/test'
interface MyObj {
  [key: string]: any
}
interface IModel extends MyObj {
  fileName: String
  filePath: string
  createTime: string
  id: number
  key: string
}
let expandedRowKeys = reactive<string[]>([])
let inndata = ref('')
// let pagination = reactive<TablePaginationConfig>({
//   //分页
//   showSizeChanger: true, //是否分页
//   pageSize: 10, //一页显示多少条
//   total: 1, //总条数
//   current: 1, //当前显示页面
//   pageSizeOptions: ['10', '20', '30'],
//   showQuickJumper: true,
//   showTotal: (total) => `共计 ${total}条`, //显示总数
//   onShowSizeChange: (current, pagesize) => {
//     pagination.current = current
//     pagination.pageSize = pagesize
//     run({
//       page: current,
//       limit: pageSize,
//     })
//   },
//   onChange: (current, pageSize) => {
//     pagination.current = current
//     run({
//       page: current,
//       limit: pageSize,
//     })
//   },
// })
const columns = ref<ColumnProps[]>([
  {
    title: '文件名',
    dataIndex: 'fileName',
    key: 'fileName',
  },
  {
    title: '文件路径',
    dataIndex: 'filePath',
    key: 'filePath',
  },
  {
    title: '上传时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  { title: 'Action', key: 'operation' },
])
const params = {
  filePath: '',
} // 默认入参
const { data, run, loading, current, pageSize, refresh, total } = usePagination(
  fetchApi.featuredata,
  {
    formatResult: ({ data, total }: { data: any; total: number }) => ({ data, total }),
    defaultParams: [params], // 触发的传参 usePagination默认设置页号为1 每页10条
    pagination: {
      pageSizeKey: 'limit',
      currentKey: 'page',
      totalKey: 'total', // 取值 data:{ data, total } 从 { 中开始 }
    },
  },
)
const pagination = computed(() => ({
  //分页
  showSizeChanger: true, //是否分页
  pageSize: pageSize.value, //一页显示多少条
  total: total.value, //总条数
  current: current.value, //当前显示页面
  pageSizeOptions: ['10', '20', '30'],
  showQuickJumper: true,
  showTotal: () => `共计 ${total.value}条`, //显示总数
}))
// 表格变化时触发：when table pagination, filters or sorter is changed
const handleTableChange = (
  pag: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: any,
) => {
  run({
    limit: pag!.pageSize!,
    page: pag!.current as number,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
    ...params,
  })
}
const resData = computed(() => data?.value?.data || [])
const dataSource = computed(
  () =>
    resData.value.map((item: any) => ({
      ...item,
      key: item.id, // 表格嵌套的要求的key,识别展开的哪一行
    })) as IModel[],
)
// 表格展开时发送请求获取展开数据
const getInnerData = (expanded: boolean, record: IModel) => {
  expandedRowKeys.splice(0, expandedRowKeys.length)
  if (expanded) {
    expandedRowKeys.push(record.key) // dataSource每一行数据应该有一个key,expandedRowKeys的值固定的去和每一行的key比对确定展开的是哪一行
    inndata.value = `重置嵌套数据${record.key}`
  }
}
onMounted(() => {})
</script>
<style scoped></style>
