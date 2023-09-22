<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" size="large">新建用户</el-button>
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
            <el-button size="small" plain :type="scope.row.enable ? 'primary' : 'danger'">
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
    <div class="pagination"></div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/fomat'
import { storeToRefs } from 'pinia'
// 1. 发起action，请求usersList数据
const systemStore = useSystemStore()
systemStore.postUserListAction()
// 2. 获取usersList数据，进行展示
const { userList } = storeToRefs(systemStore)
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
}
</style>
