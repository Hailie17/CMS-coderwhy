<template>
  <div class="login-panel">
    <!-- 顶部 -->
    <h1 class="title">藏龙岛后台管理系统</h1>
    <!-- 中间tab -->
    <div class="tab">
      <el-tabs stretch type="border-card" v-model="activeName">
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <div class="text">账号登录</div>
            </div>
          </template>
          User
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <div class="text">手机登录</div>
            </div>
          </template>
          Config
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref('account')
const isRemPwd = ref(true)
function handleLoginBtnClick() {
  if (activeName.value == 'account') {
    console.log('account login')
  } else {
    console.log('phone login')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
