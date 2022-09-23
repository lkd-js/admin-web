<template>
  <div class="aus">
    <el-row>
      <el-col :span="8"
        ><el-breadcrumb separator="/" class="top-bar">
          <el-breadcrumb-item :to="{ name: 'lists' }"
            >角色列表</el-breadcrumb-item
          >
          <el-breadcrumb-item
            >修改【{{ dataList.roleName }}】权限</el-breadcrumb-item
          >
        </el-breadcrumb></el-col
      >
      <el-col :span="8"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="8">
        <el-button type="info" :plain="true" @click="elseSub">取消</el-button>
        <el-button type="primary" :plain="true" @click="submitData"
          >提交修改</el-button
        ></el-col
      >
    </el-row>

    <el-tree
      ref="tree"
      :data="numList"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="dataList.authority"
      :props="{ children: 'roleList', label: 'name' }"
      check-strictly
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ListInt } from "@/type/lists";
import { numData } from "@/type/aus";
import { getAuthors } from "@/request/api/home";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const roles: ListInt[] = JSON.parse(sessionStorage.getItem("roles") || "");

    // 获取当前权限树
    const dataList = roles.find(
      (x: ListInt) => x.roleId === Number(route.params.id)
    ) || { authority: [], roleId: 0, roleName: "" };

    const data = reactive(new numData());
    const tree = ref();
    // 获取权限表
    const getAuthorsList = () => {
      getAuthors()
        .then((res) => {
          // console.log(res.data);
          data.numList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      getAuthorsList();
    });

    const submitData = () => {
      const checkArr = tree.value
        .getCheckedKeys()
        .sort(function (a: number, b: number) {
          return a - b;
        });
      dataList.authority = checkArr;
      roles.forEach((v: ListInt, i: number) => {
        if (v.roleId === Number(route.params.id)) {
          roles[i] = dataList;
        }
      });
      sessionStorage.setItem("roles", JSON.stringify(roles));
      ElMessage({
        message: "权限修改成功",
        type: "success",
      });
      router.go(-1);
    };

    const elseSub = () => {
      ElMessage("已取消修改");
      router.go(-1);
    };

    return {
      ...toRefs(data),
      dataList,
      submitData,
      elseSub,
      tree,
    };
  },
});
</script>

<style lang="less" scoped>
.aus {
  .top-bar {
    margin-bottom: 20px;
    font-size: 16px;
  }
}
</style>