<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 17:00:43
 * @LastEditTime: 2019-10-13 20:25:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div class="Home_top">
      <header>
        <div class="picture">
          <img src="../images/logo.png" alt />
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
import Footer from "./Footer.vue";
export default {
  data() {
    return {
      Noticelist: "",
      imglist: ""
    };
  },
  async created() {
    let {
      data: { data }
    } = await this.$axios.get(
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
  header {
    // height: 13.333vw;
    height: auto;
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
  // 汪
  padding-top: 13.333vw;
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