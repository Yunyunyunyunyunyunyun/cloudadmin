<template>
  <div class="activityList">
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
                label="活动小区"
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
                label="活动名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="activityName" allow-clear placeholder="请输入活动名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="创建人"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="creater" allow-clear placeholder="请输入创建人" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="24" align="right">
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
            活动列表
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
import { getActivityList } from '@/api/activity'
import { toExportExcel, getEstate } from '@/components/mixins/mixins.js'
const columns = [{
  title: '活动名称',
  key: 'title',
  dataIndex: 'title'
}, {
  title: '活动小区',
  key: 'estateName',
  dataIndex: 'estateName'
}, {
  title: '活动开始日期',
  key: 'dateTime',
  dataIndex: 'dateTime'
}, {
  title: '活动结束日期',
  key: 'endTime',
  dataIndex: 'endTime'
}, {
  title: '参与人数',
  key: 'peopleNum',
  dataIndex: 'peopleNum'
}, {
  title: '创建人',
  key: 'createUser',
  dataIndex: 'createUser'
}, {
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '操作',
  key: 'operate',
  width: 150,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'ActivityList',
  mixins: [toExportExcel, getEstate],
  data () {
    return {
      areaContain: [],
      estate: undefined,
      estateList: [],
      activityName: '',
      creater: '',
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
      getActivityList(params)
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
      params.menuId = '7d021664be58415cb158ba35b2645d72'
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
      if (this.activityName) {
        params.title = this.activityName
      }
      if (this.creater) {
        params.createUser = this.creater
      }
      this.getTableData(params)
    },
    toExport () {
      const params = {}
      params.menuId = '5ab6269ab49a4dc887178ec319472077'
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
      if (this.activityName) {
        params.title = this.activityName
      }
      if (this.creater) {
        params.createUser = this.creater
      }
      this.toExportExcel('/activity/exportActivity', params, '活动数据.xlsx')
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.estate = undefined
      this.activityName = ''
      this.creater = ''
      const params = {}
      params.menuId = '7d021664be58415cb158ba35b2645d72'
      params.page = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    view (value) {
      this.$router.push({
        path: '/activity/activityList/activityDetails',
        query: { id: value.id }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.activityList
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
.activityList
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>
