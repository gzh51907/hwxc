<template>
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
</template>

<script>
export default {

    
};
</script>

<style lang="scss">
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