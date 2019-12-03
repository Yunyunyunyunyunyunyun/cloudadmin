<template>
  <div class="recyclePrice">
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
                label="规则名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="ruleName" allow-clear placeholder="请输入规则名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="适用场景"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="scenario"
                  placeholder="请选择适用场景"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="item in scenarios" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
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
            回收价格规则列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button type="primary" @click="add()">
              添加规则
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
        <template slot="areaNames" slot-scope="text">
          <span :title="text">{{ text.length > 20 ? text.slice(0, 20) + "..." : text }}</span>
        </template>
        <template slot="type" slot-scope="type">
          <span>{{ type == 0?"上门回收":"" }}</span>
          <span>{{ type == 1?"回收结算":"" }}</span>
          <span>{{ type == 2?"设备清运":"" }}</span>
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
import { getAreaList } from '@/api/common'
import { getPriceList } from '@/api/rule'
const columns = [{
  title: '规则名称',
  key: 'name',
  dataIndex: 'name'
}, {
  title: '适用场景',
  key: 'type',
  dataIndex: 'type',
  scopedSlots: { customRender: 'type' }
}, {
  title: '适用区域',
  key: 'areaNames',
  dataIndex: 'areaNames',
  scopedSlots: { customRender: 'areaNames' }
}, {
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '更新时间',
  key: 'updateTime',
  dataIndex: 'updateTime'
}, {
  title: '操作人',
  key: 'updateUser',
  dataIndex: 'updateUser'
}, {
  title: '操作',
  key: 'operate',
  width: 120,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'RecyclePrice',
  data () {
    return {
      areaContain: [],
      ruleName: '',
      scenarios: [
        {
          id: '全部',
          name: '全部'
        },
        {
          id: 0,
          name: '上门回收'
        },
        {
          id: 1,
          name: '回收结算'
        },
        {
          id: 2,
          name: '设备清运'
        }
      ],
      scenario: '全部',
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
    getTableData (params) {
      this.loading = true
      getPriceList(params)
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
      params.menuId = '24c7d68e61484112bdd14a34ffbd6037'
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      if (this.ruleName) {
        params.name = this.ruleName
      }
      if (this.scenario !== '全部') {
        params.type = this.scenario
      }
      if (this.areaContain.length !== 0) {
        if (this.areaContain[0]) {
          params.provinceId = Number(this.areaContain[0])
        }
        if (this.areaContain[1]) {
          params.cityId = Number(this.areaContain[1])
        }
        if (this.areaContain[2]) {
          params.areaId = Number(this.areaContain[2])
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
      this.ruleName = ''
      this.scenario = '全部'
      const params = {}
      params.menuId = '24c7d68e61484112bdd14a34ffbd6037'
      params.page = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    add () {
      this.$router.push({
        path: '/rule/recyclePrice/recyclePriceDetails',
        query: { title: '添加' }
      })
    },
    view (value) {
      this.$router.push({
        path: '/rule/recyclePrice/recyclePriceDetails',
        query: { id: value.id, title: '查看' }
      })
    },
    edit (value) {
      this.$router.push({
        path: '/rule/recyclePrice/recyclePriceDetails',
        query: { id: value.id, title: '编辑' }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.recyclePrice
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
.recyclePrice
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>

