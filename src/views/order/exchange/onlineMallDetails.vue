<template>
  <div class="onlineMallDetails">
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
              <span v-if="index==='phone'&&showpn&&item" class="showComplete" @click="showAllPhoneNum()">完整展示</span>
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
      兑换信息
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
import { viewOnlineMall } from '@/api/order'
export default {
  name: 'OnlineMallDetails',
  filters: {
    titleFilter: function (value) {
      switch (value) {
        case 'userName':
          return '昵称'
        case 'phone':
          return '手机号'
        case 'address':
          return '详细地址'
        case 'canUseEnviron':
          return '可用环保值'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titFilter: function (value) {
      switch (value) {
        case 'userRealName':
          return '姓名'
        case 'cardNumber':
          return 'IC卡号'
        case 'canUseCatCoin':
          return '可用余额'
        case 'allEnviron':
          return '累计环保值'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titleTwoFilter: function (value) {
      switch (value) {
        case 'orderNum':
          return '订单号'
        case 'giftName':
          return '商品名称'
        case 'unitPrice':
          return '商品价格'
        case 'exchangeNum':
          return '兑换数量'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titTwoFilter: function (value) {
      switch (value) {
        case 'exchangeTime':
          return '兑换时间'
        case 'businessName':
          return '商户名称'
        case 'giftType':
          return '商品类型'
        case 'usedCatCoin':
          return '付款金额'
        default:
          return '字段值异常，请检查后台数据'
      }
    }
  },
  data () {
    return {
      leftInfos: {
        userName: '',
        phone: '',
        address: '',
        canUseEnviron: ''
      },
      rightInfos: {
        userRealName: '',
        cardNumber: '',
        canUseCatCoin: '',
        allEnviron: ''
      },
      showpn: true,
      trueNum: '',
      leftTwoInfos: {
        orderNum: '',
        giftName: '',
        unitPrice: '',
        exchangeNum: ''
      },
      rightTwoInfos: {
        exchangeTime: '',
        businessName: '',
        giftType: '',
        usedCatCoin: ''
      },
      oId: ''
    }
  },
  created () {
    this.oId = this.$route.query.id
  },
  mounted () {
    const params = {}
    params.menuId = 'de065c73e8ed455c985f479d7d452257'
    params.id = this.oId
    this.getInfo(params)
  },
  methods: {
    getInfo (params) {
      viewOnlineMall(params)
        .then(res => {
          this.leftInfos.userName = res.result.userName
          this.leftInfos.phone = this.formatPhone(res.result.phone)
          this.trueNum = res.result.phone
          this.leftInfos.address = res.result.address
          this.leftInfos.canUseEnviron = res.result.canUseEnviron
          this.rightInfos.userRealName = res.result.userRealName
          this.rightInfos.cardNumber = res.result.cardNumber
          this.rightInfos.canUseCatCoin = res.result.canUseCatCoin
          this.rightInfos.allEnviron = res.result.allEnviron
          this.leftTwoInfos.orderNum = res.result.orderNum
          this.leftTwoInfos.giftName = res.result.giftName
          this.leftTwoInfos.unitPrice = res.result.unitPrice
          this.leftTwoInfos.exchangeNum = 1
          this.rightTwoInfos.exchangeTime = res.result.exchangeTime
          this.rightTwoInfos.businessName = '猫先生自营'
          this.rightTwoInfos.giftType = res.result.giftType
          this.rightTwoInfos.usedCatCoin = res.result.usedCatCoin
        })
    },
    formatPhone (val) {
      return val && val.length > 7 ? val.substr(0, 3) + '****' + val.substr(val.length - 4, 4) : val
    },
    showAllPhoneNum () {
      this.leftInfos.phone = this.trueNum
      this.showpn = false
    },
    backPage () {
      this.$router.push({ path: '/order/exchange/onlineMall' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.onlineMallDetails
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
