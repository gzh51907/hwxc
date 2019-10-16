<template>
  <div>
    <div class="layui-layout layui-layout-admin">
      <div class="layui-header">
        <div class="layui-logo">海王星辰商城管理系统</div>
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
            <li class="layui-nav-item layui-nav-itemed">
              <a class href="javascript:;" >商品管理</a>
              <dl class="layui-nav-child" v-for="item in priceList" :key="item.id">
                <dd>
                  <a href="javascript:;">{{item.text}}</a>
                </dd>
              </dl>
            </li>
            <li class="layui-nav-item">
              <a href="javascript:;">解决方案</a>
              <dl class="layui-nav-child">
                <dd>
                  <a href>移动模块</a>
                </dd>
                <dd>
                  <a href>后台模版</a>
                </dd>
                <dd>
                  <a href>电商平台</a>
                </dd>
              </dl>
            </li>
            <li class="layui-nav-item">
              <a href="javascript:;">用户管理</a>
              <dl class="layui-nav-child">
                <dd>
                  <a href="javascript:;">添加用户</a>
                </dd>
                <dd>
                  <a href="javascript:;">删除用户</a>
                </dd>
                <dd>
                  <a href>超链接</a>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>

      <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
          内容内容主体区域
          <!-- <router-view /> 
         <router-link :to="item.path"></router-link> -->
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
      priceList: [
        {
          id: 1,
          name: "addgoods",
          text: "添加商品",
          path: "/addgoods"
        },
        {
          id: 2,
          name: "addgoods",
          text: "删除商品",
          path: "/addgoods"
        }
      ]
    };
  },
  updated() {},
  components: {}
};
</script>

<style>
</style>
