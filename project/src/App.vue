<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 17:00:43
 * @LastEditTime: 2019-10-13 20:25:45
 * @LastEditors: Please set 
 -->
<template>
  <div id="app">
    <div class="wrap">
      <router-view />
    </div>
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
  height: 100%;
  min-height: 100%;
}
</style>
