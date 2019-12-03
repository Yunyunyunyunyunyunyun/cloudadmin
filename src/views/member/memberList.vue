<template>
  <div class="memberList">
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
                label="小区"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="estate"
                  allow-clear
                  placeholder="全部"
                  show-search
                  :filter-option="filterOption"
                >
                  <a-select-option v-for="(item,index) in estateList" :key="index" :value="item.id">
                    {{ item.housingEstate }}
                  </a-select-option>
                </a-select>
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
                label="IC卡号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="ICNum" allow-clear placeholder="请输入IC卡号" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="会员状态"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="memberStatus"
                  placeholder="请选择会员状态"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    启用
                  </a-select-option>
                  <a-select-option value="1">
                    禁用
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="注册来源"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="registerSource"
                  placeholder="请选择注册来源"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    APP注册
                  </a-select-option>
                  <a-select-option value="1">
                    IC开卡
                  </a-select-option>
                  <a-select-option value="2">
                    设备
                  </a-select-option>
                  <a-select-option value="3">
                    小程序
                  </a-select-option>
                  <a-select-option value="4">
                    数据导入
                  </a-select-option>
                  <a-select-option value="5">
                    客服录入
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="注册时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-range-picker
                  v-model="registerDate"
                  class="w100"
                />
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
            会员列表
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
        <template slot="isLock" slot-scope="isLock">
          <div :class="{'commonStyle': true, 'firstColor': isLock === 1, 'secondColor': isLock === 0}">
            {{ isLock | isLockFilter }}
          </div>
        </template>
        <template slot="operate" slot-scope="text">
          <a-button type="link" size="small" @click="view(text)">
            查看
          </a-button>
          <a-button type="link" size="small" @click="edit(text)">
            编辑
          </a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { toExportExcel, getEstate } from '@/components/mixins/mixins.js'
