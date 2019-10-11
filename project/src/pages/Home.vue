<template>
  <div>
    <div class="Home_top">
      <header>
        <div class="picture">
          <img :src="logo" alt />
        </div>
        <div class="search_frame"></div>
        <div class="search_icon">
          <i class="el-icon-search"></i>
        </div>
        <div class="search_icon">
          <i class="el-icon-tickets"></i>
        </div>
      </header>
    </div>
    <div class="layout">
      <section class="banner">
        <el-carousel height="37.333vw">
          <el-carousel-item v-for="(item,index) in imglist" :key="index" type="card">
            <img :src="item" style="width:100%;height:100%" />
          </el-carousel-item>
        </el-carousel>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: "https://xm.star365.com/images/logo.png.webp",
      imglist: [
        "https://xm.star365.com/imgfile/807c7c11f9f644219a364020078e4732_20191011145537.png",

        "https://xm.star365.com/imgfile/b79696d8d85e41a2ad9cae3b3977de9e_20190913113438.png",

        "https://xm.star365.com/imgfile/807c7c11f9f644219a364020078e4732_20191011145537.png",

        "https://xm.star365.com/imgfile/2459d304780f4753b9b856ceace8736d_20190725143044.png",

        "https://xm.star365.com/imgfile/c023ae86701c4a71a0b0a8bb7e14cb8a_20191011111107.png"
      ]
    };
  },
  async created() {
    let { data } = await this.$axios.get(
      "https://xm.star365.com/api/product-api/category/getDetailByBarcode",
      {
        params: {
          barcode: 8068246,
          cityId: 903,
          state: 1,
          latitude: 22.534576,
          longitude: 113.973016
        }
      }
    );
    console.log(data);
  }
};
</script>

<style lang="scss" scoped>
.Home_top {
  width: 100%;
  background: #fff;
  position: fixed;
  z-index: 999;
  top: 0;
  // border-bottom: 1px solid #ccc;
  header {
    height: 13.333vw;
    display: flex;
    align-items: center;
    z-index: 20;
    padding-left: 4vw;
    padding-right: 4vw;
    .picture {
      width: 22.267vw;
      height: 6.933vw;
      margin-right: 1.067vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .search_frame {
      width: 46.667vw;
      height: 8vw;
      background: #f7f7f7;
      border-radius: 3.867vw;
      display: flex;
      align-items: center;
      padding-left: 2vw;
      color: #666;
    }
    .search_icon {
      font-size: 6vw;
      color: rgb(0, 158, 159);
      margin-left: 4.667vw;
    }
  }
}
.layout {
  padding-left: 4vw;
  padding-right: 4vw;
  .banner {
    width: 100%;
    height: 37.333vw;
    border-radius: 1.6vw;
    overflow: hidden;
    display: block;
    touch-action: pan-y;
  }
}
</style>