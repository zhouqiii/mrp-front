<template>
  <div class="form_box">
    <a-form :model="formModel" :rules="rules" @finish="handleFinish">
      <p class="text">请输入手机号登录</p>
      <a-form-item name="username">
        <a-input
          class="reset-input"
          v-model:value="formModel.username"
          placeholder="管理员：admin，普通：test"
          @keyup.enter="handleFinish"
        >
          <template #prefix>
            <!-- <user-outlined class="icon" type="user" /> -->
            <Icon size="24px" type="shoujihaodenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <p class="text">请输入密码</p>
      <a-form-item name="password">
        <a-input
          class="reset-input"
          v-model:value="formModel.password"
          type="password"
          placeholder="密码为 123456"
          @keyup.enter.native="handleFinish"
        >
          <template #prefix>
            <!-- <lock-outlined class="icon" /> -->
            <Icon size="24px" type="shurumimadenglu" class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <a-checkbox class="reset_checkbox" v-model:checked="checked">自动登录</a-checkbox>
          </a-col>
          <a-col :span="12" class="text-right">
            <!-- <span class="gray_text">忘记密码?</span> -->
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" class="btn" :loading="loading">立即登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import fetchApi from '@/api/login/login'
import CryptoJs from 'crypto-js'

const { proxy }: any = getCurrentInstance()

const userStore = useUserStore()
const router = useRouter()

const loading = ref(false)
let state: any = reactive({
  otherQuery: {},
  redirect: undefined,
})

/* listen router change  */
const route = useRoute()
let getOtherQuery = (query: any) => {
  return Object.keys(query).reduce((acc: any, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

watch(
  route,
  (route) => {
    const query = route.query
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true },
)

const rules = {
  username: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
}

const checked = ref(true)
let encryptionMsg = reactive({
  encryptionType: '',
  encrypted: '',
})
const formModel = reactive({
  username: '',
  password: '',
})
// 使用加密方式加密密码
const encodePassword = () => {
  const psw = formModel.password
  const { encrypted, encryptionType } = encryptionMsg
  if (encryptionType === 'Md5Hash') {
    return CryptoJs.MD5(encrypted + psw).toString()
  }
  return CryptoJs[encryptionType](psw, encrypted).toString()
}

const handleFinish = async () => {
  // console.log(checked.value, values);
  loading.value = true
  const res = await userStore.mockReq(formModel) // await userStore.login(formModel)
  loading.value = false
  if (res.code == 0) {
    // message.success('成功');
    // router.replace({ path: state.redirect || '/', query: state.otherQuery });
    router.replace('/')
  }
}
// 登录
const handleLogin = async () => {
  loading.value = true
  formModel.password = encodePassword()
  // 登录获取token
  const res = await userStore.login(formModel)
  loading.value = false
  // 获取token之后 请求获取当前用户信息和菜单权限
  if (res && res.code == 0) {
    router.replace('/')
  }
}
// 登录前获取加密方式
const getEnryption = async () => {
  const res = await fetchApi.getEnryption(formModel.username)
  if (proxy.reqIsSucceed(res)) {
    encryptionMsg.encryptionType = res.data.encryptionType
    encryptionMsg.encrypted = res.data.encrypted
    handleLogin()
  } else {
    proxy.createMessage.error(res.msg)
    return
  }
}
</script>
<style lang="scss">
.form_box {
  margin-top: 30px;
  .btn {
    width: 100%;
    height: 54px;
    background: linear-gradient(90deg, #00c3fd 0%, #3662f4 100%);
    border-radius: 6px;
    color: #ffffff;
    font-size: 20px;
    &:hover {
      opacity: 0.85;
      border: none;
    }
  }
  .icon {
    color: #666666;
  }
  .text {
    font-size: 14px;
    line-height: 20px;
    color: #999999;
    letter-spacing: 1.1px;
    margin-bottom: 10px;
  }
  .gray_text {
    font-size: 12px;
    color: #666666;
  }
  .reset_checkbox {
    .ant-checkbox-inner {
      border-radius: 50%;
    }
    & > span:last-child {
      font-size: 12px;
      color: #666666;
    }
  }
  .reset-input {
    height: 50px;
    line-height: 50px;
    border: 1px solid #707070;
    border-radius: 6px;
  }
}
</style>
