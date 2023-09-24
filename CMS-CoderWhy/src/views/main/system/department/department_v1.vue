<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleQueryReset" />
    <page-content ref="contentRef" @add-click="handleAddClick" @edit-click="handleEditClick" />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

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
