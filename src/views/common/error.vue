<template>
  <div class="error">
    <div class="error-content">
      <div class="error-icon">
        <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191019/15714482104071538b7fec2064d429803970871bbc6de.png" alt="">
      </div>
      <p>抱歉！您没有权限访问此页面</p>
      <a-button type="primary" @click="handleGoBack">
        返回上一页
      </a-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleGoBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>
.error
  width 100%
  height 100vh
  background-color #fff
  .error-content
    width 210px
    margin 20% auto
    text-align center
    .error-icon
      width 180px
    p
      font-size 16px
      font-weight 600
      margin-top 20px
      color #333333
</style>
