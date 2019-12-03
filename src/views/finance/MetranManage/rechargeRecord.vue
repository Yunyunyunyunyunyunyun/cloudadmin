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
                  v-decorator="['nickName']"
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
                label="充值渠道"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['payType']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option value="1">
                    支付宝
                  </a-select-option>
                  <a-select-option value="2">
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
                label="充值时间"
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
            充值列表
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
          :row-key="record => record.orderId + Math.random() * 10000"
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
          title: '充值订单号',
          dataIndex: 'orderId'
        },
        {
          title: '充值时间',
          dataIndex: 'payTime'
        },
        {
          title: '会员昵称',
          dataIndex: 'nickName'
        },
        {
          title: '手机号',
          dataIndex: 'cellPhone'
        },
        {
          title: '充值渠道',
          dataIndex: 'payType'
        },
        {
          title: '充值金额（元）',
          dataIndex: 'amount'
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
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      this.getArea(targetOption.id, targetOption.layer + 1, targetOption, true)
    },
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
      var param = {}
      param.queryParams = this.form.getFieldsValue()
      param.menuId = '3e060755e7214133a80b483c8092c5b2'
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      if (this.timeArr.length > 0) {
        param.queryParams.startTime = this.timeArr[0].format('YYYY-MM-DD')
        param.queryParams.endTime = this.timeArr[1].format('YYYY-MM-DD')
      }
      this.$httpPost(this.$basePath.findUserPayTradeList, param)
        .then(res => {
          this.loading = false
          this.data = res.result.data
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
      var param = {}
      param.queryParams = this.form.getFieldsValue()
      param.menuId = 'baca36d14914410fafdf5858d7e22890'
      if (this.timeArr.length > 0) {
        param.queryParams.startTime = this.timeArr[0].format('YYYY-MM-DD')
        param.queryParams.endTime = this.timeArr[1].format('YYYY-MM-DD')
      }
      this.toExportExcel(this.$basePath.exportUserPayTrade, param, '充值记录.xlsx')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
