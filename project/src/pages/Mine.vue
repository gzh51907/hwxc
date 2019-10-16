<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 17:00:43
 * @LastEditTime: 2019-10-16 12:56:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mine">
    <div class="m-header">
      <div class="m-contain">
        <div class="h-left">
          <p class="headPicture">
            <i class="el-icon-user"></i>
          </p>
          <!--  判断是否登录中-->
          <el-button type="text" class="reg rl" @click="goto1('/reg')">注册</el-button>
          <el-button type="text" class="login rl" @click="goto2('/login')">登录</el-button>
        </div>
        <div class="h-right">
          <i class="fr el-icon-present vip"></i>
          <i class="fr el-icon-bell goodsOrder"></i>
        </div>
      </div>
    </div>
    <div class="m-wrapper">
      <div class="mw-infos">
        <ul class="mwi-info">
          <li>
            <p style="color:#009e9f">-</p>
            <p>收藏</p>
          </li>
          <li>
            <p style="color:#009e9f">-</p>
            <p>优惠券</p>
          </li>
          <li>
            <p style="color:#009e9f">-</p>
            <p>积分</p>
          </li>
        </ul>
        <div class="mwi-order">
          <div class="mwi-title">
            <p class="mine-order">我的订单</p>
            <p class="look-all">查看全部</p>
          </div>
          <ul>
            <li class="order-list">
              <i class="order-color el-icon-s-order"></i>
              <p>待付款</p>
            </li>
            <li class="order-list">
              <i class="order-color el-icon-present"></i>
              <p>待发货</p>
            </li>
            <li class="order-list">
              <i class="order-color el-icon-position"></i>
              <p>待收货</p>
            </li>
            <li class="order-list">
              <i class="order-color el-icon-box"></i>
              <p>待自提</p>
            </li>
            <li class="order-list">
              <i class="order-color el-icon-chat-round"></i>
              <p>评价</p>
            </li>
          </ul>
        </div>
        <div class="mwi-server">
          <div class="mine-tltle">
            <p class="mine-server">我的服务</p>
            <p class="teacher-guide">
              <i class="el-icon-plus"></i>
              药师指导
            </p>
          </div>
          <ul>
            <li class="server-list address-manage">
              <i class="order-color el-icon-delete-location"></i>
              <p>地址管理</p>
            </li>
            <li class="server-list">
              <i class="order-color el-icon-notebook-2"></i>
              <p>电子发票</p>
            </li>
            <li class="server-list">
              <i class="order-color el-icon-s-claim"></i>
              <p>浏览记录</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {},
  methods: {
    goto1(path) {
      this.$router.replace({
        path: "/reg"
      });
    },
    goto2(path) {
      this.$router.replace({
        path: "/login"
      });
    }
  }
};
</script>

<style lang="scss">
.mine {
  width: 100vw;
  height: 100vh;
  background: #f3efef;
  padding: 0;
  display: flex;
  flex-direction: column;
  .m-header {
    width: 100%;
    height: 20%;
    background: #009e9f;
    .m-contain {
      display: flex;
      width: 90%;
      height: 3.4rem;
      margin-top: 0.441935rem;
      margin-left: 5%;
      .h-left {
        width: 60%;
        height: 50px;
        display: flex;
        padding-top: 0.296774rem;
        box-sizing: border-box;
        .headPicture {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          i {
            font-size: 1.203226rem;
            border-radius: 60%;
            color: #ccc;
            border: 2px solid rgb(212, 208, 208);
          }
        }
        .rl {
          margin-left: 10px;
          width: 40px;
          font-size: 0.49129rem;
          padding-bottom: 55px;
          color: white;
        }
      }
      .h-right {
        width: 40%;
        height: 100%;
        i {
          font-size: 22px;
          width: 30px;
          color: white;
        }
      }
    }
  }
  .m-wrapper {
    position: relative;
    .mw-infos {
      position: absolute;
      top: -30px;
      width: 90%;
      margin-left: 5%;
      height: 300px;
      .mwi-info {
        height: 20%;
        background: white;
        border-radius: 12px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          line-height: 30px;
          text-align: center;
          color: #75726e;
          font-size: 14px;
        }
      }
      .mwi-order {
        height: 35%;
        background: white;
        margin: 5% 0;
        border-radius: 12px;
        .mwi-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 30px;
          .mine-order {
            font-weight: 600;
            font-size: 16px;
            color: #7b7b7b;
            padding-left: 8px;
          }
          .look-all {
            font-size: 12px;
            color: #999999;
            padding-right: 8px;
          }
        }
        ul {
          display: flex;
          justify-content: space-around;
          align-items: center;

          .order-list {
            height: 80px;
            line-height: 25px;
            text-align: center;
            padding-top: 5px;
            .order-color {
              color: #fda130;
              font-size: 18px;
            }
            p {
              font-size: 14px;
              color: #a2a2a2;
            }
          }
        }
      }
      .mwi-server {
        height: 35%;

        background: white;
        border-radius: 12px;
        .mine-tltle {
          height: 35%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .mine-server {
            font-weight: 600;
            font-size: 16px;
            color: #7b7b7b;
            padding-left: 8px;
          }
          .teacher-guide {
            margin-top: 6px;
            font-size: 12px;
            color: white;
            padding-right: 8px;
            background: #4acfad;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            i {
              font-weight: 600;
            }
          }
        }
        ul {
          display: flex;
          .server-list {
            width: 25%;
            height: 50px;
            line-height: 25px;
            text-align: center;
            .order-color {
              color: #75726e;
              font-size: 18px;
            }
            p {
              font-size: 14px;
              color: #a2a2a2;
            }
          }
        }
      }
    }
  }
}
</style>