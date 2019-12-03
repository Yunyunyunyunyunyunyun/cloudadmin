<template>
  <div class="homePage">
    <div class="homeHeader">
      <div class="lineHeader">
        <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573191689879e9e40b9c9f5b415a8c5ce1c5477c3b52.png">
      </div>
      <div class="mainHeader">
        <a-row>
          <a-col :span="12">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191107/15731230059270aeb040db9a64d8488a47de33858e9b8.png" class="lognHeight">
          </a-col>
          <a-col :span="12" align="right">
            <span class="rl"><icon-font type="icondianhua"></icon-font>&nbsp;&nbsp;电话咨询：&nbsp;025-69028970</span>
            <a-popover
              v-model="visible" placement="bottomRight" trigger="click"
              class="rc"
            >
              <template slot="content">
                <a-form :form="form" class="formMain" @submit="handleSubmit">
                  <a-form-item label="公司名称">
                    <a-input
                      v-decorator="[
                        'name',
                        {
                          rules: [{ required: true, message: '请填写公司全称' }],
                        },
                      ]"
                      placeholder="请输入公司全称"
                    />
                  </a-form-item>
                  <a-form-item label="公司简称">
                    <a-input
                      v-decorator="[
                        'abbreviation',
                        {
                          rules: [{ required: true, message: '请填写公司简称' }],
                        },
                      ]"
                      placeholder="请输入公司简称"
                    />
                  </a-form-item>
                  <a-form-item label="公司地址">
                    <a-input
                      v-decorator="[
                        'address',
                        {
                          rules: [{ required: true, message: '请填写公司详细地址' }],
                        },
                      ]"
                      placeholder="请输入公司详细地址"
                    />
                  </a-form-item>
                  <a-form-item label="联系人">
                    <a-input
                      v-decorator="[
                        'person',
                        {
                          rules: [{ required: true, message: '请填写联系人姓名' }],
                        },
                      ]"
                      placeholder="请输入联系人姓名"
                    />
                  </a-form-item>
                  <a-form-item label="手机号">
                    <a-input
                      v-decorator="[
                        'phone',
                        {
                          rules: [{ required: true, message: '请填写联系人手机号' }],
                        },
                      ]"
                      placeholder="请输入联系人手机号"
                    />
                  </a-form-item>
                  <a-button type="primary" html-type="submit">
                    我要体验
                  </a-button>
                </a-form>
              </template>
              <a-button type="primary">
                我要体验
              </a-button>
            </a-popover>
            <a-button type="primary" class="rr" @click="toLogin()">
              登录
            </a-button>
          </a-col>
        </a-row>
        <a-row class="homeMt">
          <a-col :span="24" align="right">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731916642394345b43260224e7789ba94ca859b2a09.png">
          </a-col>
        </a-row>
        <a-row class="headerContent">
          <a-col :span="6">
            <div class="commonTop">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731914844142886d37579634d89a7e234adc8091bcf.png">
            </div>
            <div class="commonMiddle">
              云服务能力
            </div>
            <div class="commonBottom">
              云服务平台提供专业、安全、开源的方式，更加便捷的守护环境
            </div>
          </a-col>
          <a-col :span="6">
            <div class="commonTop">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573191505736bb5a765867d34864870072be76305fab.png">
            </div>
            <div class="commonMiddle">
              BI数据能力
            </div>
            <div class="commonBottom">
              利用各种技术实现云数据实现图形可视化、场景化以及实时交互
            </div>
          </a-col>
          <a-col :span="6">
            <div class="commonTop">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731915321931e2731cd94484882b7118d85f2db393f.png">
            </div>
            <div class="commonMiddle">
              环境运维能力
            </div>
            <div class="commonBottom">
              为环境守护者解决垃圾分类清运便捷性、高效性和可追溯性
            </div>
          </a-col>
          <a-col :span="6">
            <div class="commonTop">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731915534609841fe1754b54c99bff2d6a074217485.png">
            </div>
            <div class="commonMiddle">
              开放能力
            </div>
            <div class="commonBottom">
              通过多维度的API公共接口，为社会、为政企开放
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="floatFont">
        <div class="fFont">
          用网络 + 公有云的方式
        </div>
        <div class="sFont">
          让 我 们 成 为 环 境 守 护 者
        </div>
      </div>
    </div>
    <div class="homeContent">
      <div class="title">
        高效、稳定的云产品服务
      </div>
      <div class="imgContent">
        <a-row class="comRow">
          <a-col :span="12" align="center">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731853587360b8ee976a6374bd9a18ddb1f5f35f4a5.png" class="imgLeft">
            <div class="imgRight">
              <div class="imgTop">
                云服务平台
              </div>
              <div class="imgMiddle">
                Cloud Service Platform
              </div>
              <div class="imgBottom">
                提供多项服务功能，满足对各类信息管理、订单管理和追溯查询
              </div>
            </div>
          </a-col>
          <a-col :span="12" align="center">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573185386849b97f1b64277e4ad7b5accfe2c7ff930c.png" class="imgLeft">
            <div class="imgRight">
              <div class="imgTop">
                BI数据系统
              </div>
              <div class="imgMiddle">
                BI Data System
              </div>
              <div class="imgBottom">
                支持多种聚合展示方式，聚合看图，满足各种场景下的监控数据可视化需求
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row class="comRow">
          <a-col :span="12" align="center">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731854088837b27e182fe0643bfa683d463a1c0d2bb.png" class="imgLeft">
            <div class="imgRight">
              <div class="imgTop">
                移动端运维办公
              </div>
              <div class="imgMiddle">
                Mobile operation and maintenance
              </div>
              <div class="imgBottom">
                让净化环境的设备支持自检，通过云端push给运维人员，运维人员实时收到预警消息前往运维
              </div>
            </div>
          </a-col>
          <a-col :span="12" align="center">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/157318543386833b9cf0fbfe247a591441cdb25720282.png" class="imgLeft">
            <div class="imgRight">
              <div class="imgTop">
                移动端回收
              </div>
              <div class="imgMiddle">
                Mobile Clear
              </div>
              <div class="imgBottom">
                让海量可回收垃圾加入到订单云库中，通过中央计算自动派单给回收人员进行抢单上门回收
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row class="comRow">
          <a-col :span="12" align="center">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573185453006729ab5384786416598b2f2b239a5580f.png" class="imgLeft">
            <div class="imgRight">
              <div class="imgTop">
                云存储数据
              </div>
              <div class="imgMiddle">
                Data Cloud Storage
              </div>
              <div class="imgBottom">
                提供海量存储空间，让垃圾数据、信息数据可以永久存储在云端，便于随时追溯
              </div>
            </div>
          </a-col>
          <a-col :span="12" align="center">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573185477502fa7b01ce11a84978a739a3c8e7790a07.png" class="imgLeft">
            <div class="imgRight">
              <div class="imgTop">
                API接口服务
              </div>
              <div class="imgMiddle">
                API Service
              </div>
              <div class="imgBottom">
                提供标准化封装API接口为政企输送加密数据，让数据流通起来，便于政企对环境做整改
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="title">
        成熟、领先的解决方案
      </div>
      <div class="secondTitle">
        针对不同的业务需求和应用场景，为您提供专业的解决方案
      </div>
      <a-row :gutter="20">
        <a-col :span="6">
          <div class="commonDiv commonBg1">
            <div class="topBorder"></div>
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731855107574c7b61076581436093a179ba9880b448.png" class="comImg">
            <div class="commonDesc">
              前端分类收集
            </div>
            <!-- <div class="showLight">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731916278734cf72bd6d82d400788baede3efe65540.png">
            </div> -->
          </div>
        </a-col>
        <a-col :span="6">
          <div class="commonDiv commonBg2">
            <div class="topBorder"></div>
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/157318553295931aa3d18d281428f9bc7a36ce3b6cbec.png" class="comImg">
            <div class="commonDesc">
              互联网平台化清运
            </div>
            <!-- <div class="showLight">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731916278734cf72bd6d82d400788baede3efe65540.png">
            </div> -->
          </div>
        </a-col>
        <a-col :span="6">
          <div class="commonDiv commonBg3">
            <div class="topBorder"></div>
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731913694073429559ab2414ef5beefc0c27d786c79.png" class="comImg">
            <div class="commonDesc">
              末端分拣处理
            </div>
            <!-- <div class="showLight">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731916278734cf72bd6d82d400788baede3efe65540.png">
            </div> -->
          </div>
        </a-col>
        <a-col :span="6">
          <div class="commonDiv commonBg4">
            <div class="topBorder"></div>
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731914177390b43b6929d6a40859e3fd9548b72ff32.png" class="comImg">
            <div class="commonDesc">
              大数据分析监管
            </div>
            <!-- <div class="showLight">
              <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731916278734cf72bd6d82d400788baede3efe65540.png">
            </div> -->
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="topFooter">
      <div class="mainFooter">
        <a-row class="firstContent">
          <a-col :span="6">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731754746609103325830134ecd9d1fcfbe62c2a667.png" class="comSrc">
            <span class="comFont">7*24 小时售后支持</span>
          </a-col>
          <a-col :span="6">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573175563145a7c210ed16ba498d8a25a8729eb3247a.png" class="comSrc">
            <span class="comFont">技术专家一对一服务</span>
          </a-col>
          <a-col :span="6">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573175322218394b1e63f08f4ff6ba03dd1a34fa5e89.png" class="comSrc">
            <span class="comFont">5 min快速响应</span>
          </a-col>
          <a-col :span="6">
            <img src="http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731755822789a4eb5094d514829b3d74fb268c08cea.png" class="comSrc">
            <span class="comFont">免费咨询服务</span>
          </a-col>
        </a-row>
        <a-row class="secondContent">
          <a-col :span="3" class="firstCol1">
            <div class="tit">
              推荐产品
            </div>
            <div class="con">
              <p>华展环境云电脑端</p>
              <p>华展环境云APP</p>
              <p>猫回收APP</p>
              <p>BI数据可视化系统</p>
              <p>猫先生APP</p>
            </div>
          </a-col>
          <a-col :span="3" class="firstCol2">
            <div class="tit">
              服务能力
            </div>
            <div class="con">
              <p>云服务能力</p>
              <p>BI数据能力</p>
              <p>环境运维能力</p>
              <p>开放能力</p>
            </div>
          </a-col>
          <a-col :span="3" class="firstCol1">
            <div class="tit">
              解决方案
            </div>
            <div class="con">
              <p>前端分类收集</p>
              <p>互联网平台化清运</p>
              <p>末端分拣处理</p>
              <p>大数据分析监管</p>
            </div>
          </a-col>
          <a-col :span="3" class="firstCol2">
            <div class="tit">
              支持
            </div>
            <div class="con">
              <p>API接口开放</p>
            </div>
          </a-col>
          <a-col :span="6" class="secondCol">
            <div class="tit">
              关于
            </div>
            <div class="con">
              <p><a href="http://www.adccb.cn/" target="_blank">江苏华展环境艺术股份有限公司</a></p>
              <p><a href="http://www.mymrmao.com/" target="_blank">南京猫先生环保科技有限公司</a></p>
            </div>
          </a-col>
          <a-col :span="6" class="secondCol">
            <div class="tit">
              <icon-font type="icondianhua"></icon-font>&nbsp;&nbsp;电话咨询：&nbsp;025-69028970
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="homeFooter">
      2019 版权所有 © 南京猫先生环保科技有限公司  苏ICP备19005644号
    </div>
  </div>
