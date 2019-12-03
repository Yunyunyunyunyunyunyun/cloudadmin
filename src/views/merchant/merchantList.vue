<template>
  <div class="merchantList">
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
                label="商户名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="merchantName" allow-clear placeholder="请输入商户名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="客户经理"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="accountManager"
                  placeholder="请选择客户经理"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="item in accountManagers" :key="item.managerId">
                    {{ item.managerName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="商户类型"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="merchantType"
                  placeholder="请选择商户类型"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="item in merchantTypes" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="联系人"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="linkname" allow-clear placeholder="请输入联系人" />
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
            商户列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button v-action:meradd type="primary" @click="add()">
              添加商户
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
        <template slot="merType" slot-scope="merType">
          <span>{{ merType == 1?"实体商户":"" }}</span>
          <span>{{ merType == 2?"线上商户":"" }}</span>
          <span>{{ merType == 3?"综合商户":"" }}</span>
        </template>
        <template slot="mobile" slot-scope="mobile">
          <span>{{ formatPhone(mobile) }}</span>
        </template>
        <template slot="operate" slot-scope="text">
          <a-button
            v-action:merget type="link" size="small"
            @click="view(text)"
          >
            查看
          </a-button>
          <a-button
            v-action:meredit type="link" size="small"
            @click="edit(text)"
          >
            编辑
          </a-button>
          <a-button
            v-action:merdel type="link" size="small"
            @click="del(text)"
          >
            删除
          </a-button>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model="deleteVisible" ok-text="确定"
      cancel-text="取消" class="comModal" @ok="deleteModal"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">提示</span>
        <div class="dlMain">
          是否确定删除此商户？
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getAreaList } from '@/api/common'
import { getMerchantList, getManagerList, delMerchant } from '@/api/merchant'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_khhun27fquq.js'
})
const columns = [{
  title: '商户编号',
  key: 'merchantNo',
  dataIndex: 'merchantNo'
}, {
  title: '商户名称',
  key: 'name',
  dataIndex: 'name'
}, {
  title: '商户类型',
  key: 'merType',
  dataIndex: 'merType',
  scopedSlots: { customRender: 'merType' }
}, {
  title: '联系人',
  key: 'contacts',
  dataIndex: 'contacts'
}, {
  title: '手机号',
  key: 'mobile',
  dataIndex: 'mobile',
  scopedSlots: { customRender: 'mobile' }
}, {
  title: '客户经理',
  key: 'managerName',
  dataIndex: 'managerName'
}, {
  title: '入驻日期',
  key: 'signTime',
  dataIndex: 'signTime'
}, {
  title: '创建时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '创建人',
  key: 'createName',
  dataIndex: 'createName'
}, {
  title: '操作',
  key: 'operate',
  width: 150,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'MerchantList',
  components: {
    IconFont
  },
  data () {
    return {
      areaContain: [],
      merchantName: '',
      accountManagers: [{
        managerId: '全部',
        managerName: '全部'
      }],
      accountManager: '全部',
      merchantTypes: [
        {
          id: '全部',
          name: '全部'
        },
        {
          id: '1',
          name: '实体商户'
        },
        {
          id: '2',
          name: '线上商户'
        },
        {
          id: '3',
          name: '综合商户'
        }
      ],
      merchantType: '全部',
      phoneNum: '',
      linkname: '',
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
      },
      deleteVisible: false,
      delId: ''
    }
  },
  mounted () {
    this.getArea('', 2)
    this.toSearch()
    const params = {}
    this.getManager(params)
  },
  methods: {
    getManager (params) {
      getManagerList(params)
        .then(res => {
          const allRes = res.result.list
          for (let i = 0; i < allRes.length; i++) {
            this.accountManagers.push(allRes[i])
          }
        })
    },
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
      getMerchantList(params)
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
      params.menuId = '6d1146bacdb04001b2c71e019b359b58'
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
      if (this.merchantName) {
        params.name = this.merchantName
      }
      if (this.accountManager !== '全部') {
        params.managerId = this.accountManager
      }
      if (this.merchantType !== '全部') {
        params.merType = this.merchantType
      }
      if (this.linkname) {
        params.contacts = this.linkname
      }
      if (this.phoneNum) {
        params.mobile = this.phoneNum
      }
      this.getTableData(params)
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.merchantName = ''
      this.accountManager = '全部'
      this.merchantType = '全部'
      this.phoneNum = ''
      this.linkname = ''
      const params = {}
      params.menuId = '6d1146bacdb04001b2c71e019b359b58'
      params.page = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    add () {
      this.$router.push({
        path: '/merchant/merchantList/merchantDetails',
        query: { title: '添加' }
      })
    },
    view (value) {
      this.$router.push({
        path: '/merchant/merchantList/merchantDetails',
        query: { id: value.id, title: '查看' }
      })
    },
    edit (value) {
      this.$router.push({
        path: '/merchant/merchantList/merchantDetails',
        query: { id: value.id, title: '编辑' }
      })
    },
    del (value) {
      this.deleteVisible = true
      this.delId = value.id
    },
    deleteModal () {
      const params = {}
      params.menuId = '015c6e1bc56246378963c308b2d408d5'
      params.id = this.delId
      delMerchant(params).then(res => {
        this.$message.success(res.msg)
        this.deleteVisible = false
        this.initData()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.merchantList
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
.dlContent
  .dlIcon
    font-size 30px
  .dlTitle
    vertical-align text-bottom
    padding-left: 10px
    font-size: 16px
    color: #333
    font-weight: 500
  .dlMain
    position absolute
    top 64px
    left 64px
    color #666
    font-size 14px
</style>
<style lang="stylus">
.merchantList
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>

