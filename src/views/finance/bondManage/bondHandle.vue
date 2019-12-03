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
                label="姓名"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['realName']"
                  allow-clear placeholder="请输入姓名"
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
                  allow-clear placeholder="请输入手机号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6" align="right">
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
            保证金账户列表
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="data"
          :row-key="record => record.recycleUserId"
          :loading="loading"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <template slot="operate" slot-scope="text, record">
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="bandHandle(record)"
            >
              保证金处置
            </a-button>
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
          title: '姓名',
          dataIndex: 'realName'
        },
        {
          title: '人员账号',
          dataIndex: 'mobile'
        },
        {
          title: '入驻时间',
          dataIndex: 'createTime'
        },
        {
          title: '剩余保证金（元）',
          dataIndex: 'surplusDeposit'
        },
        {
          title: '累计扣减（元）',
          dataIndex: 'changeDeposit'
        },
        {
          title: '操作',
          key: 'operate',
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
      if (this.areas.length > 0) {
        this.area.provinceName = this.areas[0]
        this.area.cityName = this.areas[1]
        this.area.areaName = this.areas[2]
      } else {
        this.area = {}
      }
      var param = Object.assign(this.form.getFieldsValue(), this.area)
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      param.menuId = '7b4902b1982e47cf8aa8c6c230f6db0a'
      this.loading = true
      this.$httpPost(this.$basePath.bailDisposal, param)
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
    },
    toExport () {},
    bandHandle (record) {
      this.$router.push({
        path: '/finance/bondManage/bondHandle/handleDetail',
        query: { info: JSON.stringify(record) }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
