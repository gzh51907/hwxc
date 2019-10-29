<template>
  <div class="goodsInf">
    <h2>添加商品：</h2>
    <div class="form">
      <div class="box box1">
        <label for="name">商品id：</label>
        <input type="text" v-model="barcode" ref="goodsId"/>
      </div>
      <!-- <p v-show="show">{{meg}}</p> -->
      <div class="box box4">
        <label for="psw">商品标题：</label>
        <input type="text" v-model="productName" />
      </div>
      <div class="box box4">
        <label for="psw">商品图片：</label>
        <input type="text" v-model="picUrl" />
      </div>
      <div class="box box4">
        <label for="psw">商品功能：</label>
        <input type="text" v-model="efficacy" />
      </div>
      <div class="box box4">
        <label for="psw">分类id：</label>
        <input type="text" v-model="id" />
      </div>
      <div class="box box4">
        <label for="psw">商品分类：</label>
        <input type="text" v-model="categoryName" />
      </div>
      <div class="box box4">
        <label for="psw">价格：</label>
        <input type="text" v-model="guidePrice" />
      </div>
      <div class="btn" @click="addGoods()">保 &nbsp; &nbsp; 存</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryName: "",
      id: "",
      productName: "",
      barcode: "",
      picUrl: "",
      efficacy: "",
      guidePrice: ""
    };
  },
  mounted(){
    this.$refs.goodsId.focus();
  },
  methods: {
    async addGoods() {
      await this.$axios.post("http://119.23.107.32:20190/goods/add", {
        id: parseInt(this.id),
        categoryName: this.categoryName,
        productName: this.productName,
        barcode: parseInt(this.barcode),
        picUrl: this.picUrl,
        efficacy: this.efficacy,
        guidePrice: parseInt(this.guidePrice)
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
html {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.form {
  width: 600px;
  height: auto;
  border: 1px solid #ccc;
  padding: 10px 20px;
  margin: 100px auto;

  .box {
    width: 100%;
    margin-top: 20px;
    color: #393d49;
    display: flex;
    label {
      display: block;
      width: 140px;
      text-align: center;
      line-height: 40px;
    }
    input {
      height: 40px;
      width: 400px;
      border: 1px solid #ccc;
    }
  }
  p {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  .btn {
    width: 100%;
    height: 40px;
    background-color: #393d49;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    margin-top: 50px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #23262e;
  }
}
</style>
