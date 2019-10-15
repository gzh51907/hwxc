<template>
  <div>
    <Header></Header>
    <div class="box">
      <div class="layout">
        <div class="banner">
          <el-carousel height="37.333vw" indicator-position="none">
            <el-carousel-item v-for="(item,index) in imglist" :key="index">
              <img :src="item" style="width:100%;height:100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="notice">
          <span class="notice_span">公告</span>
          <el-carousel indicator-position="none" direction="vertical">
            <el-carousel-item v-for="item in Noticelist" :key="item.id">
              <h3 class="medium">{{ item.noticeTitle }}</h3>
            </el-carousel-item>
          </el-carousel>
          <a href="###">
            <img src="../images/img1.png" alt />
            <span class="name">御景花园</span>
          </a>
        </div>
      </div>
      <ul class="menu_ul">
        <li class="menu_li">
          <a href="###">
            <img src="../images/logo_1.png" alt />
            <span>城市服务</span>
          </a>
        </li>
        <li class="menu_li">
          <a href="###">
            <img src="../images/logo_2.png" alt />
            <span>慢病专区</span>
          </a>
        </li>
        <li class="menu_li">
          <a href="###">
            <img src="../images/logo_3.png" alt />
            <span>全球优品</span>
          </a>
        </li>
        <li class="menu_li">
          <a href="###">
            <img src="../images/logo_4.png" alt />
            <span>药师服务</span>
          </a>
        </li>
      </ul>
      <section class="Home_sign">
        <div class="Home_sign_item">正品保障</div>
        <div class="Home_sign_item">全国连锁</div>
        <div class="Home_sign_item">企业资质</div>
      </section>
      <section class="layout">
        <div class="layout_item" v-for="item in imgItem" :key="item">
          <img :src="item" alt />
        </div>
      </section>
      <section class="layout">
        <h3 class="layout_h3">
          <em>品牌馆</em>
        </h3>
        <ul class="layout_itemlist_ul">
          <li class="layout_itemlist_li" v-for="item in brand" :key="item.id">
            <div>
              <img :src="item.brandPicUrl" alt />

              <p>{{item.brandName}}</p>
            </div>
          </li>
        </ul>
      </section>
      <section class="Home__product">
        <div class="Tabtop">
          <ul class="Home__product_ul">
            <li
              class="Home__product_li"
              v-for="(item,index) in Product"
              :key="item.id"
              @click="gotoTab(item.id,index),openFullScreen()"
              :class="{active:active === index}"
            >{{item.categoryName}}</li>
          </ul>
        </div>
      </section>

      <section class="layout layout_list">
        <div class="loading" v-if="show">
          <img src="../images/loading.png" alt />
          <img src="../images/loading.png" alt />
          <img src="../images/loading.png" alt />
        </div>
        <ul class="layout_list_ul">
          <li
            class="layout_list_li"
            v-for="item in goodsList"
            @click="goto(item.barcode)"
            :key="item.id"
          >
            <div class="ProItem__pro-imgs">
              <img :src="item.picUrl" alt />
              <img src="../images/tl.png" alt />
            </div>
            <div class="ProItem__pro-box">
              <p class="ProItem__pro-box_p1">{{item.productName}}</p>
              <p class="ProItem__pro-box_p2">{{item.efficacy}}</p>
              <div class="ProItem__pro-tag">
                <span></span>
              </div>
              <div class="ProItem__pro-price">
                <div class="Price__money">
                  ￥
                  <em>{{item.guidePrice.toFixed(2)}}</em>
                </div>
              </div>
              <p class="ProItem__pro-num">销量{{item.sellCount}}笔</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <div class="scroll_Top" @click="toTop">
      <img src="../images/jiantou.png" alt />
      回顶部
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
export default {
  data() {
    return {
      Noticelist: "",
      imglist: "",
      imgItem: "",
      brand: "",
      Product: "",
      active: 0,
      goodsList: [],
      pageNum: 1,
      show: false,
    };
  },
  methods: {
    openFullScreen() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 2600);
    },
    gotoTab(id, index) {
      //切换tab颜色`
      this.active = index;
      this.tabId(id, this.pageNum);
    },
    toTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    goto(barcode) {
      this.$router.push({ name: "goods", params: { barcode } });
    },
    async tabId(id, pageNum) {
      // 请求拿到第一选项卡的内容
      let {
        data: {
          data: { list }
        }
      } = await this.$axios.get(
        "https://xm.star365.com/api/product-api/category/getProductBy2typeId",
        {
          params: {
            id: id,
            cityId: 903,
            pageNum: pageNum,
            pageSize: 12
          }
        }
      );
      this.goodsList = list;
    }
  },
  mounted() {
    document.querySelector(".scroll_Top").style.bottom = this.toBottom;
  },
  async created() {
    let {
      data: { data }
    } = await this.$axios.get(
      "https://xm.star365.com/api/user-api/index/getIndexData",
      {
        params: {
          cityId: 903
        }
      }
    );
    let img = data.carousel.map(item => {
      return `https://xm.star365.com/imgfile/${item.carouselPicurl}`;
    });

    this.imglist = img;
    this.Noticelist = data.notice;
    let {
      data: { data: dataimg }
    } = await this.$axios.get(
      "https://xm.star365.com/api/user-api/topic/master"
    );
    // console.log(dataimg);
    let img_item = dataimg.map(item => {
      return `https://xm.star365.com/imgfile/${item.topicPicurl}`;
    });
    this.imgItem = img_item;
    let {
      data: { data: res }
    } = await this.$axios.get(
      "https://xm.star365.com/api/user-api/brand/getBrandList"
    );
    // console.log(res);
    res.map(item => {
      let brandimg = `https://xm.star365.com/imgfile/${item.brandPicUrl}`;
      item.brandPicUrl = brandimg;
    });
    // console.log(res);
    this.brand = res;
    let {
      data: { data: item }
    } = await this.$axios.get(
      "https://xm.star365.com/api/product-api/category/getSecondCategoryList"
    );
    // console.log(item);
    this.Product = item;
    this.tabId(item[0].id, this.pageNum);
  },
  components: {
    Footer,
    Header
  }
};
</script>

