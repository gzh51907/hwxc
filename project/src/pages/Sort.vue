<template>
    <div>
        <Header></Header>
        <div class="middle" id="middle">
          <el-alert title="成功加入购物车" type="success" show-icon v-show="showAlert"  style="position:fixed;top:13.333vw;z-index:100"></el-alert>
            <ul class="tabbox">
              <li class="tab" v-for="(item,index) in sortList" :key="item.id" @click="goto(item.id,index)"
              :class="{tab_active:index===current}">{{item.categoryName}}</li>
            </ul>
            <div class="right_goods" >              
                <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" v-if="hideItem">
                  <li v-for="item in goodsList.list" :key="item.id" class="infinite-list-item" v-loading="loading" @click="gotoGoods(item.barcode)">
                    <img :src="item.picUrl" >
                                <div style="float:right;" class="title_div">
                                    <h2>{{item.productName}}</h2>
                                    <h3>{{item.efficacy}}</h3>
                                    <p class="shandian">闪电送</p>
                                    <p>
                                        <span class="price">￥{{item.guidePrice.toFixed(2)}}</span>
                                        <i style="float:right;" class="car el-icon-shopping-cart-full" @click.stop="addCar(item)"></i>
                                    </p>
                              </div> 
                  </li>
                </ul>
                 
                <img class="hide_img" src="../images/no-goods.png" v-else/>
            </div>          
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
      sortList: [],
      goodsList: {},
      current: 0,
      pageNum: 1,
      id: 5591,
      loading: "",
      showAlert: false
    };
  },
  async created() {
    //   请求拿到选项卡和图片
    let { data: { data } } = await this.$axios.get(
      "https://xm.star365.com/api/product-api/category/getSecondCategoryList"
    );
    this.sortList = data;

    let { id } = this.$route.params;
    this.tabId(id, 1);
  },
  // 路由守卫监听id变化
  beforeRouteUpdate(to, from, next) {
    if (to.params.id != from.params.id) {
      this.id = to.params.id;
      this.pageNum = 1;
      this.tabId(to.params.id, this.pageNum);
    }
    next();
  },

  methods: {
    goto(id, index) {
      this.$router.push("/sort/" + id);
      this.current = index;
      if (this.current != index) {
        this.pageNum = 1;
        this.id = id;
      }
    },
    load() {
      // 懒加载
      if (this.pageNum < this.goodsList.totalPage) {
        this.loading = true;
        this.pageNum++;
        setTimeout(() => {
          this.loading = false;
          this.tabId(this.id, this.pageNum);
        }, 1000);
      } else if (this.pageNum >= this.goodsList.totalPage) {
        this.pageNum == this.goodsList.totalPage;
      } else if (this.pageNum <= 1) {
        this.pageNum = 1;
      }
    },

    async tabId(id, pageNum) {
      // 请求拿到第一选项卡的内容
      let { data: { data: res } } = await this.$axios.get(
        "https://xm.star365.com/api/product-api/category/getProductBy2typeId",
        {
          params: {
            id: id,
            cityId: "903",
            pageNum: pageNum,
            pageSize: pageNum * 5
          }
        }
      );
      // 拿到数据和总页数
      this.goodsList = {
        list: res.list,
        totalPage: res.totalPage
      };
    },
    add2cart(list) {
      // 添加前，判断该商品是否已经存在,存在+1
      let currentgoods = this.$store.state.cart.cartlist.filter(
        item => item.id == list.barcode
      )[0];
      if (currentgoods) {
        let num = currentgoods.num + 1;
        this.$store.commit('changeNum',{id:list.barcode,num:1});
      }else{
          let goods = {
          id:list.barcode,
          title: list.productName,
          efficacy: list.efficacy,
          pic: list.picUrl,
          price: list.guidePrice,
          num: 1
        };
        this.$store.commit("add2cart", goods);
      }
    },
    // 添加到购物车1
    addCar(list) {
      let user = localStorage.getItem("user");
      if (user) {
        this.add2cart(list);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1000);
      } else {
        this.$router.replace({
          path: "/login"
        });
      }
    },
    gotoGoods(barcode) {
      this.$router.push({ name: "goods", params: { barcode } });
    }
  },
  computed: {
    hideItem() {
      if (this.goodsList.totalPage != 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Footer,
    Header
  }
};
</script>

<style lang="scss" scoped>
.middle {
  width: 100%;
  height: calc(100% - 13.333vw);
  border-top: 1px solid #f6f6f8;
  padding-top: 13.333vw;
  padding-bottom: 13.333vw;
  position: fixed;

  .tabbox {
    height: calc(100% - 13.333vw);
    width: 25%;
    background-color: #f6f6f8;
    float: left;
    overflow-y: auto;
    padding-bottom: 13.333vw;

    .tab {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #f1f1f1;
      font-size: 3.733vw;
      color: #333;
    }

    .tab_active {
      border-left: 2px solid #009e9f;
      background-color: #fff;
      color: #009e9f;
      font-weight: bold;
      font-size: 4vw;
    }
  }

  .right_goods {
    float: right;
    width: 75%;
    height: calc(100% - 13.333vw);
    overflow: auto;
    padding-bottom: 13.333vw;

    ul {
      height: 100%;
      li {
        border-bottom: 1px solid #f6f6f8;
        height: 27vw;
        padding: 3.333vw 10px;

        img {
          width: 20vw;
          height: 24vw;
        }
        .title_div {
          width: 45vw;

          h2 {
            width: 100%;
            font-size: 3.733vw;
            color: #333;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
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
            .el-icon-shopping-cart-full:before {
              font-size: 18px;
            }
          }
        }
      }
    }
    .hide_img {
      margin-top: 3.5625rem;
    }
  }
}
</style>