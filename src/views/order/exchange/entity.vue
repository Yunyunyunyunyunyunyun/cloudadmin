<template>
  <div class="entity">
    <div class="card-container">
      <div class="card-title">
        <a-row>
          <a-col :span="12">
            兑换列表
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-form ref="searchForm" :form="form">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item label="区域" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-cascader
                  v-model="region"
                  :load-data="loadData"
                  :options="options"
                  change-on-select
                  :field-names="{
                    label: 'name',
                    value: 'id',
                    children: 'children'
                  }"
                  placeholder="省市区、街道"
                  @change="changeArea"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="手机号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['mobile']" allow-clear placeholder="请输入手机号或设备型号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="IC卡号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['IC']" allow-clear placeholder="请输入用户IC卡号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="用户昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['nickName']" allow-clear placeholder="请输入用户昵称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="订单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['orderId']" allow-clear placeholder="请输入订单号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="商户名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['merchant']" allow-clear placeholder="请输入商户名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="下单时间">
                <a-range-picker v-decorator="['createTime', rangeConfig]" />
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
    <div class="card-container mrt16">
      <a-row>
        <a-col :span="12">
          <div class="card-title">
            兑换列表
          </div>
        </a-col>
        <a-col :span="12" align="right">
          <a-button @click="toExport">
            导出
          </a-button>
        </a-col>
      </a-row>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="formData"
          :loading="loading"
          :pagination="pagination"
          :row-key="record => record.orderNum"
          @change="handleTableChange"
        >
          <template slot="action" slot-scope="record" class="btn-list">
            <a-button
              class="table-btn-link" type="link" :size="'small'"
              @click="linkDetail(record)"
            >
              查看
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getArea, getEstate, toExportExcel } from '@/components/mixins/mixins'
import { exchangeList } from '@/api/order'
const columns = [
  {
    title: '订单号',
    dataIndex: 'orderNum'
  },
  {
    title: '商品名称',
    dataIndex: 'businessName'
  },
  {
    title: '用户昵称',
    dataIndex: 'userName'
  },
  {
    title: '兑换手机号',
    dataIndex: 'phone'
  },
  {
    title: 'IC卡号',
    dataIndex: 'cardNumber'
  },
  {
    title: '使用金额',
    dataIndex: 'usedCatCoin'
  },
  {
    title: '使用环保值',
    dataIndex: 'usedEnviron'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [getArea, getEstate, toExportExcel],
  data () {
    return {
      visible: false,
      confirmLoading: false,
      loading: false,
      columns,
      region: [],
      rangeConfig: {
        rules: [{ type: 'array' }]
      },
      formData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => '共' + total + '条记录',
        pageSizeOptions: ['10', '20', '30', '40'],
        defaultPageSize: 10,
        total: 0
      },
      form: this.$form.createForm(this, { name: 'filter_from' })
    }
  },
  mounted: function () {
    this.load()
  },
  methods: {
    load () {
      this.getArea('', 2, null, true)
      this.getOrderList()
    },
    getOrderList () {
      const data = this.form.getFieldsValue()
      const params = {
        menuId: '21325ba0bf8a4d38bc0fe616e3fb473d',
        pageNo: this.pagination.current,
        pageSize: this.pagination.pageSize,
        provinceId: this.region[0] || '',
        cityId: this.region[1] || '',
        areaId: this.region[2] || '',
        orderNum: data.orderId || '',
        cardNumber: data.IC || '',
        startTime:
            (data.createTime && data.createTime.length && data.createTime[0].format('YYYY-MM-DD')) || '',
        endTime:
            (data.createTime && data.createTime.length && data.createTime[1].format('YYYY-MM-DD')) || '',
        userName: data.nickName || '',
        businessName: data.merchant || '',
        phone: data.mobile || ''
      }
      this.loading = true
      exchangeList(params).then(res => {
        const result = res.result
        this.formData = result.list
        this.loading = false
        this.pagination.total = result.total
      })
    },
    changeArea (areasId) {
      this.estateList = []
      this.form.setFieldsValue({ estateId: undefined })
      if (areasId.length < 4) {
        this.getEstate(areasId)
      } else if (areasId.length === 4) {
        this.getEstate(null, areasId[3])
      }
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      this.getArea(targetOption.id, targetOption.layer + 1, targetOption, true)
    },
    resetForm () {
      this.region = []
      this.form.resetFields()
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      this.getOrderList()
    },
    toExport () {
      const data = this.form.getFieldsValue()
      const params = {
        provinceId: this.region[0] || '',
        cityId: this.region[1] || '',
        areaId: this.region[2] || '',
        orderNum: data.orderId || '',
        cardNumber: data.IC || '',
        startTime:
            (data.createTime && data.createTime.length && data.createTime[0].format('YYYY-MM-DD')) || '',
        endTime:
            (data.createTime && data.createTime.length && data.createTime[1].format('YYYY-MM-DD')) || '',
        userName: data.nickName || '',
        businessName: data.merchant || '',
        phone: data.mobile || ''
      }
      this.toExportExcel('/physicalStore/exportExchangeList', params, '兑换记录.xlsx')
    },
    toSearch (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.pagination.current = 1
          this.getOrderList()
        }
      })
    },
    linkDetail (item) {
      this.$router.replace({ path: '/order/exchange/entityDetail', query: {
        id: item.id
      }})
    }
  }
}
</script>
<style lang="stylus" scoped>
//
</style>
