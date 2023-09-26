import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleAddClick() {
    modalRef.value?.dialogShow()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.dialogShow(false, itemData)
  }
  return {
    modalRef,
    handleAddClick,
    handleEditClick
  }
}

export default usePageModal
