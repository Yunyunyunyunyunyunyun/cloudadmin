<template>
  <div>
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
                  v-decorator="['nickname']"
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
                  v-decorator="['phone']"
                  allow-clear placeholder="请输入手机号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="到账渠道"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['channel']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option value="支付宝">
                    支付宝
                  </a-select-option>
                  <a-select-option value="微信">
                    微信
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="订单号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['orderId']"
                  allow-clear placeholder="请输入提现订单号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="提现完成时间"
                v-bind="formItemLayout"
              >
                <a-range-picker
                  v-model="timeArr"
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
          <a-col :span="12" align="right">
            <a-button @click="toExport">
              导出
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="data"
          :row-key="record => record.phone + Math.random() * 100"
          :loading="loading"
          :pagination="pagination"
          @change="handleTableChange"
        >
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { toExportExcel } from '@/components/mixins/mixins.js'
export default {
  components: {},
  mixins: [toExportExcel],
  data () {
    return {
      timeArr: [],
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, {}),
      options: [],
      columns: [
        {
          title: '提现订单号',
          dataIndex: 'orderId'
        },
        {
          title: '提现完成时间',
          dataIndex: 'finishTime',
          customRender (val, row, index) {
            if (val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        },
        {
          title: '会员昵称',
          dataIndex: 'nickname'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          customRender (val, row, index) {
            if (val) {
              return val.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
            }
          }
        },
        {
          title: '提现到账渠道',
          dataIndex: 'channel'
        },
        // {
        //   title: '提现到账账号',
        //   dataIndex: 'account'
        // },
        {
          title: '提现金额（元）',
          dataIndex: 'price'
        },
        {
          title: '服务费（元）',
          dataIndex: 'fee'
        }
      ],
      data: [],
      loading: false,
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
  computed: {
  },
  mounted () {
    this.toSearch()
  },
  methods: {
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
      this.loading = true
      var param = this.form.getFieldsValue()
      param.menuId = '02a7eddbf6dd40baa38615dd7d5151be'
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      if (this.timeArr.length > 0) {
        param.startTime = new Date(this.timeArr[0].format('YYYY/MM/DD') + ' 00:00:00').getTime()
        param.endTime = new Date(this.timeArr[1].format('YYYY/MM/DD') + ' 23:59:59').getTime()
      }
      this.$httpPost(this.$basePath.withdrawList, param)
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
      this.timeArr = []
    },
    toExport () {
      var param = this.form.getFieldsValue()
      param.menuId = '02a7eddbf6dd40baa38615dd7d5151be'
      if (this.timeArr.length > 0) {
        param.startTime = new Date(this.timeArr[0].format('YYYY/MM/DD') + ' 00:00:00').getTime()
        param.endTime = new Date(this.timeArr[1].format('YYYY/MM/DD') + ' 23:59:59').getTime()
      }
      this.toExportExcel(this.$basePath.withdrawExport, param, '提现记录.xlsx')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
