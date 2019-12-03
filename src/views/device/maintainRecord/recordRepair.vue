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
                    value: 'id',
                    children: 'children'
                  }"
                  placeholder="省市区、街道"
                  @change="changeArea"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="小区"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['housingEstate']"
                  allow-clear
                  show-search
                  :filter-option="filterOption"
                  placeholder="全部"
                >
                  <a-select-option v-for="(item,index) in estateList" :key="index" :value="item.id">
                    {{ item.housingEstate }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="报修人员"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['repairName']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option v-for="(item, index) in personList" :key="index" :value="item.userId">
                    {{ item.userName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col class="search-item" :span="6">
              <a-form-item
                label="报修状态"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['repairStatus']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option v-for="(item, index) in personList" :key="index" :value="item.userId">
                    {{ item.userName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备名称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productName']"
                  allow-clear placeholder="请输入设备名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备类型"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['productType']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option value="1">
                    垃圾箱
                  </a-select-option>
                  <a-select-option value="2">
                    回收站
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备型号"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['productMark']"
                  allow-clear
                  show-search
                  :filter-option="filterOption"
                  placeholder="全部"
                >
                  <a-select-option v-for="(item, index) in markList" :key="index" :value="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备编号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productNumber']"
                  allow-clear
                  placeholder="请输入设备编号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="工单号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['orderNumber']"
                  allow-clear
                  placeholder="请输入工单号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="报修提交时间"
                v-bind="formItemLayout"
              >
                <a-range-picker
                  v-model="timeArr"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="18" align="right">
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
            报修列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button @click="toExport">
              导出
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="data"
          :row-key="record => record.id"
          :loading="loading"
          :pagination="pagination"
          :scroll="{x: 1500}"
          @change="handleTableChange"
        >
          <template slot="view" slot-scope="record">
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toView(record)"
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
import { getMarkList, getGroupMark, getArea, getEstate, toExportExcel } from '@/components/mixins/mixins.js'
export default {
  components: {},
  mixins: [getMarkList, getGroupMark, getArea, getEstate, toExportExcel],
  data () {
    return {
      personList: [],
      timeArr: [],
      areas: [],
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, {}),
      columns: [
        {
          title: '区域',
          dataIndex: 'areaName'
        },
        {
          title: '小区',
          dataIndex: 'housingEstate'
        },
        {
          title: '设备名称',
          dataIndex: 'productName'
        },
        {
          title: '设备类型',
          dataIndex: 'productType'
        },
        {
          title: '设备型号',
          dataIndex: 'productMark'
        },
        {
          title: '设备编号',
          dataIndex: 'productNumber'
        },
        {
          title: '报修提交时间',
          dataIndex: 'repairTime'
        },
        {
          title: '工单号',
          dataIndex: 'orderNumber'
        },
        {
          title: '报修级别',
          dataIndex: 'repairLevel',
          customRender (text, record, index) {
            if (text === '1') return '普通'
            if (text === '2') return '紧急'
            if (text === '3') return '特急'
          }
        },
        {
          title: '报修人员',
          dataIndex: 'repairName'
        },
        {
          title: '报修状态',
          dataIndex: 'repairStatus',
          customRender (text, record, index) {
            return '成功'
          }
        },
        {
          title: '操作',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'view' }
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
    this.getArea('', 2)
    this.getPerson()
    this.getMarkList()
    this.getGroupMark()
    this.getEstate()
    this.toSearch()
  },
  methods: {
    getPerson () {
      this.$httpGet(this.$basePath.getRepairUsers)
        .then(res => {
          this.personList = res.result
        })
    },
    toSearch () {
      this.pagination.current = 1
      this.getTableData()
    },
    getTableData () {
      var param = this.form.getFieldsValue()
      param.menuId = '5872093a33ea44a7a6670b58e6ea8d17'
      param.pageNo = this.pagination.current
      param.pageSize = this.pagination.pageSize
      if (this.timeArr.length) {
        param.startTime = this.timeArr[0].format('YYYY-MM-DD')
        param.endTime = this.timeArr[1].format('YYYY-MM-DD')
      }
      if (this.areas.length) {
        param.provinceId = this.areas[0]
        param.cityId = this.areas[1]
        param.areaId = this.areas[2]
        param.street = this.areas[3] || ''
      }
      this.loading = true
      this.$httpPost(this.$basePath.getRepairRecords, param)
        .then(res => {
          this.loading = false
          this.data = res.result.list
          this.pagination.total = res.result.total
        })
    },
    changeArea (areasId) {
      this.estateList = []
      this.form.setFieldsValue({ housingEstate: undefined })
      if (areasId.length < 4) {
        this.getEstate(areasId)
      } else if (areasId.length === 4) {
        this.getEstate(null, areasId[3])
      }
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.getTableData()
    },
    changeTimeArr (value, dateString) {
      this.timeArr = dateString
    },
    resetForm () {
      this.form.resetFields()
      this.areas = []
      this.timeArr = []
    },
    toExport () {
      var param = this.form.getFieldsValue()
      param.menuId = '77f9af7fcb01480d904d69013ee9fe7d'
      if (this.timeArr.length) {
        param.startTime = this.timeArr[0].format('YYYY-MM-DD')
        param.endTime = this.timeArr[1].format('YYYY-MM-DD')
      }
      if (this.areas.length) {
        param.provinceId = this.areas[0]
        param.cityId = this.areas[1]
        param.areaId = this.areas[2]
        param.street = this.areas[3] || ''
      }
      this.toExportExcel(this.$basePath.exportRepair, param, '报修记录.xlsx')
    },
    toView (record) {
      this.$router.push({
        path: '/device/maintain/recordRepair/repairDetail',
        query: {
          id: record.id
        }
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
@import '~@/assets/css/common.styl'
</style>
