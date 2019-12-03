<template>
  <div>
    <div class="card-container">
      <a-form ref="detailForm" :form="form" class="detail-form">
        <div class="card-title">
          清运信息
        </div>
        <div class="card-content">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="清运完成时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['pickUpCompleteTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="上一次清运时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['lastPickUpTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="清运人员"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['cleanName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="巡检人员"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['inspectName']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="清运人手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['cleanPhone']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="巡检人手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['inspectPhone']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="清运设备类型"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productType']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="清运垃圾分类"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['boxType']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col v-if="garbage" :span="12">
              <a-form-item
                label="用户投递总重量"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['deliveryWeight']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-else :span="12">
              <a-form-item
                label="用户投递总次数"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['userDeliveryTimes']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-if="garbage" :span="12">
              <a-form-item
                label="清运总重量"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['weight']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col v-else :span="12">
              <a-form-item
                label="清运总次数"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['pickUpTimes']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <div class="card-title">
          设备信息
        </div>
        <div class="card-content">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备名称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="设备型号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productMark']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备编号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productNumber']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="位置信息"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['position']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="区域"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['areaName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="小区"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['housingEstate']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-form>
      <div class="card-content mb40 mt40">
        <a-row type="flex" justify="center">
          <a-col
            :span="12" type="flex" align="middle"
            style="text-align:center;"
          >
            <a-button class="mr8" type="primary" @click="back">
              返回
            </a-button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      garbage: true,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: 'detailForm' })
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$httpGet(this.$basePath.getPickUpInfoById, {
        menuId: '204528e91bcb47d592373801d260002c',
        id: this.$route.query.id
      })
        .then(res => {
          this.initForm(res.result)
        })
    },
    initForm (data) {
      this.form.setFieldsValue({
        areaName: data.areaName,
        lastPickUpTime: data.lastPickUpTime,
        pickUpCompleteTime: data.pickUpCompleteTime,
        boxType: data.boxType,
        housingEstate: data.housingEstate,
        position: data.position,
        productMark: data.productMark,
        productName: data.productName,
        productNumber: data.productNumber,
        productType: data.productType,
        spillOverStatus: data.spillOverStatus,
        spillOverTime: data.spillOverTime,
        inspectName: data.inspectName,
        inspectPhone: data.inspectPhone,
        cleanName: data.cleanName,
        cleanPhone: data.cleanPhone
      })
      this.garbage = !data.garbage
      if (data.garbage) {
        this.form.setFieldsValue({
          pickUpTimes: data.pickUpTimes,
          userDeliveryTimes: data.userDeliveryTimes
        })
      } else {
        this.form.setFieldsValue({
          weight: data.weight,
          deliveryWeight: data.deliveryWeight
        })
      }
    },
    back () {
      this.$router.push({
        path: '/device/maintain/recordClearance'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
