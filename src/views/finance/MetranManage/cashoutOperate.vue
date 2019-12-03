<template>
  <div>
    <div class="card-container">
      <a-form ref="detailForm" class="detail-form">
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
                  v-model="detail.orderNo"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="提现审核状态"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.payStateName"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="会员昵称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.userName"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.cellPhone"
                  disabled
                >
                  <a-button
                    v-if="detail.cellPhone != cellPhone" slot="suffix" type="link"
                    @click="showCompleteMobile"
                  >
                    完整展示
                  </a-button>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="提现金额（元）"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.amount"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="服务费（元）"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.serviceFee"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
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
            <a-col :span="12">
              <a-form-item
                label="申请到账账号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.moblie"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="detail.payState == '2' || detail.payState == '3'">
            <a-col :span="12">
              <a-form-item
                label="申请到账渠道"
                v-bind="formItemLayout"
              >
                <a-input
                  v-model="detail.channel"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <template v-if="isRecord">
          <div class="card-title">
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
                    v-model="detail.updateTime"
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
                    v-model="detail.operator"
                    disabled
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
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
      </a-form>
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
              v-if="isApply && refuse" class="mr8"
              @click="refuseApply"
            >
              拒绝申请
            </a-button>
            <a-button
              v-if="isApply" type="primary"
              @click="applyPass"
            >
              审核通过
            </a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <comfirmModal
      :dialog-obj="dialogObj" :is-btnok="dialogObj.isBtnok" :ok-loading="auditLoading"
      @handleOk="handleOk"
    >
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
import comfirmModal from '@/components/commonModal/comfirmModal.vue'
export default {
  components: { comfirmModal },
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
      },
      detail: {},
      dialogObj: {
        isBtnok: true,
        visible: false,
        iconType: 'question-circle',
        title: '',
        form: this.$form.createForm(this, { name: 'cash' })
      },
      cellPhone: '',
      auditLoading: false
    }
  },
  computed: {
    isApply () {
      if (this.$route.name === 'cashoutApplyView') {
        return false
      } else {
        return true
      }
    },
    refuse () {
      return !this.$route.query.refuse
    },
    isRecord () {
      return this.$route.query.isRecord
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      var detail = JSON.parse(this.$route.query.info)
      if (detail.payState === '1') detail.payStateName = '待审核'
      if (detail.payState === '2') detail.payStateName = '已审核'
      if (detail.payState === '3') detail.payStateName = '已拒绝'
      if (detail.payState === '4') detail.payStateName = '打款失败'
      this.cellPhone = detail.cellPhone
      detail.cellPhone = detail.cellPhone && detail.cellPhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
      this.detail = detail
    },
    refuseApply () {
      this.dialogObj.title = '是否确定拒绝提现申请'
      this.dialogObj.form.resetFields()
      this.dialogObj.visible = true
      this.dialogObj.payState = '3'
    },
    applyPass () {
      this.dialogObj.title = '是否确定通过提现审核'
      this.dialogObj.form.resetFields()
      this.dialogObj.visible = true
      this.dialogObj.payState = '2'
    },
    handleOk () {
      this.auditLoading = true
      this.dialogObj.form.validateFields(err => {
        if (!err) {
          this.$httpPost(this.$basePath.postalVerify, {
            menuId: '25e09c3f7558455ebc175f9c69a9b0a6',
            id: this.detail.id,
            remark: this.dialogObj.form.getFieldValue('remark'),
            payState: this.dialogObj.payState
          })
            .then(res => {
              this.auditLoading = false
              this.dialogObj.visible = false
              this.$router.push({
                path: '/finance/MetranManage/cashoutApply'
              })
            })
        }
      })
    },
    back () {
      this.$router.push({
        path: '/finance/MetranManage/cashoutApply'
      })
    },
    showCompleteMobile () {
      this.detail.cellPhone = this.cellPhone
    }
  }
}
</script>

<style lang="stylus" scoped>
// 注释
</style>
