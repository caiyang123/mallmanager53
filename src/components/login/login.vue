<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="login-form">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
      login() {
          this.$http.post('login', this.formdata).then(res => {
              const {data, meta: {msg, status}} = res;

              if(status === 200) {
                //   this.$router.push({name: 'home'});
                  this.$message.success(msg);
              } else {

                this.$message.error(msg);
              }
          })
      }
  },
};
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background-color: #314152;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
    width: 420px;
    background-color: white;
    border-radius: 4px;
    padding: 20px;
}

.login-wrap .login-btn {
    width: 100%;
}
</style>