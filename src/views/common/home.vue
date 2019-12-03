<template>
  <div class="home">
    <div class="home-up">
      <div class="home-up_l">
        <p>欢迎使用华展云服务平台 ！</p>
        <div class="avatar">
          <a-avatar :size="40" :src="userInfo.headPath" icon="user" />
          <div class="avatar-r">
            <p>{{ userInfo.userName||'' }}</p>
            <p>{{ userInfo.nickName || '' }}</p>
          </div>
        </div>
        <div class="left-text">
          <p>
            <span>账号有效期：</span>
            {{ userInfo.effectiveTime || '永久' }}
          </p>
          <p>
            <span>管理员工账号数：</span>
            {{ userInfo.userNum || 0 }}
          </p>
          <p>
            <span>管理设备量：</span>
            {{ userInfo.productNum || 0 }}
          </p>
        </div>
      </div>
      <div class="home-up_r">
        <div class="title">
          今日待办
        </div>
        <div class="list">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="item"
            @click="handleWaitClick(item)"
          >
            <a-avatar :size="52" :src="item.num?item.errorImgSrc:item.imgSrc" />
            <div class="item-r">
              <p :style="{'color':item.link&&item.num?'#2F97FA':'#666'}">
                {{ item.title }}
              </p>
              <p>{{ item.num }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 常用功能 -->
    <div class="home-center">
      <div class="home-center_title">
        <span class="title">常用功能</span>
        <a-button
          style="font-size:21px"
          type="link"
          icon="setting"
          @click="() => settingVisible = true"
        ></a-button>
      </div>
      <div v-if="featuresList.length" class="list">
        <div
          v-for="(item, index) in featuresList"
          :key="index"
          class="item"
          @click="handleFeaturesClick(item)"
        >
          <a-avatar shape="square" :size="58" :src="item.mIcon" />
          <p>{{ item.menuName }}</p>
        </div>
      </div>
      <div v-else class="no-data">
        <a-icon type="frown" style="font-size: 18px" />
        <span>暂未设置，请点击设置按钮进行添加常用功能</span>
      </div>
    </div>
    <div class="home-down">
      <div class="calendar">
        <div class="title">
          工作日历
        </div>
        <a-calendar
          :key="memoKey" ref="calendar" @select="onSelect"
          @change="handleCalendarChange"
        >
          <template slot="dateCellRender" slot-scope="value">
            <div v-if="getMemo(value)">
              <a-popover :title="value.format('YYYY-MM-DD 周dd')">
                <template slot="content">
                  <div class="memo-hover">
                    {{ getMemo(value) }}
                  </div>
                </template>
                <div class="memo">
                  {{ getMemo(value) }}
                </div>
              </a-popover>
            </div>
            <a-popover
              :placement="placement"
              :visible="value.format('YYYY-MM-DD')===currentMemoDate&&memoVisible"
              trigger="click"
            >
              <template slot="title">
                <div class="memo-title">
                  <span>{{ value.format('YYYY-MM-DD 周dd') }}</span>
                  <a-button
                    style="font-size:14px"
                    type="link"
                    icon="close"
                    @click.stop.prevent="() => memoVisible = false"
                  ></a-button>
                </div>
              </template>
              <template slot="content">
                <a-textarea
                  :ref="value.format('YYYY-MM-DD')"
                  placeholder="备忘录"
                  rows="3"
                  :value="memoValue"
                  @change="memoChange"
                />
                <div class="memo-btn">
                  <a-button type="link" size="small" @click="handleMemoSubmit(value)">
                    提交
                  </a-button>
                </div>
              </template>
            </a-popover>
          </template>
        </a-calendar>
      </div>
      <div class="home-down_r">
        <div>
          <div class="home-down_title">
            <div class="title">
              系统消息
            </div>
            <a-badge :status="messageNum?'error':'default'" :text="`未读（${messageNum}）`" />
          </div>
          <div class="list">
            <div
              v-for="(item, index) in messageList"
              :key="index"
              class="item"
              @click="handlePaginationClick(item)"
            >
              <div class="item-l">
                <img :src="item.titlePath" alt>
              </div>
              <div class="item-r">
                <div class="item-r_up">
                  {{ item.title }}
                </div>
                <div class="item-r_down">
                  <div>发布时间：{{ item.sendTime }}</div>
                  <a-badge
                    v-if="item.isRead===0"
                    count="NEW"
                    :number-style="{backgroundColor: '#FDE9EA',color: '#F22635',} "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="down-pagination">
          <span>共 {{ pagination.totalCount }} 条消息</span>
          <a-pagination
            :page-size="pagination.pageSize"
            :total="pagination.totalCount"
            @change="handlePaginationChange"
          />
        </div>
      </div>
    </div>
    <!-- 常用功能设置弹框 -->
    <a-modal
      v-model="settingVisible"
      title="设置"
      centered
      width="530px"
      class="home-modal"
      @ok="() => settingVisible = false"
    >
      <div v-if="transferData">
        <a-transfer
          :data-source="transferData"
          :target-keys="targetKeys"
          show-search
          :list-style="{
            width: '210px',
            height: '300px',
            margin: '0 4px'
          }"
          :render="item=>item.title"
          @change="handleTransferChange"
        ></a-transfer>
      </div>
      <template slot="footer" class="home-footer">
        <a-button @click="() => settingVisible = false">
          关闭
        </a-button>
        <a-button type="primary" @click="handleTransferFix">
          确定
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import {
  checkToken,
  userInfo,
  waitList,
  settingFeaturesList,
  featuresList,
  addFeatures,
  messageList,
  addMemo,
  memoList
} from '@/api/workBench'
import imgList from './modules'
export default {
  name: 'Home',
  data () {
    return {
      memoValue: '',
      placement: 'top',
      memoKey: 1,
      currentMemoDate: '',
      settingVisible: false,
      memoVisible: false,
      // 消息当前的页数
      currentPage: 1,
      // 今日待办
      transferData: [],
      targetKeys: [],
      // 常用功能
      featuresList: [],
      // 消息列表
      messageList: [],
      messageNum: 0,
      items: [
        // TODO 图床用的免费的为了稳定之后替换为自己服务器
        {
          title: '满溢告警',
          num: 0,
          link: '/device/operation/deviceMaintain?productStatus=2',
          imgSrc: 'https://s2.ax1x.com/2019/10/09/u5YctS.png',
          errorImgSrc: 'https://s2.ax1x.com/2019/10/09/u58rwT.png'
        },
        {
          title: '异常告警',
          num: 0,
          link: '/device/operation/deviceMaintain?productStatus=1',
          imgSrc: 'https://s2.ax1x.com/2019/10/09/u5tYBq.png',
          errorImgSrc: 'https://s2.ax1x.com/2019/10/09/u5t2E6.png'
        },
        {
          title: '缺币告警',
          num: 0,
          link: '/device/operation/deviceMaintain?productStatus=3',
          imgSrc: 'https://s2.ax1x.com/2019/10/09/u5wd1S.png',
          errorImgSrc: 'https://s2.ax1x.com/2019/10/09/u5wDmj.png'
        },
        {
          title: '待清运',
          num: 0,
          link: '',
          imgSrc: 'https://s2.ax1x.com/2019/10/09/u5ww6g.png',
          errorImgSrc: 'https://s2.ax1x.com/2019/10/09/u5w0XQ.png'
        },
        {
          title: '待日检',
          num: 0,
          link: '',
          imgSrc: 'https://s2.ax1x.com/2019/10/09/u5wr0s.png',
          errorImgSrc: 'https://s2.ax1x.com/2019/10/09/u5wap8.png'
        }
      ],
      // 备忘录的列表
      memoList: [],
      memoListVal: [],
      pagination: {
        current: 1,
        pageSize: 5,
        totalCount: 0
      },
      userInfo: {}
    }
  },
  watch: {
    memoListVal: function () {
      // 通过修改key强制重新渲染组件
      ++this.memoKey
    }
  },
  beforeRouteEnter (to, from, next) {
    checkToken().then(res => {
      next()
    })
  },
  mounted: function () {
    this.load()
  },
  methods: {
    load () {
      this.getUserInfo()
      this.getWaitList()
      this.getFeaturesList()
      this.getSettingFeaturesList()
      this.getMessageList()
      this.getMemoList()
    },
    getUserInfo () {
      userInfo().then(res => {
        this.userInfo = res.result
      })
    },
    // 代办事项
    getWaitList () {
      waitList().then(res => {
        const { overFlow, abnormal, userSign, noMoney, clearance } = res.result
        this.items[0].num = overFlow
        this.items[1].num = abnormal
        this.items[2].num = noMoney
        this.items[3].num = clearance
        this.items[4].num = userSign
      })
    },
    // 获取常用功能列表
    getFeaturesList () {
      featuresList().then(res => {
        const result = res.result
        for (let i = 0; i < result.length; i++) {
          if (result[i].isSelect) {
            this.targetKeys.push(result[i].id)
          }
          if (result[i].aliasName !== '系统消息') {
            const obj = {
              key: result[i].id,
              title: result[i].aliasName,
              routeUrl: result[i].routeUrl
            }
            this.transferData.push(obj)
          }
        }
      })
    },
    // 获取设置后的常用功能
    getSettingFeaturesList () {
      settingFeaturesList().then(res => {
        this.featuresList = res.result
      })
    },
    getMessageList () {
      const params = {
        page: this.pagination.page,
        pageSize: this.pagination.pageSize
      }
      messageList(params).then(res => {
        const result = res.result
        this.messageList = result.list
        this.messageNum = result.messageNum
        this.pagination.totalCount = result.totalCount
      })
    },
    getMemoList (date) {
      const params = {
        dateTime: date || moment().format('YYYY-MM')
      }
      memoList(params).then(res => {
        this.memoList = res.result
      })
    },
    onSelect (value) {
      this.memoVisible = true
      this.currentMemoDate = value.format('YYYY-MM-DD')
      this.memoValue = this.getMemo(value)
      if (value.weekday() === 0) {
        this.placement = 'right'
      } else if (this.memoValue) {
        this.placement = 'bottom'
      } else {
        this.placement = 'top'
      }
    },
    memoChange (e) {
      this.memoValue = e.target.value
    },
    // 获取工作日志里面的备忘录
    getMemo (value) {
      let memo
      for (let i = 0; i < this.memoList.length; i++) {
        if (value.format('YYYY-MM-DD') === this.memoList[i].dateTime) {
          memo = this.memoList[i].content
        }
      }
      return memo || ''
    },
    handleMemoSubmit (value) {
      if (!this.memoValue) {
        this.$message.error('抱歉您什么都没有填写')
        return false
      }
      this.memoVisible = false
      const _item = this.memoList.find(
        item => item.dateTime === value.format('YYYY-MM-DD')
      )
      const params = {
        content: this.memoValue,
        dateTime: value.format('YYYY-MM-DD')
      }
      if (_item) {
        Object.assign(params, {
          id: _item.id
        })
      }
      addMemo(params).then(res => {
        this.getMemoList()
      })
      this.memoListVal.push(params)
    },
    handleTransferChange (targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys
    },
    handleTransferFix () {
      if (!this.targetKeys.length || this.targetKeys.length > 8) {
        const msg = this.targetKeys.length ? '抱歉您只能选中8个常用功能' : '抱歉您还暂未选择常用功能哦'
        this.$message.error(msg)
        return false
      }
      this.settingVisible = false
      const list = []
      for (let i = 0; i < this.targetKeys.length; i++) {
        const _item = this.transferData.find(
          item => item.key === this.targetKeys[i]
        )
        const imgItem = imgList.find(item => item.routeUrl === _item.routeUrl)
        const obj = {
          menuId: _item.key,
          menuName: _item.title,
          mIcon: (imgItem && imgItem.imgSrc) || '',
          routeUrl: _item.routeUrl,
          sort: '',
          mUrl: ''
        }
        list.push(obj)
      }
      const params = {
        commonList: list
      }
      addFeatures(params).then(res => {
        this.getSettingFeaturesList()
      })
    },
    handleWaitClick (item) {
      item.link && item.num && this.$router.replace({ path: item.link })
    },
    handleFeaturesClick (item) {
      item.routeUrl && this.$router.replace({ path: item.routeUrl })
    },
    handlePaginationClick (item) {
      this.$router.replace({ path: '/home/msg', query: { id: item.id }})
    },
    handlePaginationChange (page) {
      this.pagination.page = page
      this.getMessageList()
    },
    handleCalendarChange (value) {
      this.getMemoList(value.format('YYYY-MM'))
    }
  }
}
</script>
<style lang="stylus">
.ant-transfer-list-body-not-found
  .no-data
    span
      margin-left 4px
