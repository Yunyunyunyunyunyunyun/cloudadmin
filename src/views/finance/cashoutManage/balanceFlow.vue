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
                label="区域"
                v-bind="formItemLayout"
              >
                <a-cascader
                  v-model="areas"
                  :options="options"
                  :load-data="loadData"
                  change-on-select
                  :field-names="{
                    label: 'name',
                    value: 'name',
                    children: 'children'
                  }"
                  placeholder="省市区"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="人员姓名"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['userName']"
                  allow-clear placeholder="请输入人员姓名"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="人员账号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['phone']"
                  allow-clear placeholder="请输入回收人员手机号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="流水号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['orderId']"
                  allow-clear placeholder="请输入流水号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="变动类型"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['type']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option value="0">
                    结算
                  </a-select-option>
                  <a-select-option value="1">
                    提现
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="时间"
                v-bind="formItemLayout"
              >
                <a-range-picker
                  v-model="timeArr"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="12" align="right">
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
            余额流水
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
          :row-key="record => record.id"
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
import { getArea, toExportExcel } from '@/components/mixins/mixins.js'
export default {
  components: {},
  mixins: [getArea, toExportExcel],
  data () {
    return {
      timeArr: [],
      areas: [],
      area: {},
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      form: this.$form.createForm(this, {}),
      options: [],
      columns: [
        {
          title: '流水号',
          dataIndex: 'orderId'
        },
        {
          title: '时间',
          dataIndex: 'createTime',
          customRender (val, row, index) {
            if (val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        },
        {
          title: '人员姓名',
          dataIndex: 'userName'
        },
        {
          title: '人员账号',
          dataIndex: 'phone'
        },
        {
          title: '余额变动（元）',
          dataIndex: 'changeBalance'
        },
        {
          title: '服务费（元）',
          dataIndex: 'serverCharge'
        },
        {
          title: '账户可用余额（元）',
          dataIndex: 'balance'
        },
        {
          title: '余额变动类型',
          dataIndex: 'type',
          customRender (val, row, index) {
            if (val === 0) return '结算'
            if (val === 1) return '提现'
          }
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
    this.getArea('', 2, null, true)
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
      if (this.areas.length > 0) {
        this.area.provinceName = this.areas[0]
        this.area.cityName = this.areas[1]
        this.area.areaName = this.areas[2]
      } else {
        this.area = {}
      }
      var param = Object.assign(this.form.getFieldsValue(), this.area)
      param.menuId = '57fbc08d1eb744c79bb4e97c32041517'
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      if (this.timeArr.length > 0) {
        param.startTime = new Date(this.timeArr[0].format('YYYY/MM/DD') + ' 00:00:00').getTime()
        param.endTime = new Date(this.timeArr[1].format('YYYY/MM/DD') + ' 23:59:59').getTime()
      }
      this.$httpPost(this.$basePath.balanceRecordList, param)
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
      this.areas = []
      this.area = {}
      this.timeArr = []
    },
    toExport () {
      var param = Object.assign(this.form.getFieldsValue(), this.area)
      param.menuId = '41d9be8756734a8d9d788e5df462d15e'
      if (this.timeArr.length > 0) {
        param.startTime = new Date(this.timeArr[0].format('YYYY/MM/DD') + ' 00:00:00').getTime()
        param.endTime = new Date(this.timeArr[1].format('YYYY/MM/DD') + ' 23:59:59').getTime()
      }
      this.toExportExcel(this.$basePath.balanceRecordExport, param, '账户余额流水.xlsx')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
