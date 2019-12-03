<template>
  <div>
    <div class="card-container">
      <a-form ref="detailForm" :form="form" class="detail-form">
        <div class="card-title">
          日检信息
        </div>
        <div class="card-content">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="日检时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['userSignTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="上一次日检时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['lastUserSignTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="日检人员"
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
                label="日检人手机号"
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
                label="日检设备类型"
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
                label="备注"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['content']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="20">
              <a-form-item
                label="巡检照片"
                :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }"
              >
                <div class="img-container">
                  <img
                    v-for="(item, index) in imgList" :key="index" class="inspect-img"
                    :src="item.url" @click="clickImage(item.url)"
                  >
                </div>
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

    <a-modal :visible="preview.visible" :footer="null" @cancel="preview.visible=false">
      <img class="w100" :src="preview.url">
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      preview: {
        visible: false,
        url: ''
      },
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: 'detailForm' }),
      imgList: []
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.$httpGet(this.$basePath.getUserSignInfo, {
        menuId: '01e3134ef6d44cb0a0834903f4543ced',
        id: this.$route.query.id
      })
        .then(res => {
          this.initForm(res.result)
        })
    },
    initForm (data) {
      this.form.setFieldsValue({
        areaName: data.areaName,
        content: data.content,
        housingEstate: data.housingEstate,
        position: data.position,
        productMark: data.productMark,
        productName: data.productName,
        productNumber: data.productNumber,
        productType: data.productType,
        userSignTime: data.userSignTime,
        lastUserSignTime: data.lastUserSignTime,
        inspectName: data.inspectName,
        inspectPhone: data.inspectPhone
      })
      this.imgList = data.images
    },
    back () {
      this.$router.push({
        path: '/device/maintain/recordDayinspect'
      })
    },
    clickImage (url) {
      this.preview.visible = true
      this.preview.url = url
    }
  }
}
</script>

<style lang="stylus" scoped>
.inspect-img
  width 140px
  height 90px
  margin-right 10px
</style>
