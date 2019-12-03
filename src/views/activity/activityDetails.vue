<template>
  <div class="activityDetails">
    <div class="commonTitle">
      活动信息
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
      活动照片
    </div>
    <a-row class="imgHeight" :gutter="8">
      <a-col :span="3" align="right">
        现场活动照片:
      </a-col>
      <a-col :span="21">
        <div v-if="activityPhotoList.length===0" class="viewPicture"></div>
        <div v-else class="imgLine">
          <img
            v-for="(item,index) in activityPhotoList" :key="index" :src="item"
            class="activityPhoto" @click="showPicture(item)"
          >
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="bottomBtn">
        <a-button type="primary" @click="backPage()">
          返回
        </a-button>
      </a-col>
    </a-row>
    <a-modal v-model="picVisible" :footer="null">
      <img :src="picSrc">
    </a-modal>
  </div>
</template>
<script>
import { getActivityDetails } from '@/api/activity'
export default {
  name: 'ActivityDetails',
  filters: {
    titleFilter: function (value) {
      switch (value) {
        case 'title':
          return '活动名称'
        case 'dateTime':
          return '活动开始时间'
        case 'peopleNum':
          return '参与人数'
        case 'createUser':
          return '活动创建人'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    titFilter: function (value) {
      switch (value) {
        case 'estateName':
          return '活动小区'
        case 'endTime':
          return '活动结束日期'
        case 'createTime':
          return '活动创建时间'
        case 'mobile':
          return '创建人手机号'
        default:
          return '字段值异常，请检查后台数据'
      }
    }
  },
  data () {
    return {
      leftInfos: {
        title: '',
        dateTime: '',
        peopleNum: '',
        createUser: ''
      },
      rightInfos: {
        estateName: '',
        endTime: '',
        createTime: '',
        mobile: ''
      },
      aId: '',
      activityPhotoList: [],
      picSrc: '',
      picVisible: false
    }
  },
  created () {
    this.aId = this.$route.query.id
  },
  mounted () {
    const params = {}
    params.menuId = '4113c2173c38423a8ee55b50aaa08324'
    params.id = this.aId
    this.getInfo(params)
  },
  methods: {
    getInfo (params) {
      getActivityDetails(params)
        .then(res => {
          this.leftInfos.title = res.result.activityInfo.title
          this.leftInfos.dateTime = res.result.activityInfo.dateTime
          this.leftInfos.peopleNum = res.result.activityInfo.peopleNum
          this.leftInfos.createUser = res.result.activityInfo.createUser
          this.rightInfos.estateName = res.result.activityInfo.estateName
          this.rightInfos.endTime = res.result.activityInfo.endTime
          this.rightInfos.createTime = res.result.activityInfo.createTime
          this.rightInfos.mobile = res.result.activityInfo.mobile
          this.activityPhotoList = res.result.activityImage
        })
    },
    showPicture (url) {
      this.picSrc = url
      this.picVisible = true
    },
    backPage () {
      this.$router.push({ path: '/activity/activityList' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.activityDetails
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
  .imgHeight
    margin 16px 0
    .imgLine
      .activityPhoto
        height 90px
        margin 0 16px 16px 0
  .viewPicture
    width 104px
    height 104px
    background-color #fafafa
    border 1px dashed #d9d9d9
    border-radius 4px
  .viewPicture:hover
    border 1px dashed #1890FF
  .bottomBtn
    margin 8px 0 24px 0
    text-align center
</style>
