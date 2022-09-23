<template>
  <div class="users">
    <!-- 搜索模块 -->
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
      @keyup.enter="onSearch"
    >
      <el-form-item label="ID" class="searchBox">
        <el-input v-model="searchData.id" placeholder="请输入id" />
      </el-form-item>
      <el-form-item label="用户名" class="searchBox">
        <el-input v-model="searchData.nickName" placeholder="请输入关键字" />
      </el-form-item>
      <el-select
        v-model="searchData.role"
        class="m-2"
        placeholder="选择权限角色"
      >
        <el-option
          v-for="item in rolesList"
          :key="item.roleId"
          :label="item.roleName"
          :value="item.roleId"
        />
      </el-select>
      <el-form-item>
        <el-button type="primary" @click="onSearch">点击搜索</el-button>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格模块 -->
    <el-table :data="showList.show" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="用户名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            link
            type="success"
            size="small"
            v-for="roleItem in scope.row.role"
            :key="roleItem"
            >{{ roleItem.roleName }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="scope">
          <el-button type="primary" size="small" @click="openBox(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog v-model="isShow" title="更改用户权限">
      <el-form :model="curRole">
        <el-form-item label="用户名" label-width="140px">
          <el-input v-model="curRole.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限角色" label-width="140px">
          <el-select
            v-model="curRole.role"
            multiple
            class="m-2"
            placeholder="选择权限角色"
          >
            <el-option
              v-for="item in rolesList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelRole()">取消</el-button>
          <el-button type="primary" @click="submitRole()">提交更改</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      :page-count="count"
      @current-change="updatePage"
    />
    <el-button type="danger" @click="baseGet" class="new-btn"
      >还原数据</el-button
    >
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  computed,
  ref,
  watch,
} from "vue";
import { InitUsers, UsersInt } from "@/type/users";
import { getUsers, getRoles } from "@/request/api/home";

export default defineComponent({
  setup() {
    const data = reactive(new InitUsers());

    // 初始化数据获取
    const baseGetUsers = () => {
      getUsers()
        .then((res) => {
          // console.log(res.data);
          data.usersList = res.data;
          sessionStorage.setItem("users", JSON.stringify(data.usersList));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const baseGetRoles = () => {
      getRoles()
        .then((res) => {
          // console.log(res.data);
          data.rolesList = res.data;
          sessionStorage.setItem("roles", JSON.stringify(data.rolesList));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const baseGet = () => {
      baseGetUsers();
      baseGetRoles();
    };

    // 获取角色列表
    const getUsersList = () => {
      if (sessionStorage.getItem("users")) {
        // console.log("session获取users");
        data.usersList = JSON.parse(sessionStorage.getItem("users") || "");
      } else {
        baseGetUsers();
      }
    };
    // 获取权限列表
    const getRolesList = () => {
      if (sessionStorage.getItem("roles")) {
        // console.log("session获取roles");
        data.rolesList = JSON.parse(sessionStorage.getItem("roles") || "");
      } else {
        baseGetRoles();
      }
    };

    onMounted(() => {
      getUsersList();
      getRolesList();
    });

    //计算展示列表
    const showList = reactive({
      show: computed(() =>
        data.usersList.slice(
          (data.pageData.page - 1) * data.pageData.pagesize,
          data.pageData.page * data.pageData.pagesize
        )
      ),
    });
    //计算总页数
    const count = ref(
      computed(() => {
        return Math.ceil(data.usersList.length / data.pageData.pagesize);
      })
    );

    // 更新页面列表
    const updatePage = (page: number) => {
      data.pageData.page = page;
    };

    // 搜索
    const onSearch = () => {
      // console.log("submit!");
      data.searchData.role = "";
      if (data.searchData.id || data.searchData.nickName) {
        if (data.searchData.id && data.searchData.nickName) {
          data.usersList = data.usersList.filter((v) => {
            return (
              v.id === Number(data.searchData.id) &&
              v.nickName.indexOf(data.searchData.nickName) !== -1
            );
          });
        } else if (data.searchData.id) {
          data.usersList = data.usersList.filter((v) => {
            return v.id == Number(data.searchData.id);
          });
        } else if (data.searchData.nickName) {
          data.usersList = data.usersList.filter((v) => {
            return v.nickName.indexOf(data.searchData.nickName) !== -1;
          });
        }
      }
      // console.log(data.usersList);
    };

    // 重置搜索选项
    const resetSearch = () => {
      data.searchData.id = "";
      data.searchData.nickName = "";
      data.searchData.role = "";
    };

    //角色搜索
    const searchRole = () => {
      if (data.searchData.role) {
        getUsersList();
        const com = data.searchData.role;
        setTimeout(() => {
          onSearch();
          data.searchData.role = com;
          data.usersList = data.usersList.filter(
            (user) =>
              user.role.filter((r) => r.role === Number(data.searchData.role))
                .length > 0
          );
        }, 500);

        // console.log(data.usersList);
      } else {
        getUsersList();
        setTimeout(() => {
          onSearch();
        }, 500);
      }
    };

    // 打开修改页面并传值
    const openBox = (row: UsersInt) => {
      data.isShow = true;
      data.curRoleBase = row;
      data.curRole = {
        id: row.id,
        nickName: row.nickName,
        role: row.role.map((x) => x.role),
        userName: row.userName,
      };
    };
    // 撤销修改
    const cancelRole = () => {
      data.isShow = false;
      data.usersList = JSON.parse(sessionStorage.getItem("users") || "");
    };
    // 提交更改

    const submitRole = () => {
      data.isShow = false;
      data.curRoleBase.nickName = data.curRole.nickName;
      data.curRoleBase.role = data.rolesList
        .filter((x) => data.curRole.role.indexOf(x.roleId) !== -1)
        .map((x) => {
          const obj = {
            role: x.roleId,
            roleName: x.roleName,
          };
          return obj;
        });
      data.usersList.forEach((v, i) => {
        if (v.id === data.curRoleBase.id) {
          data.usersList[i] = data.curRoleBase;
        }
      });
      sessionStorage.setItem("users", JSON.stringify(data.usersList));
    };

    // 监视搜索关键词，及时更新数据
    watch([() => data.searchData.id, () => data.searchData.nickName], () => {
      if (data.searchData.id === "" && data.searchData.nickName === "") {
        getUsersList();
        searchRole();
      }
    });
    watch(
      () => data.searchData.role,
      () => {
        searchRole();
      }
    );

    return {
      ...toRefs(data),
      onSearch,
      resetSearch,
      showList,
      count,
      updatePage,
      openBox,
      cancelRole,
      submitRole,
      baseGet,
    };
  },
});
</script>

<style lang="less" scoped>
.users {
  .demo-form-inline {
    display: flex;
    align-items: center;
    justify-content: center;
    .searchBox {
      width: 180px;
    }
    .m-2 {
      width: 100px;
      margin-right: 50px;
      margin-top: -18px;
    }
  }
  .new-btn {
    margin-top: 100px;
  }
}
</style>