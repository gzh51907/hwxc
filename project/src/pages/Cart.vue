<template>
  <div>
    <div class="Cart">
      <div class="CartHeader">
        <div class="logo">
          <img src="../images/logo.png" alt />
        </div>
        <div class="qingdan">清单</div>
        <div class="bianji">编辑</div>
      </div>
      <div class="no-box" style=" display: none;">
        <div class="no-box-img">
          <img src="https://xm.star365.com/images/no.png" alt />
        </div>
        <div class="no-box-info">当前没有需求哦~</div>
      </div>
      <div class="GoodsCart">
        <div class="GoodsCart-header">
          <div class="GoodsCart-header-l">
            <el-checkbox class="checkbox-name">闪电送药</el-checkbox>
            <!-- <input type="checkbox" class="checkboxall">
            闪电送药-->
          </div>
          <div class="GoodsCart-header-r">免配送费, 最快25分钟送达</div>
        </div>
        <div class="GoodsCart-content">
          <ul>
            <li v-for="item in cartlist" :key="item.id">
              <div class="checkbox">
                <el-checkbox class="checkbox-name"></el-checkbox>
              </div>
              <div class="goodsimg">
                <img :src="item.pic" alt />
              </div>
              <div class="goodsname">
                <p class="goods-p">{{item.title}}</p>
                <p class="goods-p goods-p2">{{item.efficacy}}</p>
                <p class="goodsprice">
                  <span class="goodsprice-span">￥{{item.price.toFixed(2)}}</span>
                  <el-input-number
                    v-model="item.num"
                    :min="1"
                    size="mini"
                    style="width:100px;height:20px;"
                    class="goodsprice-input"
                  ></el-input-number>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="inferior">
        <div class="aggregate">
          <div class="aggregate-l">
            总计：
            <span>
              <i>￥</i>
              {{totalPrice.toFixed(2)}}
            </span>
          </div>
        </div>
        <button class="but">提交需求</button>
        <div class="yunfei">不含邮费</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./Footer.vue";

export default {
  data() {
    return {};
  },
  computed: {
    cartlist() {
      console.log('cartlist',this.$store.state.cart.cartlist);
      return this.$store.state.cart.cartlist;
    },
    totalPrice(){
      return this.$store.getters.allprice;
    }
  },
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
.Cart {
  min-height: 100vh;
  background: #f7f7f7;
  padding-bottom: 14vw;

  .CartHeader {
    height: 10.4vw;
    line-height: 10.4vw;
    background: #fff;
    padding: 0 4vw;
    font-size: 4vw;
    color: #333;
    display: flex;
    align-items: center;

    .logo {
      img {
        width: 17.333vw;
        height: 5.333vw;
      }
    }
    .qingdan {
      flex: 1;
      text-align: center;
      font-size: 4.8vw;
      color: #000;
    }
    .bianji {
      width: 11.733vw;
      height: 10.4vw;
      line-height: 10.4vw;
      text-align: right;
    }
  }
  .no-box {
    margin-top: 26.666vw;
    height: 100%;
    min-height: 66.667vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .no-box-img {
      img {
        width: 50.667vw;
        max-width: 100%;
        height: auto;
        display: block;
      }
    }
    .no-box-info {
      font-size: 3.2vw;
      color: #999;
      margin-top: 6.667vw;
    }
  }
  .GoodsCart {
    background: #fff;
    margin-top: 1.333vw;
    padding-left: 4vw;
    padding-right: 4vw;
    .GoodsCart-header {
      height: 10.667vw;
      line-height: 10.667vw;

      color: #fa2b31;
      .GoodsCart-header-l {
        float: left;
        font-size: 4.267vw;
        .checkbox-name {
          font-weight: 700;
          color: #fa2b31;
        }
        .checkboxall {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #fa2b31;
          text-align: center;
          border-radius: 2px;
        }
      }
      .GoodsCart-header-r {
        float: right;
        font-size: 3.2vw;
      }
    }
    .GoodsCart-content {
      height: 100%;

      ul {
        height: 100%;
        li {
          background: #fff;
          height: 25.867vw;
          padding: 3vw 0vw;
          .checkbox {
            float: left;
            line-height: 28vw;
          }
          .goodsimg {
            float: left;
            width: 25.867vw;
            height: 25.867vw;
            margin-right: 2vw;
            position: relative;
            border-radius: 0.533vw;
            margin-left: 3vw;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .goodsname {
            float: left;
            width: 56vw;
            font-size: 3.733vw;
            color: #333;
            display: block;
            .goods-p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .goods-p2 {
              color: #666;
            }
            .goodsprice {
              margin-top: 10vw;
              .goodsprice-span {
                font-size: 4.267vw;
                color: #e73522;
                display: inline-block;
              }
              .goodsprice-input {
                float: right;
                margin-top: -3vw;
              }
            }
          }
        }
      }
    }
  }
  .inferior {
    width: 100%;
    height: 13.067vw;
    background: #fff;
    // padding-left: 4vw;
    position: fixed;
    z-index: 10;
    bottom: 15vw;
    .aggregate {
      line-height: 13.067vw;
      padding-left: 4vw;
      font-size: 3.467vw;
      color: #666;
      .aggregate-l {
        float: left;
        span {
          color: #e73522;
          font-size: 5.067vw;
          font-weight: 700;
          i {
            font-size: 3.733vw;
          }
        }
      }
    }
    .yunfei {
      float: right;
      line-height: 13.067vw;
      padding-right: 5vw;
      color: #a0a0a0;
      font-size: 3.467vw;
    }
    .but {
      float: right;
      width: 32vw;
      height: 13.067vw;
      background: linear-gradient(90deg, #ec632b 0, #e73522) !important;
      color: #fff;
      font-size: 4.8vw;
    }
  }
}
</style>