<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isAddRef ? '新增部门' : '编辑部门'" width="30%" center>
      <div class="dialog">
        <el-form :model="formData" size="large" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入部门名称" v-model="formData.name" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input placeholder="请输入部门领导" v-model="formData.leader" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择部门" style="width: 100%">
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
  leader: '',
  parentId: ''
})
const isAddRef = ref(true)
const userData = ref<any>()

// 2. 获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

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
    systemStore.editPageDataAction('department', userData.value.id, formData)
  } else {
    // 2. 新增用户
    systemStore.addPageByIdAction('department', formData)
  }
}
defineExpose({ dialogShow })
</script>

<style lang="less" scoped>
.dialog {
  padding: 0 20px;
}
</style>
