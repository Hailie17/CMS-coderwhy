<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="Warning" width="30%" center>
      <span> It should be noted that the content will not be aligned in center by default </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dialogVisible = ref(false)
function dialogShow() {
  dialogVisible.value = true
}
defineExpose({ dialogShow })
</script>

<style lang="less" scoped>
.modal {
}
</style>
