<template>
  <div class="withdrawDetails">
    <div class="commonTitle">
      会员信息
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
              <span v-if="index==='cellPhone'&&showpn&&item" class="showComplete" @click="showAllPhoneNum()">完整展示</span>
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
      取币信息
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
    <div class="commonTitle">
      设备信息
    </div>
    <a-row class="basicInfo">
      <a-col :span="12" class="commonCol">
        <a-row
          v-for="(item, index) in leftThreeInfos" :key="index"
          :gutter="8" class="commonHeight"
        >
          <a-col :span="6" align="right">
            {{ index|titleThreeFilter }}:
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
          v-for="(item, index) in rightThreeInfos" :key="index"
          :gutter="8" class="commonHeight"
        >
          <a-col :span="6" align="right">
            {{ index|titThreeFilter }}:
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
import { viewWithdrawRecord } from '@/api/order'
export default {
  name: 'WithdrawDetails',
  filters: {
    titleFilter: function (value) {
      switch (value) {
        case 'nickName':
          return '昵称'
        case 'cellPhone':
          return '手机号'
        case 'address':
          return '详细地址'
        case 'balanceEnviron':
          return '可用环保值'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titFilter: function (value) {
      switch (value) {
        case 'userRealName':
          return '姓名'
        case 'cardNum':
          return 'IC卡号'
        case 'creditLine':
          return '可用余额'
        case 'environmental':
          return '累计环保值'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titleTwoFilter: function (value) {
      switch (value) {
        case 'orderId':
          return '订单号'
        case 'operateDate':
          return '取币时间'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titTwoFilter: function (value) {
      switch (value) {
        case 'state':
          return '订单状态'
        case 'withdrawValue':
          return '本次取币金额（元）'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titleThreeFilter: function (value) {
      switch (value) {
        case 'proName':
          return '设备名称'
        case 'deviceCode':
          return '设备编号'
        case 'proAddress':
          return '区域'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titThreeFilter: function (value) {
      switch (value) {
        case 'proCategory':
          return '设备型号'
        case 'positionInfo':
          return '位置信息'
        case 'estateName':
          return '小区'
        default:
          return '字段值异常，请检查后台数据'
      }
    }
  },
  data () {
    return {
      leftInfos: {
        nickName: '',
        cellPhone: '',
        address: '',
        balanceEnviron: ''
      },
      rightInfos: {
        userRealName: '',
        cardNum: '',
        creditLine: '',
        environmental: ''
      },
      showpn: true,
      trueNum: '',
      leftTwoInfos: {
        orderId: '',
        operateDate: ''
      },
      rightTwoInfos: {
        state: '',
        withdrawValue: ''
      },
      leftThreeInfos: {
        proName: '',
        deviceCode: '',
        proAddress: ''
      },
      rightThreeInfos: {
        proCategory: '',
        positionInfo: '',
        estateName: ''
      },
      wId: ''
    }
  },
  created () {
    this.wId = this.$route.query.id
  },
  mounted () {
    const params = {}
    params.menuId = '8fe03d9d63fc41fa98670de6c5de98be'
    params.id = this.wId
    this.getInfo(params)
  },
  methods: {
    getInfo (params) {
      viewWithdrawRecord(params)
        .then(res => {
          this.leftInfos.nickName = res.result.info.nickName
          this.leftInfos.cellPhone = this.formatPhone(res.result.info.cellPhone)
          this.trueNum = res.result.info.cellPhone
          this.leftInfos.address = res.result.info.address
          this.leftInfos.balanceEnviron = res.result.info.balanceEnviron
          this.rightInfos.userRealName = res.result.info.userRealName
          this.rightInfos.cardNum = res.result.info.cardNum
          this.rightInfos.creditLine = res.result.info.creditLine
          this.rightInfos.environmental = res.result.info.environmental
          this.leftTwoInfos.orderId = res.result.info.orderId
          this.leftTwoInfos.operateDate = res.result.info.operateDate
          this.rightTwoInfos.state = Number(res.result.info.state) === 1 ? '失败' : Number(res.result.info.state) === 2 ? '成功' : ''
          this.rightTwoInfos.withdrawValue = res.result.info.withdrawValue
          this.leftThreeInfos.proName = res.result.info.proName
          this.leftThreeInfos.deviceCode = res.result.info.deviceCode
          this.leftThreeInfos.proAddress = res.result.info.proAddress
          this.rightThreeInfos.proCategory = res.result.info.proCategory
          if (res.result.info.la && res.result.info.lo) {
            this.rightThreeInfos.positionInfo = res.result.info.la + ',' + res.result.info.lo
          }
          this.rightThreeInfos.estateName = res.result.info.estateName
        })
    },
    formatPhone (val) {
      return val && val.length > 7 ? val.substr(0, 3) + '****' + val.substr(val.length - 4, 4) : val
    },
    showAllPhoneNum () {
      this.leftInfos.cellPhone = this.trueNum
      this.showpn = false
    },
    backPage () {
      this.$router.push({ path: '/order/delivery/withdrawRecord' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.withdrawDetails
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
  .showComplete
    color #2F90FF
    font-size 12px
    float right
    cursor pointer
  .bottomBtn
    margin 8px 0 24px 0
    text-align center
</style>

