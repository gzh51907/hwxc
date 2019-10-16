<template>
  <div id="goods">
    <div class="box1">
      <el-carousel
        trigger="click"
        class="goodsimg"
        :autoplay="false"
        arrow="hover"
        indicator-position="none"
      >
        <el-carousel-item v-for="item in picList" :key="item">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
      <div class="back">
        <i class="el-icon-arrow-left" @click="go"></i>
      </div>
      <div class="sousuo">
        <div class="sousuo1">
          <i class="el-icon-search"></i>
        </div>
        <div class="sousuo2">
          <i class="el-icon-takeaway-box"></i>
        </div>
      </div>
    </div>
    <div class="box2">
      <div class="pricelist">
        <div class="price">
          ￥
          <span class="priceNum">{{GoodsData.guidePrice}}</span>
        </div>
        <div class="site">
          <i class="el-icon-location"></i>
          <span class="CityLevel">深圳市</span>
        </div>
        <div class="Sales">销量{{GoodsData.sellCount}}笔</div>
      </div>
      <div class="title">
        <div class="title-icon">
          <span>闪电送药</span>
        </div>
        {{GoodsData.productName}}
      </div>
      <div class="explain">
        <div class="explain-l">{{GoodsData.efficacy}}</div>
        <div class="explain-r">
          <i></i>
          <span>说明书</span>
        </div>
      </div>
    </div>
    <div class="box3">
      <div class="postage box3-commonality">
        <div class="box3-title">邮费</div>
        <div class="box3-name">满59免配送费</div>
      </div>
      <div class="box3-commonality">
        <div class="box3-title">配送</div>
        <div class="box3-name">闪电送药</div>
      </div>
      <div class="box3-commonality">
        <div class="box3-title canshu">参数</div>
        <div class="Factory">
          <p>生产厂家：{{GoodsData.vendor}}</p>
          <p>批准文号：{{GoodsData.approval}}</p>
        </div>
      </div>
    </div>
    <div class="box4">
      <div class="pingzhi-l">正品保障</div>
      <div class="pingzhi-c">全国连锁</div>
      <div class="pingzhi-r">企业资质</div>
    </div>
    <div class="box5">
      <!-- <template>
        <el-tabs :stretch="true">
          <el-tab-pane label="商品详情" name="first" v-html="description" class="description"></el-tab-pane>
          <el-tab-pane label="评论(2)" name="second">评论内容</el-tab-pane>
        </el-tabs>
      </template>-->
      <ul class="box5-ul">
        <li
          v-for="(item,index) in items"
          :class="{active:istrue==index}"
          :key="item.id"
          @click="istrue=index"
        >
          {{ item.name }}
          <span v-if="index===1">({{userlist.length}})</span>
        </li>
        <div class="cards">
          <div class="tab-card1" style="display: block;" v-show="istrue===0" v-html="description"></div>
          <div class="tab-card2" v-show="istrue===1">
            <!-- <ul class="pinglun">
              <li>11</li>
              <li>11</li>
              <li>11</li>
            </ul>-->
            <dl class="pinglun" v-for="item in userlist" :key="item.name">
              <dd>
                <div class="pinglun-top">
                  <div>
                    <div class="userimg">
                      <el-avatar :src="item.headImg"></el-avatar>
                    </div>
                    <div class="username">
                      <p class="username-t">{{item.name}}</p>
                      <el-rate v-model="item.score" disabled></el-rate>
                    </div>
                  </div>
                  <span class="shijian">{{item.commentDate}}</span>
                </div>
                <div class="pinglun-bootom">{{item.content}}</div>
              </dd>
            </dl>
          </div>
        </div>
      </ul>
    </div>

    <div class="goods-footer">
      <div class="footer-l">
        <div class="footer-box">
          <i class="el-icon-user"></i>
          <span>药师咨询</span>
        </div>
        <div class="footer-box">
          <i class="el-icon-star-off"></i>
          <span>收藏</span>
        </div>
        <div class="footer-box" @click="GotoCar">
          <i class="el-icon-shopping-cart-2"></i>
          <el-badge :value="cartlength" style=" position: absolute;top:0px;right:40%; "></el-badge>
          <span>需求清单</span>
        </div>
      </div>
      <button class="footer-r" @click="gotoCar">加入购物车</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picList: [],
      GoodsData: "",
      description: "",
      istrue: 0,
      items: [{ name: "商品详情", id: "xq" }, { name: "评论", id: "pl" }],
      userlist: [],
      value1: 5
    };
  },
  created() {
    let { barcode } = this.$route.params;
    this.getData(barcode);
    this.getcomment(barcode);
  },
  computed: {
    cartlength() {
      return this.$store.getters.cartlength;
    }
  },
  methods: {
    async getData(barcode) {
      let {
        data: { data }
      } = await this.$axios.get(
        "https://xm.star365.com/api/product-api/category/getDetailByBarcode",
        {
          params: {
            barcode: barcode,
            cityId: 903,
            state: 1,
            latitude: 22.534576,
            longitude: 113.973016
          }
        }
      );
      this.GoodsData = data;
      this.picList = data.picList;
      this.description = data.description;
      // console.log(data.description);
      // console.log("data", data);
    },
    async getcomment(barcode) {
      let {
        data: {
          data: { list }
        }
      } = await this.$axios.get(
        "https://xm.star365.com/api/order-api/comments/getByBarcode",
        {
          params: {
            barcode: barcode,
            pageSize: 5,
            pageNum: 1
          }
        }
      );
      list.map(item => {
        let img = `https://xm.star365.com/imgfile/${item.headImg}`;
        item.headImg = img;
      });
      this.userlist = list;

      // console.log("用户评论内容", this.userlist);
    },
    go() {
      this.$router.go(-1);
    },
    add2cart() {
      // 添加前，判断该商品是否已经存在,存在
      let currentgoods = this.$store.state.cart.cartlist.filter(
        item => item.id == this.GoodsData.barcode
      )[0];
      if (currentgoods) {
        let num = currentgoods.num + 1;
        this.$store.commit("changeNum", { id: this.GoodsData.barcode, num: 1 });
      } else {
        let goods = {
          id: this.GoodsData.barcode,
          title: this.GoodsData.productName,
          efficacy: this.GoodsData.efficacy,
          pic: this.GoodsData.minPic,
          price: this.GoodsData.guidePrice,
          num: 1
        };
        this.$store.commit("add2cart", goods);
      }
    },
    // 跳转购物车
    gotoCar() {
      this.add2cart();
      this.$router.push("/cart");
    },
    GotoCar() {
      this.$router.push("/cart");
    }
  },
  
};
</script>