<style lang="scss" scoped>
.box {
  height: auto;
  flex: 1;
  margin-top: 13.333vw;
  margin-bottom: 13.333vw;
}
.layout {
  padding-left: 4vw;
  padding-right: 4vw;
  .banner {
    width: 100%;
    height: 37.333vw;
    border-radius: 1.6vw;
    overflow: hidden;
    display: block;
    touch-action: pan-y;
  }
  .notice {
    height: 13.6vw;
    display: flex;
    align-items: center;
    .notice_span {
      width: 7.867vw;
      height: 3.733vw;
      background: #ffb349;
      color: #fff;
      font-size: 2.667vw;
      line-height: 3.733vw;
      display: inline-block;
      text-align: center;
      border-radius: 1.333vw;
      border-bottom-left-radius: 0;
      margin-right: 1.6vw;
    }
    .el-carousel {
      width: 48vw;
      font-size: 11px;
      height: 15.2px;
      line-height: 15.2px;
      .el-carousel__item {
        h3 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #555;
        }
      }
    }
    a {
      width: 30vw;
      height: 7.733vw;
      background: #f5fcf6;
      border-radius: 3.867vw;
      display: flex;
      line-height: 7.733vw;
      align-items: center;
      color: #5fbfa4;
      padding-left: 2vw;
      position: relative;
      img {
        width: 4.8vw;
        height: 4.8vw;
        margin-right: 1.333vw;
      }
      .name {
        width: 24vw;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        font-weight: 700;
        font-size: 11px;
      }
    }
  }
}
.menu_ul {
  display: flex;
  .menu_li {
    flex: 1;
    a {
      color: #333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 11.2vw;
        height: 11.2vw;
        align-items: center;
        margin: 0 auto 4.933vw;
      }
      span {
        color: #333;
        font-size: 3.633vw;
      }
    }
  }
}
.Home_sign {
  display: flex;
  width: 100%;
  height: 6.4vw;
  background: #f5fcf6;
  align-items: center;
  font-size: 3.2vw;
  margin-top: 4.667vw;
  justify-content: center;
  .Home_sign_item {
    width: 21.333vw;
    height: 3.467vw;
    padding-left: 5.067vw;
    display: flex;
    align-items: center;
  }
  .Home_sign_item:nth-child(1) {
    background: url(../images/zhengpin.png) no-repeat;
    background-size: 3.2vw 3.467vw;
  }
  .Home_sign_item:nth-child(2) {
    background: url(../images/quanguo.png) no-repeat;
    background-size: 3.2vw 3.467vw;
  }
  .Home_sign_item:nth-child(3) {
    background: url(../images/qiye.png) no-repeat;
    background-size: 3.2vw 3.467vw;
  }
}
.layout_item {
  border-radius: 1.333vw;
  overflow: hidden;
  height: 32vw;
  margin-top: 4vw;
  img {
    width: 100%;
    height: 32vw;
    object-fit: cover;
    max-width: 100%;
    vertical-align: middle;
  }
}
.layout_h3 {
  height: 5.6vw;
  position: relative;
  margin-top: 6.667vw;
  font-size: 5.6vw;
  text-align: center;
  line-height: 1;
  font-weight: bold;
  em {
    position: relative;
    z-index: 2;
    font-style: inherit;
  }
  em::after {
    width: 34.533vw;
    height: 2.533vw;
    content: "";
    position: absolute;
    background: #ccecec;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
}
.Home__product .active {
  color: #ffee2f !important;
  font-size: 4vw !important;
  line-height: 8vw !important;
}
.Home__product .active::after {
  width: 5.6vw;
  height: 1.867vw;
  content: " ";
  position: absolute;
  background: url(../images/active.png) no-repeat;
  background-size: cover;
  left: 50%;
  bottom: 2vw;
  transform: translateX(-50%);
}
.Home__product {
  position: relative;
  z-index: 20;
  height: 11.733vw;
  width: 100%;
  .Home__product_ul {
    width: 100%;
    height: 100%;
    background: #009e9f;
    overflow-x: auto;
    top: 0;
    left: 0;
    position: absolute;
    display: flex;
    z-index: 5;
    .Home__product_li {
      font-size: 3.333vw;
      font-weight: 700;
      line-height: 9.333vw;
      height: 11.733vw;
      background: #009e9f;
      flex: 0 0 25%;
      color: #fff;
      transition: all 0.3s ease-out;
      line-height: 11.733vw;
      text-align: center;
      position: relative;
    }
  }
}
.layout_itemlist_ul {
  width: 103%;
  min-height: 24vw;
  max-height: 62.667vw;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5.333vw;
  .layout_itemlist_li {
    width: 20.667vw;
    height: 27.333vw;
    overflow: hidden;
    margin: 0 2.933vw 2.933vw 0;
    border-radius: 1.333vw;
    text-align: center;
    img {
      width: 20vw;
      height: 20vw;
      object-fit: cover;
      border-radius: 1.333vw;
    }

    p {
      margin-top: 2.667vw;
      color: #666;
      font-size: 3.467vw;
    }
  }
}

.loading {
  width: 100%;
  height: auto;
  position: absolute;
  z-index: 2;
  top: -13vw;
  left: 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.layout_list {
  margin-top: 1.333vw;
  position: relative;
  .layout_list_ul {
    display: flex;
    flex-wrap: wrap;
    .layout_list_li:nth-child(even) {
      border-right: none;
    }
    .layout_list_li {
      width: 45.6vw;
      height: 80.933vw;
      border-bottom: 1px solid #f4f4f4;
      border-right: 1px solid #f4f4f4;
      padding: 0 1.333vw;
      box-sizing: border-box;
      .ProItem__pro-imgs {
        height: 50vw;
        position: relative;
        img:nth-child(1) {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        img:nth-child(2) {
          width: 9.333vw;
          height: 8.133vw;
          position: absolute;
          top: 1.333vw;
          left: 1.333vw;
        }
      }
      .ProItem__pro-box {
        padding: 0.667vw 1.6vw 2vw;
        .ProItem__pro-box_p1 {
          color: #333;
          font-size: 3.733vw;
          height: 8.533vw;
          line-height: 1.15;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .ProItem__pro-box_p2 {
          height: 3.467vw;
          font-size: 2.667vw;
          color: #999;
          margin-top: 1.333vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ProItem__pro-tag {
          height: 3.733vw;
          span {
            width: 11.6vw;
            background: url(../images/lightning.png) no-repeat;
            background-size: cover;
            margin-right: 1.333vw;
            height: 3.467vw;
            display: inline-block;
          }
        }
        .ProItem__pro-price {
          .Price__money {
            font-size: 3.2vw;
            color: #e73522;
            display: inline-block;
            em {
              font-size: 4.267vw;
              font-style: inherit;
            }
          }
        }
        .ProItem__pro-num {
          color: #999;
          font-size: 2.667vw;
        }
      }
    }
  }
}
.scroll_Top {
  position: fixed;
  bottom: 18.667vw;
  right: 1.333vw;
  width: 16vw;
  height: 16vw;
  background: rgba(0, 0, 0, 0.43922);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 3.2vw;
  color: #fff;
  transform: scale(0.8);
  z-index: 99;
  img {
    width: 5.333vw;
    margin-bottom: 1.333vw;
  }
}
// .Tabtop{
//   position: fixed;
//   top: 0;
//   z-index: 4;
//   width: 100%;
// }
</style>