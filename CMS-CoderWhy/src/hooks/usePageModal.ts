import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type EditFnType = (data: any) => void

function usePageModal(editCallback?: EditFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleAddClick() {
    modalRef.value?.dialogShow()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.dialogShow(false, itemData)
    if (editCallback) editCallback(itemData)
  }
  return {
    modalRef,
    handleAddClick,
    handleEditClick
  }
}

export default usePageModal