import { getMemberList } from '@/api/member'
import { getAreaList } from '@/api/common'
const columns = [{
  title: '手机号',
  key: 'cellPhone',
  dataIndex: 'cellPhone',
  scopedSlots: { customRender: 'cellPhone' }
}, {
  title: 'IC卡号',
  key: 'carNum',
  dataIndex: 'carNum'
}, {
  title: '注册来源',
  key: 'originName',
  dataIndex: 'originName'
}, {
  title: '注册时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '绑卡时间',
  key: 'bindDate',
  dataIndex: 'bindDate'
}, {
  title: '小区',
  key: 'estateName',
  dataIndex: 'estateName'
}, {
  title: '可用余额',
  key: 'catCoin',
  dataIndex: 'catCoin'
}, {
  title: '可用环保值',
  key: 'balanceEnviron',
  dataIndex: 'balanceEnviron'
}, {
  title: '会员状态',
  key: 'isLock',
  dataIndex: 'isLock',
  scopedSlots: { customRender: 'isLock' }
}, {
  title: '操作',
  key: 'operate',
  width: 120,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'MemberList',
  filters: {
    isLockFilter: function (value) {
      switch (value) {
        case 0:
          return '启用'
        case 1:
          return '禁用'
        default:
          return '字段值异常，请检查后台数据'
      }
    }
  },
  mixins: [toExportExcel, getEstate],
  data () {
    return {
      areaContain: [],
      areaLabel: [],
      estate: undefined,
      estateList: [],
      registerSource: '全部',
      phoneNum: '',
      ICNum: '',
      memberStatus: '全部',
      options: [],
      registerDate: [],
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
    moment,
    getTableData (params) {
      this.loading = true
      getMemberList(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.data
          this.pagination.total = res.result.totalCount
        })
    },
    onAreaChange (value, obj) {
      const newArr = []
      if (obj) {
        obj.forEach((item) => {
          newArr.push(item.name)
        })
        this.areaLabel = newArr
      }
      this.estateList = []
      this.estate = undefined
      if (value.length < 4) {
        this.getEstate(value)
      } else if (value.length === 4) {
        this.getEstate(null, value[3])
      }
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.initData()
    },
    initData () {
      const params = {}
      const queryObj = {}
      if (this.areaContain.length !== 0 && this.areaLabel.length !== 0) {
        if (this.areaLabel[0]) {
          queryObj.province = this.areaLabel[0]
        }
        if (this.areaLabel[1]) {
          queryObj.city = this.areaLabel[1]
        }
        if (this.areaLabel[2]) {
          queryObj.area = this.areaLabel[2]
        }
      }
      if (this.estate) {
        queryObj.estateId = this.estate
      }
      if (this.registerSource !== '全部') {
        queryObj.client = this.registerSource
      }
      if (this.phoneNum) {
        queryObj.cellPhone = this.phoneNum
      }
      if (this.ICNum) {
        queryObj.iccard = this.ICNum
      }
      if (this.memberStatus !== '全部') {
        queryObj.lock = this.memberStatus
      }
      if (this.registerDate.length !== 0) {
        queryObj.startTime = this.registerDate[0].format('YYYY-MM-DD')
        queryObj.endTime = this.registerDate[1].format('YYYY-MM-DD')
      }
      if (Object.keys(queryObj).length !== 0) {
        params.queryParams = queryObj
      }
      params.menuId = '017da839b6454aa78414d3441c0a0335'
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.estate = undefined
      this.registerSource = '全部'
      this.phoneNum = ''
      this.ICNum = ''
      this.memberStatus = '全部'
      this.registerDate = []
      const params = {}
      params.menuId = '017da839b6454aa78414d3441c0a0335'
      params.page = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    toExport () {
      var params = {}
      const queryObj = {}
      if (this.areaContain.length !== 0 && this.areaLabel.length !== 0) {
        if (this.areaLabel[0]) {
          queryObj.province = this.areaLabel[0]
        }
        if (this.areaLabel[1]) {
          queryObj.city = this.areaLabel[1]
        }
        if (this.areaLabel[2]) {
          queryObj.area = this.areaLabel[2]
        }
      }
      if (this.estate) {
        queryObj.estateId = this.estate
      }
      if (this.registerSource !== '全部') {
        queryObj.client = this.registerSource
      }
      if (this.phoneNum) {
        queryObj.cellPhone = this.phoneNum
      }
      if (this.ICNum) {
        queryObj.iccard = this.ICNum
      }
      if (this.memberStatus !== '全部') {
        queryObj.lock = this.memberStatus
      }
      if (this.registerDate.length !== 0) {
        queryObj.startTime = this.registerDate[0].format('YYYY-MM-DD')
        queryObj.endTime = this.registerDate[1].format('YYYY-MM-DD')
      }
      if (Object.keys(queryObj).length !== 0) {
        params.queryParams = queryObj
      }
      params.menuId = '4c6c25dd77ec4d01bfb96844535f4b3c'
      this.toExportExcel('/memberUser/exportUser', params, '会员数据.xlsx')
    },
    view (value) {
      this.$router.push({
        path: '/member/memberList/memberDetails',
        query: { id: value.id, title: '查看' }
      })
    },
    edit (value) {
      this.$router.push({
        path: '/member/memberList/memberDetails',
        query: { id: value.id, title: '编辑' }
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
.memberList
  .w100
    width 100%
  .mr8
    margin-right 8px
  .bottomContent
    background-color #fff
    padding 16px 20px
    .mb20
      margin-bottom 20px
    .commonStyle
      width: 38px
      height: 18px
      line-height: 18px
      text-align: center
      border-radius: 2px
      color: #fff
      font-weight 400
      font-size: 12px
    .firstColor
      background-color #8f96b3
    .secondColor
      background-color #57c22d
  .title
    color #333
    font-weight 600
    font-size 16px
</style>
<style lang="stylus">
.memberList
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>
