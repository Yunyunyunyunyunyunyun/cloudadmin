<template>
  <div class="peopleAuditDetails">
    <div class="commonTitle">
      基础信息
    </div>
    <a-row>
      <a-col :span="12" class="commonCol">
        <a-row
          v-for="(item, index) in leftInfos" :key="index"
          class="commonHeight" :gutter="8"
        >
          <a-col :span="4" align="right">
            {{ index|titleFilter }}:
          </a-col>
          <a-col :span="20">
            <div class="commonLine">
              {{ item }}
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="12" class="commonCol">
        <a-row
          v-for="(item, index) in rightInfos" :key="index"
          class="commonHeight" :gutter="8"
        >
          <a-col :span="4" align="right">
            {{ mainTitle==='审核'&&index==='applyTime'?'提交':'' }}{{ index|titFilter }}:
          </a-col>
          <a-col :span="20">
            <div class="commonLine">
              {{ item }}
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div class="commonTitle">
      证件信息
    </div>
    <div v-if="mainTitle==='审核'" class="mt16 warnContent">
      <icon-font type="icongaojingtishi"></icon-font> 核验身份信息是否有误，是否人证一致
    </div>
    <a-row class="mt16 mb16">
      <a-col :span="2"></a-col>
      <a-col :span="22" class="commonCol">
        <img
          v-if="identityHold" :src="identityHold" class="commonImg"
          @click="showPicture(identityHold)"
        >
        <img
          v-if="identityFront" :src="identityFront" class="commonImg"
          @click="showPicture(identityFront)"
        >
        <img
          v-if="identityBack" :src="identityBack" class="commonImg"
          @click="showPicture(identityBack)"
        >
        <div v-if="!identityHold&&!identityFront&&!identityBack" class="viewPicture"></div>
      </a-col>
    </a-row>
    <span v-if="carObj.length>0">
      <div class="commonTitle">
        车辆信息
      </div>
      <a-row v-for="(item, index) in carObj" :key="index">
        <a-col :span="12" class="commonCol">
          <a-row class="commonHeight" :gutter="8">
            <a-col :span="4" align="right">
              车牌号:
            </a-col>
            <a-col :span="20">
              <div class="commonLine">
                {{ item.carNo }}
              </div>
            </a-col>
          </a-row>
          <a-row class="commonHeight" :gutter="8">
            <a-col :span="4" align="right">
              车辆类型:
            </a-col>
            <a-col :span="20">
              <div class="commonLine">
                {{ item.carType===1?'三轮车':item.carType===2?'小货车':item.carType===3?'中型货车':item.carType===4?'大型货车':'' }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="12" class="commonCol">
          <a-row class="commonHeight" :gutter="8">
            <a-col :span="4" align="right">
              车辆自重(kg):
            </a-col>
            <a-col :span="20">
              <div class="commonLine">
                {{ item.carWeight }}
              </div>
            </a-col>
          </a-row>
          <a-row class="commonHeight" :gutter="8">
            <a-col :span="4" align="right">
              车辆能源:
            </a-col>
            <a-col :span="20">
              <div class="commonLine">
                {{ item.energyType===1?'电能':item.energyType===2?'汽油':item.energyType===3?'柴油':item.energyType===4?'天然气':'' }}
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24" class="imgCol">
          <a-row class="imgHeight" :gutter="8">
            <a-col :span="2" align="right">
              行驶证照片:
            </a-col>
            <a-col :span="22">
              <div v-if="item.drivePhotoList.length===0" class="viewPicture"></div>
              <div v-else class="imgLine">
                <img
                  v-for="(tem,ndex) in item.drivePhotoList" :key="ndex" :src="tem"
                  class="carPhoto" @click="showPicture(tem)"
                >
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24" class="imgCol">
          <a-row class="imgHeight" :gutter="8">
            <a-col :span="2" align="right">
              车辆照片:
            </a-col>
            <a-col :span="22">
              <div v-if="item.carPhotoList.length===0" class="viewPicture"></div>
              <div v-else class="imgLine">
                <img
                  v-for="(tem,ndex) in item.carPhotoList" :key="ndex" :src="tem"
                  class="carPhoto" @click="showPicture(tem)"
                >
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </span>
    <div v-if="mainTitle==='查看'" class="commonTitle">
      审核记录
    </div>
    <a-table
      v-if="mainTitle==='查看'"
      :pagination="false"
      :row-key="record => record.id"
      :columns="auditColumns"
      :data-source="auditData"
      :scroll="{x: 1700, y: 300 }"
      class="mt16"
    >
      <template slot="auditStatus" slot-scope="auditStatus">
        <span>{{ auditStatus == 0?"待审核":"" }}</span>
        <span>{{ auditStatus == 1?"已通过":"" }}</span>
        <span>{{ auditStatus == 2?"已拒绝":"" }}</span>
      </template>
    </a-table>
    <a-row>
      <a-col v-if="mainTitle==='查看'" :span="24" class="bottomBtn">
        <a-button type="primary" @click="backPage()">
          返回
        </a-button>
      </a-col>
      <a-col v-else-if="mainTitle==='审核'" :span="24" class="bottomBtn">
        <a-button class="mr16" @click="backPage()">
          返回
        </a-button>
        <a-button class="mr16" @click="refuseApply()">
          拒绝申请
        </a-button>
        <a-button type="primary" @click="applyFor()">
          审核通过
        </a-button>
      </a-col>
    </a-row>
    <a-modal
      v-model="auditVisible" class="commonModal" @ok="auditModal" @cancel="auditVisible=false"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">是否确定{{ auditTitle }}</span>
        <a-form :form="auditForm" class="mt16">
          <a-form-item>
            <a-input
              v-decorator="['auditDesc', { rules: [{ required: true, message: '请输入审核意见' }] }]"
              placeholder="请输入审核意见（必填）" type="textarea" rows="3" maxlength="50"
            >
            </a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal v-model="picVisible" :footer="null">
      <img :src="picSrc">
    </a-modal>
  </div>
</template>
<script>
import { getUserDetails, auditDetails } from '@/api/takeBack'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_cd12n3nbvgd.js'
})
const auditColumns = [{
  title: '审核时间',
  key: 'auditTime',
  dataIndex: 'auditTime',
  width: 400
}, {
  title: '审核人',
  key: 'auditUser',
  dataIndex: 'auditUser',
  width: 400
}, {
  title: '审核类型',
  key: 'audit',
  dataIndex: 'audit',
  width: 400,
  scopedSlots: { customRender: 'auditStatus' }
}, {
  title: '备注',
  key: 'auditIdea',
  dataIndex: 'auditIdea',
  fixed: 'right',
  width: 500
}]
export default {
  name: 'PeopleAuditDetails',
  filters: {
    titleFilter: function (value) {
      switch (value) {
        case 'name':
          return '姓名'
        case 'phoneNum':
          return '手机号'
        case 'area':
          return '注册区域'
        case 'haveCar':
          return '有无车辆'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titFilter: function (value) {
      switch (value) {
        case 'applyTime':
          return '申请时间'
        case 'IDCardNum':
          return '身份证号'
        case 'address':
          return '详细地址'
        default:
          return '字段值异常，请检查后台数据'
      }
    }
  },
  components: {
    IconFont
  },
  data () {
    return {
      mainTitle: '',
      leftInfos: {
        name: '',
        phoneNum: '',
        area: '',
        haveCar: ''
      },
      rightInfos: {
        applyTime: '',
        IDCardNum: '',
        address: ''
      },
      auditColumns,
      auditData: [],
      carObj: [],
      identityHold: '',
      identityFront: '',
      identityBack: '',
      auditVisible: false,
      auditTitle: '',
      auditForm: this.$form.createForm(this, { name: 'auditForms' }),
      aId: '',
      picSrc: '',
      picVisible: false
    }
  },
  created () {
    this.mainTitle = this.$route.query.title
    this.aId = this.$route.query.id
  },
  mounted () {
    const params = {}
    params.menuId = '337c125e5ad4439b9dfb2f65b4a35770'
    params.id = this.aId
    this.getInfo(params)
  },
  methods: {
    getInfo (params) {
      getUserDetails(params)
        .then(res => {
          this.leftInfos.name = res.result.realName
          this.leftInfos.phoneNum = res.result.mobile
          if (res.result.provinceName && res.result.cityName && res.result.countyName) {
            this.leftInfos.area = res.result.provinceName + ' / ' + res.result.cityName + ' / ' + res.result.countyName
          }
          this.leftInfos.haveCar = res.result.carInfo === 0 ? '无车' : res.result.carInfo === 1 ? '有车' : ''
          this.rightInfos.applyTime = res.result.createTime
          this.rightInfos.IDCardNum = res.result.identity
          this.rightInfos.address = res.result.address
          this.auditData = res.result.recordList
          this.carObj = res.result.carList
          this.identityHold = res.result.identityHold
          this.identityFront = res.result.identityFront
          this.identityBack = res.result.identityBack
        })
    },
    backPage () {
      this.$router.push({ path: '/takeBack/peopleAuditList' })
    },
    showPicture (url) {
      this.picSrc = url
      this.picVisible = true
    },
    refuseApply () {
      this.auditVisible = true
      this.auditTitle = '拒绝申请'
      if (this.auditForm.getFieldValue('auditDesc')) {
        this.auditForm.setFieldsValue({
          auditDesc: ''
        })
      }
    },
    applyFor () {
      this.auditVisible = true
      this.auditTitle = '通过审核'
      if (this.auditForm.getFieldValue('auditDesc')) {
        this.auditForm.setFieldsValue({
          auditDesc: ''
        })
      }
    },
    auditModal (e) {
      e.preventDefault()
      this.auditForm.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.menuId = '1094ba6f2fcb462ab8ecdce21e48f978'
          params.recycleUserId = this.aId
          params.auditIdea = values.auditDesc
          if (this.auditTitle === '拒绝申请') {
            params.audit = 2
            auditDetails(params).then(res => {
              this.$message.success('拒绝申请成功！')
              this.auditVisible = false
              this.backPage()
            })
          } else if (this.auditTitle === '通过审核') {
            params.audit = 1
            auditDetails(params).then(res => {
              this.$message.success('通过审核成功！')
              this.auditVisible = false
              this.backPage()
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.peopleAuditDetails
  background-color #fff
  padding 16px 20px 0 20px
  margin-bottom 20px
  font-size 12px
  color #000
  .viewPicture
    width 104px
    height 104px
    background-color #fafafa
    border 1px dashed #d9d9d9
    border-radius 4px
  .viewPicture:hover
    border 1px dashed #1890FF
  .mr16
    margin-right 16px
  .mt16
    margin-top 16px
  .mb16
    margin-bottom 16px
  .commonTitle
    font-size 16px
    font-weight 600
    color #333
  .commonCol
    .commonHeight
      height 32px
      line-height 32px
      margin 16px 0
      .commonLine
        height 32px
        line-height 32px
        background-color #f2f2f2
        padding 0 11px
        color #333
    .commonImg
      height 90px
      margin-right 10px
      cursor pointer
  .imgCol
    .imgHeight
      margin-bottom 16px
      .imgLine
        .carPhoto
          height 90px
          margin-right 16px
  .card-content
    margin-top 16px
  .bottomBtn
    margin-top 40px
    margin-bottom 40px
    text-align center
  .warnContent
    color #333
    height 32px
    line-height 32px
    background-color #FEF6EA
.dlContent
  .dlIcon
    font-size 30px
  .dlTitle
    vertical-align text-bottom
    padding-left: 10px
    font-size: 16px
    color: #333
    font-weight: 500
  .mt16
    margin-top 16px
</style>
<style lang="stylus">
.peopleAuditDetails
  .bottomBtn
    .ant-btn
      border-radius 2px
      font-size 12px
      line-height normal
.commonModal
  .ant-modal-body
    padding-bottom 0px
  .ant-form-item
    margin-bottom 16px
  .ant-modal-footer
    padding 0 24px 20px 24px
  form textarea.ant-input, .ant-form-explain
    margin-left 40px
    width calc(100% - 40px)
</style>
