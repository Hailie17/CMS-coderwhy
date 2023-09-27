<template>
  <div class="role">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" @reset-click="handleQueryReset" />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef">
      <template #menulist><span>菜单列表</span></template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 逻辑关系
const { contentRef, handleQueryClick, handleQueryReset } = usePageContent()
const { modalRef, handleAddClick, handleEditClick } = usePageModal()
</script>

<style lang="less" scoped></style>
