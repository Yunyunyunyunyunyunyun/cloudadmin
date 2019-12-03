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
                  v-decorator="['realName']"
                  allow-clear placeholder="请输入回收人员姓名"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="人员账号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['mobile']"
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
                    充值
                  </a-select-option>
                  <a-select-option value="1">
                    处罚
                  </a-select-option>
                  <a-select-option value="2">
                    撤销处罚
                  </a-select-option>
                  <a-select-option value="3">
                    退还
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
            保证金流水
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
          :scroll="{x: 1500}"
          @change="handleTableChange"
        >
          <template slot="remark" slot-scope="text">
            <div :title="text">
              {{ text.length > 10 ? text.substring(0, 10) + '...' : text }}
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
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
          dataIndex: 'createTime'
        },
        {
          title: '人员姓名',
          dataIndex: 'realName'
        },
        {
          title: '人员账号',
          dataIndex: 'mobile'
        },
        {
          title: '保证金变动（元）',
          dataIndex: 'changeDeposit',
          customRender (val, row, index) {
            if (row.type === 1 || row.type === 3) {
              return '-' + val
            } else {
              return '+' + val
            }
          }
        },
        {
          title: '剩余保证金（元）',
          dataIndex: 'surplusDeposit'
        },
        {
          title: '关联订单号',
          dataIndex: 'originOrderId'
        },
        {
          title: '变动类型',
          dataIndex: 'type',
          customRender (val, row, index) {
            if (val === 0) return '缴纳保证金'
            if (val === 1) return '处罚扣减'
            if (val === 2) return '撤销处罚'
            if (val === 3) return '退还保证金'
          }
        },
        {
          title: '操作人',
          dataIndex: 'createUser'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'remark' }
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
    this.getTableData()
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
      param.menuId = '972408328ed14560899df69f8c76ccb1'
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      if (this.timeArr.length > 0) {
        param.startTime = this.timeArr[0].format('YYYY-MM-DD')
        param.endTime = this.timeArr[1].format('YYYY-MM-DD')
      }
      this.$httpPost(this.$basePath.recordList, param)
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
      this.areas = []
      this.area = {}
    },
    toExport () {
      var param = Object.assign(this.form.getFieldsValue(), this.area)
      param.menuId = 'a54443639ed34b54847d94f1a42799d0'
      if (this.timeArr.length > 0) {
        param.startTime = this.timeArr[0].format('YYYY-MM-DD')
        param.endTime = this.timeArr[1].format('YYYY-MM-DD')
      }
      this.toExportExcel(this.$basePath.userBailExport, param, '保证金流水.xlsx')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
