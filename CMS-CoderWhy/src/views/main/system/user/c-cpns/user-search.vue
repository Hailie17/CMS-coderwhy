<template>
  <div class="search">
    <el-form label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码">
            <el-input placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select placeholder="请选择查询状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁言" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :size="size"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.search {
  background: white;
  padding: 20px;
  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
}
</style>
