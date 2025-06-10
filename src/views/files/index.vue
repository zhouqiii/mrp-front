<template>
  <div>
    <!-- <div class="btns">
      <a-button type="primary" style="margin-right: 16px" @click="getTableSel">销售预测</a-button>
      <a-button type="primary" @click="openModal">文件上传</a-button>
    </div> -->
    <TableSel
      :url="fetchApi.featuredata"
      :columns="columns"
      :scroll="{ x: 1200 }"
      :actions="tableActions"
      :ifSelect="true"
      :parameter="{ filePath: '' }"
      ref="tableRef"
    />
    <OneModal v-bind="modalState" @cancel="handleCancel" @ok="handleOk">
      <a-form
        ref="FormRef"
        :model="formModel"
        labelAlign="right"
        :label-col="{ span: 4 }"
        :rules="rules"
      >
        <a-form-item label="文件类型:" name="type">
          <a-select v-model:value="formModel.type" style="width: 100%" placeholder="请选择特征文件">
            <a-select-option v-for="item in fileList" :value="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="文件:" name="file" class="label-spe">
          <Upload
            accept=".xlsx,.xls"
            :size="10"
            :ifUpload="ifSelType"
            :fileType="formModel.type"
            @uploadSuccess="refresh"
          />
        </a-form-item>
      </a-form>
    </OneModal>
  </div>
</template>
<script setup lang="ts">
import { columns } from './constant'
import fetchApi from '@/api/test/test'
import TableSel from '@/components/Table/index.vue'
import type { FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { ResData } from '@/api/global'
import { useMessage } from '@/hooks/useMessage'

const { createMessage } = useMessage()
const router = useRouter()
const FormRef = ref<FormInstance>()
const tableRef = ref()
const refresh = () => tableRef.value.goRun() // 参数不变，直接更新
const loading = ref(false)
const modalState = reactive({
  loading: false,
  visible: false,
  title: '文件上传',
  okText: '确定',
})
const formModel = reactive({
  type: '',
})
const fileList = ref([
  { value: '1', label: '销售数据' },
  { value: '2', label: '大盘数据' },
  { value: '3', label: '销售人员预测数据' },
  { value: '4', label: '商机数据' },
])
const rules: Record<string, Rule[]> = {
  type: [{ required: true, message: '请选择文件类型', trigger: 'change' }],
}
const openModal = () => {
  modalState.visible = true
}
const handleOk = () => {}
const handleCancel = () => {
  modalState.visible = false
  FormRef.value?.resetFields()
}
const ifSelType = computed(() => (formModel.type ? true : false))

// 获取表格子组件选中的项
const getTableSel = async () => {
  const selFileList = tableRef.value.getSelectRows
}
onMounted(async () => {
  loading.value = true
  loading.value = false
})

onUnmounted(() => {})

const tableActions = reactive([
  {
    label: '明细',
    icon: 'AlignCenterOutlined',
    onClick: async (row: any) => {
      alert('action.onClick')
    },
  },
])
</script>
<style lang="scss" scoped>
.btns {
  display: flex;
  margin-bottom: 24px;
  button:first-child {
    margin-right: 16px;
  }
}
.search {
  & ::v-deep(.ant-input) {
    height: 48px;
  }
}
.query-form {
  ::v-deep .ant-form-item {
    width: 30%;
    margin-bottom: 16px;
  }
}
.query-btn {
  text-align: center;
}
.query-collapse {
  position: absolute;
  left: 49%;
  bottom: 0;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  width: 24px;
  height: 10px;
  ::v-deep .anticon {
    display: block;
  }
}
.dis-upload {
  ::v-deep .ant-upload {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
}
</style>
