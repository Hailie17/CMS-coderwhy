<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleQueryReset" />
    <page-content ref="contentRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleQueryReset() {
  contentRef.value?.fetchPageListData()
}
</script>

<style lang="less" scoped>
.department {
}
</style>
