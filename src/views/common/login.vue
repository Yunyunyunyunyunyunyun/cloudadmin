<template>
  <div class="login rel">
    <div class="header">
      <div class="logo">
        <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191107/15731230059270aeb040db9a64d8488a47de33858e9b8.png" alt>
      </div>
      <div class="mobile">
        <div class="icon">
          <img src="../../assets/image/customer.png" alt>
        </div>
        <span>025-69028970</span>
      </div>
    </div>
    <div class="content abs">
      <div v-if="!isSuccess" class="title">
        {{ title }}
      </div>
      <a-form class="login-form" :form="form" @submit="handleSubmit">
        <!-- 登录 -->
        <div v-if="isShowLogin&&!isShowPassword&&!isSuccess">
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {rules: [{ required: true, message: '请输入账号!' }]}
              ]"
              maxlength="30"
              size="large"
              type="text"
              placeholder="请输入账号"
            >
              <a-icon slot="prefix" class="icon-color" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }]}
              ]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码"
            >
              <icon-font slot="prefix" type="iconmima" class="icon-color"></icon-font>
            </a-input>
          </a-form-item>
          <!-- <a-form-item v-if="false" class="code">
            <a-input
              v-decorator="[
                'code',
              ]"
              size="large"
              type="tel"
              placeholder="验证码"
            >
            </a-input>
            <div class="code-icon"></div>
          </a-form-item>-->
        </div>
        <!-- 忘记密码 -->
        <div v-if="!isShowLogin&&!isShowPassword&&!isSuccess">
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {rules: [
                  { required: true, message: '请输入账号!' }
                ]}
              ]"
              size="large"
              type="text"
              placeholder="请输入账号"
            >
              <a-icon slot="prefix" class="icon-color" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'code',
                {rules: [{ required: true, message: '请输入短信验证码!' }]}
              ]"
              size="large"
              placeholder="请输入短信验证码"
            >
              <icon-font slot="prefix" class="icon-color" type="iconyanzhengma"></icon-font>
              <a-button
                slot="suffix"
                class="link-btn"
                :class="{disable:disable}"
                type="link"
                @click="getCaptcha"
              >
                {{ disable?`${countdown}s 后可点击重发`:'发送验证码' }}
              </a-button>
            </a-input>
          </a-form-item>
        </div>
        <!-- 设置新密码 -->
        <div v-if="isShowPassword&&!isSuccess">
          <a-form-item>
            <a-input
              v-decorator="[
                'newPassword',
                {
                  rules: [{
                    required: true, message: '请设置新密码最长30位'
                  }, {
                    validator: validateToNextPassword,
                  }],
                }
              ]"
              size="large"
              type="password"
              maxlength="30"
              placeholder="请设置新密码最长30位"
            >
              <icon-font slot="prefix" type="iconmima" class="icon-color"></icon-font>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [{
                    required: true, message: '请再次输入登录密码',
                  }, {
                    validator: compareToFirstPassword,
                  }],
                }
              ]"
              size="large"
              type="password"
              placeholder="请再次输入登录密码"
              @blur="handleConfirmBlur"
            >
              <icon-font slot="prefix" type="iconmima" class="icon-color"></icon-font>
            </a-input>
          </a-form-item>
        </div>
        <!-- 密码设置成功 -->
        <div v-if="isSuccess">
          <div class="success-icon">
            <icon-font style="font-size:72px" type="iconchenggongtishi"></icon-font>
            <p>密码设置成功 ！</p>
          </div>
        </div>
        <a-form-item>
          <a-button
            style="font-size:16px"
            type="primary"
            html-type="submit"
            block
            :loading="loading"
            size="large"
          >
            {{ btnText }}
          </a-button>
        </a-form-item>
        <div v-show="isShowLogin&&!isShowPassword&&!isSuccess">
          <a-form-item class="form-text">
            <a-checkbox v-decorator="['rememberMe']">
              记住密码
            </a-checkbox>
            <a-button
              type="link" ghost size="small"
              @click="handleForgetPassword('password')"
            >
              忘记密码？
            </a-button>
          </a-form-item>
        </div>
        <div v-show="(!isShowLogin||isShowPassword)&&!isSuccess">
          <a-form-item class="form-text_code">
            <span>记得密码</span>
            <a-button type="link" @click="handleForgetPassword('login')">
              直接登录
            </a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script>
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_khhun27fquq.js'
})

import md5 from 'md5'
import { mapActions } from 'vuex'
import { getSmsCaptcha, checkCode, resetPwd } from '@/api/login'

