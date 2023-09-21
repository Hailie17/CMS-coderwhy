<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" size="large">新建用户</el-button>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in userList" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
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
