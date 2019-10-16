<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-12 17:00:43
 * @LastEditTime: 2019-10-16 12:01:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login">
    <div class="loginLogo">
      <div class="loginCenter">
        <p class="login-icon">
          <i class="el-icon-user-solid"></i>
        </p>
        <h1 class="freeLogo">欢迎来到海王星辰</h1>
      </div>
    </div>
    <div class="loginContain">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="regForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" class="loginipt" prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="loginipt" prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox style="color:rgb(235, 49, 49)" label="下次免登陆" v-model="ruleForm.mdl"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="locolor likelogin" @click="submitForm ">登录</el-button>
        </el-form-item>
        <div class="goreg fr" @click="goto4('/reg')">
          <a href="###">立即注册</a>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        mdl: true
      },
      rules: {
        password: [{ required: true, message: "密码填写", tirgger: "blur" }],
        username: [
          {
            required: true,
            message: "用户名填写",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          let { username, password, mdl } = this.ruleForm;

          let { data } = await this.$axios.get(
            "http://localhost:20190/user/login",
            {
              params: {
                username,
                password,
                mdl
              }
            }
          );
          if (data.code === 1) {
            let { targetUrl } = this.$route.query;
            // 把token写入localstorage
            this.$store.commit("login", { username, Authorization: data.data });
            this.$router.replace({
              path: targetUrl || "/mine"
            });
          } else {
            // 弹窗提示错误
            const h = this.$createElement;
            this.$msgbox({
              title: "错误提示：",
              message: h("p", null, [
                h("span", null, "用户名或者密码输入错误 "),
                h("i", {
                  style: "color: red; width:60%; height:50px; margin-top:30px;"
                })
              ]),
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "执行中...";
                  setTimeout(() => {
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 1000);
                } else {
                  done();
                }
              }
            }).then(action => {
              this.$message({
                type: "info",
                message: "action: " + action
              });
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goto4(path) {
      this.$router.replace({
        path: "/reg"
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  .loginLogo {
    height: 120px;
    width: 100%;
    background: url(https://xm.star365.com/images/member_bg_login.png);
    background-size: 100% 120px;
    background-repeat: no-repeat;
    .loginCenter {
      box-sizing: border-box;
      width: 200px;
      height: 120px;
      margin: auto;
      padding-top: 20px;
      text-align: center;
      .login-icon {
        i {
          font-size: 50px;
          color: #ccc;
        }
      }
      .freeLogo {
        padding-top: 10px;
        color: white;
        font-size: 20px;
      }
    }
  }
  .loginContain {
    width: 100%;
    padding-top: 30px;
    .loginipt {
      padding-right: 10px;
    }
    .locolor {
      background: rgb(235, 49, 49);
      width: 100px;
      margin-left: 5%;
    }
    .goreg {
      padding-right: 10px;
      a {
        color: rgb(235, 49, 49);
      }
    }
  }
}
</style>