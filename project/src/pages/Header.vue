<template>
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
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.Home_top {
  width: 100%;
  background: #fff;
  position: fixed;
  z-index: 999;
  top: 0;
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
</style>


