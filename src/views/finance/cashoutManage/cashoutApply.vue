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
              <a-radio-button value="1">
                今日
              </a-radio-button>
              <a-radio-button value="2">
                最近7天
              </a-radio-button>
              <a-radio-button value="3">
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
            :span="4" class="height-90" type="flex"
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
            :span="4" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              待审核数
            </div>
            <div class="type-num">
              {{ boardData.auditing }}
            </div>
          </a-col>
          <a-col
            :span="4" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              已审核数
            </div>
            <div class="type-num">
              {{ boardData.audited }}
            </div>
          </a-col>
          <a-col
            :span="4" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              已打款数
            </div>
            <div class="type-num">
              {{ boardData.payed }}
            </div>
          </a-col>
          <a-col
            :span="4" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              已审核拒绝
            </div>
            <div class="type-num">
              {{ boardData.refuse }}
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
                label="姓名"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['userName']"
                  allow-clear placeholder="请输入姓名"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['phone']"
                  allow-clear placeholder="请输入手机号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="提现状态"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['status']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option :value="0">
                    待审核
                  </a-select-option>
                  <a-select-option :value="1">
                    已审核未打款
                  </a-select-option>
                  <a-select-option :value="2">
                    已审核已打款
                  </a-select-option>
                  <a-select-option :value="3">
                    已拒绝
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
                  v-decorator="['auditUserName']"
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
          :row-key="record => record.id"
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="pagination"
          :scroll="{x: 1500}"
          @change="handleTableChange"
        >
          <template slot="operate" slot-scope="text, record">
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toView(record)"
            >
              查看
            </a-button>
            <a-button
              v-if="record.status == 0"
              class="table-btn-link" type="link" size="small"
              @click="toApply(record)"
            >
              审核
            </a-button>
            <a-button
              v-if="record.status == 1"
              class="table-btn-link" type="link" size="small"
              @click="toMoney(record)"
            >
              确认打款
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
      title="打款确认" centered :visible="makemoneyObj.visible"
      @ok="makemoneyConfirm" @cancel="makemoneyObj.visible = false"
    >
      <a-form :form="makemoneyObj.form">
        <a-form-item
          label="打款单号"
          v-bind="makemoneyObj.formItemLayout"
        >
          <a-input
            v-decorator="['payOrder', { rules: [{ required: true, message: '请填写打款单号' }] }]"
            allow-clear placeholder="请填写打款单号"
          />
        </a-form-item>
        <a-form-item
          label="打款金额"
          v-bind="makemoneyObj.formItemLayout"
        >
          <a-input
            v-decorator="['payPrice', { rules: [{ required: true, message: '请填写打款金额' }] }]"
            allow-clear placeholder="请填写打款金额"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  components: {},
  data () {
    return {
      showtime: [moment(), moment()],
      type: '1',
      boardData: {
        total: 0,
        auditing: 0,
        audited: 0,
        payed: 0,
        refuse: 0
      },
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      applyTime: [],
      form: this.$form.createForm(this, { name: 'searchForm' }),
      columns: [
        {
          title: '提现订单号',
          dataIndex: 'orderId'
        },
        {
          title: '姓名',
          dataIndex: 'userName'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '提现到账渠道',
          dataIndex: 'channel'
        },
        {
          title: '提现到账账号',
          dataIndex: 'account'
        },
        {
          title: '提现金额（元）',
          dataIndex: 'auditPrice'
        },
        {
          title: '服务费（元）',
          dataIndex: 'fee'
        },
        {
          title: '申请时间',
          dataIndex: 'createTime',
          customRender (val, row, index) {
            if (val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        },
        {
          title: '审核人',
          dataIndex: 'auditUserName'
        },
        {
          title: '提现状态',
          dataIndex: 'status',
          customRender (val, row, index) {
            if (val === 0) return '待审核'
            if (val === 1) return '已审核未打款'
            if (val === 2) return '已审核已打款'
            if (val === 3) return '已拒绝'
          }
        },
        {
          title: '审核时间',
          dataIndex: 'auditTime',
          customRender (val, row, index) {
            if (val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        },
        {
          title: '操作',
          width: 140,
          fixed: 'right',
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
      },
      makemoneyObj: {
        visible: false,
        formItemLayout: {
          labelCol: { span: 5 },
          wrapperCol: { span: 15 }
        },
        form: this.$form.createForm(this, { name: 'moneyForm' })
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
      param.menuId = '74b46c6b32ad441b9a815ed525a34053'
      param.startTime = new Date(this.showtime[0].format('YYYY/MM/DD') + ' 00:00:00').getTime()
      param.endTime = new Date(this.showtime[1].format('YYYY/MM/DD') + ' 23:59:59').getTime()
      this.$httpPost(this.$basePath.auditTotal, param)
        .then(res => {
          this.boardData = res.result
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
      this.type = '4'
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
      param.menuId = '3ef3672e3322482ba3c7ed9fe4ae458b'
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      if (this.applyTime.length > 0) {
        param.startTime = new Date(this.applyTime[0].format('YYYY/MM/DD') + ' 00:00:00').getTime()
        param.endTime = new Date(this.applyTime[1].format('YYYY/MM/DD') + ' 00:00:00').getTime()
      }
      this.loading = true
      this.$httpPost(this.$basePath.auditList, param)
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
      this.$router.push({
        path: '/finance/cashoutManage/cashoutApply/view',
        query: { info: JSON.stringify(record) }
      })
    },
    toApply (record) {
      this.$router.push({
        path: '/finance/cashoutManage/cashoutApply/apply',
        query: { info: JSON.stringify(record) }
      })
    },
    toMoney (row) {
      this.makemoneyObj.visible = true
      this.makemoneyObj.form.resetFields()
      this.makemoneyObj.id = row.id
    },
    makemoneyConfirm () {
      this.makemoneyObj.form.validateFields(err => {
        if (!err) {
          var param = Object.assign(this.makemoneyObj.form.getFieldsValue(), {
            menuId: '71911244fb2e42dbb0b63bac17e6b5aa',
            id: this.makemoneyObj.id,
            status: 2
          })
          this.$httpPost(this.$basePath.payCashout, param)
            .then(res => {
              this.makemoneyObj.visible = false
              this.$message.success(res.msg)
              this.getTableData()
            })
        }
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
  &:not(:last-child)
    margin-right 15px
  .type-name
    color #666666
    font-size 12px
    margin-top 16px
  .type-num
    font-size 24px
    color #333333
    margin-top 8px
</style>
