<template>
  <div class="goodsInf">
    <h2>添加新用户：</h2>
    <div class="form">
      <div class="box box1" prop="username">
        <label for="name">用户名：</label>
        <input type="text" id="username" v-model="ruleForm.username" v-on:blur="blur" ref="name" />
      </div>
      <p v-show="show">{{meg}}</p>
      <div class="box box4" prop="password">
        <label for="psw">密&nbsp;&nbsp; 码：</label>
        <input
          type="password"
          id="password"
          v-model="ruleForm.password"
          v-on:blur="blur"
          ref="password"
        />
      </div>
      <div class="btn" @click="addUser">保 &nbsp; &nbsp; 存</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      show: false,
      meg: ""
    };
  },
  methods: {
    // 失去焦点
    async blur() {

      this.username = this.$refs.name.value;
      this.password = this.$refs.password.value;


      if (this.username) {
        let { data } = await this.$axios.get(
          "http://localhost:20190/user/check",
          {
            params: {
              username: this.username
            }
          }
        );
        if (data.code === 0) {
          this.show = true;
          this.meg = "用户名已经存在";
        } else {
          this.show = false;
        }
      }
    },
    async addUser() {
      let { username, password } = this.ruleForm;
      if (username && password) {
        let { data } = await this.$axios.post(
          "http://localhost:20190/user/reg",
          {
            username,
            password
          }
        );
        if (data.code === 1) {
          alert('添加新用户成功')
          this.$refs.name.value = "";
          this.$refs.password.value="";
          this.$refs.name.focus();

        } else {
          alert("注册失败！");
        }
      } else {
        alert("账号密码不能为空");
      }
    }
  }
};
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
  background-color: #eeeeee;
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
  p {
    color: red;
    font-size: 14px;
    margin-top: 5px;
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
