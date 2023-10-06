<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 中间部分图标 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <base-echart />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <base-echart />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <base-echart />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 底部图标 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>折线图</chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>柱状图</chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-card/count-card.vue'
import ChartCard from './c-cpns/chart-card/chart-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import BaseEchart from '@/components/page-echarts'

//1. 发起数据请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

//2. 从store获取数据
const { amountList } = storeToRefs(analysisStore)
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 10px;
}
</style>
