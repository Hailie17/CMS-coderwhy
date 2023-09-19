<template>
  <el-form :model="account" labe-width="60" size="large" :rules="accountRules" status-icon ref="formRef">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="account.password" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAcount } from '@/types'
import { localCache } from '@/utils/cache'
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

/* 定义account表单数据*/
const account = reactive<IAcount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

/* 定义rules校验规则 */
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,9}$/, message: '请输入3-9位数字或字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入帐号密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '请输入3位以上数字或字母', trigger: 'blur' }
  ]
}

/* 执行帐号的登录逻辑 */
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1. 获取用户输入的帐号和密码
      const name = account.name
      const password = account.password
      // 2. 向服务器发送网络请求
      loginStore.loginAcountAction({ name, password }).then(() => {
        // 3. 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage({
        message: 'Oops, this is a error message.',
        type: 'error'
      })
    }
  })
}
defineExpose({ loginAction })
</script>

<style lang="less" scoped></style>
