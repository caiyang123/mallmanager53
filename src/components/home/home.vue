<template>
  <el-container class="container">
    <el-header class="header">
      <el-row class="header-wrapper">
        <el-col :span="4">
          <img src="../../assets/logo.png" alt />
        </el-col>
        <el-col :span="18" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="2" class="logout">
          <a @click.prevent="handleLogout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-user-solid"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-location"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="2-1">
              <i class="el-icon-location"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-location"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-location"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-location"></i>
              商品分类
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    beforeCreate () {
        if (!localStorage.getItem('token')) {
            this.$router.push({name: 'login'});
        }
    },
    methods: {
        handleLogout() {
            localStorage.clear();
            this.$message.success('退出成功');
            this.$router.push({name: 'login'});
        }
    },
};
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
  align-items: center;
}

.middle {
  text-align: center;
}

.logout {
  text-decoration: none;
  cursor: pointer;
}

a {
  text-decoration: none;
}
</style>