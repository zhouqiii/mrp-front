<template>
  <div class="tableSetting">
    <div class="header">
      <a-button type="primary" class="btn" ghost size="middle" @click="ifDrawer = !ifDrawer">
        <template #icon>
          <svg-icon name="setting" width="1.2em" height="1.2em" class="icon" />
        </template>
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      bordered
      size="small"
      v-if="columns"
      @resizeColumn="handleResizeColumn"
      :scroll="{ y: 'calc(100vh - 280px)' }"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column">
          <template v-if="column.key === 'number'">
            <span>{{ index + 1 }}</span>
          </template>
        </template>
      </template>
    </a-table>
    <div v-if="ifDrawer">
      <TableSet
        :ifDrawer="ifDrawer"
        @handleDrawer="handleDrawer"
        :columnsData="columnsData"
        ref="tablesetref"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ColumnProps } from 'ant-design-vue/es/table'
import type { MyObj } from '@/api/test/model'
import TableSet from '@/components/TableSet/index.vue'
import type { IColumns } from '@/components/TableSet/index.vue'
import fetchapi from '@/api/test/test'
type IDataKey = 'code' | 'name' | 'group'
type IData = {
  [key in IDataKey]: string
} & MyObj

const tablesetref = ref()
let ifDrawer = ref<boolean>(false)
const columnsData = ref<IColumns[]>([])
const columns = ref<ColumnProps[]>([]) // 如果要设置表格列可拖拽，表格columns必须设置成ref响应式
const dataSource = ref<IData[]>([
  {
    code: '00069393',
    name: '周18',
    group: '徐工集团',
    mobile: '13622028251',
    email: '00069393@xcmg.com',
    sex: 'male',
    entrydate: '2024-11-11',
  },
  {
    code: '00069392',
    name: '周24',
    group: '徐工集团2',
  },
  {
    code: '00069392',
    name: '周24',
    group: '徐工集团2',
  },
])

// 获取当前表格设置,根据表格设置更新当前表格，并在drawer里展示表格设置
const getTableSet = async (flag?: boolean) => {
  if (flag) {
    columnsData.value = tablesetref.value.columnsData
    return
  }
  columnsData.value = [
    {
      title: '序号',
      key: 'number',
      alignment: 'center',
      hide: '0',
      freeze: '1',
    },
    {
      title: '员工编码',
      key: 'code',
      alignment: 'left',
      hide: '0',
      freeze: '0',
    },
    {
      title: '员工名称',
      key: 'name',
      alignment: 'center',
      hide: '0',
      freeze: '0',
    },
    {
      title: '员工组织',
      key: 'group',
      alignment: 'right',
      hide: '0',
      freeze: '0',
    },
    {
      title: '手机号码',
      key: 'mobile',
      alignment: 'left',
      hide: '0',
      freeze: '0',
    },
    {
      title: '性别',
      key: 'sex',
      alignment: 'left',
      hide: '0',
      freeze: '0',
    },
    {
      title: '邮箱',
      key: 'email',
      alignment: 'left',
      hide: '0',
      freeze: '0',
    },
    {
      title: '入职日期',
      key: 'entrydate',
      alignment: 'left',
      hide: '0',
      freeze: '0',
    },
  ]
  // const res = await fetchapi.getcolumns({ type: 'xxx' })
  // if (res.code == 0) {
  //   columnsData.value = res.data
  // }
}
// 关闭drawer，刷新列表
const handleDrawer = async (flag: boolean) => {
  if (flag) {
    getTableSet(true)
  }
  ifDrawer.value = false
}
// 表格列宽调整
const handleResizeColumn = (w: number, col: any) => {
  col.width = w
}
watch(
  () => columnsData,
  () => {
    columns.value = columnsData.value
      .filter((item: IColumns) => item.hide !== '1')
      .map((item: IColumns) => ({
        title: item.title,
        dataIndex: item.key,
        key: item.key,
        align: item.alignment == 'default' ? 'center' : item.alignment,
        fixed: item.freeze == '0' ? false : 'left',
        ellipsis: true,
        resizable: true,
        width: 220,
        minWidth: 220,
        maxWidth: 800,
      })) as ColumnProps[]
  },
  {
    deep: true,
    immediate: true,
  },
)
onMounted(() => getTableSet())
</script>
<style lang="scss" scoped>
.header {
  height: 46px;
  .btn {
    @include flex-row(center);
  }
}
</style>
