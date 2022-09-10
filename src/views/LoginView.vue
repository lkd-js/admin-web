<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h2>后台管理登录</h2>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script lang="ts" >
import { defineComponent, reactive, ref, toRefs } from "vue";
import type { FormInstance } from "element-plus";
import { LoginData } from "@/type/login";
import { login } from "@/request/api/login";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    // 定义所需数据data
    const data = reactive(new LoginData());
    // 定义表单数据
    const ruleFormRef = ref<FormInstance>();
    // 定义表单校验规则
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        {
          min: 2,
          max: 11,
          message: "用户名长度在2到11个字符之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 6,
          max: 18,
          message: "密码长度在6到18个字符之间",
          trigger: "blur",
        },
      ],
    };

    // 定义提交按钮函数
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          // console.log("submit!");
          login(data.ruleForm)
            .then((res) => {
              // console.log(res);
              if (res.data.success) {
                alert("欢迎您" + res.data.username);
                localStorage.setItem("token", res.data.token);
                router.push("/");
              } else {
                alert(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    // 定义重置按钮函数
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      ...toRefs(data),
      rules,
      ruleFormRef,
      submitForm,
      resetForm,
    };
  },
});
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(35deg, pink, skyblue);
  .demo-ruleForm {
    background-color: #fff;
    width: 40%;
    margin: 80px auto 0;
    padding: 20px 40px;
    border-radius: 10px;
    h2 {
      margin-bottom: 20px;
    }
    .el-button {
      width: 45%;
    }
  }
}
</style>