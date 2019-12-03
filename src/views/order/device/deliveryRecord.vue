<template>
  <div class="delivery">
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form :form="form">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="区域"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
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
                  placeholder="省市区"
                  @change="changeArea"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="订单号"
              >
                <a-input v-decorator="['orderId']" placeholder="请输入订单号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="手机号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-decorator="['mobile']" placeholder="请输入手机号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="IC卡号"
              >
                <a-input v-decorator="['IC']" placeholder="请输入IC卡号" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="投递小区"
              >
                <a-input
                  v-decorator="['community']"
                  placeholder="请输入投递小区"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="设备编号"
              >
                <a-input
                  v-decorator="['productId']"
                  placeholder="请输入设备编号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="下单时间"
              >
                <a-range-picker v-decorator="['createTime', rangeConfig]" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="设备类型"
              >
                <a-select
                  v-decorator="[
                    'deviceType',
                    {
                      initialValue: 2
                    }
                  ]"
                >
                  <a-select-option :value="2">
                    垃圾回收站
                  </a-select-option>
                  <a-select-option :value="1">
                    智能垃圾箱
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="投递品类"
              >
                <a-select
                  v-decorator="[
                    'categoryName',
                    {
                      initialValue: ''
                    }
                  ]"
                  show-search
                  :filter-option="filterOption"
                >
                  <a-select-option value="">
                    全部
                  </a-select-option>
                  <a-select-option v-for="item in categoryList" :key="item.dataValue">
                    {{ item.dataValue }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="18" align="right">
              <a-form-item>
                <a-button type="primary" class="mr8" @click="toSearch">
                  查询
                </a-button>
                <a-button @click="resetForm">
                  重置
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="card-container mrt16">
      <a-row>
        <a-col :span="12">
          <div class="card-title">
            投递列表
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
          :row-key="record => record.id"
          :scroll="{ x: 1500 }"
          @change="handleTableChange"
        >
          <template slot="scenario" slot-scope="record">
            <span>{{
              record.scenario === "1" ? "智能垃圾箱" : "垃圾回收站"
            }}</span>
          </template>
          <div slot="action" slot-scope="record" class="btn-list">
            <a-button
              class="table-btn-link"
              type="link"
              size="small"
              @click="showConfirm(record)"
            >
              违规
            </a-button>
            <a-button
              class="table-btn-link"
              type="link"
              size="small"
              @click="linkDetail(record)"
            >
              查看
            </a-button>
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getArea, getEstate, toExportExcel } from '@/components/mixins/mixins'
import { deliveryRecord, violation, category } from '@/api/order'
const columns = [
  {
    title: '订单号',
    dataIndex: 'orderId'
  },
  {
    title: '手机号',
    dataIndex: 'cellPhone'
  },
  {
    title: 'IC卡号',
    dataIndex: 'cardNum'
  },
  {
    title: '投递小区',
    dataIndex: 'estateName'
  },
  {
    title: '设备类型',
    dataIndex: '',
    key: 'scenario',
    scopedSlots: { customRender: 'scenario' }
  },
  {
    title: '设备编号',
    dataIndex: 'productId'
  },
  {
    title: '投递时间',
    dataIndex: 'createDate'
  },
  {
    title: '投递品类',
    dataIndex: 'dataValue'
  },
  {
    title: '重量（kg）',
    dataIndex: 'rubbishWeight'
  },
  {
    title: '新增余额',
    dataIndex: 'catCoin'
  },
  {
    title: '新增环保值',
    dataIndex: 'integralValue'
  },
  {
    title: '状态',
    dataIndex: 'status'
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [getArea, getEstate, toExportExcel],
  data () {
    return {
      loading: false,
      region: [],
      rangeConfig: {
        rules: [{ type: 'array' }]
      },
      columns,
      formData: [],
      categoryList: [],
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => '共' + total + '条记录',
        pageSizeOptions: ['10', '20', '30', '40'],
        defaultPageSize: 10,
        total: 0
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'filter_from' })
  },
  mounted: function () {
    this.load()
  },
  methods: {
    load () {
      this.getArea('', 2, null, true)
      this.getOrderList()
      this.getCategory()
    },
    getOrderList () {
      const data = this.form.getFieldsValue()
      const params = {
        menuId: '267d57173e2d4718b102843278787cb1',
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        provinceId: this.region[0] || '',
        cityId: this.region[1] || '',
        areaId: this.region[2] || '',
        orderId: data.orderId || '',
        cardNum: data.IC || '',
        estateName: data.community || '',
        startTime:
          (data.createTime && data.createTime[0].format('YYYY-MM-DD') + ' 00:00:00') || '',
        endTime:
          (data.createTime && data.createTime[1].format('YYYY-MM-DD') + ' 23:59:59') || '',
        userName: data.nickName || '',
        productId: data.productId || '',
        scenario: data.deviceType,
        cellPhone: data.mobile || '',
        categoryName: data.categoryName || ''
      }
      this.loading = true
      deliveryRecord(params).then(res => {
        this.loading = false
        const result = res.result
        this.formData = result.list
        this.pagination.total = result.totalCount
      })
    },
    getCategory () {
      category().then(res => {
        const result = res.result
        this.categoryList = result
      })
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      this.getOrderList()
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
    toSearch (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.pagination.current = 1
          this.getOrderList()
        }
      })
    },
    toExport () {
      const data = this.form.getFieldsValue()
      const params = {
        menuId: '267d57173e2d4718b102843278787cb1',
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        provinceId: this.region[0] || '',
        cityId: this.region[1] || '',
        areaId: this.region[2] || '',
        orderId: data.orderId || '',
        cardNum: data.IC || '',
        estateName: data.community || '',
        startTime:
          (data.createTime && data.createTime[0].format('YYYY-MM-DD') + ' 00:00:00') || '',
        endTime:
          (data.createTime && data.createTime[1].format('YYYY-MM-DD') + ' 23:59:59') || '',
        userName: data.nickName || '',
        productId: data.productId || '',
        scenario: data.deviceType,
        cellPhone: data.mobile || ''
      }
      this.toExportExcel('/data/export', params, '投递记录.xlsx')
    },
    showConfirm (item) {
      this.$confirm({
        title: '是否确定判定此次投递订单违规',
        centered: true,
        content: h => (
          <div>
            确定后将扣除用户余额并删除此投递订单，请慎重操作！若余额不足以扣减则此次操作失败，！
          </div>
        ),
        onOk: () => {
          violation(item.id).then(res => {
            this.$message.success('操作成功')
            this.getOrderList()
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    linkDetail (item) {
      this.$router.replace({
        path: '/order/delivery/recordDetail',
        query: {
          type: item.scenario,
          id: item.id
        }
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
//#
</style>
