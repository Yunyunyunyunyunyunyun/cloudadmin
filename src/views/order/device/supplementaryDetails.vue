<template>
  <div class="supplementaryDetails">
    <div class="commonTitle">
      补币信息
    </div>
    <a-row class="basicInfo">
      <a-col :span="12" class="commonCol">
        <a-row
          v-for="(item, index) in leftInfos" :key="index"
          :gutter="8" class="commonHeight"
        >
          <a-col :span="6" align="right">
            {{ index|titleFilter }}:
          </a-col>
          <a-col :span="18">
            <div class="commonLine">
              {{ item }}
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12" class="commonCol">
        <a-row
          v-for="(item, index) in rightInfos" :key="index"
          :gutter="8" class="commonHeight"
        >
          <a-col :span="6" align="right">
            {{ index|titFilter }}:
          </a-col>
          <a-col :span="18">
            <div class="commonLine">
              {{ item }}
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div class="commonTitle">
      设备信息
    </div>
    <a-row class="basicInfo">
      <a-col :span="12" class="commonCol">
        <a-row
          v-for="(item, index) in leftTwoInfos" :key="index"
          :gutter="8" class="commonHeight"
        >
          <a-col :span="6" align="right">
            {{ index|titleTwoFilter }}:
          </a-col>
          <a-col :span="18">
            <div class="commonLine">
              {{ item }}
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12" class="commonCol">
        <a-row
          v-for="(item, index) in rightTwoInfos" :key="index"
          :gutter="8" class="commonHeight"
        >
          <a-col :span="6" align="right">
            {{ index|titTwoFilter }}:
          </a-col>
          <a-col :span="18">
            <div class="commonLine">
              {{ item }}
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="bottomBtn">
        <a-button type="primary" @click="backPage()">
          返回
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { viewSupplementaryRecord } from '@/api/order'
export default {
  name: 'SupplementaryDetails',
  filters: {
    titleFilter: function (value) {
      switch (value) {
        case 'orderId':
          return '订单号'
        case 'userName':
          return '补币人员'
        case 'createTime':
          return '补币时间'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titFilter: function (value) {
      switch (value) {
        case 'status':
          return '订单状态'
        case 'mobile':
          return '补币人员手机号'
        case 'coinNum':
          return '本次补币金额（元）'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titleTwoFilter: function (value) {
      switch (value) {
        case 'productName':
          return '设备名称'
        case 'deviceCode':
          return '设备编号'
        case 'region':
          return '区域'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titTwoFilter: function (value) {
      switch (value) {
        case 'productMarkName':
          return '设备型号'
        case 'location':
          return '位置信息'
        case 'housingEstate':
          return '小区'
        default:
          return '字段值异常，请检查后台数据'
      }
    }
  },
  data () {
    return {
      leftInfos: {
        orderId: '',
        userName: '',
        createTime: ''
      },
      rightInfos: {
        status: '',
        mobile: '',
        coinNum: ''
      },
      leftTwoInfos: {
        productName: '',
        deviceCode: '',
        region: ''
      },
      rightTwoInfos: {
        productMarkName: '',
        location: '',
        housingEstate: ''
      },
      sId: ''
    }
  },
  created () {
    this.sId = this.$route.query.id
  },
  mounted () {
    const params = {}
    params.menuId = 'edbc6e4e55674990b0880a234335152d'
    params.id = this.sId
    this.getInfo(params)
  },
  methods: {
    getInfo (params) {
      viewSupplementaryRecord(params)
        .then(res => {
          this.leftInfos.orderId = res.result.orderId
          this.leftInfos.userName = res.result.userName
          this.leftInfos.createTime = res.result.createTime
          this.rightInfos.status = res.result.status
          this.rightInfos.mobile = res.result.mobile
          this.rightInfos.coinNum = res.result.coinNum
          this.leftTwoInfos.productName = res.result.productName
          this.leftTwoInfos.deviceCode = res.result.deviceCode
          this.leftTwoInfos.region = res.result.region
          this.rightTwoInfos.productMarkName = res.result.productMarkName
          this.rightTwoInfos.location = res.result.location
          this.rightTwoInfos.housingEstate = res.result.housingEstate
        })
    },
    backPage () {
      this.$router.push({ path: '/order/delivery/supplementaryRecord' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.supplementaryDetails
  background-color #fff
  padding 16px 20px
  margin-bottom 20px
  font-size 12px
  color #000
  .commonTitle
    font-size 16px
    font-weight 600
    color #333
  .basicInfo
    margin 16px 0
    .commonCol
      .commonHeight
        height 32px
        line-height 32px
        margin 16px 0
        .commonLine
          background-color #f2f2f2
          height 32px
          line-height 32px
          padding 0 11px
          color #333
  .bottomBtn
    margin 8px 0 24px 0
    text-align center
</style>