export default {
  components: {
    IconFont
  },
  data () {
    return {
      loading: false,
      countdown: 60,
      timer: null,
      title: '登录',
      btnText: '登录',
      type: 'login', // login 账号密码登录状态  password 设置新的密码
      disable: false,
      isSuccess: false,
      confirmDirty: false,
      isShowLogin: true,
      isShowCode: false,
      isShowPassword: false,
      form: this.$form.createForm(this),
      info: null
    }
  },
  mounted () {},
  methods: {
    ...mapActions(['Login']),
    handleSubmit (e) {
      e.preventDefault()
      if (this.isSuccess) {
        this.handleForgetPassword('login')
      } else {
        const {
          form: { validateFields }
        } = this
        const validateFieldsKey =
          this.type === 'login'
            ? ['userName', 'password']
            : this.isShowPassword
              ? ['newPassword', 'confirm']
              : ['userName', 'code']
        validateFields(validateFieldsKey, { force: true }, (err, values) => {
          if (!err) {
            const loginParams = { ...values }
            if (this.type === 'login') {
              loginParams.password = md5(values.password)
              this.loading = true
              this.Login(loginParams)
                .then(res => this.loginSuccess(res))
                .finally(() => {
                  this.loading = false
                })
            } else {
              this.handlePasswordSubmit(loginParams)
            }
          }
        })
      }
    },
    // 处理忘记密码的提交
    handlePasswordSubmit (params) {
      if (this.isShowPassword) {
        const data = {
          userName: this.info.userName,
          code: this.info.code,
          newPwd: md5(params.newPassword)
        }
        resetPwd(data).then(res => {
          this.handlePasswordSuccess()
        })
      } else {
        checkCode(params).then(res => {
          this.$message.success('验证码校验成功')
          this.title = '设置新密码'
          this.isShowPassword = true
          this.info = params
        })
      }
    },
    // 获取验证码
    getCaptcha (e) {
      if (this.disable) return false
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      validateFields(['userName'], { force: true }, (err, values) => {
        if (!err) {
          this.countdown = 60
          getSmsCaptcha({ ...values }).then(res => {
            this.$message.success('验证码获取成功')
            this.disable = true
            this.handleCountdown()
          })
        }
      })
    },
    // 处理忘记密码
    handleForgetPassword (type) {
      this.type = type
      this.isShowLogin = !this.isShowLogin
      this.btnText = this.isShowLogin ? '登录' : '下一步'
      this.title = this.isShowLogin ? '登录' : '找回密码'
      this.isShowPassword = false
      this.form.resetFields()
      this.timer && clearInterval(this.timer)
      this.disable && (this.disable = false)
      this.isSuccess && (this.isSuccess = false)
    },
    // 处理密码设置成功
    handlePasswordSuccess () {
      this.isSuccess = true
      this.btnText = '请重新登录'
    },
    handleCountdown () {
      this.timer = setInterval(() => {
        if (this.countdown !== 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
          this.disable = false
        }
      }, 1000)
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('两次密码输入不一致！')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleFirstMenu (data) {
      let _item = null
      function filters (items) {
        if (items.mType === 0 && items.children && items.children.length) {
          filters(items.children[0])
        } else {
          if (items.mType === 1) _item = items
        }
      }
      filters(data)
      return _item
    },
    loginSuccess (res) {
      const _item = res.menus[0]
      const menu = this.handleFirstMenu(_item)
      const path = _item.routeUrl === '/home' ? _item.routeUrl : menu && menu.routeUrl || '/error'
      this.$message.success('登录成功', 1.5)
      this.$router.push({ path })
    }
  }
}
</script>
<style lang="stylus">
.login
  .ant-input-lg
    height 46px
  .ant-btn-lg
    height 48px
    border-radius 2px
  .ant-form-item
    color $f-t-color
  .ant-btn-background-ghost.ant-btn-link,.ant-checkbox-wrapper
    color $f-color-2
  .form-text
    margin-top -20px
    .ant-form-item-children
      width 100%
      display flex
      align-items  center
      justify-content space-between
    .ant-btn-sm,.ant-checkbox,label
      font-size $font12
  .code
    .ant-form-item-children
      display flex
  .form-text_code
    margin-top -20px
    font-size $font12
    .ant-btn-link
      padding-left 2px
      font-size $font12
</style>
<style lang="stylus" scoped>
.login
  width: 100vw;
  height: 100vh;
  background url('http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191026/15720607300071feddbe5dca94fb6b9c76aadc8391314.png')
  background-size 100% 100%
  background-repeat no-repeat;
  .header
    color #fff
    width 100%
    padding 24px 31px;
    box-sizing border-box
    display flex
    justify-content space-between
    align-items center
    .logo
        height: 36px
    .mobile
      display flex
      .icon
        width 16px
        height 16px
        margin-right 8px
  .content
    top 50%
    right 12%
    width 408px
    margin-top -185px
    background-color #fff
    border-radius 2px
    padding 32px
    box-sizing border-box
    .title
      font-size 20px
      color #000
      font-family:PingFangSC-Medium,PingFangSC
    .login-form
      margin-top 20px
    .icon-color
      color:rgba(0,0,0,.65)
    .code-icon
      width 140px
      height 46px;
      background-color #CCCCCC
      margin-left 16px
    .success-icon
      width 100%
      text-align center
      p
       padding-left 16px
       margin-top 18px
       color #000
       font-size 18px
       font-weight bold
    .link-btn
      font-size 12px
    .link-btn.disable
        color #999999
</style>
