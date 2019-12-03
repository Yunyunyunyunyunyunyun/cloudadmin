<template>
  <div class="order">
    <a-form :form="form" layout="inline">
      <!--  接单回收记录详情 -->
      <div class="order-info">
        <div class="title">
          订单信息
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
            <a-form-item label="创建时间">
              <a-input disabled :value="order.createTime" />
            </a-form-item>
            <a-form-item label="接单方式">
              <a-input disabled :value="order.receiptWay ? '派单' : '抢单'" />
            </a-form-item>
          </div>
          <div v-if="order.state == 1 || order.state == 3" class="item">
            <a-form-item label="接单时间">
              <a-input disabled :value="order.receiptTime" />
            </a-form-item>
            <a-form-item label="接单人员">
              <a-input
                disabled
                :value="`${order.receiptUser} ${order.receiptMobile || ''}`"
              />
            </a-form-item>
          </div>
          <div v-if="order.state == 2" class="item">
            <a-form-item label="回收完成时间">
              <a-input disabled :value="order.finishTime" />
            </a-form-item>
            <a-form-item label="回收人员">
              <a-input
                disabled
                :value="`${order.receiptUser} ${order.receiptMobile || ''}`"
              />
            </a-form-item>
          </div>
          <div v-if="order.state == 2" class="item">
            <a-form-item label="回收总量">
              <a-input disabled :value="order.total || ''" />
            </a-form-item>
            <a-form-item label="回收总金额">
              <a-input disabled :value="`${order.totalPrice}元`" />
            </a-form-item>
          </div>
          <div v-if="order.visit && order.visit.length" class="item">
            <a-form-item label="回收照片">
              <viewer class="item-img_list" :images="order.visit">
                <div
                  v-for="(item, index) in order.visit"
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
      <!-- 预约信息 -->
      <div class="reserve-info">
        <div class="title">
          预约信息
        </div>
        <div class="list">
          <div class="item">
            <a-form-item label="预约上门时间">
              <a-input
                disabled
                :value="`${order.recycleTime}--${order.overTime}`"
              />
            </a-form-item>
            <a-form-item label="预约方式">
              <a-input disabled :value="order.type | typeFl" />
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
            <a-form-item label="上门地址">
              <a-input disabled :value="order.areas" />
            </a-form-item>
            <a-form-item label="备注">
              <a-input disabled :value="order.remark" />
            </a-form-item>
          </div>
          <div v-if="order.reserve && order.reserve.length" class="item">
            <a-form-item label="预约回收照片">
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
      <!-- 订单状态记录 -->
      <div class="status-record">
        <div class="title">
          订单状态记录
        </div>
        <div class="steps-content">
          <a-empty
            v-if="order.orderRecordList && order.orderRecordList.length == 0"
            description="暂无记录"
          />
          <div v-else class="process-step">
            <a-steps direction="vertical">
              <a-step
                v-for="(item, index) in order.orderRecordList"
                :key="index"
                :status="index == 0 ? 'finish' : 'wait'"
              >
                <i slot="icon" class="iconfont">&#xe63e;</i>
                <div slot="title">
                  <span class="content-left time">{{
                    item.state | stateValFl
                  }}</span>
                  <span
                    class="content-right people"
                  >操作人员 ：{{ item.createUser }}</span>
                  <span
                    v-if="item.remark"
                    class="content-right people"
                    style="margin-left:10px"
                  >备注：{{ item.remark }}</span>
                </div>
                <div slot="description">
                  <span class="content-right remark">{{
                    item.createTime
                  }}</span>
                </div>
              </a-step>
            </a-steps>
          </div>
        </div>
      </div>
      <div v-if="order.state == 2" class="recycling-list">
        <div class="title">
          回收清单列表
        </div>
        <div class="card-content">
          <a-table
            class="table-content"
            :columns="columns"
            :data-source="formData"
            :pagination="false"
            :row-key="record => record.categoryName"
          >
            <span slot="serial" slot-scope="text, record, index">{{
              index + 1
            }}</span>
            <template slot="price" slot-scope="record">
              <span>{{ record.price }}元</span>
            </template>
          </a-table>
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
const columns = [
  {
    title: '序号',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '回收品类',
    dataIndex: 'categoryName'
  },
  {
    title: '回收总量',
    dataIndex: 'total'
  },
  {
    title: '回收单价',
    dataIndex: 'unit'
  },
  {
    title: '回收金额',
    dataIndex: '',
    key: 'price',
    scopedSlots: { customRender: 'price' }
  }
]
export default {
  filters: {
    stateValFl: function (value) {
      let str = ''
      switch (value) {
        case 1:
          str = '待接单'
          break
        case 2:
          str = '回收完成'
          break
        case 3:
          str = '回收人员取消'
          break
        case 4:
          str = '超时'
          break
        case 5:
          str = '用户取消'
          break
        case 6:
          str = '客服取消预约'
          break
        case 7:
          str = '客服取消订单'
          break
        case 8:
          str = '更改回收时间'
          break
        case 10:
          str = '修改预约信息'
          break
        default:
          str = '失效'
          break
      }
      return str
    }
  },
  data () {
    return {
      isShow: true,
      isShowBtn: false,
      orderId: '',
      columns,
      order: {},
      imgList: [],
      formData: [],
      visitViewer: null,
      reserveViewer: null
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
        this.formData = result.orderDetailList
        if (result.orderDetailList.length) {
          this.handleRecyclingList(result.orderDetailList)
        }
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
    // 处理回收清单
    handleRecyclingList (list) {
      let str = ''
      for (let i = 0; i < list.length; i++) {
        str += `${list[i].categoryName}：${list[i].weight}${
          list[i].categoryName === '手机' ? '个' : 'kg'
        }  单价：${list[i].unitPrice}'' 金额：${list[i].balance}
        `
      }
      this.order.recyclingList = str
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
      this.$router.replace({ path: '/order/takeBack/meet' })
    }
  }
}
</script>
<style lang="stylus">
.ant-steps-dot .ant-steps-item-content
  width 100%
  padding-left 10px
.order
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
.order
  width 100%
  background-color #fff
  padding 16px 20px
  .order-info
    width 100%
  .reserve-info,.device-info
    width 100%
    margin-top 30px
  .btn-list
      width 100%
      text-align center
      margin-top 60px
      margin-bottom 20px
.steps-content
  width 100%
.process-step
  margin-top 10px
  >>>.ant-steps-item-finish > .ant-steps-item-tail::after
    background #e8e8e8
  >>>.ant-steps-vertical > .ant-steps-item > .ant-steps-item-tail
    padding 22px 0 0 0
    height 119%
  >>>.ant-steps-icon
    line-height 16px
  .content-left
    display inline-block
    width 180px
    margin-right 80px
    &.time
      font-size 12px
      color #999999
    &.state
      font-size 14px
      color #333333
  .content-right
    display inline-block
    &.people
      font-size 12px
      color #333333
    &.remark
      font-size 12px
      color #999999
.status-record
  margin-top 10px
.recycling-list
  margin-top 20px
  .title
    margin-bottom 10px
</style>