<style lang="scss" scoped>
#goods {
  background: #f7f7f7;
  font-size: 3.467vw;
  line-height: 1.15;
  padding-bottom: 14.5vw;
}
.goods-footer {
  width: 100%;
  height: 13.067vw;
  border-top: 0.0625rem solid #f6f6f8;
  background: #fff;
  position: fixed;
  font-size: 3.2vw;
  align-items: center;
  bottom: 0;
  left: 0;
  z-index: 10000;
  .footer-l {
    float: left;
    display: flex;
    justify-content: center;

    .footer-box {
      width: 2rem;
      float: left;
      text-align: center;
      margin-top: 0.25rem;
      margin-left: 0.1rem;
      i {
        display: block;
        font-size: 6vw;
        color: rgb(112, 112, 112);
      }
      span {
        margin-top: 1.333vw;
        color: #333;
      }
    }
  }
  .footer-r {
    float: right;
    width: 35.733vw;
    height: 13.067vw;
    line-height: 13.067vw;
    font-size: 4.8vw;
    color: #fff;
    background: #e73522;
    text-align: center;
    margin: auto;
  }
}
.box1 {
  .goodsimg {
    width: 100%;
    height: 93.333vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .back {
    width: 9.067vw;
    height: 9.067vw;
    padding: 2.133vw;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    background-clip: content-box;
    border-radius: 50%;
    z-index: 10;
    top: 2.667vw;
    left: 1.333vw;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-size: 5.333vw;
      font-weight: 700;
      color: rgb(255, 255, 255);
    }
  }
  .sousuo {
    position: fixed;
    top: 4.8vw;
    right: 3.467vw;
    z-index: 999;
    .sousuo1 {
      float: left;
      width: 9.067vw;
      height: 9.067vw;
      background: #fcac3b;
      border-radius: 50%;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      text-align: center;
    }
    .sousuo2 {
      float: left;
      width: 9.067vw;
      height: 9.067vw;
      border-radius: 50%;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      background: #009e9f;
      margin-left: 2.667vw;
      text-align: center;
    }
    i {
      font-size: 5.333vw;
      font-weight: 700;
      color: rgb(255, 255, 255);
      line-height: 9.067vw;
    }
  }
}
.box2 {
  margin-top: 1.333vw;
  padding: 3.333vw 4vw;
  background: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .pricelist {
    padding-top: 3.333vw;
    min-height: 6vw;
    font-size: 3.467vw;
    height: 4vw;
    line-height: 4vw;
    margin-bottom: 2vw;
    .price {
      font-size: 3.2vw;
      color: #e73522;
      float: left;
      .priceNum {
        font-size: 6.133vw;
        font-weight: 700;
      }
    }
    .site {
      float: left;
      color: #009e9f;
      font-size: 2.933vw;
      margin-left: 4.8vw;
      border-left: 1px solid #009e9f;
      padding-left: 1.6vw;
      // margin-top: 2.5vw;
      .CityLevel {
        margin-left: 1.333vw;
      }
    }
    .Sales {
      float: right;
      color: #999;
      font-size: 3.467vw;
      // margin-top: 2vw;
    }
  }
  .title {
    font-size: 4.267vw;
    font-weight: 700;

    .title-icon {
      float: left;
      width: 13.333vw;
      height: 4vw;
      line-height: 4vw;
      border-radius: 2vw;
      margin-right: 1.333vw;
      font-size: 3.2vw;
      vertical-align: middle;
      background: #e73522;
      text-align: center;
      span {
        font-size: 2.667vw;
        line-height: 4vw;
        color: #fff;
      }
    }
  }
  .explain {
    height: 8vw;
    margin-top: 2vw;
    padding-bottom: 3.333vw;
    .explain-l {
      float: left;
      width: 70vw;
      min-height: 8vw;
      line-height: 6.4vw;
      padding-right: 2.667vw;
      font-size: 3.2vw;
      color: #999;
    }
    .explain-r {
      float: right;
      // width: 13.333vw;
      margin-top: 2vw;
      i {
        float: left;
        width: 0.04rem;
        background: #dcdbdb;
        height: 6.4vw;
        display: block;
        margin-right: 0.3rem;
      }
      span {
        float: left;
        background: #009e9f;
        color: #fff;
        margin-right: 0;
        padding: 1.067vw 1.333vw;
        font-size: 2.667vw;
        border-radius: 0.667vw;
        margin-top: 0.06rem;
      }
    }
  }
}
.box3 {
  margin-top: 1.333vw;
  background: #fff;
  box-sizing: border-box;
  .box3-commonality {
    -webkit-box-align: center;
    align-items: center;
    padding: 4vw;
    position: relative;
  }
  .box3-title {
    align-items: flex-end;
    font-size: 3.467vw;
    color: #666;
    width: 10.667vw;
    float: left;
  }
  .box3-name {
    color: #009e9f;
    font-size: 3.467vw;
    font-weight: 700;
    position: relative;
  }
  .box3-name:after {
    width: 81.333vw;
    height: 0.02rem;
    content: " ";
    background: #f6f6f8;
    position: absolute;
    bottom: -4vw;
    left: 10vw;
  }
  .Factory {
    font-size: 3.2vw;
    color: #666;
    p {
      margin-top: 0.125rem;
    }
  }
  .canshu {
    height: 1.25rem;
    margin-top: 0.25rem;
  }
}
.box4 {
  width: 100%;
  height: 6.4vw;
  background: #f5fcf6;
  color: #666;
  font-size: 3.2vw;
  background-size: 3.2vw 3.467vw;
  align-items: center;
  display: flex;
  .pingzhi-l {
    // float: left;
    width: 21.333vw;
    height: 3.467vw;
    padding-left: 5.067vw;
    margin-left: 12.667vw;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAMAAACaYWzBAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURUxpcX3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjOxcOEwAAAAWdFJOUwARcNLsMwi7Z934kyKvfyuiikPFUFrXuHbIAAAA4klEQVQoz21S2QKDIAyrgKyAIl78/6cunHNqXqSpJD0g6likXOgFg4nRDE9+khGQ043WrGKGYt0UBLMIlc6pkJiB5viKmcx7wtDeTp8LVNy7lBgT4DzgoyDlrgIK1YR8ciSuiRUXbBGgs1owoxWMpP540lYOHr1HCSVZ4g1hxkjkcR/paU3xRLqWTWQsRuiMySYoT1XXESU261zeXpXWeHRr9JeIoqSU7tZoA4vDxDaI8Jamz2xKUVlLXufUakmuDxxlV/7Ou7ZYd1uS7isX9kdb//dGQk3ZcH9b+vDO+aOrfAFRMB1zbtB6iwAAAABJRU5ErkJggg==")
      no-repeat;
    background-size: 3.2vw 3.467vw;
  }
  .pingzhi-c {
    width: 21.333vw;
    height: 3.467vw;
    padding-left: 5.067vw;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAMAAACaYWzBAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABCUExURUxpcX3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjFpMHE8AAAAVdFJOUwA+rsMH49kS7l1UymiNmfgrhKJ3IyoEqCoAAADJSURBVCjPbZJbAoUgCETxEYb2Lve/1atoZN7mJ51TCGMAoi2YDT7kMEZ0H36ISaEnlobIGsiKRX5aqs1omTwlrOOnNOA3QDDPZnSjrM1TyngHjoKUmutqqs1MZTvD+fZvcgLVko/4VALFwDfAZ0PBxaBNgp0L7B9w2UjBcO/rmISA+bHmke6zSkogkYUE6iD4Aku+uLK0Jr0mgLssKSil1SYR8qWUSQZlFb4+ANj7zI+786W/JNG5Nv5u2xj0jbTqfx/aj2MmyeYHusQcQ3mhQjkAAAAASUVORK5CYII=")
      no-repeat;
    background-size: 3.2vw 3.467vw;
  }
  .pingzhi-r {
    // float: left;
    width: 21.333vw;
    padding-left: 5.067vw;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAMAAACaYWzBAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABFUExURUxpcX3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjH3YjOxcOEwAAAAWdFJOUwAMWPhix60oBOWM7qMYg3LbO8+ZTblZ9bYBAAAA1UlEQVQoz21SWxaFIAgk85VZanXd/1IvIRmn4gcdZGRGAXo4Yxx8xJBrzcMbX0zFMMsD9nqqFJP2F4PWSu8MU2lHQA9g62dYyOKs6Mtg7o1z99oIqggQBVW4G1Bj3wRIlDcbjnPGI9iNgATqTKvUtJ6IgkLzCJMczVaYdu4VN/OFQ7tsZpOWhld0c+4zUQOfw2VTOLJ3fmR9wEI2xFLCapt2xwKNVX9kPJreCEgUc1WRMhGXt+lKSJURL1H745F8tyGNAl+9MM7Zq/Qrz2+l1hiD6t/nDzwnHjyA7uScAAAAAElFTkSuQmCC")
      no-repeat;
    background-size: 3.2vw 3.467vw;
  }
}
.box5 {
  background: #fff;
  width: 100%;
  height: 100%;

  .box5-ul {
    width: 100%;
    height: 100%;
    // padding-bottom: 10vw;

    li {
      float: left;
      width: 50%;
      height: 10vw;
      line-height: 10vw;
      color: rgb(51, 51, 51);
      font-size: 3.8vw;
      font-weight: 700;
      text-align: center;
      border-bottom: 1px solid #ddd;
      background: #fff;
    }
    .active {
      color: rgb(0, 158, 159);
      border-bottom: 1px solid rgb(0, 158, 159);
    }
    .cards {
      width: 100%;
      height: 100%;
      // padding-top: 14vw;
      // .description >>> img {
      //   display: block !important;
      //   width: 400px !important;
      // }
      .tab-card1 {
        padding-top: 14vw;
        padding-left: 4vw;
        padding-right: 4vw;
        font-size: 3.467vw;
        color: #666;
        >>> dt {
          >>> img {
            width: 200px !important;
            height: 200px !important;
            max-width: 5px !important;
            height: auto !important;
            vertical-align: middle !important;
          }
        }
      }
      .tab-card2 {
        padding-left: 4vw;
        padding-right: 4vw;
        font-size: 3.467vw;
        padding-top: 10vw;
        color: #666;
        .pinglun {
          padding-top: 5vw;
          dd {
            // padding-top:2vw;
            .pinglun-top {
              height: 14vw;
              .userimg {
                float: left;
              }
              .username {
                float: left;
                margin-left: 3vw;
                .username-t {
                  margin-bottom: 1.067vw;
                }
              }
              .shijian {
                float: right;
                font-size: 2.667vw;
                color: #999;
                margin-top: 3vw;
              }
            }
            .pinglun-bootom {
              line-height: 5.333vw;
              font-size: 3.467vw;
              padding: 0 2.667vw 2.667vw;
              border-bottom: 1px solid #f4f4f4;
              margin-top: 2.667vw;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>