</template>
<script>
import { Icon } from 'ant-design-vue'
import { addCustomer } from '@/api/common'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_cd12n3nbvgd.js'
})
export default {
  name: 'HomePage',
  components: {
    IconFont
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'homePage' }),
      visible: false
    }
  },
  methods: {
    toLogin () {
      this.$router.push({ path: '/login' })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          let params = {}
          params = values
          params.cType = 5
          addCustomer(params).then(res => {
            this.$message.success('提交成功，我们会尽快与您联系！')
            this.visible = false
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .homePage
    min-width 1540px
    .homeHeader
      position relative
      height 750px
      background -webkit-linear-gradient(left,#678FF9,#6461F3)
      background -o-linear-gradient(right,#678FF9,#6461F3)
      background -moz-linear-gradient(right,#678FF9,#6461F3)
      background linear-gradient(to right,#678FF9,#6461F3)
      .mainHeader
        margin 0 240px
        padding-top 40px
        .lognHeight
          height 32px
        .homeMt
          margin-top 8px
        .rl
          color #fff
          font-size 16px
        .rc
          margin-left 32px
        .rr
          margin-left 16px
      .lineHeader
        position absolute
        bottom 0
        left 0
      .headerContent
        height 336px
        background-color #fff
        box-shadow 0px 10px 20px 0px rgba(205,216,227,0.5)
        margin-top 50px
        .commonTop
          height 60px
          line-height 62px
          margin 83px 62px 0
          text-align center
        .commonMiddle
          margin 20px 62px
          text-align center
          color #333
          font-size 16px
        .commonBottom
          margin 0 62px
          font-size 14px
          height 42px
          overflow auto
          color #666
      .floatFont
        position absolute
        left 240px
        top 225px
        .fFont
          font-size 44px
          font-weight 500
          color #fff
          margin-bottom 50px
        .sFont
          font-size 30px
          color #fff
    .homeContent
      margin 255px 240px 0
      .title
        font-size 36px
        font-weight 600
        color #000
        text-align center
      .secondTitle
        margin-top 20px
        margin-bottom 80px
        font-size 20px
        color #666
        text-align center
      .imgContent
        margin 100px 0px
        .comRow
          margin-bottom 100px
          .imgLeft
            vertical-align bottom
          .imgRight
            display inline-block
            margin-left 20px
            text-align left
            .imgTop
              font-size 16px
              font-weight 500
              color #333
            .imgMiddle
              font-size 14px
              color #666
              margin 4px 0
            .imgBottom
              font-size 14px
              color #666
              height 42px
              width 350px
              overflow auto
      .commonBg1
        background url(http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731851644722ae347f43e4e456584085ab47b486565.png) no-repeat
        background-size 100% 100%
      .commonBg2
        background url(http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/1573185241220e1a60a7510024928ba75628180c4b8ae.png) no-repeat
        background-size 100% 100%
      .commonBg3
        background url(http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731852768485577841948934272a43d45bc7ce0780d.png) no-repeat
        background-size 100% 100%
      .commonBg4
        background url(http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191108/15731853128896d548bfdaf494b5eb35ff5b872b2094a.png) no-repeat
        background-size 100% 100%
      .commonDiv
        width 100%
        height 320px
        text-align center
        margin-bottom 80px
        position relative
        cursor pointer
        border-radius 4px
        .topBorder
          width 100%
          height 4px
          background-color #005AE5
          border-radius 4px
        .showLight
          display none
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          img
            width 100%
            height 100%
        .commonDesc
          color #071025
          font-weight 500
          font-size 24px
        .comImg
          margin-top 60px
          margin-bottom 30px
      .commonDiv:hover
        .showLight
          display block
    .topFooter
      height 330px
      background-color #0A1633
      .mainFooter
        margin 0 240px
        .firstContent
          height 110px
          line-height 110px
          border-bottom 1px solid #141F3B
          .comSrc
            vertical-align middle
            margin-right 10px
            margin-top -6px
          .comFont
            font-size 16px
            color #fff
        .secondContent
          margin 20px 0
          .tit
            font-size 16px
            color #fff
            font-size 600
          .con
            margin-top  10px
            p, p a
              font-size 14px
              color #777
              margin-bottom 10px
              cursor pointer
            p:hover, a:hover
              color #fff
    .homeFooter
      height 80px
      line-height 80px
      background-color #071025
      font-size 14px
      color #777
      text-align center
</style>
<style lang="stylus">
.homePage
  .homeHeader
    .mainHeader
      .ant-btn-primary
        border-color #fff
        background-color #656BF4
        font-size 14px
      .formMain
        .ant-form-item
          margin-bottom 0
          .ant-input
            width 300px
        .ant-btn
          width 300px
          margin-top 10px
          margin-bottom 5px
          background-color #347DFF
</style>
