<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        <a-row>
          <a-col :span="10">
            审核看板
          </a-col>
          <a-col :span="14" align="right">
            <a-radio-group
              v-model="type" class="group-radio"
              @change="changeType"
            >
              <a-radio-button value="3">
                今日
              </a-radio-button>
              <a-radio-button value="2">
                最近7天
              </a-radio-button>
              <a-radio-button value="1">
                最近30天
              </a-radio-button>
            </a-radio-group>
            <a-range-picker
              v-model="showtime"
              class="mrl12"
              @change="changeTime"
            />
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-row class="panel-container" type="flex" justify="center">
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              总申请数
            </div>
            <div class="type-num">
              {{ boardData.total }}
            </div>
          </a-col>
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              待审核数
            </div>
            <div class="type-num">
              {{ boardData.pendingReview }}
            </div>
          </a-col>
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              已审核数
            </div>
            <div class="type-num">
              {{ boardData.passed }}
            </div>
          </a-col>
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              已审核拒绝
            </div>
            <div class="type-num">
              {{ boardData.rejected }}
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form ref="searchForm" :form="form">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="昵称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['userName']"
                  allow-clear placeholder="请输入会员昵称"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['cellPhone']"
                  allow-clear placeholder="请输入手机号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="提现审核状态"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['payState']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option :value="1">
                    待审核
                  </a-select-option>
                  <a-select-option :value="2">
                    已审核
                  </a-select-option>
                  <a-select-option :value="3">
                    已拒绝
                  </a-select-option>
                  <a-select-option :value="4">
                    打款失败
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="审核人"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['operator']"
                  allow-clear placeholder="请输入审核人姓名"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="申请时间"
                v-bind="formItemLayout"
              >
                <a-range-picker
                  v-model="applyTime"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="18" align="right">
              <a-button type="primary" class="mr8" @click="toSearch">
                查询
              </a-button>
              <a-button @click="resetForm">
                重置
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="card-container">
      <div class="card-title">
        <a-row>
          <a-col :span="12">
            提现申请列表
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :row-key="record => record.orderNo + Math.random() * 10"
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="pagination"
          :scroll="{x: 1500}"
          @change="handleTableChange"
        >
          <template slot="operate" slot-scope="text, record">
            <a-button
              v-if="record.payState != 4"
              class="table-btn-link" type="link" size="small"
              @click="toView(record)"
            >
              查看
            </a-button>
            <a-button
              v-if="record.payState == 1"
              class="table-btn-link" type="link" size="small"
              @click="toApply(record)"
            >
              审核
            </a-button>
            <a-button
              v-if="record.payState == 4"
              class="table-btn-link" type="link" size="small"
              @click="reexamine(record)"
            >
              重新审核
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {},
  data () {
    return {
      showtime: [moment(), moment()],
      type: '3',
      boardData: {
        total: 0,
        rejected: 0,
        pendingReview: 0,
        passed: 0
      },
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
      },
      applyTime: [],
      form: this.$form.createForm(this, { name: 'searchForm' }),
      columns: [
        {
          title: '提现订单号',
          dataIndex: 'orderNo'
        },
        {
          title: '会员昵称',
          dataIndex: 'userName'
        },
        {
          title: '手机号',
          dataIndex: 'cellPhone',
          customRender (val, row, index) {
            return val && val.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
          }
        },
        {
          title: '提现到账渠道',
          dataIndex: 'channel'
        },
        {
          title: '提现到账账号',
          dataIndex: 'moblie'
        },
        {
          title: '提现金额（元）',
          dataIndex: 'amount'
        },
        {
          title: '服务费（元）',
          dataIndex: 'serviceFee'
        },
        {
          title: '申请时间',
          dataIndex: 'createTime'
        },
        {
          title: '审核人',
          dataIndex: 'operator'
        },
        {
          title: '提现状态',
          dataIndex: 'payState',
          customRender (val, row, index) {
            if (val === '1') return '待审核'
            if (val === '2') return '已审核'
            if (val === '3') return '已拒绝'
            if (val === '4') return '打款失败'
          }
        },
        {
          title: '审核时间',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          fixed: 'right',
          width: 140,
          scopedSlots: { customRender: 'operate' }
        }
      ],
      data: [],
      loading: false,
      currentPage: 1,
      totalPage: 50,
      pagination: {
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => '共' + total + '条记录',
        pageSizeOptions: ['10', '20', '30', '40'],
        defaultPageSize: 10,
        pageSize: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.getBoardData()
    this.getTableData()
  },
  methods: {
    moment,
    getBoardData () {
      var param = {}
      param.menuId = 'dd21ec390ec04337a87ea6de656e6d44'
      if (this.type === '') {
        param.startTime = this.showtime[0].format('YYYY-MM-DD') + ' 00:00:00'
        param.endTime = this.showtime[0].format('YYYY-MM-DD') + ' 23:59:59'
      } else {
        param.type = this.type
      }
      this.$httpPost(this.$basePath.getStatistics, param)
        .then(res => {
          this.boardData = res.result || {
            total: 0,
            rejected: 0,
            pendingReview: 0,
            passed: 0
          }
        })
    },
    changeType () {
      if (this.type === '1') {
        this.showtime = [moment(), moment()]
      }
      if (this.type === '2') {
        const begin = new Date(new Date().getTime() - 86400000 * 6).setHours(0, 0, 0, 0)
        const end = new Date().getTime()
        this.showtime = [moment(begin), moment(end)]
      }
      if (this.type === '3') {
        const startDate = new Date(new Date().getTime() - 86400000 * 29).setHours(0, 0, 0, 0)
        const endDate = new Date().getTime()
        this.showtime = [moment(startDate), moment(endDate)]
      }
      this.getBoardData()
    },
    changeTime (value, dateString) {
      this.type = ''
      this.getBoardData()
    },
    onChange () {},
    toSearch () {
      this.pagination.current = 1
      this.getTableData()
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.getTableData()
    },
    getTableData () {
      var param = this.form.getFieldsValue()
      param.menuId = '7211bf3741ff4165b88fb496668c140c'
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      if (this.applyTime.length > 0) {
        param.startTime = this.applyTime[0].format('YYYY-MM-DD')
        param.endTime = this.applyTime[0].format('YYYY-MM-DD')
      }
      this.loading = true
      this.$httpPost(this.$basePath.postalList, param)
        .then(res => {
          this.loading = false
          this.data = res.result.list
          this.pagination.total = res.result.totalCount
        })
        .catch(() => {
          this.loading = false
        })
    },
    resetForm () {
      this.form.resetFields()
      this.applyTime = []
    },
    toExport () {},
    toView (record) {
      var isRecord = false
      if (record.payState === '2' || record.payState === '3') {
        isRecord = true
      } else {
        isRecord = false
      }
      this.$router.push({
        path: '/finance/MetranManage/cashoutApply/view',
        query: { info: JSON.stringify(record), isRecord: isRecord }
      })
    },
    toApply (record) {
      this.$router.push({
        path: '/finance/MetranManage/cashoutApply/apply',
        query: { info: JSON.stringify(record) }
      })
    },
    reexamine (record) {
      this.$router.push({
        path: '/finance/MetranManage/cashoutApply/apply',
        query: { info: JSON.stringify(record), refuse: true }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.mrl12
  margin-left 12px
.panel-container
  margin-top 8px
  margin-bottom 25px
.height-90
  height 90px
  .type-name
    color #666666
    font-size 12px
    margin-top 16px
  .type-num
    font-size 24px
    color #333333
    margin-top 8px
</style>
