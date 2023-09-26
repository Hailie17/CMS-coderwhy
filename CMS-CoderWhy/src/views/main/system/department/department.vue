<template>
  <div class="department">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleQueryReset" />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { ref, computed } from 'vue'
import searchConfig from './config/search.config'
import modalConfig from './config/modal.config'
import contentConfig from './config/content.config'
import useMainStore from '@/store/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 1. 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  console.log(departments, 12)

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  console.log(modalConfig.formItems, 111)

  return modalConfig
})

const { contentRef, handleQueryClick, handleQueryReset } = usePageContent()

// 点击content 弹出modal
const { modalRef, handleAddClick, handleEditClick } = usePageModal()
</script>

<style lang="less" scoped>
.department {
}
</style>
