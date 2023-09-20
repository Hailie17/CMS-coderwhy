<template>
  <div class="mian">
    <el-container class="main-content">
      <el-aside width="210px">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
</script>

<style lang="less" scoped>
.mian {
  width: 100%;
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      scrollbar-width: none; /*firefox*/
      -ms-overflow-style: none; /*IE 10+*/

      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
      background: purple;
    }
    .el-main {
      background: #f0f2f5;
    }
  }
}
</style>
