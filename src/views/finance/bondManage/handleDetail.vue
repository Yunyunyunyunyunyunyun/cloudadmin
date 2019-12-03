<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        保证金账户信息
      </div>
      <div class="card-content">
        <a-form ref="detailForm" :form="form" class="detail-form">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="人员姓名"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['realName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="人员账号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['mobile']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="入驻时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['createTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="缴纳保证金时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['bailTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="剩余保证金（元）"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['surplusDeposit']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="累计扣减（元）"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['changeDeposit']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="card-title mt16">
        保证金操作记录
      </div>
      <div class="card-content">
        <a-row style="padding-left: 12px;">
          <a-col :span="23">
            <a-table
              class="table-content"
              :columns="columns"
              :data-source="data"
              :row-key="record => record.id"
              :loading="loading"
              :pagination="pagination"
              @change="handleTableChange"
            >
              <template slot="order" slot-scope="text,record,index">
                {{ index + 1 }}
              </template>
              <template slot="remark" slot-scope="text">
                <div :title="text">
                  {{ text.length > 10 ? text.substring(0, 10) + '...' : text }}
                </div>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </div>
      <div class="card-content mb40 mt40">
        <a-row>
          <a-col
            :span="24" type="flex" align="middle"
            style="text-align:center;"
          >
            <a-button class="mr8" @click="back">
              返回
            </a-button>
            <a-button class="mr8" type="primary" @click="bondOperate(1)">
              扣减保证金
            </a-button>
            <a-button class="mr8" type="primary" @click="bondOperate(2)">
              撤销扣减
            </a-button>
            <a-button type="primary" @click="bondOperate(3)">
              退还保证金
            </a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-modal
      :title="bondObj.title" centered :visible="bondObj.visible" :mask-closable="false"
      @ok="bondConfirm" @cancel="bondObj.visible = false"
    >
      <a-form :form="bondObj.form">
        <a-form-item
          label="人员账号"
          v-bind="bondObj.formItemLayout"
        >
          <a-input
            v-model="detail.mobile"
            disabled
          />
        </a-form-item>
        <a-form-item
          label="变动类型"
          v-bind="bondObj.formItemLayout"
        >
          <a-input
            v-model="changeType"
            disabled
          />
        </a-form-item>
        <a-form-item
          v-if="operateType==1"
          label="处罚单号类型"
          v-bind="bondObj.formItemLayout"
        >
          <a-radio-group v-decorator="['originType', {initialValue: '1'}]" @change="changeOrgType">
            <a-radio value="1">
              回收订单
            </a-radio>
            <a-radio value="2">
              结算订单
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="operateType==1"
          label="关联单号"
          v-bind="bondObj.formItemLayout"
        >
          <a-select
            v-decorator="['originOrderId', { rules: [{ required: true, message: '请选择关联单号' }] }]"
            allow-clear
            placeholder="请选择"
            @change="changeOrder1"
          >
            <a-select-option v-for="(item, index) in orderNumList" :key="index" :value="item.orderId">
              {{ item.orderId }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="operateType==1"
          label="扣减金额"
          v-bind="bondObj.formItemLayout"
        >
          <a-input
            v-decorator="['changeDeposit', { rules: [{ required: true, message: '请输入扣减金额' }] }]"
            allow-clear placeholder="请输入扣减金额"
          />
        </a-form-item>
        <a-form-item
          v-if="operateType==2"
          label="撤销扣减单号"
          v-bind="bondObj.formItemLayout"
        >
          <a-select
            v-decorator="['originOrderId', { rules: [{ required: true, message: '请选择关联单号' }] }]"
            allow-clear
            placeholder="请选择"
            @change="changeOrder2"
          >
            <a-select-option v-for="(item,index) in userBailList" :key="index" :value="item.orderId">
              {{ item.orderId }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="operateType==2"
          label="撤销扣减金额"
          v-bind="bondObj.formItemLayout"
        >
          <a-input
            v-decorator="['changeDeposit', { rules: [{ required: true, message: '请输入扣减金额' }] }]"
            disabled
          />
        </a-form-item>
        <a-form-item
          v-if="operateType==3"
          label="退还保证金"
          v-bind="bondObj.formItemLayout"
        >
          <a-input
            v-decorator="['changeDeposit', { rules: [{ required: true, message: '请输入退还保证金' }] }]"
            disabled
          />
        </a-form-item>
        <a-form-item
          v-if="operateType==3"
          label="退还账号"
          v-bind="bondObj.formItemLayout"
        >
          <a-input
            v-decorator="['backAccount', { rules: [{ required: true, message: '请输入退还账号' }] }]"
          />
        </a-form-item>
        <a-form-item
          label="备注"
          v-bind="bondObj.formItemLayout"
        >
          <a-textarea
            v-decorator="['remark', { rules: [{ required: true, message: '请填写备注(不能超过50字)', max: 50 }] }]"
            placeholder="请填写备注(不能超过50字)"
            :autosize="{ minRows: 4, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      changeType: '',
      detail: {},
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: 'detailForm' }),
      columns: [
        {
          title: '序号',
          align: 'center',
          width: 70,
          scopedSlots: { customRender: 'order' }
        },
        {
          title: '流水号',
          dataIndex: 'orderId'
        },
        {
          title: '保证金变动（元）',
          dataIndex: 'changeDeposit',
          customRender (val, row, index) {
            if (row.type === 1 || row.type === 3) {
              return '-' + val
            } else {
              return '+' + val
            }
          }
        },
        {
          title: '剩余保证金（元）',
          dataIndex: 'surplusDeposit'
        },
        {
          title: '变动类型',
          dataIndex: 'type',
          customRender (val, row, index) {
            if (val === 0) return '缴纳保证金'
            if (val === 1) return '处罚扣减'
            if (val === 2) return '撤销处罚'
            if (val === 3) return '退还保证金'
          }
        },
        {
          title: '关联订单号',
          dataIndex: 'originOrderId'
        },
        {
          title: '操作时间',
          dataIndex: 'createTime'
        },
        {
          title: '操作人',
          dataIndex: 'createUser'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'remark' }
        }
      ],
      data: [],
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
      loading: false,
      bondObj: {
        visible: false,
        title: '',
        form: this.$form.createForm(this, { name: 'bondForm' }),
        formItemLayout: {
          labelCol: { span: 5 },
          wrapperCol: { span: 15 }
        }
      },
      operateType: 1,
      orderNumList: [],
      userBailList: [],
      selectOrderObj: {}
    }
  },
  mounted () {
    this.detail = JSON.parse(this.$route.query.info)
    this.getDetail()
    this.getTableData()
  },
  methods: {
    getDetail () {
      var data = this.detail
      this.form.setFieldsValue({
        surplusDeposit: data.surplusDeposit,
        realName: data.realName,
        mobile: data.mobile,
        createTime: data.createTime,
        bailTime: data.bailTime,
        changeDeposit: data.changeDeposit
      })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.getTableData()
    },
    getTableData () {
      this.loading = true
      var param = {}
      param.menuId = 'd917cf3ab1d54a30a686123ec8015a18'
      param.recycleUserId = this.detail.recycleUserId
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      this.$httpPost(this.$basePath.recordList, param)
        .then(res => {
          this.loading = false
          this.data = res.result.list
          this.pagination.total = res.result.totalCount
        })
    },
    back () {
      this.$router.push({
        path: '/finance/bondManage/bondHandle'
      })
    },
    bondOperate (type) {
      this.bondObj.visible = true
      this.bondObj.form.resetFields()
      switch (type) {
        case 1:
          this.changeType = '处罚扣减'
          this.operateType = 1
          this.bondObj.title = '扣减保证金'
          this.getOrderNumber('1')
          break
        case 2:
          this.changeType = '撤销扣减'
          this.operateType = 2
          this.bondObj.title = '撤销扣减'
          this.getUserBail()
          break
        case 3:
          this.changeType = '退还保证金'
          this.operateType = 3
          this.bondObj.title = '退还保证金'
          this.getRecycleUser()
          break
      }
    },
    changeOrgType (val) {
      this.bondObj.form.setFieldsValue({ originOrderId: undefined })
      this.getOrderNumber(val.target.value)
    },
    getOrderNumber (type) {
      this.$httpPost(this.$basePath.getOrderNumber, {
        recycleUserId: this.detail.recycleUserId,
        originType: type
      })
        .then(res => {
          this.orderNumList = res.result
        })
    },
    getUserBail () {
      this.$httpPost(this.$basePath.getUserBail, {
        recycleUserId: this.detail.recycleUserId
      })
        .then(res => {
          this.userBailList = res.result
          this.bondObj.changeDeposit = res.result.changeDeposit
        })
    },
    getRecycleUser () {
      this.$httpPost(this.$basePath.getRecycleUser, {
        recycleUserId: this.detail.recycleUserId
      })
        .then(res => {
          this.$nextTick(() => {
            this.bondObj.form.setFieldsValue({ changeDeposit: res.result.bail })
          })
        })
    },
    changeOrder1 (val, option) {
      this.selectOrderObj = {}
      this.orderNumList.forEach(item => {
        if (val === item.orderId) {
          this.selectOrderObj = item
        }
      })
    },
    changeOrder2 (val) {
      this.selectOrderObj = {}
      this.userBailList.forEach(item => {
        if (val === item.orderId) {
          this.selectOrderObj = item
        }
      })
      this.bondObj.form.setFieldsValue({ 'changeDeposit': this.selectOrderObj.changeDeposit })
    },
    bondConfirm () {
      this.bondObj.form.validateFields((err, values) => {
        if (!err) {
          if (this.operateType === 1) {
            const param = this.bondObj.form.getFieldsValue()
            param.menuId = '7978226b4ed64be0acae76f6374a4100'
            param.recycleUserId = this.detail.recycleUserId
            param.originId = this.selectOrderObj.id
            param.type = 1
            this.comfirmSubmit(param)
          }
          if (this.operateType === 2) {
            const param = this.bondObj.form.getFieldsValue()
            param.menuId = '7978226b4ed64be0acae76f6374a4100'
            param.recycleUserId = this.detail.recycleUserId
            param.originId = this.selectOrderObj.id
            param.type = 2
            this.comfirmSubmit(param)
          }
          if (this.operateType === 3) {
            var data = this.bondObj.form.getFieldsValue()
            const param = {}
            param.menuId = '7978226b4ed64be0acae76f6374a4100'
            param.changeDeposit = data.changeDeposit
            param.remark = '（退款账号：' + data.backAccount + '）' + data.remark
            param.originId = this.detail.recycleUserId
            param.recycleUserId = this.detail.recycleUserId
            param.type = 3
            this.comfirmSubmit(param)
          }
        }
      })
    },
    comfirmSubmit (param) {
      this.$httpPost(this.$basePath.bailEdit, param)
        .then(res => {
          this.$message.success(res.msg)
          this.bondObj.visible = false
          this.getTableData()
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
// 注释
</style>
