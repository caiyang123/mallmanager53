<template>
  <el-container class="container">
    <el-header class="header">
      <el-row class="header-wrapper">
        <el-col :span="4">
          <img src="../../assets/logo.png" alt />
        </el-col>
        <el-col :span="18" class="middle"><h2>电商后台管理系统</h2></el-col>
        <el-col :span="2" class="logout">
          <a href="">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
}

.header-wrapper {
    display: flex;
}

.middle {
    text-align: center;
    align-self: center;
}

.logout {
    text-decoration: none;
    align-self: center;
}

a {
    text-decoration: none;
}
</style>