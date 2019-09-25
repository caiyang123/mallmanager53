<template>
  <el-card class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="search-wrap">
      <el-input placeholder="请输入内容" v-model="query" class="search-box" clearable>
        <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
      </el-input>
      <el-button type="primary" @click="dialogFormVisibleAdd = true">添加用户</el-button>
    </el-row>
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="userlist">{{ userlist.row.create_time | fmtdate }}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="userlist">
          <el-switch
            v-model="userlist.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="data">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            plain
            @click="showEditDialog(data.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" circle size="small" plain></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            plain
            @click="showConfirmDelete(data.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      total: -1,
      pagenum: 1,
      pagesize: 2,
      userlist: [],
      dialogFormVisibleAdd: false,
      form: {
        username: "",
        password: "",
        mobile: "",
        email: ""
      },
      dialogFormVisibleEdit: false
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      const res = await this.$http.get("users", {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      const {
        meta: { status, msg },
        data: { users, total }
      } = res;
      if (status === 200) {
        this.userlist = users;
        this.total = total;
      } else {
        this.$message.warn(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    searchUser() {
      this.pagenum = 1;
      this.getUserList();
    },
    async addUser() {
      const res = await this.$http.post("users", this.form);
      const {
        meta: { status, msg }
      } = res;
      if (status === 200) {
        this.$message.success(msg);
        this.getUserList();
        this.form = {};
      } else {
        this.$message.warning(msg);
      }

      this.dialogFormVisibleAdd = false;
    },
    showConfirmDelete(user) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete("users/" + user.id);
          const {
            meta: { status, msg }
          } = res;
          if (status === 200) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.pagenum = 1;
            this.getUserList();
          } else {
            this.$message.warning(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showEditDialog(user) {
      this.dialogFormVisibleEdit = true;
      this.form = user;
    },
    async editUser() {
      const res = await this.$http.put("users/" + this.form.id, {
          mobile: this.form.mobile,
          email: this.form.email
      });
      const {
        meta: { status, msg }
      } = res;
      if (status === 200) {
        this.$message.success(msg);
        this.getUserList();
        this.dialogFormVisibleEdit = false;
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}

.search-wrap {
  margin-top: 20px;
}

.search-box {
  width: 300px;
}
</style>