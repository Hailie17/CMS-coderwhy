<template>
  <div class="mian">
    <h2>mian</h2>
    <button @click="handleExitClick">exit</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleExitClick() {
  // 1. 删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 2. 跳回login页面
  router.push('/login')
}
</script>

<style lang="less" scoped>
.mian {
  color: pink;
}
</style>
