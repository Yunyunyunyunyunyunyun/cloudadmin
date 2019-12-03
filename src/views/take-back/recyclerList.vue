<template>
  <div class="recyclerList">
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
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
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
                label="工号"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input v-model="workNum" allow-clear placeholder="请输入回收人员工号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="姓名"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input v-model="recyclerName" allow-clear placeholder="请输入回收人员姓名" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="手机号"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-input v-model="phoneNum" allow-clear placeholder="请输入手机号" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="当前工作状态"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-select
                  v-model="workStatus"
                  placeholder="请选择当前工作状态"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    休息中
                  </a-select-option>
                  <a-select-option value="1">
                    接单中
                  </a-select-option>
                  <a-select-option value="2">
                    禁用中
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="车辆属性"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-select
                  v-model="carType"
                  placeholder="请选择车辆类型"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    用户自有
                  </a-select-option>
                  <a-select-option value="1">
                    公司配备
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="绑定车辆状态"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
              >
                <a-select
                  v-model="bindCarStatus"
                  placeholder="请选择绑定车辆状态"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    未绑定
                  </a-select-option>
                  <a-select-option value="1">
                    已绑定
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
          <a-col :span="24" class="title">
            回收人员列表
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
        <template slot="carStatus" slot-scope="carStatus">
          <span>{{ carStatus == 0?"未绑定":"" }}</span>
          <span>{{ carStatus == 1?"已绑定":"" }}</span>
        </template>
        <template slot="carType" slot-scope="carTypes">
          <span>{{ carTypes == '0'?"用户自有":"" }}</span>
          <span>{{ carTypes == '1'?"公司配备":"" }}</span>
        </template>
        <template slot="workState" slot-scope="workState, text">
          <span>{{ text.isEnable==1?'禁用中':workState==0?'休息中':workState==1?'接单中':'' }}</span>
        </template>
        <template slot="prestoreTotal" slot-scope="prestoreTotal, text">
          {{ prestoreTotal }}<span v-if="text.changeMoney>0" class="redFont">(+{{ text.changeMoney }})</span>
        </template>
        <template slot="operate" slot-scope="text, record">
          <a-button type="link" size="small" @click="view(text)">
            查看
          </a-button>
          <a-button type="link" size="small" @click="edit(text)">
            编辑
          </a-button>
          <a-button
            v-if="text.isEnable===0" type="link" size="small"
            @click="prohibit(text)"
          >
            禁用
          </a-button>
          <a-button
            v-else-if="text.isEnable===1" type="link" size="small"
            @click="startUse(text)"
          >
            启用
          </a-button>
          <a-button
            v-if="record.isEnable!==1" type="link" size="small"
            @click="handle(text)"
          >
            {{ text.changeMoney===0?'提额':'降额' }}
          </a-button>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model="handleVisible"
      class="commonModal"
      @ok="handleModal"
      @cancel="closeModel"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">是否确定{{ handleMain }}此回收人员担保额度</span>
        <a-form :form="handleForm" class="mt16">
          <a-form-item :label="handleMain+'额度'" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-input
              v-decorator="['upgrade', { initialValue: initUpgrade,
                                         rules: [{ required: true, message: '请填写'+handleMain+'额度' }, {
                                           validator: validateToUpgrade,
                                         }] }]"
              placeholder="请输入正整数" :disabled="handleDisable" allow-clear
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      v-model="prohibitVisible" class="commonModal" @ok="prohibitModal" @cancel="prohibitVisible=false"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">是否确定禁用此回收人员账号</span>
        <a-form :form="prohibitForm" class="mt16 pForm">
          <a-form-item>
            <a-input
              v-decorator="['prohibitDesc', { rules: [{ required: true, message: '请填写禁用事由' }] }]"
              placeholder="请填写禁用事由（必填）" type="textarea" rows="3" maxlength="50"
            >
            </a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      v-model="startVisible" class="comModal" ok-text="确定"
      cancel-text="取消" @ok="startModal"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">提示</span>
        <div class="dlMain">
          是否确定启用此回收人员账号？
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getAreaList } from '@/api/common'
import { getRecycleUser, upDownMoney, editRecycle } from '@/api/takeBack'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_cd12n3nbvgd.js'
})
const columns = [{
  title: '工号',
  key: 'number',
  dataIndex: 'number'
}, {
  title: '姓名',
  key: 'realName',
  dataIndex: 'realName'
}, {
  title: '手机号',
  key: 'mobile',
  dataIndex: 'mobile'
}, {
  title: '入驻时间',
  key: 'createTime',
  dataIndex: 'createTime'
}, {
  title: '累计接单数',
  key: 'orderTotal',
  dataIndex: 'orderTotal'
}, {
  title: '主动取消单数',
  key: 'orderCancelCount',
  dataIndex: 'orderCancelCount'
}, {
  title: '累计提现（元）',
  key: 'balanceTotal',
  dataIndex: 'balanceTotal'
}, {
  title: '可提现余额（元）',
  key: 'balance',
  dataIndex: 'balance'
}, {
  title: '固定担保额度',
  key: 'prestoreTotal',
  dataIndex: 'prestoreTotal',
  scopedSlots: { customRender: 'prestoreTotal' }
}, {
  title: '当前剩余额度',
  key: 'prestore',
  dataIndex: 'prestore'
}, {
  title: '车辆属性',
  key: 'carType',
  dataIndex: 'carType',
  scopedSlots: { customRender: 'carType' }
}, {
  title: '绑定车辆状态',
  key: 'carStatus',
  dataIndex: 'carStatus',
  scopedSlots: { customRender: 'carStatus' }
}, {
  title: '当前工作状态',
  key: 'workState',
  dataIndex: 'workState',
  scopedSlots: { customRender: 'workState' }
}, {
  title: '操作',
  key: 'operate',
  width: 200,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'RecyclerList',
  components: {
    IconFont
  },
  data () {
    return {
      areaContain: [],
      areaLabel: [],
      options: [],
      recyclerName: '',
      workNum: '',
      phoneNum: '',
      workStatus: '全部',
      carType: '全部',
      bindCarStatus: '全部',
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
      initUpgrade: '',
      handleVisible: false,
      handleMain: '',
      handleForm: this.$form.createForm(this, { name: 'handleForms' }),
      prohibitForm: this.$form.createForm(this, { name: 'prohibitForms' }),
      prohibitVisible: false,
      startVisible: false,
      handleDisable: false,
      handleId: '',
      prohibitId: '',
      startId: ''
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
      getRecycleUser(params)
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
      params.menuId = 'ab5abd9024c442b69320f5dc15b6fb3c'
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
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
      if (this.workNum) {
        params.number = this.workNum
      }
      if (this.recyclerName) {
        params.realName = this.recyclerName
      }
      if (this.phoneNum) {
        params.mobile = this.phoneNum
      }
      if (this.workStatus !== '全部') {
        params.workState = Number(this.workStatus)
      }
      if (this.carType !== '全部') {
        params.type = Number(this.carType)
      }
      if (this.bindCarStatus !== '全部') {
        params.carStatus = this.bindCarStatus
      }
      this.getTableData(params)
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.areaContain = []
      this.workNum = ''
      this.recyclerName = ''
      this.workStatus = '全部'
      this.phoneNum = ''
      this.carType = '全部'
      this.bindCarStatus = '全部'
      const params = {}
      params.menuId = 'ab5abd9024c442b69320f5dc15b6fb3c'
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
    handle (value) {
      this.handleId = value.id
      this.handleVisible = true
      if (value.changeMoney === 0) {
        this.handleMain = '提升'
        this.initUpgrade = ''
        this.handleForm.resetFields('upgrade')
        this.handleDisable = false
      } else {
        this.handleMain = '降低'
        this.initUpgrade = value.changeMoney
        this.handleDisable = true
      }
    },
    closeModel () {
      this.handleVisible = false
      this.initUpgrade = ''
      this.handleForm.resetFields('upgrade')
    },
    handleModal (e) {
      e.preventDefault()
      this.handleForm.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.menuId = '9d1ca390f9cd4d4eaf67998158d1635e'
          params.id = this.handleId
          params.money = values.upgrade
          if (this.handleMain === '提升') {
            params.type = 0
          } else if (this.handleMain === '降低') {
            params.type = 1
          }
          upDownMoney(params).then(res => {
            if (res.msg === '当前剩余担保额度小于降额，暂不允许此操作') {
              this.$message.warn(res.msg)
            } else {
              this.$message.success(res.msg)
            }
            this.handleVisible = false
            this.initData()
          })
        }
      })
    },
    validateToUpgrade (rule, value, callback) {
      const myreg = /^[1-9]\d*$/
      if (value && !myreg.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    },
    view (value) {
      this.$router.push({
        path: '/takeBack/recyclerList/recyclerDetails',
        query: { id: value.id, title: '查看' }
      })
    },
    edit (value) {
      this.$router.push({
        path: '/takeBack/recyclerList/recyclerDetails',
        query: { id: value.id, title: '编辑' }
      })
    },
    prohibit (value) {
      this.prohibitVisible = true
      this.prohibitId = value.id
      if (this.prohibitForm.getFieldValue('prohibitDesc')) {
        this.prohibitForm.setFieldsValue({
          prohibitDesc: ''
        })
      }
    },
    prohibitModal (e) {
      e.preventDefault()
      this.prohibitForm.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.menuId = 'a54206193f054cb49af1449b2df517cf'
          params.id = this.prohibitId
          params.disableMessage = values.prohibitDesc
          params.isEnable = 1
          editRecycle(params).then(res => {
            this.$message.success(res.msg)
            this.prohibitVisible = false
            this.initData()
          })
        }
      })
    },
    startUse (value) {
      this.startVisible = true
      this.startId = value.id
    },
    startModal () {
      const params = {}
      params.menuId = 'a54206193f054cb49af1449b2df517cf'
      params.id = this.startId
      params.isEnable = 0
      editRecycle(params).then(res => {
        this.$message.success(res.msg)
        this.startVisible = false
        this.initData()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.recyclerList
  .w100
    width 100%
  .mr8
    margin-right 8px
  .redFont
    color red
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
  .mt16
    margin-top 16px
</style>
<style lang="stylus">
.commonModal
  .ant-modal-body
    padding-bottom 0px
  .ant-form-item
    margin-bottom 16px
  .ant-modal-footer
    padding 0 24px 20px 24px
  form textarea.ant-input, .pForm .ant-form-explain
    margin-left 40px
    width calc(100% - 40px)
.recyclerList
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>

