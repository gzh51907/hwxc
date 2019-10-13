<template>
    <div>
        <Header></Header>
        <div class="middle" id="middle">
            <el-tabs :tab-position="tabPosition" style="height: auto;">
                <el-tab-pane :label="item.categoryName"  v-for="item in sortlList" :key="item.id">
                    <div class="right_goods">
                        <img :src="item.categoryPicurl" class="bigpic" style="width: 100%;height: 90px;">
                        <ul>
                            <li  v-for="item in goodsList" :key="item.id">
                                <img :src="item.picUrl" >
                                <div style="float:right;" class="title_div">
                                    <h2>{{item.productName}}</h2>
                                    <h3>{{item.efficacy}}</h3>
                                    <p class="shandian">闪电送</p>
                                    <p>
                                        <span class="price">￥{{item.guidePrice.toFixed(2)}}</span>
                                        <i style="float:right;" class="car el-icon-shopping-cart-2"></i>
                                    </p>
                                </div>   
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <Footer></Footer>
    </div>

</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  data() {
    return {
      tabPosition: "left",
      sortlList: [],
      goodsList: ""
    };
  },
  async created() {
    //   请求拿到选项卡和图片
    let { data: { data } } = await this.$axios.get(
      "https://xm.star365.com/api/product-api/category/getSecondCategoryList"
    );
    this.sortlList = data;
    this.sortlList.forEach(item => {
      item.categoryPicurl =
        "https://xm.star365.com/imgfile/" + item.categoryPicurl;
    });

    // 请求拿到第一选项卡的内容
    let { data: { data: { list } } } = await this.$axios.get(
      "https://xm.star365.com/api/product-api/category/getProductBy2typeId",
      {
        params: {
          id: "5591",
          cityId: "903",
          pageNum: "1",
          pageSize: "5"
        }
      }
    );
    console.log("list", list);
    this.goodsList = list;
  },
  components: {
    Footer,
    Header
  }
};
</script>

<style lang="scss" scoped>
#middle {
  height: 100%;
  border-top: 1px solid #f6f6f8;
  padding-right: 10px;

  .right_goods {
    ul {
      li {
        border-bottom: 1px solid #f6f6f8;
        height: 27vw;
        padding: 3.333vw 0;

        img {
          width: 20vw;
          height: 24vw;
        }
        .title_div {
          width: 37vw;

          h2 {
            font-size: 3.733vw;
            color: #333;
          }
          h3 {
            font-size: 3.5vw;
            color: #999;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .shandian {
            font-size: 0.16rem;
            height: 3.467vw;
            color: #e73522;
            margin-bottom: 10px;
          }
          .price {
            font-size: 13px;
            color: #e73522;
          }
          p {
            .car {
              float: right;
              font-size: 23px;
              background-color: #009e9f;
              width: 25px;
              height: 25px;
              text-align: center;
              border-radius: 50%;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>