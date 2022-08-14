<template style="text-align: center;">
  <div>
    <h1>login</h1>
    <el-form
      ref="loginFormC"
      :model="loginForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="loginForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="loginForm.pass"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="success" @click="login">登 录 </el-button>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  data() {
    return {
      loginForm: {
        user: "",
        pass: "",
      },
      rules: {
        user: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 2, max: 9, message: "长度2到9", trigger: "blur" },
        ],
        pass: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginFormC.validate((valid) => {
        if (valid) {
            api.login({ user: this.loginForm.user, pass: this.loginForm.pass })
              .then((res) => {
                if (res.data.status == 200) {
                  this.$message({ message: "登录成功" });
                  this.$router.push("/demo");
                } else {
                  this.$message({ message: "登录失败", type: "error" });
                }
              });
          }
        })
    },
  },
};
</script>

<style>
</style>