.ant-modal-footer
  padding-top:0px
  padding-bottom 24px
.memo-hover
  width 200px
  word-wrap break-word
.memo-btn
  padding-top 5px
  text-align center
  box-sizing border-box
.memo-title
  width 100%
  display flex
  justify-content space-between
  align-items center
  .ant-btn
    padding 0
.home
  .ant-fullcalendar-fullscreen .ant-fullcalendar-month, .ant-fullcalendar-fullscreen .ant-fullcalendar-date
    height 100px
  .ant-badge-status-dot
    width 4px
    height 4px
  .ant-badge-status-text
    font-size 12px
    color #999999
    margin-left 4px
  .home-down
    .ant-radio-group-default
      display none
</style>
<style lang="stylus" scoped>
.hidden
  overflow hidden
.home
  width 100%
  .home-up
    width 100%
    display flex
    .home-up_l
      width 30%
      background-color #ffffff
      padding 16px 20px
      box-sizing border-box
      height 246px
      >p
        font-size 16px
        color rgba(0,0,0,0.85)
      .avatar
        display flex
        .avatar-r
          font-size 12px
          color #666
          margin-left 9px
          line-height 10px
          padding-top 6px
      .left-text
        margin-top 5px
        border-top 1px solid #E8E8E8
        line-height 16px
        padding-top 16px
        box-sizing border-box
        color #666666
        span
          color rgba(0,0,0,0.85)
    .home-up_r
      flex 1
      margin-left 16px
      background-color #fff
      padding 16px 20px
      box-sizing border-box
      .list
        width 100%
        padding 0 16px
        box-sizing border-box
        display flex;
        flex-wrap wrap
        margin-top 18px
        .item
          width 33.33%
          display flex
          margin-bottom 20px
          cursor pointer
          .item-r
            line-height 16px
            margin-left 16px
            font-size 12px
            color #666666
            p:last-child
              font-size 22px
              color #000
              font-weight 600
  .home-center
    width 100%
    height 163px
    padding 16px 20px
    box-sizing border-box
    background-color #fff
    margin-top 18px
    .home-center_title
     display flex
     justify-content space-between
    .list
      width 100%
      display flex
      padding 0 12px
      box-sizing border-box
      margin-top 17px
      cursor pointer
      .item
        text-align center
        margin-right 64px
        p
          font-size 12px
          color #000
          margin-top 5px
  .home-down
    height 715px
    margin-top 16px
    display flex
    .calendar
      width 60%
      padding 5px 0
      box-sizing border-box
      background-color #fff
      position relative
      .title
        position absolute
        left 20px
        top 16px
      .memo
        width 100%
        font-size  12px
        color  #333
        overflow  hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 3
        -webkit-box-orient vertical
    .home-down_r
      flex 1
      margin-left 16px
      height 100%
      background-color #fff
      padding 0 20px
      display flex
      flex-direction column
      justify-content space-between
      .home-down_title
        width 100%
        display flex
        justify-content space-between
        padding 16px 0
        border-bottom 1px solid #F2F2F2
      .item
        width 100%
        padding 20px 0
        box-sizing border-box
        display flex
        border-bottom 1px solid #F2F2F2
        .item-l
          border-radius 2px
          overflow hidden
          margin-right 16px
          img
            width 120px
            height 77px
        .item-r
          flex 1
          height 77px
          display flex
          flex-direction column
          justify-content space-between
          .item-r_up
            font-weight 500
            font-size 16px
            color #000
          .item-r_down
            width 100%
            display flex
            justify-content space-between
            font-size 12px
            color #999
      .down-pagination
        width 100%
        display flex
        padding 16px 0
        justify-content space-between
        align-items center
        border-top 1px solid #F2F2F2
        span
          font-size 12px
          color #333
</style>
