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
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'

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
const formRef = ref<InstanceType<typeof ElForm>>()
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证成功')
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
