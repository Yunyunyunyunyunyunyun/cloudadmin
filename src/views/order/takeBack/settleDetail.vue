<template>
  <div class="reserveDetail">
    <!-- 展示（已结算已超时和待结算的 1 已经结算 0 待结算） -->
    <div v-if="!order.state || (order.isTimeOut && order.state)" class="tips">
      <a-icon class="tips-icon" type="info-circle" />
      <div class="tips-content">
        <p>
          当前订单状态：{{ order.state ? "已结算" : "待结算"
          }}{{
            order.isExtend
              ? `(（已延长${order.extendHour}小时 ${
                order.remark ? "备注：" + order.remark : ""
              }) `
              : ""
          }}
        </p>
        <p v-if="order.isTimeOut">
          {{ order.state ? "已超时结算" : "已过回收完成时间" }}
          <span v-if="!order.state">{{ order.overRecycle }}</span> ，超结算期限
          {{ order.overSettle }}
          <span>{{ order.bail ? `产生保证金扣减${order.bail}` : "" }}</span>
        </p>
        <p v-else>
          已过回收完成时间<span v-if="!order.state">{{ order.overRecycle }}</span> ，超结算期限0时0分
          <span>{{ order.bail ? `产生保证金扣减${order.bail}` : "" }}</span>
        </p>
      </div>
    </div>
    <a-form layout="inline">
      <!--  结算订单列表 -->
      <div class="order-list">
        <div class="title">
          结算订单列表
        </div>
        <!-- 待结算 -->
        <div v-if="order.state === 0" class="list">
          <div class="item">
            <a-form-item label="订单号">
              <a-input disabled :value="order.orderId" />
            </a-form-item>
            <a-form-item label="订单状态">
              <a-input disabled :value="order.state ? '已结算' : '待结算'" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="回收人员">
              <a-input disabled :value="order.recycleName" />
            </a-form-item>
            <a-form-item label="结算品类">
              <a-input disabled :value="order.categoryName" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="回收总量">
              <a-input
                disabled
                :value="
                  `${order.priceMode ? order.weight : order.count}${
                    !order.priceMode ? '个' : 'kg'
                  }`
                "
              />
            </a-form-item>
            <a-form-item label="回收订单总金额">
              <a-input disabled :value="`${order.totalPrice}${unit}`" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="预估结算单价">
              <a-input
                disabled
                :value="`${order.unitPrice}${!order.priceMode ? '/个' : '/kg'}`"
              />
            </a-form-item>
            <a-form-item label="预估结算金额">
              <a-input disabled :value="`${order.settlePrice}${unit}`" />
            </a-form-item>
          </div>
        </div>
        <div v-else class="list">
          <div class="item">
            <a-form-item label="订单号">
              <a-input disabled :value="order.orderId" />
            </a-form-item>
            <a-form-item label="订单状态">
              <a-input disabled :value="order.state ? '已结算' : '待结算'" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="结算完成时间">
              <a-input disabled :value="order.settleTime" />
            </a-form-item>
            <a-form-item label="结算品类">
              <a-input disabled :value="order.categoryName" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="结算账户">
              <a-input disabled :value="order.mobile" />
            </a-form-item>
            <a-form-item label="回收人员">
              <a-input disabled :value="order.recycleName" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="回收总量">
              <a-input
                disabled
                :value="
                  `${order.priceMode ? order.weight : order.count}${
                    !order.priceMode ? '个' : 'kg'
                  }`
                "
              />
            </a-form-item>
            <a-form-item label="回收订单总金额">
              <a-input disabled :value="`${order.totalPrice}${unit}`" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="实际结算总量">
              <a-input
                disabled
                :value="
                  `${order.priceMode ? order.settleWeight : order.settleCount}${
                    !order.priceMode ? '个' : 'kg'
                  }`
                "
              />
            </a-form-item>
            <a-form-item label="结算品类单价">
              <a-input
                disabled
                :value="
                  `${order.unitPrice}元/${!order.priceMode ? '个' : 'kg'}`
                "
              />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="差额量">
              <a-input
                disabled
                :value="
                  `${parseInt(
                    order.priceMode
                      ? order.settleWeight - order.weight
                      : order.settleCount - order.count
                  )}${!order.priceMode ? '个' : 'kg'}`
                "
              />
            </a-form-item>
            <a-form-item label="结算金额">
              <a-input disabled :value="`${order.settlePrice}${unit}`" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="补足担保金额">
              <a-input disabled :value="`${order.prestore}${unit}`" />
            </a-form-item>
            <a-form-item label="实际获得金额">
              <a-input disabled :value="`${order.balance}${unit}`" />
            </a-form-item>
          </div>
          <div class="item">
            <a-form-item label="结算操作员">
              <a-input disabled :value="order.settleUser" />
            </a-form-item>
            <a-form-item label="备注">
              <a-input disabled :value="order.remark" />
            </a-form-item>
          </div>
        </div>
        <div class="order-info">
          <div class="title">
            结算订单信息
          </div>
          <div class="card-content">
            <a-table
              class="table-content"
              :columns="columns"
              :data-source="formData"
              :pagination="false"
              :row-key="record => record.orderId"
            >
              <span slot="serial" slot-scope="text, record, index">{{
                index + 1
              }}</span>
            </a-table>
          </div>
        </div>
        <div class="btn-list">
          <a-button type="primary" @click="handleGoBack">
            返回
          </a-button>
        </div>
      </div>
    </a-form>
  </div>
</template>
<script>
import { settleDetail } from '@/api/order'
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '关联回收订单',
    dataIndex: 'orderId'
  },
  {
    title: '单品回收重量（kg）',
    dataIndex: 'weight'
  },
  {
    title: '回收单价（元/kg）',
    dataIndex: 'unitPrice'
  },
  {
    title: '回收金额（元）',
    dataIndex: 'price'
  },
  {
    title: '接单时间',
    dataIndex: 'receiptTime'
  },
  {
    title: '回收完成时间',
    dataIndex: 'finishTime'
  }
]
export default {
  data () {
    return {
      unit: '元',
      order: {},
      orderId: '',
      columns,
      formData: []
    }
  },
  created: function () {
    this.handleQuery()
    this.getDetail()
  },
  methods: {
    getDetail () {
      settleDetail(this.orderId).then(res => {
        const result = res.result
        this.order = result
        this.formData = result.detailList
      })
    },
    handleQuery () {
      const { id } = this.$route.query
      this.orderId = id
    },
    handleGoBack () {
      this.$router.replace({ path: '/order/takeBack/settle' })
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
  .tips
    width 100%
    background-color #FEF6EA
    padding 8px 10px
    display flex
    margin-bottom 20px
    .tips-icon
      font-size 16px
      color #faad14
    .tips-content
      margin-left 10px
      font-size 12px
      color #333
      span
        color #FF0000
  .member-info
    width 100%
  .order-info
    width 100%
    margin-top 30px
    .title
      margin-bottom 20px
  .btn-list
      width 100%
      text-align center
      margin-top 30px
      margin-bottom 20px
</style>
