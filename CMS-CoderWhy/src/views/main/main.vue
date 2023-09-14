<template>
  <div class="mian">
    <h2>mian-- {{ counterStore.counter }} -- {{ counterStore.doubleCounters }}</h2>
    <button @click="changeCounter">change</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
const counterStore = useCounterStore()
function changeCounter() {
  counterStore.changeCounterActions(20)
}
</script>

<style lang="less" scoped>
.mian {
  color: pink;
}
</style>
