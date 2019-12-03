<template>
  <div class="machineList">
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="区域"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-cascader
                  v-model="areaContain"
                  :options="options"
                  :load-data="loadData"
                  :field-names="{
                    label: 'name',
                    value: 'id',
                    children: 'children'
                  }"
                  placeholder="省市区"
                  change-on-select
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="手机号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="phoneNum" allow-clear placeholder="请输入手机号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="用户昵称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="nickName" allow-clear placeholder="请输入用户昵称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="订单时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-range-picker
                  v-model="orderDate"
                  class="w100"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="订单号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="orderNum" allow-clear placeholder="请输入订单号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="是否足额付款"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="isFullPayment"
                  placeholder="请选择是否足额付款"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="item in isFullPayments" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="商品名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="shopName" allow-clear placeholder="请输入商品名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6" align="right">
              <a-button type="primary" class="mr8" @click="toSearch">
                查询
              </a-button>
              <a-button @click="resetTable">
                重置
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="bottomContent">
      <div class="mb20">
        <a-row>
          <a-col :span="12" class="title">
            取币列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button @click="toExport">
              导出
            </a-button>
          </a-col>
        </a-row>
      </div>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :row-key="record => record.id"
        :loading="loading"
        class="table-content"
        @change="handleTableChange"
      >
        <template slot="giftName" slot-scope="text">
          <span v-if="text" :title="text">{{ text.length > 10 ? text.slice(0, 10) + "..." : text }}</span>
        </template>
        <template slot="fullPayment" slot-scope="fullPayment">
          <span>{{ fullPayment == 0?"否":"" }}</span>
          <span>{{ fullPayment == 1?"是":"" }}</span>
        </template>
        <template slot="phone" slot-scope="phone">
          <span>{{ formatPhone(phone) }}</span>
        </template>
        <template slot="operate" slot-scope="text">
          <a-button type="link" size="small" @click="view(text)">
            查看
          </a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { getAreaList } from '@/api/common'
import { getMachineList } from '@/api/order'
import { toExportExcel } from '@/components/mixins/mixins.js'
const columns = [{
  title: '订单号',
  key: 'orderNum',
  dataIndex: 'orderNum'
}, {
  title: '商品名称',
  key: 'giftName',
  dataIndex: 'giftName',
  scopedSlots: { customRender: 'giftName' }
}, {
  title: '付款总金额（元）',
  key: 'usedCatCoin',
  dataIndex: 'usedCatCoin'
}, {
  title: '是否足额付款',
  key: 'fullPayment',
  dataIndex: 'fullPayment',
  scopedSlots: { customRender: 'fullPayment' }
}, {
  title: '欠款金额（元）',
  key: 'debts',
  dataIndex: 'debts'
}, {
  title: '用户昵称',
  key: 'userName',
  dataIndex: 'userName'
}, {
  title: '兑换手机号',
  key: 'phone',
  dataIndex: 'phone',
  scopedSlots: { customRender: 'phone' }
}, {
  title: '兑换时间',
  key: 'exchangeTime',
  dataIndex: 'exchangeTime'
}, {
  title: '操作',
  key: 'operate',
  width: 150,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'MachineList',
  mixins: [toExportExcel],
  data () {
    return {
      areaContain: [],
      options: [],
      orderDate: [],
      orderNum: '',
      phoneNum: '',
      nickName: '',
      isFullPayments: [
        {
          id: '全部',
          name: '全部'
        },
        {
          id: 0,
          name: '否'
        },
        {
          id: 1,
          name: '是'
        }
      ],
      isFullPayment: '全部',
      shopName: '',
      columns,
      tableData: [],
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
  mounted () {
    this.getArea('', 2)
    this.toSearch()
  },
  methods: {
    formatPhone (val) {
      return val && val.length > 7 ? val.substr(0, 3) + '****' + val.substr(val.length - 4, 4) : val
    },
    getArea (id, layer, targetOption) {
      getAreaList({
        id: id,
        layer: layer
      })
        .then(res => {
          res.result.data.forEach(item => {
            if (layer !== 4) {
              this.$set(item, 'isLeaf', false)
            }
          })
          if (layer === 2) {
            this.options = res.result.data
          } else {
            if (targetOption) {
              this.$set(targetOption, 'children', res.result.data)
            }
          }
        })
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      this.getArea(targetOption.id, targetOption.layer + 1, targetOption)
    },
    getTableData (params) {
      this.loading = true
      getMachineList(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.list
          this.pagination.total = res.result.total
        })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.initData()
    },
    initData () {
      const params = {}
      params.menuId = 'a1ee7b97ae514cbb8e51ea194ae53e61'
      params.pageNo = this.pagination.current
      params.pageSize = this.pagination.pageSize
      if (this.areaContain.length !== 0) {
        if (this.areaContain[0]) {
          params.provinceId = this.areaContain[0]
        }
        if (this.areaContain[1]) {
          params.cityId = this.areaContain[1]
        }
        if (this.areaContain[2]) {
          params.areaId = this.areaContain[2]
        }
      }
      if (this.orderDate.length !== 0) {
        params.startTime = this.orderDate[0].format('YYYY-MM-DD') + ' 00:00:00'
        params.endTime = this.orderDate[1].format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (this.orderNum) {
        params.orderNum = this.orderNum
      }
      if (this.phoneNum) {
        params.phone = this.phoneNum
      }
      if (this.nickName) {
        params.userName = this.nickName
      }
      if (this.isFullPayment !== '全部') {
        params.fullPayment = this.isFullPayment
      }
      if (this.shopName) {
        params.giftName = this.shopName
      }
      this.getTableData(params)
    },
    toExport () {
      const params = {}
      params.menuId = '5501740df3494ab6a2a04a3a21ef3926'
      if (this.areaContain.length !== 0) {
        if (this.areaContain[0]) {
          params.provinceId = this.areaContain[0]
        }
        if (this.areaContain[1]) {
          params.cityId = this.areaContain[1]
        }
        if (this.areaContain[2]) {
          params.areaId = this.areaContain[2]
        }
      }
      if (this.orderDate.length !== 0) {
        params.startTime = this.orderDate[0].format('YYYY-MM-DD') + ' 00:00:00'
        params.endTime = this.orderDate[1].format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (this.orderNum) {
        params.orderNum = this.orderNum
      }
      if (this.phoneNum) {
        params.phone = this.phoneNum
      }
      if (this.nickName) {
        params.userName = this.nickName
      }
      if (this.isFullPayment !== '全部') {
        params.fullPayment = this.isFullPayment
      }
      if (this.shopName) {
        params.giftName = this.shopName
      }
      this.toExportExcel('/pickUpMechine/exportExchangeList', params, '兑换机兑换数据.xlsx')
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.orderDate = []
      this.orderNum = ''
      this.phoneNum = ''
      this.nickName = ''
      this.isFullPayment = '全部'
      this.shopName = ''
      const params = {}
      params.menuId = 'a1ee7b97ae514cbb8e51ea194ae53e61'
      params.pageNo = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    view (value) {
      this.$router.push({
        path: '/order/exchange/machineDetails',
        query: { id: value.id }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.machineList
  .w100
    width 100%
  .mr8
    margin-right 8px
  .bottomContent
    background-color #fff
    padding 16px 20px
    .mb20
      margin-bottom 20px
  .title
    color #333
    font-weight 600
    font-size 16px
</style>
<style lang="stylus">
.machineList
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>

