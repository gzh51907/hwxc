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
          <td>{{item.productName}}</td>
          <td>
            <img :src="item.picUrl" alt />
          </td>
          <td>{{item.efficacy}}</td>
          <td>{{item.id}}</td>
          <td>{{item.categoryName}}</td>
          <td class="price" :contenteditable="show" ref="price">{{item.guidePrice}}</td>
          <td>
            <button type="button" class="layui-btn" @click="Edit($event)">
              <i class="layui-icon"></i> 编辑
            </button>
            <button
              type="button"
              class="layui-btn layui-btn-normal"
              @click="Save(item.barcode,index,$event)"
            >
              <i class="layui-icon"></i> 保存
            </button>
            <button type="button" class="layui-btn layui-btn-danger" @click="removeItem($event,index)">
              <i class="layui-icon"></i> 下架
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
      list: [],
      show: false
    };
  },
  async created() {
    let { data } = await this.$axios.get("http://localhost:20190/goods", {});

    this.list = data;
    // console.log(data)
  },
  methods: {
    changeText() {
      this.$emit("input", this.$el.innerHTML);
    },
    async removeItem(e,index) {
      let barcode = e.target.parentNode.parentNode.children[2].innerHTML * 1;
       await this.$axios.delete(`http://localhost:20190/goods/dele?barcode=${barcode}`);
      this.list.splice(index,1); 
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
    Edit(e) {
      e.target.parentNode.parentNode.children[8].focus();
      this.show = true;
    },
    async Save(barcode, index, e) {
      this.show = false;
      let num = e.target.parentNode.parentNode.children[8].innerHTML;
      console.log(num);
      await this.$axios.patch(
        `http://localhost:20190/goods/change?barcode=${barcode}`,
        {
          guidePrice: num
        }
      );
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
th:nth-child(6) {
  width: 14%;
}
tr {
  height: auto;
}
td {
  text-align: center;
  height: 120px;
}
td:last-child {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}
.layui-btn {
  margin-left: 0;
}
</style>  
