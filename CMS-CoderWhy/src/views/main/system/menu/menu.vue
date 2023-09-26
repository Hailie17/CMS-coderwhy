<template>
  <div class="menu">
    <h2>menu</h2>
    <page-content :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style lang="less" scoped>
.menu {
}
</style>
