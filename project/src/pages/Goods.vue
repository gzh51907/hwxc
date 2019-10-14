<template>
  <div id="goods">
    <div class="box1">
      <el-carousel
        trigger="click"
        class="goodsimg"
        :autoplay="false"
        arrow="always"
        indicator-position="none"
      >
        <el-carousel-item v-for="item in picList" :key="item">
          <img :src="item" alt />
        </el-carousel-item>
      </el-carousel>
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
        <div class="Sales">销量636笔</div>
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
      <template>
        <el-tabs :stretch="true">
          <el-tab-pane
            label="商品详情"
            name="first"
            v-html="description"
            class="description"
          ></el-tab-pane>
          <el-tab-pane label="评论(2)" name="second">不知道</el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <div class="goods-footer">
      <div class="footer-l">
        <div class="footer-box">
          <i class="el-icon-user"></i>
          <span>药师咨询</span>
        </div>
        <div class="footer-box">
          <i class="el-icon-star-off"></i>
          <span>收藏222</span>
        </div>
        <div class="footer-box">
          <i class="el-icon-shopping-cart-2"></i>
          <span>加入清单</span>
        </div>
      </div>
      <button class="footer-r">加入购物车</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picList: [],
      GoodsData: "",
      description: ""
    };
  },
  async created() {
    let {
      data: { data }
    } = await this.$axios.get(
      "https://xm.star365.com/api/product-api/category/getDetailByBarcode",
      {
        params: {
          barcode: 8073722,
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
    console.log(data.description);
  },
  updated() {}
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
  z-index: 100;
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
    height: 4vw;
    margin-top: 1.333vw;
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
  	.description>>> img{ display:block !important;; width: 400px !important;; }
}
</style>