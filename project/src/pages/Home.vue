<template>
  <div>
    <Header></Header>
    <div class="layout">
      <div class="banner">
        <el-carousel height="37.333vw" indicator-position="none">
          <el-carousel-item v-for="(item,index) in imglist" :key="index">
            <img :src="item" style="width:100%;height:100%" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="notice">
        <span class="notice_span">公告</span>
        <el-carousel indicator-position="none" direction="vertical">
          <el-carousel-item v-for="item in Noticelist" :key="item.id">
            <h3 class="medium">{{ item.noticeTitle }}</h3>
          </el-carousel-item>
        </el-carousel>
        <a href="#">
          <img src="../images/img1.png" alt />
          <span class="name">御景花园</span>
        </a>
      </div>
    </div>
  <Footer></Footer>
  </div>
</template>

<script>
import Footer from './Footer.vue';
import Header from './Header.vue';
export default {
  data() {
    return {
      Noticelist: "",
      imglist: "",
    };
  },
  async created() {
    let {data: { data }} = await this.$axios.get(
      "https://xm.star365.com/api/user-api/index/getIndexData",
      {
        params: {
          cityId: 903
        }
      }
    );
    let img = data.carousel.map(item => {
      return item.carouselPicurl;
    });
    console.log(img);
    let imgitem = img.map(item => {
      return `https://xm.star365.com/imgfile/${item}`;
    });
    this.imglist = imgitem;
    this.Noticelist = data.notice;
    console.log(this.Noticelist);
    console.log(this.imglist);
  },
  components:{
    Footer,
    Header
  }
};
</script>

<style lang="scss" scoped>
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
  .notice {
    height: 13.6vw;
    display: flex;
    align-items: center;
    .notice_span {
      width: 7.867vw;
      height: 3.733vw;
      background: #ffb349;
      color: #fff;
      font-size: 2.667vw;
      line-height: 3.733vw;
      display: inline-block;
      text-align: center;
      border-radius: 1.333vw;
      border-bottom-left-radius: 0;
      margin-right: 1.6vw;
    }
    .el-carousel {
      width: 48vw;
      font-size: 11px;
      height: 15.2px;
      line-height: 15.2px;
      .el-carousel__item {
        h3 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #555;
        }
      }
    }
    a {
      width: 30vw;
      height: 7.733vw;
      background: #f5fcf6;
      border-radius: 3.867vw;
      display: flex;
      line-height: 7.733vw;
      align-items: center;
      color: #5fbfa4;
      padding-left: 2vw;
      position: relative;
      img {
        width: 4.8vw;
        height: 4.8vw;
        margin-right: 1.333vw;
      }
      .name {
        width: 24vw;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        position: relative;
        font-weight: 700;
        font-size: 11px;
      }
    }
  }
}
</style>