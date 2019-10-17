<template>
  <div>
    <h2> 商品信息表：</h2>
    <table class="layui-table" lay-even="" lay-skin="row">
      <!-- <colgroup>
        <col width="150">
        <col width="150">
        <col width="200">
      </colgroup> -->
      <thead>
        <tr>
          <th><input type="checkbox" />全选</th>
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
          <td><input type="checkbox" /></td>
          <td>{{item}}</td>
          <td>汉族</td>
          <td>1989-10-14</td>
          <td>人生似修行</td>
          <td>人生似修行</td>
          <td>人生似修行</td>
          <td>人生似修行</td>
          <td>人生似修行</td>
          <td>
            <button type="button" class="layui-btn layui-btn-sm layui-btn-normal" @click="removeItem">
              <i class="layui-icon"></i> 
              下架
            </button>
          </td>
        </tr>
      </tbody>
    </table>
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="list.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        "成都",
        "武汉",
        "青岛",
        "天津",
        "重庆",
        "南京",
        "九江",
        "香港",
        "澳门",
        "台北"
      ]
    };
  },
  async created(){
    
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
    
  }
};
</script>

<style lang="scss" scoped>
th {
  font-weight: bold;
  text-align: center;
}
.layui-btn {
  width: 100%;
}
</style>
