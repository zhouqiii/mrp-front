<template>
  <div class="table-component">
    <!-- table -->
    <a-table
      :class="['ant-table-striped', { border: hasBordered }]"
      :rowClassName="(_, index) => (index % 2 === 1 ? 'table-striped' : '')"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      :row-selection="
        isHandleSelect
          ? {
              selectedRowKeys: selectedRowKeys,
              type: rowKey == 'forecastId' ? 'radio' : 'checkbox',
              onChange: onSelectChange,
            }
          : undefined
      "
      :rowKey="(record) => record[rowKey]"
      @change="handleTableChange"
      :scroll="scroll"
      size="middle"
    >
      <template #headerCell="{ title, column }">
        <template v-if="column.dataIndex === 'fileName'">
          <span style="margin-right: 12px">{{ title }}</span>
          <a-tooltip>
            <template #title>some tips</template>
            <InfoCircleOutlined />
          </a-tooltip>
        </template>
      </template>
      <template
        #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
            ref="searchInput"
            :placeholder="`搜索 ${column.title}`"
            :value="modelSearch[column.dataIndex]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e) => (modelSearch[column.dataIndex] = e.target.value ? e.target.value : '')"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(confirm)"
          >
            查询
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(column.dataIndex)"
            >重置</a-button
          >
        </div>
      </template>
      <!--筛选框图标-->
      <template #customFilterIcon="{ filtered }">
        <FilterOutlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #bodyCell="{ column, text, index, record }">
        <template v-if="column.key === 'toIndex'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.key === 'toDate'">
          <span>{{ text ? formatDate(text) : '-' }}</span>
        </template>
        <template v-if="column.key === 'toDateTime'">
          <span>{{ text ? formatDate(text, 'time') : '-' }}</span>
        </template>
        <!-- 函数式写法自定义 操作列 -->
        <div v-if="column.key === 'action'" class="action-style">
          <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
            <Action :action="action" :record="record" @handleClick="action.onClick()"></Action>
            <!-- 分割线 -->
          </template>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import type { FilterValue } from 'ant-design-vue/es/table/interface'
import type { AAction } from './types'
import { usePagination } from 'vue-request'
import { formatToDate, formatToDateTime } from '@/utils/dateUtil'
import { usePermission } from '@/hooks/usePermission'
import { useRole } from '@/hooks/useRole'
import type { TablePaginationConfig } from 'ant-design-vue/lib/table/interface'
import Action from './action.vue'

interface DataType {
  id: string | number
  fileName: string
  fileType: string | number
  filePath: string
  postId: string
}
// const req = () => new Promise((resolve) => resolve({ total: 0, list: [] }));

export default defineComponent({
  components: { Action },
  props: [
    'bordered',
    'ifSelect', // 表格是否是可选表格
    'url' /* 请求接口 promise */,
    'columns' /* Table组件：columns 不包含操作列 */,
    'actions' /* Table组件：操作列 */,
    'resKey',
    'scroll',
    'parameter',
    'tableType',
  ],
  setup(props, { emit }) {
    const { hasPermission } = usePermission()
    const { query } = useRoute()
    const { hasRole } = useRole()
    const isHandleSelect = computed(() => props.ifSelect ?? false)
    const rowKey = computed(() => (props.tableType == 'overview' ? 'forecastId' : 'id'))
    const paramList =
      props.tableType == 'overview'
        ? Object.assign(props.parameter || {}, {
            model: query.model || '计划',
            forecastId: query.forecastId || '',
          })
        : props.parameter || {}
    const { data, run, loading, current, pageSize, refresh, total } = usePagination(props.url, {
      defaultParams: [paramList], // 触发的传参
      pagination: {
        pageSizeKey: 'limit',
        currentKey: 'page',
        totalKey: 'total', // 取值 data:{ data, total } 从 { 中开始 }
      },
    })
    const dataSource = computed(
      () =>
        data?.value?.data || [
          {
            fileName: '11111111111111',
            id: '2341',
            status: '3',
          },
          {
            fileName: '22222222222222',
            id: '2222',
          },
        ],
    )
    const hasBordered = computed(() => props.bordered ?? true)
    const pagination = computed(() => ({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: () => h('span', {}, `共${total.value}条`),
    }))
    const modelSearch = reactive<Record<string, string>>({}) // 模型列筛选框输入的数据
    // 模型列筛选查询按钮
    const handleSearch = (confirm: () => void) => {
      confirm()
      emit('filterModel', modelSearch)
      run({ page: current.value, limit: pageSize.value, ...paramList, ...modelSearch })
    }
    // 模型列筛选重置按钮
    const handleReset = (key: string) => {
      modelSearch[key] = ''
    }
    const handleTableChange = (
      pag: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: any,
    ) => {
      run({
        limit: pag!.pageSize!,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
        ...paramList,
      })
    }

    // action 操作列
    const getActions = computed(() => {
      return (
        (toRaw(props.actions) || [])
          // .filter((action) => hasPermission(action.auth))
          .map((action: AAction) => {
            const { popConfirm } = action
            return {
              type: 'link',
              ...action,
              ...(popConfirm || {}),
              enable: !!popConfirm,
              permission: hasPermission(action.auth) && hasRole(action.role),
            }
          })
      )
    })

    const goRun = () => {
      run({ page: current.value, limit: pageSize.value, ...paramList })
    }
    // 日期格式化
    const formatDate = (val: string, type: 'date' | 'time' = 'date') => {
      const formatFn = type === 'date' ? formatToDate : formatToDateTime
      return val.length === 10 ? formatFn(Number(val) * 1000) : formatFn(val)
    }
    const selectedRowKeys = ref<DataType['id'][]>([])
    const handleEmit = (value) => {
      emit('selectChange', value)
    }
    const onSelectChange = (changableRowKeys: string[]) => {
      console.log('selectedRowKeys changed: ', changableRowKeys)
      selectedRowKeys.value = changableRowKeys
      handleEmit(changableRowKeys)
    }
    // 选中项的当前行数据list
    const getSelectRows = computed(() =>
      dataSource.value.filter((item) => selectedRowKeys.value.includes(item[rowKey.value])),
    )

    return {
      dataSource: dataSource,
      loading,
      pagination,
      hasBordered,
      rowKey,
      isHandleSelect,
      modelSearch,
      handleReset,
      handleSearch,
      handleTableChange,
      run,
      goRun,
      refresh,
      getActions,
      // filter
      selectedRowKeys,
      getSelectRows,
      formatDate,
      onSelectChange,
      handleEmit,
    }
  },
})
</script>
<style lang="scss" scoped>
.border {
  border: 0.5px solid rgba(210, 210, 210, 0.5);
}
.action-style {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
