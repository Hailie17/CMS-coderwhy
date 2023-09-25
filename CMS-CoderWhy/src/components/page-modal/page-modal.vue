<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isAddRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="dialog">
        <el-form :model="formData" size="large" label-width="100px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" style="width: 100%">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.name" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </template>
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

// 0. 定义props
interface IProps {
  modalConfig: {
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
}
const props = defineProps<IProps>()
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
