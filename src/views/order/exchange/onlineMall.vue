<template>
  <div class="onlineMall">
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form>
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
                label="商品类型"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="mallType"
                  placeholder="请选择商品类型"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="item in mallTypes" :key="item.id">
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
            <a-col class="search-item" :span="12" align="right">
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
        <template slot="businessName">
          <span>猫先生自营</span>
        </template>
        <template slot="giftName" slot-scope="text">
          <span v-if="text" :title="text">{{ text.length > 10 ? text.slice(0, 10) + "..." : text }}</span>
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
import { getOnlineMall } from '@/api/order'
import { toExportExcel } from '@/components/mixins/mixins.js'
const columns = [{
  title: '订单号',
  key: 'orderNum',
  dataIndex: 'orderNum'
}, {
  title: '商户名称',
  key: 'businessName',
  dataIndex: 'businessName',
  scopedSlots: { customRender: 'businessName' }
}, {
  title: '商品名称',
  key: 'giftName',
  dataIndex: 'giftName',
  scopedSlots: { customRender: 'giftName' }
}, {
  title: '商品类型',
  key: 'giftType',
  dataIndex: 'giftType'
}, {
  title: '使用环保值',
  key: 'usedEnviron',
  dataIndex: 'usedEnviron'
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
  name: 'OnlineMall',
  mixins: [toExportExcel],
  data () {
    return {
      orderDate: [],
      orderNum: '',
      phoneNum: '',
      nickName: '',
      mallTypes: [
        {
          id: '全部',
          name: '全部'
        },
        {
          id: 1,
          name: '实物商品'
        },
        {
          id: 2,
          name: '虚拟商品'
        }
      ],
      mallType: '全部',
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
    this.toSearch()
  },
  methods: {
    formatPhone (val) {
      return val && val.length > 7 ? val.substr(0, 3) + '****' + val.substr(val.length - 4, 4) : val
    },
    getTableData (params) {
      this.loading = true
      getOnlineMall(params)
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
      params.menuId = '0d22c7bbf76f46b983e5eff50b8b3286'
      params.pageNo = this.pagination.current
      params.pageSize = this.pagination.pageSize
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
      if (this.mallType !== '全部') {
        params.giftType = this.mallType
      }
      if (this.shopName) {
        params.giftName = this.shopName
      }
      this.getTableData(params)
    },
    toExport () {
      const params = {}
      params.menuId = '925cb038c75d4921acf44cb11b1d8d67'
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
      if (this.mallType !== '全部') {
        params.giftType = this.mallType
      }
      if (this.shopName) {
        params.giftName = this.shopName
      }
      this.toExportExcel('/onLineStore/exportExchangeList', params, '线上商城兑换数据.xlsx')
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.orderDate = []
      this.orderNum = ''
      this.phoneNum = ''
      this.nickName = ''
      this.mallType = '全部'
      this.shopName = ''
      const params = {}
      params.menuId = '0d22c7bbf76f46b983e5eff50b8b3286'
      params.pageNo = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    view (value) {
      this.$router.push({
        path: '/order/exchange/onlineMallDetails',
        query: { id: value.id }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.onlineMall
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
.onlineMall
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>

