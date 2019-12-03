<template>
  <div>
    <div class="card-container">
      <a-form ref="detailForm" :form="form" class="detail-form">
        <div class="card-title">
          报修信息
        </div>
        <div class="card-content">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="工单号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['orderNumber']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="报修级别"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['repairLevel']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="报修人员"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['repairName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="报修提交时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['repairTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="报修设备类型"
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
                label="报修状态"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['repairStatus']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="报修完成时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['repairFinishTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="维修人员"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['repairMan']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="故障详情"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['content']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="20">
              <a-form-item
                label="报修照片"
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
      this.$httpGet(this.$basePath.getRepairRecord, {
        menuId: '6e2b6cedaba04ffba142801e0ca16d54',
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
        repairMan: data.repairMan,
        repairFinishTime: data.repairFinishTime,
        repairTime: data.repairTime,
        // repairStatus: data.repairStatus,
        repairStatus: '成功',
        repairLevel: data.repairLevel === '1' ? '普通' : data.repairLevel === '2' ? '紧急' : data.repairLevel === '3' ? '特急' : '',
        orderNumber: data.orderNumber,
        repairName: data.repairName
      })
      this.imgList = data.images
    },
    back () {
      this.$router.push({
        path: '/device/maintain/recordRepair'
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
