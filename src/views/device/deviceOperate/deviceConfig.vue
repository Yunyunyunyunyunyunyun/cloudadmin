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
                  v-decorator="['estateId']"
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
                label="运营人员"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['operation']"
                  allow-clear
                  placeholder="请选择运营人员"
                  show-search
                  :filter-option="filterOption"
                >
                  <a-select-option v-for="(item, index) in userList" :key="index" :value="item.id">
                    {{ item.userName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备名称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['name']"
                  allow-clear
                  placeholder="请输入设备名称"
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
                  v-decorator="['scenario']"
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
                  v-decorator="['markId']"
                  allow-clear
                  placeholder="全部"
                  show-search
                  :filter-option="filterOption"
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
                  v-decorator="['productId']"
                  allow-clear
                  placeholder="请输入设备编号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备组名称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['groupName']"
                  allow-clear
                  placeholder="请输入设备组名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备组型号"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['groupMarkId']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option v-for="(item, index) in groupMarkList" :key="index" :value="item.id">
                    {{ item.key }}
                  </a-select-option>
                </a-select>
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
            投递列表
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
          :row-key="record => record.id"
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="pagination"
          :scroll="{x: 1500}"
          @change="handleTableChange"
        >
          <template slot="operate" slot-scope="text, record">
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toView(record)"
            >
              查看
            </a-button>
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toConfig(record)"
            >
              配置
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getMarkList, getGroupMark, getArea, getEstate, toExportExcel, findUser } from '@/components/mixins/mixins.js'
export default {
  components: {},
  mixins: [getMarkList, getGroupMark, getArea, getEstate, toExportExcel, findUser],
  data () {
    return {
      state: undefined,
      areas: [],
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this),
      columns: [
        {
          title: '区域',
          dataIndex: 'address'
        },
        {
          title: '小区',
          dataIndex: 'estateName'
        },
        {
          title: '设备名称',
          dataIndex: 'name'
        },
        {
          title: '设备类型',
          dataIndex: 'scenarioName'
        },
        {
          title: '设备型号',
          dataIndex: 'productMark',
          customRender (text, record, index) {
            if (text) {
              return text.name
            }
          }
        },
        {
          title: '设备编号',
          dataIndex: 'productId'
        },
        {
          title: '运行时间',
          dataIndex: 'productTime',
          customRender (text, record, index) {
            if (text) {
              if (text.workTime === '0-24') {
                return '00:00 ~ 24:00'
              }
              if (text.workTime === '6-20') {
                return '06:00 ~ 20:00'
              }
              if (text.workTime === '20-6') {
                return '20:00 ~ 06:00'
              }
            }
          }
        },
        {
          title: '设备余额',
          dataIndex: 'coinNum'
        },
        {
          title: '运营人员',
          dataIndex: 'operation'
        },
        {
          title: '启用状态',
          customRender (text, record, index) {
            return '启用'
          }
        },
        {
          title: '操作',
          fixed: 'right',
          scopedSlots: { customRender: 'operate' },
          width: 130
        }
      ],
      data: [],
      loading: false,
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
    this.findUser('operate')
    this.getArea('', 2)
    this.getEstate()
    this.getMarkList()
    this.getGroupMark()
    this.toSearch()
  },
  methods: {
    changeArea (areasId) {
      this.estateList = []
      this.form.setFieldsValue({ estateId: undefined })
      if (areasId.length < 4) {
        this.getEstate(areasId)
      } else if (areasId.length === 4) {
        this.getEstate(null, areasId[3])
      }
    },
    getTableData () {
      const params = {}
      params.queryParams = this.form.getFieldsValue()
      if (this.areas.length > 0) {
        params.queryParams.provinceId = this.areas[0]
        params.queryParams.cityId = this.areas[1]
        params.queryParams.areaId = this.areas[2]
        params.queryParams.streetId = this.areas[3] || ''
      }
      params.menuId = 'c243f4151124466e87d7b704391ca3f3'
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      this.loading = true
      this.$httpPost(this.$basePath.deviceGetList, params)
        .then(res => {
          this.loading = false
          this.data = res.result.data
          this.pagination.total = res.result.totalCount
        })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.getTableData()
    },
    toSearch () {
      this.pagination.current = 1
      this.getTableData()
    },
    resetForm () {
      this.form.resetFields()
      this.areas = []
      this.state = undefined
    },
    toExport () {
      const params = {}
      params.queryParams = this.form.getFieldsValue()
      if (this.areas.length > 0) {
        params.queryParams.provinceId = this.areas[0]
        params.queryParams.cityId = this.areas[1]
        params.queryParams.areaId = this.areas[2]
        params.queryParams.streetId = this.areas[3] || ''
      }
      params.menuId = '6b92902e5b844c0e9db106dfe00ddbf8'
      this.toExportExcel(this.$basePath.exportProduct, params, '设备记录.xlsx')
    },
    toView (record) {
      this.$router.push({
        path: '/device/operation/deviceConfig/viewDetail',
        query: { id: record.id, menuId: '9bedcea57f1f4301baec340fe7de3777' }
      })
    },
    toConfig (record) {
      this.$router.push({
        path: '/device/operation/deviceConfig/configDetail',
        query: { id: record.id, menuId: '9bedcea57f1f4301baec340fe7de3777' }
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
.tag
  display inline-block
  min-width 38px
  height 18px
  color #ffffff
  font-size $font12
  line-height 18px
  text-align center
  border-radius 2px
  background-color #000000
  &.grey
    background-color #8F96B3
  &.green
    background-color #57C22D
</style>
