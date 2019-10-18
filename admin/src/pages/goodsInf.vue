<template>
  <div>
    <h2>
      商品信息表：
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="list.length"
        style="float:right"
      ></el-pagination>
    </h2>

    <table class="layui-table" lay-even lay-skin="row">
      <!-- <colgroup>
        <col width="150">
        <col width="150">
        <col width="200">
      </colgroup>-->
      <thead>
        <tr>
          <th>
            <input type="checkbox" />全选
          </th>
          <th>序号</th>
          <th>商品id</th>
          <th>商品标题</th>
          <th>商品图片</th>
          <th>商品功能</th>
          <th>分类id</th>
          <th>商品分类</th>
          <th>价格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>
            <input type="checkbox" />
          </td>
          <td>{{index+1}}</td>
          <td>{{item.barcode}}</td>
          <td>{{item.efficacy}}</td>
          <td>
            <img :src="item.picUrl" alt />
          </td>
          <td>{{item.barcode}}</td>
          <td>{{item.id}}</td>
          <td>{{item.categoryName}}</td>
          <td>{{item.guidePrice}}</td>
          <td>
            <button type="button" class="layui-btn"><i class="layui-icon"></i> 编辑</button>  
            <button
              type="button"
              class="layui-btn layui-btn-danger"
              @click="removeItem"
            >
              <i class="layui-icon"></i>
              下架
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
      list: []
    };
  },
  async created() {
    let { data } = await this.$axios.get("http://localhost:20190/goods",{
      size:50
    });

    this.list = data;
  },
  methods: {
    removeItem() {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
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
    Edit(){
      
    }
  }
};
</script>

<style lang="scss" scoped>
th {
  width: 10%;
  font-weight: bold;
  text-align: center;
}
th:nth-child(1) {
  width: 8%;
}
th:nth-child(2) {
  width: 6%;
}
th:nth-child(4) {
  width: 18%;
}
th:nth-child(5) {
  width: 12%;
}
tr{
  height: auto;
}
td {
  text-align: center;
  height: 120px;
}
td:last-child {
  display: flex;
  align-items: center;
}
.layui-btn {
  width: 100%;
}
</style>
