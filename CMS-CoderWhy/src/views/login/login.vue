<template>
  <div>
    <h1>login</h1>
  </div>
</template>

<script setup lang="ts">
import hyRequest from '@/service'
console.log('-----')
hyRequest.get('./home/multidata').then((res) => {
  console.log(res)
})
</script>

<style scoped></style>
