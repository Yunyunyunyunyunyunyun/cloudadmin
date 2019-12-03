<template>
  <div class="recycleOperate">
    <a-row class="commonContain mb16">
      <a-col :span="12" class="commonTitle">
        回收运营规则配置
      </a-col>
      <a-col :span="12" align="right">
        <a-button v-if="showEdit" @click="changeRule()">
          修改规则
        </a-button>
      </a-col>
    </a-row>
    <div class="card-content">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <div class="commonTitle mb16">
            订单规则
          </div>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="结算订单超时时限"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'overtimeLimit',
                  { rules: [{ required: true, message: '请填写结算订单超时时限' }, {
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="时" class="commonWidth"
                placeholder="请填写超时时限，只可输入0或者正整数" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="待抢订单页面停留时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'residence',
                  { rules: [{ required: true, message: '请填写待抢订单页面停留时间' }, {
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="秒" class="commonWidth"
                placeholder="请填写待抢订单页面停留时间，只可输入0或者正整数" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <div class="commonTitle mb16">
            处罚规则
          </div>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="回收超时罚金"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'penalty',
                  { rules: [{
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="元" class="commonWidth"
                placeholder="请填写金额，只可输入0或者正整数" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="取消回收超时罚金"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'cancelPenalty',
                  { rules: [{
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="元" class="commonWidth"
                placeholder="请填写金额，只可输入0或者正整数" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="结算超时罚金"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'allPenalty',
                  { rules: [{
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="元" class="commonWidth"
                placeholder="请填写金额，只可输入0或者正整数" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <div class="commonTitle mb16">
            奖励规则
          </div>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="奖励活动金额"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'reward',
                  { rules: [{
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="元" class="commonWidth"
                placeholder="请填写金额，只可输入0或者正整数" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <div class="commonTitle mb16">
            财务规则
          </div>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="预存额度"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'quota',
                  { rules: [{ required: true, message: '请填写预存额度' },{
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="元" class="commonWidth"
                placeholder="请填写金额，只可输入数字" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="保证金金额"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input
                v-decorator="[
                  'deposit',
                  { rules: [{ required: true, message: '请填写保证金金额' },{
                    validator: validateToNum,
                  }] }
                ]"
                allow-clear
                addon-after="元" class="commonWidth"
                placeholder="请填写金额，只可输入数字" :disabled="showEdit"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item v-if="!showEdit" :wrapper-col="{ span: 24 }" class="bottomBtn">
              <a-button class="mr16" @click="cancel()">
                取消
              </a-button>
              <a-button type="primary" html-type="submit" :loading="confirmLoading">
                保存
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>
<script>
import { getRule, editRule } from '@/api/rule'
export default {
  name: 'RecycleOperate',
  data () {
    return {
      showEdit: true,
      form: this.$form.createForm(this, { name: 'recycleOperates' }),
      ruleId: '',
      confirmLoading: false
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    changeRule () {
      this.showEdit = false
    },
    cancel () {
      this.showEdit = true
      this.initData()
    },
    initData () {
      const params = {}
      getRule(params).then(res => {
        this.ruleId = res.result.info.id
        this.form.setFieldsValue({
          overtimeLimit: res.result.info.timeLimit,
          residence: res.result.info.stopTime,
          quota: res.result.info.prestoreMoney,
          deposit: res.result.info.bail,
          penalty: res.result.info.recOverTimeFine,
          cancelPenalty: res.result.info.canOverTimeFine,
          allPenalty: res.result.info.setOverTimeFine,
          reward: res.result.info.activeReward
        })
      })
    },
    validateToNum (rule, value, callback) {
      const myreg = /^[+]{0,1}(\d+)$/
      if (value && !myreg.test(value)) {
        callback(new Error('请输入0或者正整数'))
      } else {
        callback()
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.menuId = '8d10beef3824479ea1a9d2cc86a39cfd'
          params.id = this.ruleId
          params.recOverTimeFine = values.penalty
          params.canOverTimeFine = values.cancelPenalty
          params.setOverTimeFine = values.allPenalty
          params.activeReward = values.reward
          params.timeLimit = values.overtimeLimit
          params.stopTime = values.residence
          params.prestoreMoney = values.quota
          params.bail = values.deposit
          this.confirmLoading = true
          editRule(params).then(res => {
            this.confirmLoading = false
            this.$message.success(res.msg)
            this.showEdit = true
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.recycleOperate
  background-color #fff
  padding 16px 20px 0 20px
  margin-bottom 20px
  font-size 12px
  color #000
  .commonWidth
    width 650px
  .mb16
    margin-bottom 16px
  .mr16
    margin-right 16px
  .commonContain
    height 32px
    line-height 32px
  .line-item
    height 40px
    line-height 40px
    margin-bottom 14px
  .commonTitle
    font-size 16px
    font-weight 600
    color #333
  .bottomBtn
    margin-top 16px
    text-align center
</style>
