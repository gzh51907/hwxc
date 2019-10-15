<template>
  <div class="footer">
    <ul>
      <li :index="item.path" v-for="item in menus" :key="item.name"  
     >
        <router-link :to="item.path" >
          <i :class="item.icon" ></i>
          <el-badge :value="cartlength" class="item" v-if="item.name==='cart'" style="line-height:30px">{{item.text}}</el-badge>
          <template v-else>{{item.text}}</template>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      input2: "",
      menus: [
        {
          name: "home",
          path: "/home",
          text: "首页",
          icon: "el-icon-s-home"
        },
        {
          name: "sort",
          path: "/sort/5591",
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
  computed: {
    cartlength() {
      // return this.$store.state.cartlist.length;
      return this.$store.getters.cartlength;
    },
    currentUser() {
      return this.$store.state.common.user;
    }
  },
  methods: {
    handleSelect(index, indexpath) {
      // console.log(index, indexpath);
      this.activeIndex = index;
    },
    goto(path) {
      this.$router.push(path);
    },
    logout() {
      this.$store.commit('logout');
    }
  },
  created() {
    //获取url地址参数
    // console.log(this.$router);
    this.activeIndex = this.$route.path;
    this.$store.dispatch('checkLogin');
  },
  components: {}
};
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: 13.333vw;
  padding-top: 1.333vw;
  border-top: 1px solid #f6f6f8;
  position: fixed;
  z-index: 100;
  left: 0;
  bottom: 0;
  background-color: #fff;

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
      .router-link-active {
        color: #009e9f;

        i {
          color: #009e9f;
        }
      }
    }
  }
}
</style>