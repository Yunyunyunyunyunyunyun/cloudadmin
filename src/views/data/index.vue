<template>
  <div class="data">
    <div class="nav">
      <div v-for="(item, index) in navList" :key="index" class="item">
        <div class="item-l">
          <a-avatar :size="52" icon="user" :src="item.imgSrc" />
        </div>
        <div class="item-r">
          <p>{{ item.title }}</p>
          <div>{{ item.num }}</div>
        </div>
      </div>
    </div>
    <!-- 今日数据 -->
    <div class="today-data">
      <div class="title">
        今日数据
      </div>
      <div class="list">
        <div class="item">
          <p>新增会员（个）</p>
          <div>200</div>
        </div>
        <div class="solid"></div>
        <div class="item">
          <p>投递总量（kg）</p>
          <div>6900</div>
        </div>
        <div class="solid"></div>
        <div class="item">
          <p>箱体称重总量（kg）</p>
          <div>1230</div>
        </div>
        <div class="solid"></div>
        <div class="item">
          <p>投递总价估值（元）</p>
          <div>1,330,000</div>
        </div>
        <div class="solid"></div>
        <div class="item">
          <p>投递转化环保值（个）</p>
          <div>700</div>
        </div>
      </div>
    </div>
    <!-- 投递统计 -->
    <div class="statistics">
      <div class="statistics-title">
        <div class="title">
          投递统计
        </div>
        <div class="statistics-title_l">
          <a-button-group>
            <a-button>今日</a-button>
            <a-button>最近7天</a-button>
            <a-button>最近30天</a-button>
            <a-button>总计</a-button>
          </a-button-group>
          <div style="width:8px;"></div>
          <a-range-picker @change="onChange" />
        </div>
      </div>
      <div class="statistics-content">
        <div class="statistics-content_l">
          <div class="table">
            <div class="table-header">
              <span>排名</span>
              <span>垃圾分类</span>
              <div>
                <span>投递总量（kg）</span>
                <div class="btn-icon">
                  <a-button
                    style="font-size:10px"
                    type="link" icon="arrow-up"
                  >
                  </a-button>
                  <a-button
                    style="font-size:10px"
                    type="link" icon="arrow-down"
                  >
                  </a-button>
                </div>
              </div>
              <div>
                <span>箱体称重总量（kg）</span>
              </div>
            </div>
            <div class="table-content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navList: [
        {
          title: '会员总数',
          imgSrc: 'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191018/1571382027654994f129ced7146549ee9a9d9b2e13179.png',
          num: 45686
        },
        {
          title: '设备总数',
          imgSrc: 'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191018/1571381655030dc84da338cf64f7da6af8266043166e2.png',
          num: 3456
        },
        {
          title: '小区总数',
          imgSrc: 'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191018/15713820686621f344d78dea84aeb879dc11fa09285b2.png',
          num: 3456
        },
        {
          title: '总计回收（kg）',
          imgSrc: 'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191018/157138195935602b7fd064830412eb1f44dccf3021bfb.png',
          num: '2,860,000'
        }
      ],
      deliveryData: [
        {
          key: 1,
          type: '纸品',
          totalDelivery: 1256,
          totalWeightBox: 234343
        },
        {
          key: 2,
          type: '塑料',
          totalDelivery: 12321,
          totalWeightBox: 234343
        },
        {
          key: 3,
          type: '混投',
          totalDelivery: 600,
          totalWeightBox: 234343
        },
        {
          key: 4,
          type: '有害',
          totalDelivery: 1000,
          totalWeightBox: 234343
        }, {
          key: 5,
          type: '金属',
          totalDelivery: 12056,
          totalWeightBox: 234343
        }, {
          key: 6,
          type: '金属 / 塑料 /纸品',
          totalDelivery: 125096,
          totalWeightBox: 234343
        },
        {
          key: 7,
          type: '纺织 / 混投',
          totalDelivery: 125096,
          totalWeightBox: 234343
        }
      ]
    }
  },
  methods: {
    onChange (date, dateString) {
      console.log(date, dateString)
    }
  }
}
</script>
<style lang="stylus">
.data
  .btn-icon
    .ant-btn
      padding 0
      height 16px
</style>
<style lang="stylus" scoped>
.data
  .title
    font-size 16px
    color #333
    font-weight 600
  .nav
    width 100%
    display flex
    justify-content space-between
    .item
      width 24%
      height 100px
      border-radius 4px
      display flex
      padding 24px 16px
      background-color #fff
    .item-r
      margin-left 16px
      p
        font-size 12px
        color #666666
      div
        font-size 24px
        font-weight 500
        color #000
  .today-data
    width 100%
    background-color #fff
    margin-top 16px
    padding 16px 20px
    box-sizing border-box
    .list
      width 100%
      margin-top 16px
      display flex
      align-items center
      .solid
        width 1px
        height 58px
        background-color #F2F2F2
      .item
        width 20%
        text-align center
        height 90px
        display flex
        flex-direction column
        align-items center
        justify-content center
        line-height 20px
        p
          font-size 12px
          color #666
        div
          font-size 24px
          color #000
          font-weight 500
  .statistics
    width 100%
    padding 16px 20px
    background-color #fff
    margin-top 16px
    .statistics-title
      width 100%
      display flex
      justify-content space-between
      align-items center
      .statistics-title_l
        display flex
    .statistics-content
      width 100%
      display flex
      margin-top 35px
      .statistics-content_l
        width 50%
        .table
          .table-header
            width 100%
            display flex
            font-size 12px
            justify-content space-between
            font-weight 500
            color #333
            align-items center
            div
              display flex
              align-items center
            .btn-icon
              display flex
              flex-direction column
</style>
