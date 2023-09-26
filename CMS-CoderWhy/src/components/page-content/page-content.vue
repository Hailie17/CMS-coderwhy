<template>
  <div class="content">
    <div class="header">
      <h3 class="title">
        {{ contentConfig?.header?.title ?? '数据列表' }}
      </h3>
      <el-button type="primary" icon="Plus" size="large" @click="handleAddUserClick">
        {{ contentConfig?.header?.btnTitle ?? '新建部门' }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button text type="primary" icon="Edit" @click="handleEditBtnClick(scope.row)">编辑</el-button>
                <el-button text type="danger" icon="Delete" @click="handleDeletBtnClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/fomat'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { IContentProps } from './type'

const props = defineProps<IContentProps>()
const emit = defineEmits(['addClick', 'editClick'])

const currentPage = ref(1)
const pageSize = ref(10)
// 1. 发起action，请求usersList数据
const systemStore = useSystemStore()
fetchPageListData()

// 2. 获取usersList数据，进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3. 分页处理
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4. 定义函数，发送网络请求
function fetchPageListData(formData: any = {}) {
  // 1. 获取offset、size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2. 发送网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5. 新建、删除、编辑操作
function handleAddUserClick() {
  emit('addClick')
}
function handleDeletBtnClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
    .title {
      font-size: 22px;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
