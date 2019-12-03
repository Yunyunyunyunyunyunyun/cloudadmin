<template>
  <div class="reserveDetail">
    <a-form :form="form" layout="inline">
      <!--  预约详情 -->
      <div class="member-info">
        <div class="title">
          会员信息
        </div>
        <div class="list">
          <div class="item">
            <a-form-item label="昵称">
              <a-input disabled :value="order.userName" />
            </a-form-item>
            <a-form-item label="姓名">
              <a-input disabled :value="order.userRealName" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="手机号">
              <a-input
                v-decorator="[
                  'mobile',
                ]" disabled
              >
                <a-button
                  slot="suffix"
                  style="font-size:12px"
                  class="link-btn"
                  type="link"
                  @click="completeDisplay"
                >
                  {{ isShow?'部分隐藏':'完整展示' }}
                </a-button>
              </a-input>
            </a-form-item>
            <a-form-item label="IC卡号">
              <a-input disabled :value="order.cardNumber" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="详细地址">
              <a-input disabled :value="order.address" />
            </a-form-item>
            <a-form-item label="可用余额">
              <a-input disabled :value="order.canUseCatCoin" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="可用环保值">
              <a-input disabled :value="order.canUseEnviron" />
            </a-form-item>
            <a-form-item label="累计环保值">
              <a-input disabled :value="order.allEnviron" />
            </a-form-item>
          </div>
        </div>
      </div>
      <!-- 兑换信息 -->
      <div class="exchange-info">
        <div class="title">
          兑换信息
        </div>
        <div class="list">
          <div class="item">
            <a-form-item label="订单号">
              <a-input disabled :value="order.orderNum" />
            </a-form-item>
            <a-form-item label="商户名称">
              <a-input disabled :value="order.businessName" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="兑换时间">
              <a-input disabled :value="order.exchangeTime" />
            </a-form-item>
            <a-form-item label="店铺地址">
              <a-input disabled :value="order.shopAddress" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="支付方式">
              <a-input disabled :value="order.payType" />
            </a-form-item>
            <a-form-item label="付款金额">
              <a-input disabled :value="order.payAmount" />
            </a-form-item>
          </div>
        </div>
      </div>
      <div class="btn-list">
        <a-button type="primary" @click="handleGoBack">
          返回
        </a-button>
      </div>
    </a-form>
  </div>
</template>
<script>
import { exchangeDetail } from '@/api/order'
export default {
  data () {
    return {
      isShow: true,
      order: {}
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'detail' })
  },
  created: function () {
    this.handleQuery()
  },
  mounted: function () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      exchangeDetail(this.orderId).then(res => {
        const result = res.result
        this.order = result
        this.completeDisplay()
      })
    },
    handleQuery () {
      const { id } = this.$route.query
      this.orderId = id
    },
    completeDisplay () {
      this.isShow = !this.isShow
      const defValue = {
        mobile: this.isShow
          ? this.order.phone
          : this.handleMobileFl(this.order.phone)
      }
      this.form.setFieldsValue(defValue)
    },
    handleMobileFl (str) {
      const start = str.slice(0, 3)
      const end = str.slice(7)
      return `${start}****${end}`
    },
    handleGoBack () {
      this.$router.replace({ path: '/order/exchange/entity' })
    }
  }
}
</script>
<style lang="stylus">
.reserveDetail
  .list
    width 100%
    padding 0 12px
    .item
      width 100%
      display flex
      justify-content space-between
      margin-top 16px
      .ant-form-item
        width 42%
        display flex
        .ant-form-item-label
          width 120px
          font-size 12px
          color #000
        .ant-form-item-control-wrapper
          flex 1
          .item-img_list
            width 100%
            display flex
            flex-wrap wrap
            .item-img
              width 108px
              height 80px
              border-radius 2px
              overflow hidden
              margin-right 8px
              margin-top 8px
            div.item-img:last-child
                margin-right 0
          .ant-input-disabled
            border none
            border-radius 2px
            font-size 12px
            color #333
</style>
<style lang="stylus" scoped>
.reserveDetail
  width 100%
  background-color #fff
  padding 16px 20px
  .member-info
    width 100%
  .exchange-info
    width 100%
    margin-top 30px
  .btn-list
      width 100%
      text-align center
      margin-top 30px
      margin-bottom 20px
</style>
