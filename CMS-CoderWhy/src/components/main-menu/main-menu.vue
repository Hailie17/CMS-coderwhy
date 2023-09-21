<template>
  <div class="main-menu">
    <!-- 1. logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">藏龙岛管理系统</h2>
    </div>
    <!-- 2. menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串：el-icon-monitor => 组件 component 动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{ subitem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import userLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { mapRouteToMenu } from '@/utils/map-menus'
// 0. 定义props，接收父组件传递的isFold
defineProps({
  isFold: {
    type: Boolean,
    default: true
  }
})

// 1. 获取动态的菜单
const loginStore = userLoginStore()
const userMenus = loginStore.userMenus

// 2. 监听item点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}

// 3. Elmenu默认选中菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapRouteToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-self: flex-start;
  align-items: center;
  overflow: hidden;
  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}
.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2133;
  }
  .el-menu-item:hover {
    color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd !important;
  }
}
</style>
