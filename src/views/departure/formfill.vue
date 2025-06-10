<template>
  <div class="tableSetting">
    <div class="h-12 mb-[24px] tw-flex-row-between">
      <div class="tw-flex-row-start">
        <one-button class="mr-4" type="success" @click="addModel">添加</one-button>
        <one-button type="primary" @click="handleSubmit">提交</one-button>
      </div>
      <div class="svg">
        <a-button
          class="tw-flex-row-center"
          type="primary"
          ghost
          size="middle"
          @click="ifDrawer = !ifDrawer"
        >
          <template #icon>
            <svg-icon name="setting" width="1.2em" height="1.2em" class="icon" />
          </template>
        </a-button>
      </div>
    </div>
    <a-table
      :columns="allColumns"
      :data-source="dataShow"
      :pagination="false"
      bordered
      size="small"
      v-if="columns"
      @resizeColumn="handleResizeColumn"
      :scroll="{ y: 'calc(100vh - 280px)' }"
      :rowClassName="rowClassName"
    >
      <template #headerCell="{ title, column }">
        <template v-if="column.key === 'number'">
          <span class="font-bold"> {{ title }} </span>
        </template>
        <div v-if="column.dataIndex === pointField" class="tw-flex-row-start">
          <span class="mr-[12px] font-bold">{{ title }}</span>
          <a-popconfirm
            overlayClassName="popconfirmstyle"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirm"
            @cancel="cancel"
            @openChange="reset"
          >
            <template #title></template>
            <template #icon></template>
            <template #description>
              <a-checkbox-group
                v-model:value="selectKey"
                style="width: 100%"
                class="checkbox flex flex-col justify-start"
              >
                <a-checkbox
                  v-for="item in keyItemsEnums"
                  :value="item"
                  :disabled="keyItemsFixEnums.includes(item)"
                  >{{ item }}</a-checkbox
                >
              </a-checkbox-group>
            </template>
            <svg-icon name="sortdown" width="1.2em" height="1.2em" :color="$style.colorBase" />
          </a-popconfirm>
        </div>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column">
          <template v-if="column.key === 'number'">
            <span>{{ index / keyItemsLength + 1 }}</span>
          </template>
          <template v-if="fixedDataIndexEnums.includes(column.dataIndex)">
            <div class="editable-cell">
              <a-input
                v-model:value="record[column.dataIndex]"
                :bordered="false"
                :class="[record[`${column.dataIndex}backup`] ? 'text-[red]' : '']"
              />
              <svg-icon
                name="message"
                color="#e9c745"
                width="1.2em"
                height="1.2em"
                :class="['icon-message', twSvgClx]"
                @click="handleCurrentBackUp(column, record)"
              />
            </div>
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
    <a-modal
      v-bind="modalState"
      @cancel="handleCancel"
      @ok="handleOk"
      :ok-button-props="{ disabled: !formModel.backup }"
    >
      <a-form ref="FormRef" :model="formModel" labelAlign="right" :label-col="{ span: 4 }">
        <a-form-item label="文件类型:" name="type">
          <a-input v-model:value="formModel.backup" placeholder="请输入备注信息" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'
import type { ColumnProps } from 'ant-design-vue/es/table'
import TableSet from '@/components/TableSet/index.vue'
import type { IColumns } from '@/components/TableSet/index.vue'
import fetchapi from '@/api/test/test'
import TooltipShow from '@/components/Tooltip/index.vue'
import {
  keyItemsEnums,
  keyItemsFixEnums,
  fixedDataIndexEnums,
  testDataEnums,
  fixedColumnEnums,
  columnsDataEnums,
  pointField,
} from './constant'
import type { IData } from '@/views/departure/types'
interface ICurrent {
  // flag表格行唯一标识 dataIndex标识change对应的key
  flag: string
  dataIndex: string
}
const twSvgClx = ref('icon-message absolute right-1 top-1/2 -translate-y-1/2')
const tablesetref = ref()
let ifDrawer = ref<boolean>(false)

const columnsSetting = reactive<ColumnProps>({
  // 表格列基础设置
  ellipsis: true,
  resizable: true,
  width: 120,
  minWidth: 120,
  maxWidth: 800,
})
const columnsData = ref<IColumns[]>([])
const columns = ref<ColumnProps[]>([])
const selectKey = ref<string[]>([...keyItemsFixEnums]) // 关键项双向绑定的值，有保存取消所以另加一个变量keyItemsList表示确定的选中的关键项
const keyItemsList = ref<string[]>([...keyItemsFixEnums]) // 当前关键项
const keyItemsLength = computed(() => keyItemsList.value.length)
const dataSource = ref<IData[]>([])
const FormRef = ref<FormInstance>()
const formModel = reactive({
  backup: '',
})

const fixedColumns = reactive<ColumnProps[]>(
  fixedColumnEnums.map((item: ColumnProps) => ({
    ...item,
    fixed: 'right',
    ...(columnsSetting as ColumnProps),
  })),
)

