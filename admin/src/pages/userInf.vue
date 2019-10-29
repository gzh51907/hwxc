<template>
  <div>
    <h2>
      用户信息表：
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="5"
        :total="total_users"
        style="float:right"
        @current-change="current_change"
      ></el-pagination>
    </h2>
    <table class="layui-table" lay-even lay-skin="row">
      <thead>
        <tr>
          <th style="width:50px;">
            <input type="checkbox" />全选
          </th>
          <th>序号</th>
          <th>用户名</th>
          <th>注册时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in userlist" :key="item.id">
          <td>
            <input type="checkbox" />
          </td>
          <td>{{index +1}}</td>
          <td>{{item.username}}</td>
          <td>{{item.regtime}}</td>
          <td style="width:80px;">
            <button
              type="button"
              class="layui-btn layui-btn-sm layui-btn-normal"
              @click="removeItem(item.username)"
              style="width:100%;"
            >
              <i class="layui-icon"></i>
              注销
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      current_page: 1,
      total_users: null
    };
  },
  async created() {
    let { data: totalUser } = await this.$axios.get(
      "http://119.23.107.32:20190/user",
      {}
    );

    this.total_users = totalUser.length;
    let { data:userlist } = await this.$axios.post(
      "http://119.23.107.32:20190/user/userpage",
      {
        limit: 5,
        page: 1
      }
    );
    this.userlist = userlist;
  },
  methods: {
    removeItem(username) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("接收username", username);
          let { data } = this.$axios.post(
            "http://119.23.107.32:20190/user/dele",
            {
              username
            }
          );
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async current_change(page) {
      this.current_page = page;
      let { data: res } = await this.$axios.post(
        "http://119.23.107.32:20190/user/userpage",
        {
          limit: 5,
          page: this.current_page
        }
      );
      this.userlist = res;
    }
  }
};
</script>

<style lang="scss" scoped>
th {
  font-weight: bold;
  text-align: center;
}
</style>