<template>
    <div>
        <Header></Header>
        <div class="middle" id="middle">
            <el-tabs :tab-position="tabPosition" style="height: auto;">
                <el-tab-pane :label="item.categoryName"  v-for="item in sortlList" :key="item.id">
                    <div class="right_goods">
                        <img :src="item.categoryPicurl" class="bigpic" style="width: 100%;height: 80px;">
                        <ul>
                            <li style="height:34.667vw;"  v-for="item in goodsList" :key="item.id">
                                <img :src="item.picUrl" >
                                <div style="float:right;" class="title_div">
                                    <h2>{{item.productName}}</h2>
                                    <p>{{item.efficacy}}</p>
                                    <p>闪电送</p>
                                    <p>
                                        <span>￥{{item.guidePrice}}</span>
                                        <i>44</i>
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
    let { data: { list } } = await this.$axios.get(
      "https://xm.star365.com/api/product-api/category/getProductBy2typeId",
      {
        params: {
          id: "5591",
          cityId: "903",
          pageNum: "1",
          pageSize: "8"
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
  border-top: 1px solid #ccc;
  padding-right: 10px;

  .right_goods {
    ul {
      img {
        width: 20vw;
        height: 24vw;
        margin-right: 2.667vw;
      }
      .title_div {
        width: 37vw;
      }
    }
  }
}
</style>