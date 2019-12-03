<template>
  <div class="supplementaryRecord">
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
                  @change="onAreaChange"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="补币小区"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="estate"
                  allow-clear
                  placeholder="全部"
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="(item,index) in estateList" :key="index" :value="item.id">
                    {{ item.housingEstate }}
                  </a-select-option>
                </a-select>
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
            <a-col class="search-item" :span="6">
              <a-form-item
                label="订单号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="orderNum" allow-clear placeholder="请输入订单号" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备编号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="productId" allow-clear placeholder="请输入设备编号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="补币人员"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="userName" allow-clear placeholder="请输入补币人员" />
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
            补币列表
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
        :scroll="{x: 1500}"
        @change="handleTableChange"
      >
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
import { getSupplementaryRecord } from '@/api/order'
import { toExportExcel, getEstate } from '@/components/mixins/mixins.js'
const columns = [{
  title: '订单号',
  key: 'orderId',
  dataIndex: 'orderId'
}, {
  title: '补币人员',
  key: 'userName',
  dataIndex: 'userName'
}, {
  title: '小区',
  key: 'housingEstate',
  dataIndex: 'housingEstate'
}, {
  title: '设备名称',
  key: 'productName',
  dataIndex: 'productName'
}, {
  title: '设备型号',
  key: 'productMarkName',
  dataIndex: 'productMarkName'
}, {
  title: '设备编号',
  key: 'deviceCode',
  dataIndex: 'deviceCode'
}, {
  title: '补币时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '补币金额（元）',
  key: 'coinNum',
  dataIndex: 'coinNum'
}, {
  title: '操作',
  key: 'operate',
  width: 100,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'SupplementaryRecord',
  mixins: [toExportExcel, getEstate],
  data () {
    return {
      areaContain: [],
      estate: undefined,
      estateList: [],
      orderDate: [],
      orderNum: '',
      userName: '',
      productId: '',
      options: [],
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
    this.getEstate()
    this.toSearch()
  },
  methods: {
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
    onAreaChange (value, obj) {
      this.estateList = []
      this.estate = undefined
      if (value.length < 4) {
        this.getEstate(value)
      } else if (value.length === 4) {
        this.getEstate(null, value[3])
      }
    },
    getTableData (params) {
      this.loading = true
      getSupplementaryRecord(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.activityList
          this.pagination.total = res.result.totalCount
        })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.initData()
    },
    initData () {
      const params = {}
      params.menuId = '89fb0065c3d34f81b9c3e3d5ffa76c8d'
      params.page = this.pagination.current
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
      if (this.estate) {
        params.estateId = this.estate
      }
      if (this.orderDate.length !== 0) {
        params.startTime = this.orderDate[0].format('YYYY-MM-DD') + ' 00:00:00'
        params.endTime = this.orderDate[1].format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (this.orderNum) {
        params.orderId = this.orderNum
      }
      if (this.userName) {
        params.userName = this.userName
      }
      if (this.productId) {
        params.deviceCode = this.productId
      }
      this.getTableData(params)
    },
    toExport () {
      const params = {}
      params.menuId = 'de3891173b7446b1a6f8822fdf513991'
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
      if (this.estate) {
        params.estateId = this.estate
      }
      if (this.orderDate.length !== 0) {
        params.startTime = this.orderDate[0].format('YYYY-MM-DD') + ' 00:00:00'
        params.endTime = this.orderDate[1].format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (this.orderNum) {
        params.orderId = this.orderNum
      }
      if (this.userName) {
        params.userName = this.userName
      }
      if (this.productId) {
        params.deviceCode = this.productId
      }
      this.toExportExcel('/fillMoney/exportMoneyRecord', params, '补币数据.xlsx')
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.estate = undefined
      this.orderDate = []
      this.orderNum = ''
      this.userName = ''
      this.productId = ''
      const params = {}
      params.menuId = '89fb0065c3d34f81b9c3e3d5ffa76c8d'
      params.page = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    view (value) {
      this.$router.push({
        path: '/order/delivery/supplementaryDetails',
        query: { id: value.id }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.supplementaryRecord
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
.supplementaryRecord
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>
