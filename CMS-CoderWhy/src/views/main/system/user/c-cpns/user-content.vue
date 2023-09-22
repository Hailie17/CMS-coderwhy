<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" icon="Plus" size="large">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="用户名" width="150" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="150" />
        <el-table-column align="center" prop="cellphone" label="手机号码" width="160" />
        <el-table-column align="center" prop="enable" label="状态" width="150">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button bg size="small" text :type="scope.row.enable ? 'primary' : 'danger'">
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间" width="300">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间" width="300">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <el-button text type="primary" icon="Edit">编辑</el-button>
          <el-button text type="danger" icon="Delete">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
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

const currentPage = ref(1)
const pageSize = ref(10)
// 1. 发起action，请求usersList数据
const systemStore = useSystemStore()
fetchUserListData()

// 2. 获取usersList数据，进行展示
const { userList, usersTotalCount } = storeToRefs(systemStore)

// 3. 分页处理
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 4. 定义函数，发送网络请求
function fetchUserListData(formData: any = {}) {
  // 1. 获取offset、size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2. 发送网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUserListAction(queryInfo)
}
defineExpose({ fetchUserListData })
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