// 获取当前表格设置,根据表格设置更新当前表格，并在drawer里展示表格设置
const getTableSet = async (flag?: boolean) => {
  if (flag) {
    columnsData.value = tablesetref.value.columnsData
    return
  }
  columnsData.value = columnsDataEnums
  // const res = await fetchapi.getcolumns({ type: 'xxx' })
  // if (res.code == 0) {
  //   columnsData.value = res.data
  // }
}
// 添加-选择的型号数据增加到填报计划表格中
const addModel = () => {
  const baseObj = testDataEnums
  const dataIndexObjList = fixedDataIndexEnums.map((item: string) => ({ [item]: '' }))
  const newData = keyItemsEnums.map((key: string) => {
    return Object.assign(
      {
        [pointField]: key,
        ...baseObj,
      },
      ...dataIndexObjList,
    )
  })
  dataSource.value.push(...newData)
}
// 提交
const handleSubmit = () => {
  console.log(dataShow.value, '>>>>>>>>填报数据')
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
// 关键项筛选-确定
const confirm = (e: MouseEvent) => {
  keyItemsList.value = keyItemsEnums.filter((item: string) => selectKey.value.includes(item))
}
// 关键项筛选-取消
const cancel = (e: MouseEvent) => {
  selectKey.value = keyItemsList.value
}
// 关键项筛选框弹出
const reset = (open: boolean) => {
  if (open) {
    selectKey.value = keyItemsList.value
  }
}
// 表格行样式设置
const rowClassName = (record: IData, index: number) => {
  if (!keyItemsFixEnums.includes(record[pointField])) {
    return 'key-add-color'
  }
}
// 表格列样式设置，合并表格单元格
const sharedOnCell = (record: IData, index: number, column: ColumnProps) => {
  const mergeKeys = columnsData.value
    .filter((item: IColumns) => item.key !== pointField)
    .map((item: IColumns) => item.key)
  if (mergeKeys.includes(column.dataIndex as string)) {
    return {
      // rowSpan: index % keyItemsLength.value == 0 ? 1 : 1,
      style: {
        'background-color': '#fff4e6',
        visibility: index % keyItemsLength.value == 0 ? '' : 'hidden', // 也可以依据唯一标识只让第一个出现的唯一标识显示，比如唯一标识为'区域-大区-产品门类'
      },
    }
  }
}
// 过滤掉原始表格数据中不包含选中数据项的行数据，作为表格显示数据
const dataShow = computed(() =>
  dataSource.value.filter((item: IData) => keyItemsList.value.includes(item[pointField])),
)
const allColumns = computed(() => columns.value.concat(fixedColumns))
// 表格cell-备注Modal
const modalState = reactive({
  loading: false,
  visible: false,
  title: '备注信息',
  okText: '确定',
})
// 备注Modal对应的tabledata flag识别哪一行数据 dataIndex识别改变哪个数据
let currentRow = reactive<ICurrent>({
  flag: '',
  dataIndex: '',
})
// 打开备注Modal，缓存当前表格唯一标识(这里用产品型号拼接关键项)和修改的column对应的key
const handleCurrentBackUp = (column: ColumnProps, row: IData) => {
  formModel.backup = row[`${column.dataIndex}backup`] || ''
  modalState.visible = true
  // 这里用产品型号拼接关键项
  currentRow.flag = `${row.model}-${row[pointField]}`
  currentRow.dataIndex = column.dataIndex as string
}
// 关闭Modal
const handleCancel = () => {
  modalState.visible = false
  formModel.backup = ''
}
// Modal 确定
const handleOk = () => {
  dataSource.value.forEach((item: IData) => {
    if (`${item.model || ''}-${item[pointField] || ''}` == currentRow.flag) {
      item[`${currentRow.dataIndex}backup`] = formModel.backup
    }
  })
  handleCancel()
}
// 监听表格设置的变化，重新给当前表格列赋值；
watch(
  () => columnsData,
  () => {
    // 黑色或白色coach斜跨带链条 黑色mk可斜挎可手挎
    columns.value = columnsData.value
      .filter((child: IColumns) => child.hide !== '1')
      .map((item: IColumns) => ({
        title: item.title,
        dataIndex: item.key,
        key: item.key,
        align: item.alignment == 'default' ? 'center' : item.alignment,
        fixed: item.freeze == '0' ? false : 'left',
        ...(columnsSetting as ColumnProps),
        customCell: sharedOnCell,
        customRender: ({ record, text }) =>
          h('div', {}, [
            h(TooltipShow, {
              title: text,
              content: text,
            }),
          ]),
      })) as ColumnProps[]
  },
  {
    deep: true,
    immediate: true,
  },
)
onMounted(() => getTableSet())
</script>
<style module lang="scss" src="@/styles/export.scss"></style>
<style lang="scss" scoped>
.checkboxs {
  label {
    line-height: $size-small-1;
  }
}
.editable-cell:hover .icon-message {
  opacity: 1;
  z-index: 10000;
}
.icon-message {
  opacity: 0;
}
</style>
