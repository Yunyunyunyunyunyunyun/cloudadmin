<template>
  <a-locale-provider :locale="zh_CN">
    <a-config-provider :get-popup-container="(trigger) => trigger.parentElement">
      <div id="app">
        <router-view></router-view>
      </div>
      <template v-slot:renderEmpty>
        <div class="no-data">
          <a-icon type="frown" style="font-size: 18px" />
          <span>暂无数据～</span>
        </div>
      </template>
    </a-config-provider>
  </a-locale-provider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  data () {
    return {
      zh_CN
    }
  }
}
</script>
<style lang="stylus">
#app
  height 100%
  .no-data
      display flex
      align-items center
      justify-content center
      span
        font-size 12px
        color #999
        margin-left 4px
</style>

