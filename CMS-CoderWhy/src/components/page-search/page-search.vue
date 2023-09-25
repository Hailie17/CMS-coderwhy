<template>
  <div class="search">
    <el-form :model="searchForm" ref="formRef" :label-width="searchConfig.labelWith ?? '80px'" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
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

// 定义自定义事件、接受的属性
interface IProps {
  searchConfig: {
    labelWith?: string
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick'])
const props = defineProps<IProps>()

// 定义form数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

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
