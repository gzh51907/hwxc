<template>
  <div>
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header">
        <div class="layui-logo" style="font-size:20px;font-weight:bold;margin-left:10px;">海王星辰商城管理系统</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-left">
          <li class="layui-nav-item">
            <a href>控制台</a>
          </li>
          <li class="layui-nav-item">
            <a href>商品管理</a>
          </li>
          <li class="layui-nav-item">
            <a href>用户</a>
          </li>
        </ul>
        <ul class="layui-nav layui-layout-right">
          <li class="layui-nav-item">
            <a href="javascript:;">
              <img src="http://t.cn/RCzsdCq" class="layui-nav-img" />
              admin
            </a>
            <dl class="layui-nav-child">
              <dd>
                <a href>基本资料</a>
              </dd>
              <dd>
                <a href>安全设置</a>
              </dd>
            </dl>
          </li>
          <li class="layui-nav-item">
            <a href>退出</a>
          </li>
        </ul>
      </div>
      <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
          <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
          <ul class="layui-nav layui-nav-tree" lay-filter="test">
            <li class="layui-nav-item layui-nav-itemed" v-for="(item,index) in goodstitle" :key="item.name"
             @click="tab(item.path,index)" 
             :class="{tab_active:index===current}"
             >
              <a class href="javascript:;" >{{item.text}}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
          <router-view /> 
        </div>
      </div>

      <div class="layui-footer">
        <!-- 底部固定区域2 -->
        © 海王星辰
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      current:0,
      goodstitle: [
       {
          name: "goodsInf",
          path: "/goodsInf",
          text: "商品信息表",
          icon: "el-icon-s-home"
        },
        {
          name: "userInf",
          path: "/userInf",
          text: "用户信息表",
          icon: "el-icon-menu"
        },
        {
          name: "addUser",
          path: "/addUser",
          text: "添加用户",
          icon: "el-icon-menu"
        },
        {
          name: "userOrder",
          path: "/userOrder",
          text: "用户订单表",
          icon: "el-icon-menu"
        },
      ]
    };
  },
  methods:{
    tab(path,index){
      this.$router.push(path);
      this.current = index;
    }
  },
  components: {}
};
</script>

<style <style lang="scss" scoped>
  .tab_active{
    background-color: #58bc58;
  }
</style>

