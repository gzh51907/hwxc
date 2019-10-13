<template>
  <div id="app">
    <div class="wrap">
      <router-view />
    </div>
    <footer class="footer">
      <ul>
        <li :index="item.path" v-for="item in menus" :key="item.name">
          <router-link :to="item.path">
            <i :class="item.icon"></i>
            <el-badge class="item" v-if="item.name==='cart'">{{item.text}}</el-badge>
            <template v-else>{{item.text}}</template>
          </router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      input2: "",
<<<<<<< HEAD

=======
>>>>>>> d2b313828f0883f033c8d570337d74be8a03b453
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
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
  height: 100%;
  min-height: 100%;
}

.wrap {
  height: 3000px;
  flex: 1;
  padding-top: 13.333vw;
  // padding-left: 4vw;
  // padding-right: 4vw;
}
.footer {
  width: 100%;
  height: 13.333vw;
  padding-top: 1.333vw;
  border-top: 1px solid #ccc;
  position: fixed;
  z-index: 100;
  bottom: 0;
  background: #fff;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    list-style: none;
    justify-content: space-around;
    li {
      height: 100%;
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 3.467vw;
      i {
        font-size: 6vw;
        color: #aaa;
      }
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #555;
        text-decoration: none;
      }
    }
  }
}
</style>
