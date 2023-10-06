<template>
  <div class="line-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import BaseEchart from './base-echart.vue'
import type { EChartsOption } from 'echarts'

const option: EChartsOption = {
  xAxis: {
    type: 'category',
    boundaryGap: 'false',
    data: ['mon','tur','wed', 'thu','fri','sat','sun']
  },
  yAxis: {
    type: 'value'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
        data: [820, 932, 901, 934 , 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
    }
  ]
</script>

<style lang="less" scoped>
.line-echart {
}
</style>
