<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入部门" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="realname">
            <el-input v-model="searchForm.leader" placeholder="请输入部门领导" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" icon="Search" type="primary" @click="handleQueryClick">搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm } from 'element-plus'

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 定义form数据
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 1. 清空表单
  formRef.value?.resetFields()

  // 2. 传递事件，content内部重新发送网络请求
  emit('resetClick')
}

// 搜索操作
function handleQueryClick() {
  emit('queryClick', searchForm) //通过自定义事件将searchForm数据传给父组件
}
</script>

<style lang="less" scoped>
.search {
  background: white;
  padding: 20px;
  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
