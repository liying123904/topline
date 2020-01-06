<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 绘制登录表单 -->
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm">
        <el-form-item prop="mobile">
          <img src="./logo_index.png" alt />
          <el-input v-model="loginForm.mobile" placeholder="手机号码">
            <!-- <i slot="prefix" class="iconfont icon-aui-icon-mobile"></i> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="校验码">
            <!-- <i slot="prefix" class="iconfont icon-codes"></i> -->
          </el-input>
        </el-form-item>
        <el-form-item style="text-align:left" prop='xieyi'>
          <el-checkbox v-model="loginForm.xieyi" style="margin-right:10px"></el-checkbox>
          <span>
            我已阅读并同意
            <a href="#">用户协议</a> 和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import './gt.js'
export default {
  name: '',
  data () {
    //
    var xieyiTest = function (rule, value, callback) {
      if (value) {
        callback()
      } else {
        callback(new Error('请遵守协议'))
      }
    }
    return {
      loginForm: {
        mobile: '15602025130',
        code: '246810',
        xieyi: true
      },
      loginFormRules: {
        // required:
        // message:
        // min:
        // max:
        mobile: [
          // 手机号
          {
            required: true,
            message: '手机号码必填'
          },
          { pattern: /^1[35789]\d{9}$/, message: '手机号格式不符' }
        ],
        code: [
          // 验证码
          { required: true, message: '验证码必填' }
        ],
        xieyi: [
          { validator: xieyiTest }
        ]
      }

    }
  },
  methods: {
    login () {
      // 表单校验
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return false
        }
        this.$http({
          url: '/mp/v1_0/captchas/' + this.loginForm.mobile,
          mmethod: 'GET'
        })
          .then(res => {
            let { data } = res.data
            window.initGeetest({
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success,
              new_captcha: true,
              product: 'bind'

            }, captchaObj => {
              captchaObj.onReady(() => {
                captchaObj.verify()
              }).onSuccess(() => {
                this.loginAct()
              }).onError(() => {

              })
            }

            )
          })
      })
    },
    loginAct () {
      this.$http({
        url: '/mp/v1_0/authorizations',
        method: 'POST',
        data: this.loginForm
      })
        .then(result => {
          // 储存用户的登录状态,
          window.sessionStorage.setItem('userinfo', JSON.stringify(result.data.data))
          // 非登录用户禁止后台页面,就是判断userinfo存不存在

          this.$router.push({ name: 'home' })

          console.log(result)
        })
        .catch(err => {
          this.$message({
            type: 'info',
            message: '手机号码输入错误:' + err
            // this.message.error('手机号或验证码错误'+err)
          })
          console.log(err)
        })
    }

  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(./login_bg.jpg);
  background-size: convert;
}
.login-box {
  width: 410px;
  height: 340px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 75%;
    text-align: center;
    img {
      width: 60%;
    }
  }
}
</style>
