<template>
  <div class="lists">
    <el-breadcrumb separator="/" class="top-bar">
      <el-breadcrumb-item :to="{ name: 'lists' }">角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加模块 -->
    <el-button class="add-btn" type="primary" @click="addRole"
      >点击创建新角色</el-button
    >
    <!-- 表格模块 -->
    <el-table :data="auList" border stripe style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="权限名" width="180" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="goChange(scope.row)">
            编辑权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <!-- 分页 -->
    <el-button type="danger" @click="baseGetRoles" class="new-btn"
      >还原数据</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { getRoles } from "@/request/api/home";
import { ListInt, ListData } from "@/type/lists";

import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const data = reactive(new ListData());
    const router = useRouter();

    const baseGetRoles = () => {
      getRoles()
        .then((res) => {
          // console.log(res.data);
          data.auList = res.data;
          sessionStorage.setItem("roles", JSON.stringify(data.auList));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 获取角色权限列表
    const getRolesList = () => {
      if (sessionStorage.getItem("roles")) {
        // console.log("session获取roles");
        data.auList = JSON.parse(sessionStorage.getItem("roles") || "");
      } else {
        baseGetRoles();
      }
    };

    onMounted(() => {
      getRolesList();
    });

    const addRole = () => {
      ElMessageBox.prompt("请输入角色名", "名称", {
        confirmButtonText: "确认添加",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          ElMessage({
            type: "success",
            message: `${value}创建成功`,
          });

          data.auList.push({
            authority: [],
            roleId: data.auList.length + 1,
            roleName: value,
          });

          sessionStorage.setItem("roles", JSON.stringify(data.auList));
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    };

    const goChange = (row: ListInt) => {
      // console.log(row);
      router.push({
        name: "aus",
        params: {
          id: row.roleId,
          name: row.roleName,
        },
      });
    };

    return {
      ...toRefs(data),
      baseGetRoles,
      addRole,
      goChange,
    };
  },
});
</script>


<style lang="less" scoped>
.lists {
  .top-bar {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .add-btn {
    margin-left: 500px;
    margin-bottom: 20px;
  }
  .new-btn {
    margin-top: 100px;
  }
}
</style>