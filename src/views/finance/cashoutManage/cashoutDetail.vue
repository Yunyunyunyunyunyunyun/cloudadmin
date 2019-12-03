<template>
  <div>
    <div class="card-container">
      <a-form ref="detailForm" :form="form" class="detail-form">
        <div class="card-title">
          基础信息
        </div>
        <div class="card-content">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="提现订单号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.orderId"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="姓名"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.userName"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.phone"
                  disabled
                >
                  <a-button
                    v-if="detail.phone != realPhone" slot="suffix" type="link"
                    @click="showCompleteMobile"
                  >
                    完整展示
                  </a-button>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="提现金额（元）"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.auditPrice"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="服务费（元）"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.fee"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="申请提现时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.createTime"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="提现到账渠道"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.channel"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="提现到账账号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.account"
                  disabled
                >
                  <a-button
                    v-if="detail.account != realAccount" slot="suffix" type="link"
                    @click="showCompleteAccount"
                  >
                    完整展示
                  </a-button>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <template v-if="!isApply">
          <div class="card-title mt16">
            打款信息
          </div>
          <div class="card-content">
            <a-row>
              <a-col :span="12">
                <a-form-item
                  label="打款单号"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-model="detail.payOrder"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="打款时间"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-model="detail.payTime"
                    disabled
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item
                  label="打款金额"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-model="detail.payPrice"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="打款人"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-model="detail.payUserName"
                    disabled
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </template>
        <div class="card-title mt16">
          账户余额变动信息
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
              </a-table>
            </a-col>
          </a-row>
        </div>
        <template v-if="!isApply">
          <div class="card-title mt16">
            审核记录
          </div>
          <div class="card-content">
            <a-row>
              <a-col :span="12">
                <a-form-item
                  label="审核时间"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-model="detail.auditTime"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="审核人"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-model="detail.auditUserName"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="审核状态"
                  v-bind="formItemLayout"
                >
                  <a-select
                    v-model="detail.status"
                    allow-clear
                    placeholder="全部"
                    disabled
                  >
                    <a-select-option :value="0">
                      待审核
                    </a-select-option>
                    <a-select-option :value="1">
                      已审核未打款
                    </a-select-option>
                    <a-select-option :value="2">
                      已审核已打款
                    </a-select-option>
                    <a-select-option :value="3">
                      已拒绝
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="备注"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-model="detail.remark"
                    disabled
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </template>
        <div class="card-content mb40 mt40">
          <a-row>
            <a-col
              :span="24" type="flex" align="middle"
              style="text-align:center;"
            >
              <a-button class="mr8" :type="isApply?'':'primary'" @click="back">
                返回
              </a-button>
              <a-button
                v-if="isApply" class="mr8"
                @click="refuseApply"
              >
                拒绝申请
              </a-button>
              <a-button v-if="isApply" type="primary" @click="applyPass">
                审核通过
              </a-button>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <comfirmModal :dialog-obj="dialogObj" @handleOk="handleOk">
      <a-form :form="dialogObj.form">
        <a-form-item class="comfirm-formitem">
          <a-textarea
            v-decorator="['remark', {rules: [{required: true, message: '请输入审核意见'}]}]"
            placeholder="请输入审核意见（必填）"
            :autosize="{ minRows: 4, maxRows: 4 }"
          />
        </a-form-item>
      </a-form>
    </comfirmModal>
  </div>
</template>

<script>
import moment from 'moment'
import comfirmModal from '@/components/commonModal/comfirmModal.vue'
export default {
  components: {
    comfirmModal
  },
  data () {
    return {
      realPhone: '',
      realAccount: '',
      detail: { },
      isApply: true,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: 'detailForm' }),
      form1: this.$form.createForm(this, { name: 'detailForm1' }),
      form2: this.$form.createForm(this, { name: 'detailForm2' }),
      columns: [
        {
          title: '流水号',
          dataIndex: 'orderId'
        },
        {
          title: '时间',
          dataIndex: 'createTime',
          customRender (val, row, index) {
            if (val) {
              return moment(val).format('YYYY-MM-DD HH:mm:ss')
            }
          }
        },
        {
          title: '余额变动（元）',
          dataIndex: 'changeBalance'
        },
        {
          title: '服务费（元）',
          dataIndex: 'serverCharge'
        },
        {
          title: '账户可用余额（元）',
          dataIndex: 'balance'
        },
        {
          title: '余额变动类型',
          dataIndex: 'type',
          customRender (val, row, index) {
            if (val === 0) return '结算'
            if (val === 1) return '提现'
          }
        }
      ],
      data: [],
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
      remark: '',
      dialogObj: {
        type: 1,
        visible: false,
        iconType: 'question-circle',
        title: '',
        form: this.$form.createForm(this, { name: 'applyForm' })
      }
    }
  },
  mounted () {
    if (this.$route.name === 'apply') {
      this.isApply = true
    } else {
      this.isApply = false
    }
    this.initValue()
    this.getTableData()
  },
  methods: {
    moment,
    initValue () {
      this.detail = JSON.parse(this.$route.query.info)
      this.realPhone = this.detail.phone
      this.realAccount = this.detail.account
      this.detail.phone = this.detail.phone && this.detail.phone.length === 11 ? this.detail.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : this.detail.phone
      this.detail.account = this.detail.account && this.detail.account.length === 11 ? this.detail.account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : this.detail.account
      this.detail.createTime = moment(this.detail.createTime).format('YYYY-MM-DD HH:mm:ss')
      this.detail.auditTime = moment(this.detail.auditTime).format('YYYY-MM-DD HH:mm:ss')
      this.detail.payTime = moment(this.detail.payTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.getTableData()
    },
    getTableData () {
      this.loading = true
      var param = {}
      param.menuId = '57fbc08d1eb744c79bb4e97c32041517'
      param.userName = this.detail.userName
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      this.$httpPost(this.$basePath.balanceRecordList, param)
        .then(res => {
          this.loading = false
          this.data = res.result.list
          this.pagination.total = res.result.totalCount
        })
        .catch(() => {
          this.loading = false
        })
    },
    showCompleteMobile () {
      this.detail.phone = this.realPhone
    },
    showCompleteAccount () {
      this.detail.account = this.realAccount
    },
    back () {
      this.$router.push({
        path: '/finance/cashoutManage/cashoutApply'
      })
    },
    handleOk () {
      this.dialogObj.form.validateFields((err) => {
        if (!err) {
          if (this.dialogObj.type === 1) { // 拒绝
            this.applyComfirm({
              menuId: '8443920df72048a8947289fb042ee202',
              id: this.detail.id,
              remark: this.dialogObj.form.getFieldValue('remark'),
              status: 3
            })
          }
          if (this.dialogObj.type === 2) { // 通过
            this.applyComfirm({
              menuId: '8443920df72048a8947289fb042ee202',
              id: this.detail.id,
              remark: this.dialogObj.form.getFieldValue('remark'),
              status: 1
            })
          }
        }
      })
    },
    applyComfirm (param) {
      this.$httpPost(this.$basePath.auditCashout, param)
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({
            path: '/finance/cashoutManage/cashoutApply'
          })
        })
    },
    refuseApply () {
      this.dialogObj.type = 1
      this.dialogObj.form.resetFields()
      this.dialogObj.visible = true
      this.dialogObj.title = '是否确定拒绝审核'
    },
    applyPass () {
      this.dialogObj.type = 2
      this.dialogObj.form.resetFields()
      this.dialogObj.visible = true
      this.dialogObj.title = '是否确定通过审核'
    }
  }
}
</script>

<style lang="stylus" scoped>
// 注释
</style>
