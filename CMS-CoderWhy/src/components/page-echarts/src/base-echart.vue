<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartRef">echarts</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  //拿到echart实例
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })
  //设置option
  echartInstance.setOption(props.option)
})
</script>

<style lang="less" scoped>
.base-echarts {
  .echarts {
    height: 300px;
  }
}
</style>
