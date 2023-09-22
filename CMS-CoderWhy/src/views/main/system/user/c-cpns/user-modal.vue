<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新增用户" width="30%" center>
      <div class="dialog">
        <el-form :model="formData" size="large" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="formData.password" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input placeholder="请输入手机号码" v-model="formData.cellphone" />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="departmentId">
            <el-select placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
// 1. 定义数据
const dialogVisible = ref(true)
const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 2. 获取roles/departments数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = mainStore
function dialogShow() {
  dialogVisible.value = true
}
defineExpose({ dialogShow })
</script>

<style lang="less" scoped>
.dialog {
  padding: 0 20px;
}
</style>
