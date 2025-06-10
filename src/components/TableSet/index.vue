<template>
  <div>
    <a-drawer
      v-model:open="ifOpen"
      class="drawer"
      root-class-name="root-class-name"
      title="表格设置"
      placement="right"
      :closable="false"
      width="45%"
      footerStyle="text-align: right"
    >
      <a-row class="flex flex-row flex-wrap text-base mb-3" :gutter="16" justify="space-between">
        <a-col :span="20">
          <span class="mr-4 tool cursor-pointer" @click="handleChange('default')"
            >恢复初始状态</span
          >
          <span :class="['mr-4', 'tool', setColor(ifMoveOn)]" @click="handleChange('up')"
            >上移</span
          >
          <span :class="['mr-4', 'tool', setColor(ifMoveDown)]" @click="handleChange('down')"
            >下移</span
          >
          <span :class="['mr-4', 'tool', setColor(ifMoveOn)]" @click="handleChange('top')"
            >置顶</span
          >
          <span :class="['mr-4', 'tool', setColor(ifMoveDown)]" @click="handleChange('bottom')"
            >置底</span
          >
          <span :class="['mr-4', 'tool', setColor(ifHasSel)]" @click="handleChange('hide')"
            >全部隐藏</span
          >
          <span :class="['mr-4', 'tool', setColor(ifHasSel)]" @click="handleChange('freeze')"
            >全部冻结</span
          >
        </a-col>
        <a-col :span="4">
          <a-select
            ref="select"
            v-model:value="columnSize"
            @change="columnSizeChange"
            style="display: flex"
          >
            <a-select-option value="default">默认</a-select-option>
            <a-select-option value="middle">中等</a-select-option>
            <a-select-option value="compact">紧凑</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <!--这个demo实现了两种列顺序修改方式： 1.拖拽-选中项拖拽修改顺序 2.文字功能工具栏-选中项根据文字功能修改-->
      <VueDraggable v-model="dataSource" target=".ant-table-tbody" :animation="150" @move="onMove">
        <!--:scroll="{ y: 'calc(100vh - 245px)' }" scroll的设置和VueDraggable冲突，会导致排序不准确-->
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
          bordered
          size="small"
          :row-class-name="rowClassName"
          class="xy-table"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            type: 'checkbox',
            onChange: onSelectChange,
            getCheckboxProps: getCheckboxProps,
          }"
          @resizeColumn="handleResizeColumn"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'alignment'">
              <a-select ref="selectCell" v-model:value="record[column.key]" style="width: 90px">
                <a-select-option v-for="item in HideOptionsEnum" :value="item.value">{{
                  item.lable
                }}</a-select-option>
              </a-select>
            </template>
            <template v-if="column.key === 'hide'">
              <a-switch v-model:checked="record.hide" @change="handleHideChange" />
            </template>
            <template v-if="column.key === 'freeze'">
              <a-switch v-model:checked="record.freeze" :disabled="record.key == 'number'" />
            </template>
          </template>
        </a-table>
      </VueDraggable>
      <template #footer>
        <a-space>
          <a-button @click="closeDrawer">取消</a-button>
          <a-button type="primary" @click="submitSave">保存</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import type { ColumnProps } from 'ant-design-vue/es/table'
import { HideOptionsEnum } from './constant'
export interface IColumns {
  key: string
  title: string
  alignment: string
  hide: string | boolean // '0' || false 是打开开关 '1' || true 是关闭开关
  freeze: string | boolean
}
const emit = defineEmits(['handleDrawer'])
// columnsList不同表格不同的列
const propsData = withDefaults(defineProps<{ columnsData: IColumns[]; ifDrawer?: boolean }>(), {
  columnsData: () => [],
  ifDrawer: false,
})

const columnSize = ref<string>('default')
const dataSource = ref<IColumns[]>([])
const columns = ref<ColumnProps[]>(
  [
    {
      title: '列名',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      resizable: true,
      minWidth: 120,
      maxWidth: 800,
    },
    {
      title: '对齐方式',
      dataIndex: 'alignment',
      key: 'alignment',
    },
    {
      title: '隐藏列',
      dataIndex: 'hide',
      key: 'hide',
    },
    {
      title: '冻结列',
      dataIndex: 'freeze',
      key: 'freeze',
    },
  ].map((item: ColumnProps) => ({ ...item, align: 'left' })),
)
const ifOpen = computed(() => propsData.ifDrawer)
// 表格行class设置
const rowClassName = (record: IColumns, index: number) =>
  `${index % 2 === 1 ? 'table-striped' : ''}`
const onMove = (e: any) => {
  //不允许拖拽
  if (!selectedRowKeys.value.includes(e.data.key)) return false
  return true
}
const setColor = (flag: boolean) => {
  return flag ? 'cursor-pointer active:text-base' : 'cursor-not-allowed'
}
// drawer表格checkbox开始
const selectedRowKeys = ref<IColumns['key'][]>([])
const onSelectChange = (changableRowKeys: string[]) => {
  console.log('selectedRowKeys changed: ', changableRowKeys)
  selectedRowKeys.value = changableRowKeys
}
const getCheckboxProps = (record: IColumns) => ({
  disabled: record.key == 'number',
})

