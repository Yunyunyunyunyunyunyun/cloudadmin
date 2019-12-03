<template>
  <div class="customerPhone">
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
            <a-col class="search-item" :span="6">
              <a-form-item
                label="创建人员"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="accountManager"
                  placeholder="请选择创建人员"
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
            客服电话列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button type="primary" @click="add()">
              添加电话
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
        <template slot="cusType" slot-scope="cusType">
          <span>{{ cusType == 0?"设备屏幕展示":"" }}</span>
          <span>{{ cusType == 1?"猫回收调用":"" }}</span>
          <span>{{ cusType == 2?"猫先生调用":"" }}</span>
        </template>
        <template slot="operate" slot-scope="text">
          <a-button type="link" size="small" @click="view(text)">
            查看
          </a-button>
          <a-button type="link" size="small" @click="edit(text)">
            编辑
          </a-button>
          <a-button type="link" size="small" @click="del(text)">
            删除
          </a-button>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model="handleVisible"
      class="cusPhoneModal"
      title="客服电话配置"
      :confirm-loading="confirmLoading"
      @ok="handleModal"
      @cancel="closeModel"
    >
      <a-form :form="handleForm">
        <a-form-item label="客服电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['customPhone', {
              rules: [{ required: true, message: '请填写客服号码' }, {
                validator: validateToCustomPhone,
              }] }]"
            placeholder="请输入客服号码，区号后加“-”连接" allow-clear
          />
        </a-form-item>
        <a-form-item label="适用场景" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-select
            v-model="handleScenario"
            placeholder="请选择适用场景"
            class="w100"
            show-search
            option-filter-prop="children"
          >
            <a-select-option v-for="item in handleScenarios" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="适用区域" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }"
          class="areaItem"
        >
          <a-tree-select
            v-decorator="['area', { rules: [{ required: true, message: '请选择客服电话适用的具体区县' }] }]"
            class="areaSelect"
            :tree-data="treeData"
            :load-data="treeLoadData"
            tree-checkable
            allow-clear
            placeholder="请展开选择具体的区县"
            @treeExpand="onTreeExpand"
          />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-model="remark"
            placeholder="请填写备注信息" type="textarea" rows="3" maxlength="50"
          >
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="viewVisible"
      class="cusPhoneModal cusFooter"
      title="客服电话配置详情"
    >
      <template slot="footer">
        <a-button @click="handleCancel">
          关闭
        </a-button>
      </template>
      <a-form :form="viewForm">
        <a-form-item label="客服电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-model="viewCusPhone" disabled />
        </a-form-item>
        <a-form-item label="适用场景" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-model="viewScenario" disabled />
        </a-form-item>
        <a-form-item label="适用区域" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <div :title="viewArea" class="viewDiv">
            {{ viewArea.length > 30 ? viewArea.slice(0, 30) + "..." : viewArea }}
          </div>
        </a-form-item>
        <a-form-item label="创建人员" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-model="viewPeople" disabled />
        </a-form-item>
        <a-form-item label="创建时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-model="viewTime" disabled />
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-model="viewRemark"
            disabled type="textarea" rows="3" maxlength="50"
          >
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model="deleteVisible" ok-text="确定" :confirm-loading="delLoading"
      cancel-text="取消" class="comModal" @ok="deleteModal"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">是否确定删除此条客服电话配置</span>
        <div class="dlMain">
          删除后可能会导致设备或APP相关客服电话展示异常，请谨慎操作！
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getAreaList } from '@/api/common'
import { getManagerList } from '@/api/merchant'
import { getPhoneList, editPhone, addPhone, delPhone, viewPhone } from '@/api/rule'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_khhun27fquq.js'
})
const columns = [{
  title: '客服电话',
  key: 'phone',
  dataIndex: 'phone'
}, {
  title: '适用场景',
  key: 'cusType',
  dataIndex: 'cusType',
  scopedSlots: { customRender: 'cusType' }
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
  title: '创建人员',
  key: 'createUser',
  dataIndex: 'createUser'
}, {
  title: '操作',
  key: 'operate',
  width: 150,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'CustomerPhone',
  components: {
    IconFont
  },
  data () {
    return {
      areaContain: [],
      scenarios: [
        {
          id: '全部',
          name: '全部'
        },
        {
          id: 0,
          name: '设备屏幕展示'
        },
        {
          id: 1,
          name: '猫回收调用'
        },
        {
          id: 2,
          name: '猫先生调用'
        }
      ],
      scenario: '全部',
      accountManagers: [{
        managerId: '全部',
        managerName: '全部'
      }],
      accountManager: '全部',
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
      modelTitle: '',
      handleVisible: false,
      handleForm: this.$form.createForm(this, { name: 'handles' }),
      handleScenarios: [
        {
          id: 0,
          name: '设备屏幕展示'
        },
        {
          id: 1,
          name: '猫回收调用'
        },
        {
          id: 2,
          name: '猫先生调用'
        }
      ],
      handleScenario: 0,
      treeData: [],
      editArea: [],
      remark: '',
      editId: '',
      viewVisible: false,
      viewForm: this.$form.createForm(this, { name: 'views' }),
      viewCusPhone: '',
      viewScenario: '',
      viewArea: '',
      viewRemark: '',
      viewPeople: '',
      viewTime: '',
      deleteVisible: false,
      delId: '',
      confirmLoading: false,
      delLoading: false
    }
  },
  mounted () {
    this.getArea('', 2)
    this.getTreeArea('', 2)
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
    getTreeArea (id, layer) {
      getAreaList({
        id: id,
        layer: layer
      })
        .then(res => {
          let newData = JSON.parse(JSON.stringify(res.result.data).replace(/name/g, 'title'))
          newData = JSON.parse(JSON.stringify(newData).replace(/id/g, 'value'))
          newData.forEach(item => {
            if (item.layer === 2 || item.layer === 3) {
              item.disabled = true
            }
          })
          this.treeData = newData
        })
    },
    treeLoadData (treeNode) {
      const _this = this
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) { // 有值了直接渲染
          resolve()
          return
        }
        // 没有值根据当前父节点获取下面子节点并挂在树节点中，添加到对应父节点的children中
        getAreaList({
          id: treeNode.dataRef.value,
          layer: treeNode.dataRef.layer + 1
        })
          .then(res => {
            res.result.data.forEach(item => {
              if (item.layer === 4) {
                this.$set(item, 'isLeaf', true)
              }
            })
            let newData = JSON.parse(JSON.stringify(res.result.data).replace(/name/g, 'title'))
            newData = JSON.parse(JSON.stringify(newData).replace(/id/g, 'value'))
            newData.forEach(item => {
              if (item.layer === 2 || item.layer === 3) {
                item.disabled = true
              }
              if (item.layer === 4) {
                this.editArea.forEach(itemx => {
                  if (item.title === itemx.name) {
                    item.disabled = true
                  }
                })
              }
            })
            treeNode.dataRef.children = newData
            _this.treeData = [..._this.treeData]
          })
        resolve()
      })
    },
    onTreeExpand (val) {
      if (this.modelTitle === '添加') {
        this.treeData.forEach((item) => {
          if (item.children) {
            item.children.forEach(value => {
              if (value.layer === 3) {
                val.forEach((thing) => {
                  if (value.value === thing) {
                    value.disabled = false
                  }
                })
              }
            })
          }
        })
        const newArr = []
        this.treeData.forEach((item) => {
          if (item.layer === 2) {
            val.forEach((thing) => {
              if (item.value === thing) {
                if (item.children) {
                  item.children.forEach((it) => {
                    newArr.push(it.disabled)
                  })
                }
              }
            })
          }
        })
        this.treeData.forEach((item) => {
          if (newArr.length !== 0) {
            if (newArr.indexOf(true) === -1) {
              val.forEach((thing) => {
                if (item.value === thing) {
                  item.disabled = false
                }
              })
            }
          }
        })
      }
    },
    getTableData (params) {
      this.loading = true
      getPhoneList(params)
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
      params.menuId = '300fb87737dd4a72ae7daa9919434761'
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
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
      if (this.scenario !== '全部') {
        params.cusType = this.scenario
      }
      if (this.accountManager !== '全部') {
        params.createUser = this.accountManager
      }
      this.getTableData(params)
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.scenario = '全部'
      this.accountManager = '全部'
      const params = {}
      params.menuId = '300fb87737dd4a72ae7daa9919434761'
      params.page = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    handleFilterData (items) {
      const result = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (!list[i].children || (list[i].children && list[i].children.length === 0)) {
            if (list[i].isSelected) {
              result.push(list[i].name)
            }
          } else {
            filter(list[i].children)
          }
        }
      }
      filter(items)
      return result
    },
    handleFilterAllData (items) {
      const result = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (!list[i].children || (list[i].children && list[i].children.length === 0)) {
            if (list[i].isSelected) {
              result.push({ id: list[i].id, name: list[i].name })
            }
          } else {
            filter(list[i].children)
          }
        }
      }
      filter(items)
      return result
    },
    getPhoneInfo (params) {
      viewPhone(params).then(res => {
        if (this.modelTitle === '编辑') {
          this.handleForm.setFieldsValue({
            customPhone: res.result.info.phone,
            area: this.handleFilterData(res.result.info.areaList)
          })
          this.editArea = this.handleFilterAllData(res.result.info.areaList)
          this.handleScenario = res.result.info.cusType
          this.remark = res.result.info.remark
        } else if (this.modelTitle === '查看') {
          this.viewCusPhone = res.result.info.phone
          this.viewScenario = res.result.info.cusType === 0 ? '设备屏幕展示' : res.result.info.cusType === 1 ? '猫回收调用' : res.result.info.cusType === 2 ? '猫先生调用' : ''
          this.viewArea = this.handleFilterData(res.result.info.areaList).join(',')
          this.viewRemark = res.result.info.remark
          this.viewPeople = res.result.info.createUser
          this.viewTime = res.result.info.createTime
        }
      })
    },
    closeModel () {
      this.handleVisible = false
    },
    handleModal (e) {
      e.preventDefault()
      this.handleForm.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.phone = values.customPhone
          params.cusType = this.handleScenario
          params.remark = this.remark
          if (this.modelTitle === '添加') {
            params.menuId = 'b562e02eb2524a9aa4bc599b4423e567'
            params.areas = values.area
            this.confirmLoading = true
            addPhone(params).then(res => {
              this.confirmLoading = false
              this.handleVisible = false
              this.$message.success(res.msg)
              this.toSearch()
            }).catch(() => {
              this.confirmLoading = false
            })
          } else if (this.modelTitle === '编辑') {
            params.menuId = '056418b3a83e482e8189ac2df674c33d'
            const newArea = JSON.parse(JSON.stringify([...values.area]))
            this.editArea.forEach(item => {
              for (let i = 0; i < newArea.length; i++) {
                if (newArea[i] === item.name) {
                  newArea[i] = item.id
                }
              }
            })
            params.areas = newArea
            params.id = this.editId
            this.confirmLoading = true
            editPhone(params).then(res => {
              this.confirmLoading = false
              this.handleVisible = false
              this.$message.success(res.msg)
              this.toSearch()
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        }
      })
    },
    validateToCustomPhone (rule, value, callback) {
      const myreg = /^0[0-9]{2,3}-[0-9]{6}/
      if (value && !myreg.test(value)) {
        callback(new Error('请输入正确的客服电话格式'))
      } else {
        callback()
      }
    },
    add () {
      this.handleForm.resetFields('customPhone')
      this.handleScenario = 0
      this.handleForm.resetFields('area')
      this.remark = ''
      this.handleVisible = true
      this.modelTitle = '添加'
    },
    view (value) {
      this.viewVisible = true
      this.modelTitle = '查看'
      const params = {}
      params.menuId = 'f315c27fe1814455973bd9e52e7cf211'
      params.id = value.id
      this.getPhoneInfo(params)
    },
    handleCancel () {
      this.viewVisible = false
    },
    edit (value) {
      this.handleForm.resetFields('customPhone')
      this.handleScenario = 0
      this.handleForm.resetFields('area')
      this.remark = ''
      this.editId = value.id
      this.handleVisible = true
      this.modelTitle = '编辑'
      const params = {}
      params.menuId = 'f315c27fe1814455973bd9e52e7cf211'
      params.id = value.id
      this.getPhoneInfo(params)
    },
    del (value) {
      this.deleteVisible = true
      this.delId = value.id
    },
    deleteModal () {
      const params = {}
      params.menuId = '3eab0898224e4ccfa455dca7b8d72dea'
      params.id = this.delId
      this.delLoading = true
      delPhone(params).then(res => {
        this.delLoading = false
        this.$message.success('删除成功')
        this.deleteVisible = false
        this.initData()
      }).catch(() => {
        this.delLoading = false
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.customerPhone
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
.cusPhoneModal
  .viewDiv
    border-radius 2px
    font-size 12px
    color #000
    background-color #f5f5f5
    cursor pointer
    opacity 1
    box-sizing border-box
    margin 0
    position relative
    display inline-block
    width 100%
    padding 4px 11px
    height: 32px
    line-height 24px
    background-image none
    border 1px solid #d9d9d9
    overflow visible
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
.cusPhoneModal
  .ant-modal-body
    padding-bottom 0px
  .ant-form-item
    margin-bottom 16px
  .ant-modal-footer
    padding 0 24px 20px 24px
  .ant-select-dropdown
    max-height 400px !important
  .areaItem
    .ant-form-item-control
      line-height normal
      margin-top 4px
    .areaSelect
      .ant-select-selection
        max-height 112px
        overflow auto
  form textarea.ant-input
    margin-top 4px
.cusFooter
  .ant-modal-footer
    text-align center
.customerPhone
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>

