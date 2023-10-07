<template>
  <div class="base-echarts">
    <div class="echarts" ref="echartRef">echarts</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { watchEffect } from 'vue'
import chinaJSON from '../data/china.json'

echarts.registerMap('china', chinaJSON as any)

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  //拿到echart实例
  const echartInstance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })
  //设置option,watcheffect监听option变化，重新执行
  watchEffect(() => {
    echartInstance.setOption(props.option)
  })
})
</script>

<style lang="less" scoped>
.base-echarts {
  .echarts {
    height: 300px;
  }
}
</style>