// drawer表格checkbox结束
const closeDrawer = () => {
  emit('handleDrawer', false)
}
// 表格设置toolbar开始
const ifHasSel = computed(() => (selectedRowKeys.value.length > 0 ? true : false))
const ifMoveOn = computed(() =>
  ifHasSel.value &&
  !(selectedRowKeys.value.length == 1 && selectedRowKeys.value[0] == dataSource.value[1].key)
    ? true
    : false,
)
const ifMoveDown = computed(() =>
  ifHasSel.value &&
  !(
    selectedRowKeys.value.length == 1 &&
    selectedRowKeys.value[0] == dataSource.value[dataSource.value.length - 1].key
  )
    ? true
    : false,
)
const columnSizeChange = (val: string) => {
  console.log(val)
}
// 工具栏- 恢复初始状态 上移 下移 置顶 置底 全部隐藏 全部冻结
const handleChange = (type: string) => {
  let sourceList = dataSource.value.filter((item: IColumns) => item.key !== 'number')
  const rowKeysList = sourceList.map((item: IColumns) => item.key)
  const indexList = selectedRowKeys.value.map((item: string) => rowKeysList.indexOf(item))
  console.log(sourceList, selectedRowKeys.value, 'type')
  switch (type) {
    // 上移：摘出前一个位置的元素，用当前位置的元素覆盖前一个位置的元素，然后把当前位置的元素设置为摘除的前一个位置的元素；下移同理先摘出，覆盖然后替换
    case 'up':
      selectedRowKeys.value.forEach((code: string) => {
        const codeList = sourceList.map((item: IColumns) => item.key)
        const idx = codeList.indexOf(code)
        if (idx > 0) {
          sourceList[idx] = sourceList.splice(idx - 1, 1, sourceList[idx])[0]
        }
      })
      break
    case 'down':
      selectedRowKeys.value.forEach((code: string) => {
        const codeList = sourceList.map((item: IColumns) => item.key)
        const idx = codeList.indexOf(code)
        if (idx !== sourceList.length - 1) {
          sourceList[idx] = sourceList.splice(idx + 1, 1, sourceList[idx])[0]
        }
      })
      break
    case 'top':
      selectedRowKeys.value.forEach((code: string) => {
        const codeList = sourceList.map((item: IColumns) => item.key)
        if (codeList.indexOf(code) > 0) {
          sourceList.unshift(sourceList.splice(codeList.indexOf(code), 1)[0])
        }
      })
      break
    case 'bottom':
      selectedRowKeys.value.forEach((code: string) => {
        const codeList = sourceList.map((item: IColumns) => item.key)
        if (codeList.indexOf(code) !== sourceList.length - 1) {
          sourceList.push(sourceList.splice(codeList.indexOf(code), 1)[0])
        }
      })
      break
    case 'hide':
      indexList.forEach((idx: number) => {
        sourceList[idx].hide = true
      })
      break
    case 'freeze':
      indexList.forEach((idx: number) => {
        sourceList[idx].freeze = true
      })
      break
    default:
      sourceList = sourceList.map((item: IColumns) => ({
        ...item,
        hide: false,
        freeze: false,
        alignment: 'default',
      }))
      break
  }
  dataSource.value = [dataSource.value[0]].concat(sourceList)
  selectedRowKeys.value = []
}
// 表格设置-隐藏列设置
const handleHideChange = () => {}
const handleResizeColumn = (w: number, col: any) => {
  col.width = w
}
// 表格设置结束
// 保存设置，成功后关闭drawer然后刷新表格
const submitSave = () => {
  console.log(dataSource.value)
  emit('handleDrawer', true)
}
// 监听当前表格设置的变化
watch(
  () => propsData.columnsData,
  (val) => {
    const list = val.map((item: IColumns) => ({
      ...item,
      hide: item.hide == '0' ? false : true,
      freeze: item.freeze == '0' ? false : true,
    }))
    dataSource.value = list
  },
  {
    deep: true,
    immediate: true,
  },
)
// 表格设置入参和接口response格式一致 --- 要设置冻结列的表格列必须按顺序放在columns最前面， 否则table组件的column的fixed配置会出问题
const columnsData = computed(() => {
  const list = JSON.parse(JSON.stringify(dataSource.value))
  const num = (list.filter((item: IColumns) => item.freeze) || []).length
  dataSource.value.forEach((item: IColumns) => {
    const idxList = list.map((item: IColumns) => item.key)
    if (item.freeze) {
      const idx = idxList.indexOf(item.key)
      list.push(list.splice(idx, 1)[0])
    }
  })
  list.unshift(...list.splice(list.length - num, num))
  return list.map((item: IColumns) => ({
    ...item,
    hide: item.hide ? '1' : '0',
    freeze: item.freeze ? '1' : '0',
  }))
})
defineExpose({
  columnsData,
})
</script>
<style lang="scss" scoped>
// a-table的scroll的y设置会导致vue-draggble-plus的拖拽顺序混乱 所以用css设置tbody滚动
.xy-table {
  overflow: hidden;
  overflow-y: auto;
  /* 高度需要计算出符合自己需求 */
  height: calc(100vh - 200px);
  :deep(.ant-table.ant-table-bordered > .ant-table-container > .ant-table-content > table) {
    border-top: none;
  }
  :deep(.ant-table-thead) {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  :deep(.ant-table-thead > tr > th) {
    border-top: 1px solid #f0f0f0;
  }
}
:deep(.ant-table-tbody > tr.table-striped > td) {
  background-color: #fafafa;
}
</style>
