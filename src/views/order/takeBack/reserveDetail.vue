<template>
  <div class="reserveDetail">
    <a-form :form="form" layout="inline">
      <!--  预约详情 -->
      <div class="member-info">
        <div class="title">
          预约详情
        </div>
        <div class="list">
          <div class="item">
            <a-form-item label="订单号">
              <a-input disabled :value="order.orderId" />
            </a-form-item>
            <a-form-item label="订单状态">
              <a-input disabled :value="order.state | stateFl" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="联系人">
              <a-input disabled :value="order.name" />
            </a-form-item>
            <a-form-item label="手机号">
              <a-input v-decorator="['mobile']" disabled>
                <a-button
                  v-if="isShowBtn"
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
          </div>
          <div class="item">
            <a-form-item label="提交时间">
              <a-input disabled :value="order.createTime" />
            </a-form-item>
            <a-form-item label="预约回收品类">
              <a-input disabled :value="order.categoryName" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="预约上门时间">
              <a-input
                disabled
                :value="
                  order.recycleTime && order.overTime
                    ? `${order.recycleTime}~${order.overTime}`
                    : ''
                "
              />
            </a-form-item>
            <a-form-item label="预约方式">
              <a-input disabled :value="order.type | typeFl" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="上门地址">
              <a-input disabled :value="order.areas" />
            </a-form-item>
            <a-form-item label="备注">
              <a-input disabled :value="order.remark" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item
              :label="
                order.reserve && order.reserve.length ? '预约回收照片' : ''
              "
            >
              <viewer class="item-img_list" :images="order.reserve">
                <div
                  v-for="(item, index) in order.reserve"
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
      <div v-if="order.cancelOrder" class="cancel-order">
        <div class="title">
          预约取消详情
        </div>
        <div class="list">
          <div class="item">
            <a-form-item label="取消时间">
              <a-input disabled :value="order.cancelOrder.createTime" />
            </a-form-item>
            <a-form-item label="取消操作人">
              <a-input disabled :value="order.cancelOrder.createUser" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="取消备注">
              <a-input disabled :value="order.cancelOrder.remark" />
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
import { reserveDetail } from '@/api/order'
export default {
  data () {
    return {
      isShow: true,
      isShowBtn: false,
      orderId: '',
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
    this.getorder()
  },
  methods: {
    getorder () {
      reserveDetail(this.orderId).then(res => {
        const result = res.result
        this.order = result
        if (result.code.length === 11) {
          this.isShowBtn = true
          this.completeDisplay()
        } else {
          const defValue = {
            mobile: this.order.code
          }
          this.form.setFieldsValue(defValue)
        }
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
          ? this.order.code
          : this.handleMobileFl(this.order.code)
      }
      this.form.setFieldsValue(defValue)
    },
    handleMobileFl (str) {
      const start = str.slice(0, 3)
      const end = str.slice(7)
      return `${start}****${end}`
    },
    handleGoBack () {
      this.$router.replace({ path: '/order/takeBack/reserve' })
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
  .delivery-info,.device-info
    width 100%
    margin-top 30px
  .btn-list
      width 100%
      text-align center
      margin-top 30px
      margin-bottom 20px
</style>
