<template>
  <div>
    <div class="card-container">
      <a-form ref="detailForm" :form="form" class="detail-form">
        <div class="card-title">
          满溢信息
        </div>
        <div class="card-content">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="发生满溢时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['spillOverTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="满溢设备类型"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productType']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
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
            <a-col :span="12">
              <a-form-item
                label="清运人员"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['cleanerName']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
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
            <a-col :span="12">
              <a-form-item
                label="清运人手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['cleanerPhone']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="满溢箱体分类"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['boxType']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="处理状态"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['spillOverStatus']"
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
      this.$httpGet(this.$basePath.getSpillOverInfo, {
        menuId: '59d7b131d9974399a3ca8040796419cf',
        id: this.$route.query.id
      })
        .then(res => {
          this.initForm(res.result)
        })
    },
    initForm (data) {
      this.form.setFieldsValue({
        areaName: data.areaName,
        boxType: data.boxType,
        housingEstate: data.housingEstate,
        position: data.position,
        productMark: data.productMark,
        productName: data.productName,
        productNumber: data.productNumber,
        productType: data.productType,
        spillOverStatus: data.spillOverStatus === '1' ? '待处理' : data.spillOverStatus === '2' ? '已处理' : '',
        spillOverTime: data.spillOverTime,
        inspectName: data.inspectName,
        inspectPhone: data.inspectPhone,
        cleanerName: data.cleanerName,
        cleanerPhone: data.cleanerPhone
      })
    },
    back () {
      this.$router.push({
        path: '/device/maintain/recordOverflow'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
