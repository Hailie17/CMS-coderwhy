import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(newCallback?: CallbackFnType, editCallback?: CallbackFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleAddClick() {
    modalRef.value?.dialogShow()
    if (newCallback) newCallback()
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
