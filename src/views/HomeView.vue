<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <el-row :gutter="24">
          <el-col :span="2"
            ><img class="logo" src="../assets/logo.png" alt=""
          /></el-col>
          <el-col :span="16"><h2 class="title">后台管理系统</h2></el-col>
          <el-col :span="4"
            ><span class="title">欢迎您，{{ name }}</span></el-col
          >
          <el-col :span="2"
            ><button @click="quitLogin" class="quit">退出登录</button></el-col
          >
        </el-row>
      </el-header>
      <el-container class="main-container">
        <el-aside width="200px" class="aside">
          <el-col>
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              :default-active="$route.path"
              text-color="#fff"
              router
            >
              <el-menu-item
                :index="rou.path"
                v-for="rou in routesList"
                :key="rou.path"
              >
                <span>{{ rou.meta.title }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const routesList = router.getRoutes().filter((v) => v.meta.isShow);
    // console.log(routesList);
    const quitLogin = () => {
      localStorage.removeItem("token");
      router.push("/login");
      alert("退出登录成功");
    };
    const name: string | null = localStorage.getItem("username") || "";

    return {
      routesList,
      quitLogin,
      name,
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
    background-color: #545c64dd;
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
      border: 1px solid #fff;
      border-radius: 5px;
      cursor: pointer;
      color: #fff;
      background-color: #ccc;
    }
  }
  .main-container {
    flex: 1;
    .aside {
      background-color: #545c64a9;
    }
  }
}
</style>