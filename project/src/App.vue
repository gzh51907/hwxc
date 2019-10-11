<template>
  <div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer">
      <ul>
        <li :index="item.path" v-for="item in menus" :key="item.name">
          <i :class="item.icon"></i>
          <router-link :to="item.path">
            <!-- <router-link :to="{name:item.name}"> -->
            <el-badge class="item" v-if="item.name==='cart'">{{item.text}}</el-badge>
            <template v-else>{{item.text}}</template>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      menus: [
        {
          name: "home",
          path: "/home",
          text: "首页",
          icon: "el-icon-s-home"
        },
        {
          name: "sort",
          path: "/sort",
          text: "分类",
          icon: "el-icon-menu"
        },
        {
          name: "cart",
          path: "/cart",
          text: "购物车",
          icon: "el-icon-shopping-cart-full"
        },
        {
          name: "mine",
          path: "/mine",
          text: "我的",
          icon: "el-icon-s-custom"
        }
      ]
    };
  },
  components: {}
};
</script>

<style lang="scss" scoped>
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
.footer {
  width: 100%;
  height: 60px;
  background: #fff;
  border-top: 0.013333rem solid #ccc;
  position: fixed;
  bottom: 0;
  z-index: 2;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    list-style: none;
    justify-content: space-around;
    li {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      a {
        color: #555;
        text-decoration: none;
      }
    }
  }
}
</style>
