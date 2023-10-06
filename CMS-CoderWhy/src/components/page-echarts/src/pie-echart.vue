<template>
  <div class="pie-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

const option: EChartsOption = {
  title: {
    text: '11',
    subtext: '12',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: {
    name: '45',
    type: 'pie',
    radius: '50%',
    data: [
      { value: 1048, name: '56' },
      { value: 1523, name: '12' },
      { value: 5895, name: '32' },
      { value: 1235, name: '33' },
      { value: 3256, name: '22' }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0,0,0,0.5)'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pie-echart {
}
</style>
