<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-13 17:16:47
 * @LastEditTime: 2019-10-16 13:03:22
 * @LastEditors: Please set LastEditors
 -->
<template>
<<<<<<< HEAD
  <div>
    注册
=======
  <div class="reg">
    <div class="regLogo">
      <div class="regCenter">
        <p class="reg-icon">
          <i class="el-icon-user-solid"></i>
        </p>
        <h1 class="freeLogo">欢迎来到海王星辰</h1>
      </div>
    </div>
    <div class="regContain">
      <el-form
        :model="ruleForm"
        class="regipt"
        :rules="rules"
        ref="regForm"
        status-icon
        label-width="92px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            prefix-icon="el-icon-lock"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 注册 -->
      <el-button type="primary" class="likereg" @click="submitForm">立即注册</el-button>
      <p class="gologin fr" @click="goto3('/login')">
        <a href="###">立即登录</a>
      </p>
    </div>
>>>>>>> yunfei
  </div>
</template>
<script>
<<<<<<< HEAD
</script>
=======
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value != this.ruleForm.password) {
        //
        callback(new Error("两次密码输入不一致"));
      } else {
        //   校验成功,执行回调
        callback();
      }
    };
    //发起ajax请求，验证用户名是否存在
    const checkUsername = async (rule, value, callback) => {
      let { data } = await this.$axios.get(
        "http://localhost:20190/user/check",
        {
          params: {
            username: this.ruleForm.username
          }
        }
      );
      if (data.code === 0) {
        callback(new Error("用户名已经存在"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "用户名须为6~12个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度必须为6-12个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
>>>>>>> yunfei

  methods: {
    submitForm() {
      //   校验整个表单
      // 发起ajax请求，等待服务器返回结果
      // 根据返回结果：判断是否注册成功
      // 成功就跳转到登录
      // 注册失败就给出提示
      this.$refs.regForm.validate(async valid => {
        if (valid) {
          let { username, password } = this.ruleForm;
          // 接收后端返回结果
          let { data } = await this.$axios.post(
            "http://localhost:20190/user/reg",
            {
              username,
              password
            }
          );
          if (data.code === 1) {
            // //为1，表示该用户名不存在，可以注册并跳到登录
            this.$router.replace({
              name: "login",
              params: { username },
              query: { username }
            });
          } else {
            confirm("注册失败");
          }
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    goto3(path) {
      this.$router.replace({
        path: "./login"
      });
    }
  }
};
</script>
<style lang="scss">
.reg {
  width: 100%;
  .regLogo {
    height: 120px;
    width: 100%;
    background: url(https://xm.star365.com/images/member_bg_login.png);
    background-size: 100% 120px;
    background-repeat: no-repeat;
    .regCenter {
      box-sizing: border-box;
      width: 200px;
      height: 120px;
      margin: auto;
      padding-top: 20px;
      text-align: center;
      .reg-icon {
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
  .regContain {
    width: 100%;
    padding-top: 30px;
    .regipt {
      padding-right: 10px;
    }
    .likereg {
      background: rgb(235, 49, 49);
      margin-left: 30%;
    }
    .gologin {
      margin-top: 60px;
      padding-right: 10px;
      a {
        color: rgb(235, 49, 49);
      }
    }
  }
}
</style>