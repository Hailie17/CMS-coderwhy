<template>
  <div>
    <el-form :model="account" labe-width="60" size="large" :rules="accountRules" status-icon ref="formRef">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'

/* 定义account表单数据*/
const account = reactive({
  name: '',
  password: ''
})

/* 定义rules校验规则 */
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号信息', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,6}$/, message: '请输入3-6位数字或字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入帐号密码', trigger: 'blur' },
    { pattern: /^[a-z0-9]{3,}$/, message: '请输入3位以上数字或字母', trigger: 'blur' }
  ]
}

/* 执行帐号的登录逻辑 */
const formRef = ref()
function loginAction() {
  console.log('pane-account login action function exccution', account.name, account.password)
}
defineExpose({ loginAction })
</script>

<style lang="less" scoped></style>
