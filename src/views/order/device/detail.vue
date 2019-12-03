<template>
  <div class="deliveyDetail">
    <a-form :form="form" layout="inline">
      <!-- 会员信息 -->
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
              <a-input v-decorator="['mobile']" disabled>
                <a-button
                  v-if="order.cellPhone"
                  slot="suffix"
                  style="font-size:12px"
                  class="link-btn"
                  type="link"
                  @click="completeDisplay"
                >
                  {{ isShow ? "部分隐藏" : "完整展示" }}
                </a-button>
              </a-input>
            </a-form-item>
            <a-form-item label="IC卡号">
              <a-input disabled :value="order.cardNum" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="详细地址">
              <a-input disabled :value="order.region" />
            </a-form-item>
            <a-form-item label="可用余额">
              <a-input disabled :value="order.catCoin" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="可用环保值">
              <a-input disabled :alue="order.environmental" />
            </a-form-item>
            <a-form-item label="累计环保值">
              <a-input disabled :value="order.balanceEnviron" />
            </a-form-item>
          </div>
        </div>
      </div>
      <!-- 投递信息 -->
      <div class="delivery-info">
        <div class="title">
          投递信息
        </div>
        <div class="list">
          <div class="item">
            <a-form-item label="订单号">
              <a-input disabled :value="order.orderId" />
            </a-form-item>
            <a-form-item label="订单状态">
              <a-input disabled :value="order.status" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="投递设备类型">
              <a-input
                disabled
                :value="order.scenario === '1' ? '智能垃圾箱' : '垃圾回收站'"
              />
            </a-form-item>
            <a-form-item label="投递完成时间">
              <a-input disabled :value="order.createDate" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="投递垃圾分类">
              <a-input disabled :value="order.dataValue" />
            </a-form-item>
            <a-form-item label="投递重量">
              <a-input disabled :value="order.rubbishWeight" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="本次新增余额">
              <a-input disabled :value="order.delveryCatoin" />
            </a-form-item>
            <a-form-item label="本次新增余环保值">
              <a-input disabled :value="order.integralValue" />
            </a-form-item>
          </div>
          <div v-if="order.imageList && order.imageList.length" class="item">
            <a-form-item label="投递照片">
              <viewer class="item-img_list" :images="order.imageList">
                <div
                  v-for="(item, index) in order.imageList"
                  :key="index"
                  class="item-img"
                >
                  <img :src="item">
                </div>
              </viewer>
            </a-form-item>
          </div>
        </div>
      </div>
      <!-- 设备信息 -->
      <div class="device-info">
        <div class="title">
          设备信息
        </div>
        <div class="list">
          <div class="item">
            <a-form-item label="设备名称">
              <a-input disabled :value="order.productName" />
            </a-form-item>
            <a-form-item label="设备型号">
              <a-input disabled :value="order.garbageName" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="设备编号">
              <a-input disabled :value="order.productId" />
            </a-form-item>
            <a-form-item label="位置信息">
              <a-input disabled :value="order.location" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="区域">
              <a-input disabled :value="order.address" />
            </a-form-item>
            <a-form-item label="小区">
              <a-input disabled :value="order.estateName" />
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
import { deliveryRecordDetail } from '@/api/order'
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
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      deliveryRecordDetail(this.orderId, this.type).then(res => {
        const result = res.result
        this.order = result
        this.$nextTick(() => {
          if (result.cellPhone) {
            this.completeDisplay()
          }
        })
      })
    },
    handleQuery () {
      const { id, type } = this.$route.query
      this.orderId = id
      this.type = type
    },
    completeDisplay () {
      this.isShow = !this.isShow
      const defValue = {
        mobile: this.isShow
          ? this.order.cellPhone
          : this.handleMobileFl(this.order.cellPhone)
      }
      this.form.setFieldsValue(defValue)
    },
    handleMobileFl (str) {
      const start = str.slice(0, 3)
      const end = str.slice(7)
      return `${start}****${end}`
    },
    handleGoBack () {
      this.$router.replace({ path: '/order/delivery/record' })
    }
  }
}
</script>
<style lang="stylus">
.deliveyDetail
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
.deliveyDetail
  width 100%
  background-color #fff
  padding 16px 20px
  .member-info
    width 100%
  .delivery-info,.device-info
    width 100%
    margin-top 30px
  .btn-list
      width 100%
      text-align center
      margin-top 30px
      margin-bottom 20px
</style>
