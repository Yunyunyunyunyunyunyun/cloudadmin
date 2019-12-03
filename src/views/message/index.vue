<template>
  <div class="msg">
    <div class="msg-title">
      <p>{{ msg.title }}</p>
      <span>{{ msg.sendTime }}</span>
    </div>
    <!-- eslint-disable-next-line -->
    <div class="msg-content" v-html="msg.content"></div>
    <div class="btn-list">
      <a-button type="primary" @click="handleGoBack">
        返回
      </a-button>
    </div>
  </div>
</template>
<script>
import { msgDetail } from '@/api/workBench'
export default {
  data () {
    return {
      id: '',
      msg: {}
    }
  },
  created: function () {
    this.handleQuery()
    this.getMsgDetail()
  },
  methods: {
    handleQuery () {
      const { id } = this.$route.query
      this.id = id
    },
    getMsgDetail () {
      msgDetail(this.id).then(res => {
        this.msg = res.result
      })
    },
    handleGoBack () {
      this.$router.replace('/home')
    }
  }
}
</script>
<style lang="stylus" scoped>
.msg
  width 100%
  background-color #fff
  height 100%
  padding 20px 16px
  .msg-title
    text-align center
    p
      font-size 16px
      color #000000
      font-weight 500
    span
      font-size 14
  .msg-content
    width 100%
    border 1px solid rgba(232,232,232,1)
    margin-top 20px
    padding 20px
  .btn-list
    width 100%
    text-align center
    margin-top 40px
</style>
