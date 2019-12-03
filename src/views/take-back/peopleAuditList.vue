<template>
  <div class="peopleAuditList">
    <div class="card-container">
      <div class="cardTitle">
        <a-row>
          <a-col :span="12">
            审核看板
          </a-col>
          <a-col :span="12" align="right">
            <a-radio-group
              v-model="dateTab" class="group-radio"
              @change="onChange"
            >
              <a-radio-button value="a">
                今日
              </a-radio-button>
              <a-radio-button value="b">
                最近7天
              </a-radio-button>
              <a-radio-button value="c">
                最近30天
              </a-radio-button>
            </a-radio-group>
            <a-range-picker
              v-model="auditDate" class="ml16 w250" format="YYYY-MM-DD"
              @change="onDateChange"
            />
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-row class="panel-container">
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              <span class="firstColor commonSpan"></span>
              总申请数
            </div>
            <div class="type-num">
              {{ applyTotal }}
            </div>
          </a-col>
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              <span class="secondColor commonSpan"></span>
              待审核
            </div>
            <div class="type-num">
              {{ audit }}
            </div>
          </a-col>
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              <span class="thirdColor commonSpan"></span>
              已审核
            </div>
            <div class="type-num">
              {{ audited }}
            </div>
          </a-col>
          <a-col
            :span="6" class="height-90" type="flex"
            align="middle"
          >
            <div class="type-name">
              <span class="fourthColor commonSpan"></span>
              已拒绝
            </div>
            <div class="type-num">
              {{ rejected }}
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
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
                label="姓名"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="name" allow-clear placeholder="请输入姓名" />
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
                label="审核状态"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="auditStatus"
                  placeholder="请选择审核状态"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="1">
                    待审核
                  </a-select-option>
                  <a-select-option value="2">
                    已通过
                  </a-select-option>
                  <a-select-option value="3">
                    已拒绝
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="审核人"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="auditor" allow-clear placeholder="请输入审核人" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="申请时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-range-picker
                  v-model="auditTime"
                  format="YYYY-MM-DD"
                  class="w100"
                />
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
    <div class="card-container">
      <div class="card-title">
        <a-row>
          <a-col :span="24">
            审核申请列表
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-table
          :columns="columns"
          :data-source="tableData"
          :pagination="pagination"
          :row-key="record => record.id"
          :loading="loading"
          class="table-content"
          @change="handleTableChange"
        >
          <template slot="auditText" slot-scope="auditText">
            <span>{{ auditText == 1?"待审核":"" }}</span>
            <span>{{ auditText == 2?"已通过":"" }}</span>
            <span>{{ auditText == 3?"已拒绝":"" }}</span>
          </template>
          <template slot="mobile" slot-scope="mobile">
            <span>{{ formatPhone(mobile) }}</span>
          </template>
          <template slot="carInfo" slot-scope="carInfo">
            <span>{{ carInfo == 0?"无车":"" }}</span>
            <span>{{ carInfo == 1?"有车":"" }}</span>
          </template>
          <template slot="operate" slot-scope="text">
            <a-button type="link" size="small" @click="view(text)">
              查看
            </a-button>
            <a-button
              v-if="text.audit===1" type="link" size="small"
              @click="auditOpt(text)"
            >
              审核
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaList } from '@/api/common'
import { getBoardData, getRecycle } from '@/api/takeBack'
import moment from 'moment'
const columns = [{
  title: '姓名',
  key: 'realName',
  dataIndex: 'realName'
}, {
  title: '手机号',
  key: 'mobile',
  dataIndex: 'mobile',
  scopedSlots: { customRender: 'mobile' }
}, {
  title: '申请时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '有无车辆',
  key: 'carInfo',
  dataIndex: 'carInfo',
  scopedSlots: { customRender: 'carInfo' }
}, {
  title: '审核时间',
  key: 'auditTime',
  dataIndex: 'auditTime'
}, {
  title: '审核人',
  key: 'auditUser',
  dataIndex: 'auditUser'
}, {
  title: '审核状态',
  key: 'audit',
  dataIndex: 'audit',
  scopedSlots: { customRender: 'auditText' }
}, {
  title: '操作',
  key: 'operate',
  width: 120,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'PeopleAuditList',
  data () {
    return {
      areaContain: [],
      areaLabel: [],
      options: [],
      auditDate: [moment(), moment()],
      dateTab: 'a',
      applyTotal: '',
      audit: '',
      audited: '',
      rejected: '',
      name: '',
      phoneNum: '',
      auditStatus: '全部',
      auditor: '',
      auditTime: [],
      form: this.$form.createForm(this, {}),
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
    const params = {}
    params.startTime = this.auditDate[0].format('YYYY-MM-DD')
    params.endTime = this.auditDate[1].format('YYYY-MM-DD')
    this.viewBoardData(params)
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
    formatPhone (val) {
      const reg = /(\d{3})\d{4}(\d{4})/
      return val && val.length === 11 ? val.replace(reg, '$1****$2') : val
    },
    getTableData (params) {
      this.loading = true
      getRecycle(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.list
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
      params.menuId = 'a8e2d664950b4de989f962f861bc7cf4'
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      if (this.name) {
        params.realName = this.name
      }
      if (this.phoneNum) {
        params.mobile = this.phoneNum
      }
      if (this.auditStatus !== '全部') {
        params.audit = Number(this.auditStatus)
      }
      if (this.auditor) {
        params.auditUser = this.auditor
      }
      if (this.auditTime.length !== 0) {
        params.startTime = this.auditTime[0].format('YYYY-MM-DD')
        params.endTime = this.auditTime[1].format('YYYY-MM-DD')
      }
      if (this.areaContain.length !== 0 && this.areaLabel.length !== 0) {
        if (this.areaLabel[0]) {
          params.provinceName = this.areaLabel[0]
        }
        if (this.areaLabel[1]) {
          params.cityName = this.areaLabel[1]
        }
        if (this.areaLabel[2]) {
          params.countyName = this.areaLabel[2]
        }
      }
      this.getTableData(params)
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.name = ''
      this.auditStatus = '全部'
      this.phoneNum = ''
      this.auditor = ''
      this.auditTime = []
      const params = {}
      params.menuId = 'a8e2d664950b4de989f962f861bc7cf4'
      params.page = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    onAreaChange (value, obj) {
      const newArr = []
      if (obj) {
        obj.forEach((item) => {
          newArr.push(item.name)
        })
        this.areaLabel = newArr
      }
    },
    viewBoardData (params) {
      getBoardData(params).then(res => {
        this.applyTotal = res.result.total
        this.audit = res.result.auditedNum
        this.audited = res.result.approvedNum
        this.rejected = res.result.refuseNum
      })
    },
    onChange (e) {
      const newValue = e.target.value
      if (newValue === 'a') {
        this.auditDate = [moment(), moment()]
      } else if (newValue === 'b') {
        const begin = new Date(new Date().getTime() - 86400000 * 6).setHours(0, 0, 0, 0)
        const end = new Date().getTime()
        this.auditDate = [moment(begin), moment(end)]
      } else if (newValue === 'c') {
        const startDate = new Date(new Date().getTime() - 86400000 * 29).setHours(0, 0, 0, 0)
        const endDate = new Date().getTime()
        this.auditDate = [moment(startDate), moment(endDate)]
      }
      const params = {}
      params.startTime = this.auditDate[0].format('YYYY-MM-DD')
      params.endTime = this.auditDate[1].format('YYYY-MM-DD')
      this.viewBoardData(params)
    },
    onDateChange (dates, dateStrings) {
      this.dateTab = ''
      const params = {}
      params.startTime = dateStrings[0]
      params.endTime = dateStrings[1]
      this.viewBoardData(params)
    },
    view (value) {
      this.$router.push({
        path: '/takeBack/peopleAuditList/peopleAuditDetails',
        query: { id: value.id, title: '查看' }
      })
    },
    auditOpt (value) {
      this.$router.push({
        path: '/takeBack/peopleAuditList/peopleAuditDetails',
        query: { id: value.id, title: '审核' }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.peopleAuditList
  .ml16
    margin-left 16px
  .w250
    width 250px
    text-align left
  .w100
    width 100%
  .cardTitle
    font-size $font16
    font-weight 600
    color #333333
    padding-bottom 16px
    .group-radio
      font-weight 400
    >>>.ant-radio-group
      font-size $font12
    >>>.ant-radio-button-wrapper:first-child
      border-radius 2px 0 0 2px
    >>>.ant-radio-button-wrapper:last-child
      border-radius 0 2px 2px 0
  .panel-container
    margin-bottom 8px
  .height-90
    height 90px
    .type-name
      color #666666
      font-size 12px
      margin-top 16px
      height 20px
      line-height 20px
      width 70px
      .commonSpan
        width 8px
        height 8px
        float left
        margin-top 6px
        border-radius 50%
      .firstColor
        background-color #1B85FF
      .secondColor
        background-color #F8AC30
        margin-left 8px
      .thirdColor
        background-color #57C22D
        margin-left 8px
      .fourthColor
        background-color #F22635
        margin-left 8px
    .type-num
      font-size 24px
      color #333333
      margin-top 8px
</style>
<style lang="stylus">
.peopleAuditList
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>
