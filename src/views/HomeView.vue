<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <el-row :gutter="20">
          <el-col :span="4"
            ><img class="logo" src="../assets/logo.png" alt=""
          /></el-col>
          <el-col :span="16"><h2 class="title">后台管理系统</h2></el-col>
          <el-col :span="4"><button class="quit">退出登录</button></el-col>
        </el-row>
      </el-header>
      <el-container class="main-container">
        <el-aside width="200px" class="aside">
          <el-col>
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="goods"
              text-color="#fff"
              router="true"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="goods">
                <el-icon><setting /></el-icon>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><setting /></el-icon>
                <span>列表2</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><setting /></el-icon>
                <span>列表3</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
    };
  },
});
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 80px;
    width: 100%;
    background-color: #ccc;
    .logo {
      height: 80px;
    }
    .title {
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .quit {
      height: 40px;
      margin-top: 20px;
      border: none;
      cursor: pointer;
      color: #fff;
      background-color: #ccc;
    }
  }
  .main-container {
    flex: 1;
    .aside {
      background-color: #545c64;
    }
  }
}
</style>