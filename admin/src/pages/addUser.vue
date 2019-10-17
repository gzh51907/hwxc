<template>
    <div class="goodsInf">
        <h2>添加新用户：</h2>
        <div class="form">
            <div class="box box1">
                <label for="name">用户名：</label>
                <input type="text" id="username">
            </div>
            <div class="box box4">
                <label for="psw">密&nbsp;&nbsp; 码：</label>
                <input type="password" id="password">
            </div>
            <div class="btn">保 &nbsp; &nbsp; 存</div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body,
html {
    width: 100%;
    height: 100%;
    background-color: #EEEEEE;
}
.form {
  width: 350px;
  height: auto;
  border: 1px solid #ccc;
  padding: 10px 20px;
  margin: 100px auto;

  .box {
    width: 100%;
    margin-top: 20px;
    color: #393d49;

    input {
      height: 40px;
      width: 238px;
      border: 1px solid #ccc;
    }
  }

  .btn {
    width: 100%;
    height: 40px;
    background-color: #393d49;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    margin-top: 50px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #23262e;
  }
}
</style>

