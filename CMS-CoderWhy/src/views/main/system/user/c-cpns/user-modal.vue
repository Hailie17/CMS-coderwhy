<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isAddRef ? '新增用户' : '编辑用户'" width="30%" center>
      <div class="dialog">
        <el-form :model="formData" size="large" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
          </el-form-item>
          <el-form-item v-if="isAddRef" label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="formData.password" />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input placeholder="请输入手机号码" v-model="formData.cellphone" />
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
// 1. 定义数据
const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isAddRef = ref(true)
const userData = ref<any>()

// 2. 获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

function dialogShow(isAdd: boolean = true, itemData?: any) {
  isAddRef.value = isAdd
  dialogVisible.value = true
  // 编辑数据
  if (!isAdd && formData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    userData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    userData.value = null
  }
}

// 3. 点击了确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false
  if (!isAddRef.value && userData) {
    // 1. 编辑用户信息
    systemStore.editUserDataAction(userData.value.id, formData)
  } else {
    // 2. 新增用户
    systemStore.addUserDataAction(formData)
  }
}
defineExpose({ dialogShow })
</script>

<style lang="less" scoped>
.dialog {
  padding: 0 20px;
}
</style>
