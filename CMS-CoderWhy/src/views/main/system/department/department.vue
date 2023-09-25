<template>
  <div class="department">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleQueryReset" />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { ref } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleQueryReset() {
  contentRef.value?.fetchPageListData()
}

// 点击content 弹出modal
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleAddClick() {
  modalRef.value?.dialogShow()
}
function handleEditClick(itemData: any) {
  modalRef.value?.dialogShow(false, itemData)
}
</script>

<style lang="less" scoped>
.department {
}
</style>
