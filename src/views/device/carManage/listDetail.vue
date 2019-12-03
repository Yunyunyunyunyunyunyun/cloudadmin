<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        添加车辆  <span class="tilte_"> （<span class="red">*</span>为必填）</span>
      </div>
      <div class="card-content">
        <a-form ref="detailForm" :form="form" class="detail-form">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="绑定用户"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['recycleUserId']"
                  show-search
                  allow-clear
                  placeholder="请选择手机号进行回收人员绑定"
                  option-filter-prop="children"
                  :filter-option="filterOption"
                >
                  <a-select-option v-for="(item,index) in personList" :key="index" :value="item.id">
                    {{ item.realName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="车牌号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['carNo', { rules: [{ required: true, message: '请填写车牌号' }] }]"
                  placeholder="请填写车牌号"
                  :disabled="isEdit"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="车辆类型"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['carType']"
                  allow-clear
                  :disabled="isEdit"
                  placeholder="请选择车辆类型"
                >
                  <a-select-option :value="1">
                    三轮车
                  </a-select-option>
                  <a-select-option :value="2">
                    小货车
                  </a-select-option>
                  <a-select-option :value="3">
                    中型货车
                  </a-select-option>
                  <a-select-option :value="4">
                    大型货车
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="车辆属性"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['type']"
                  allow-clear
                  :disabled="isEdit"
                  placeholder="请选择车辆属性"
                >
                  <a-select-option :value="0">
                    用户自有
                  </a-select-option>
                  <a-select-option :value="1">
                    公司配备
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="车辆能源"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['energyType']"
                  allow-clear
                  :disabled="isEdit"
                  placeholder="请选择车辆能源"
                >
                  <a-select-option :value="1">
                    电能
                  </a-select-option>
                  <a-select-option :value="2">
                    汽油
                  </a-select-option>
                  <a-select-option :value="3">
                    柴油
                  </a-select-option>
                  <a-select-option :value="4">
                    天然气
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="车辆自重（kg）"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['carWeight', { rules: [{ required: true, message: '请填写车辆自重' }] }]"
                  :disabled="isEdit"
                  type="number"
                  placeholder="请填写车辆自重，只可输入大于0的数字"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="绑定GPS"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['bindGps']"
                  allow-clear
                  :disabled="isEdit"
                  placeholder="请选择是否绑定"
                >
                  <a-select-option :value="0">
                    未绑定
                  </a-select-option>
                  <a-select-option :value="1">
                    已绑定
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-if="form.getFieldValue('bindGps') == 1" :span="12">
              <a-form-item
                label="定位器名称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['locatorName']"
                  placeholder="请填写定位器名称"
                  :disabled="isEdit"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col v-if="form.getFieldValue('bindGps') == 1" :span="12">
              <a-form-item
                label="MAC地址"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['macAddress']"
                  placeholder="请填写MAC地址"
                  :disabled="isEdit"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-row>
                <a-col :span="12">
                  <a-form-item
                    label="车辆图片"
                    :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }"
                  >
                    <a-upload
                      list-type="picture-card"
                      class="avatar-uploader"
                      :show-upload-list="true"
                      :before-upload="beforeUpload"
                      :file-list="fileList"
                      :disabled="isEdit"
                      :remove="handleRemove"
                      @preview="handlePreview"
                      @change="handleChange"
                    >
                      <img v-if="imageUrl" :src="imageUrl" alt="avatar">
                      <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">
                          图片上传
                        </div>
                      </div>
                    </a-upload>
                    <a-modal
                      :visible="previewVisible" centered :footer="null"
                      @cancel="handleCancel"
                    >
                      <img alt="example" style="width: 100%" :src="previewImage">
                    </a-modal>
                    <div class="upload-tip">
                      <a-icon class="tip-icon" type="info-circle" />车辆图片最多可以上传3张，每张大小不超过10M，格式为png，jpeg，jpg。
                    </div>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="备注"
                v-bind="formItemLayout"
              >
                <a-textarea
                  v-decorator="['remark']"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  placeholder="请填写备注"
                  :disabled="isEdit"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="card-content mb40 mt40">
        <a-row type="flex" justify="center">
          <a-col
            :span="12" type="flex" align="middle"
            style="text-align:center;"
          >
            <a-button class="mr8" :type="isEdit?'primary':''" @click="back">
              返回
            </a-button>
            <a-button
              v-if="!isEdit" type="primary"
              @click="save"
            >
              保存
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
      personList: [],
      isEdit: false,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: 'detailForm' }),
      imageUrl: '',
      loading: false,
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  },
  mounted () {
    this.getPersonList()
    if (this.$route.name === 'viewCar') {
      this.getDetail()
      this.isEdit = true
    } else {
      this.isEdit = false
    }
    if (this.$route.name === 'editCar') {
      this.getDetail()
    }
  },
  methods: {
    getDetail () {
      this.$httpPost(this.$basePath.getCarInfo, {
        carNumber: this.$route.query.carNumber,
        menuId: this.$route.query.menuId
      })
        .then(res => {
          var data = res.result.recycleUserCar
          if (data.bindGps === 1) {
            setTimeout(() => {
              this.form.setFieldsValue({
                macAddress: data.macAddress,
                locatorName: data.locatorName
              })
            }, 500)
          }
          this.form.setFieldsValue({
            bindGps: data.bindGps,
            carNo: data.carNo,
            carType: data.carType,
            carWeight: data.carWeight,
            energyType: data.energyType,
            recycleUserId: data.recycleUserId,
            remark: data.remark,
            type: data.type
          })
          var pictureList = res.result.carPhotoList
          pictureList.forEach((item, index) => {
            if (item) {
              this.fileList.push({
                uid: -index,
                name: item.split('/')[item.split('/').length - 1],
                status: 'done',
                url: item
              })
            }
          })
        })
    },
    getPersonList () {
      this.$httpPost(this.$basePath.getRecycleUserList, { mobile: '' })
        .then(res => {
          this.personList = res.result
        })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    beforeUpload (file) {
      if (this.fileList.length >= 3) {
        this.$message.error('最多可上传3张图片！')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 10
      const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isLt2M) {
        this.$message.error('每张图片大小不能超过10M！')
        return false
      }
      if (!isType) {
        this.$message.error('请选择png，jpeg，jpg格式图片上传！')
        return false
      }
      return false
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleRemove (file) {
      this.fileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.fileList.splice(index, 1)
        }
      })
    },
    handleChange ({ file, fileList }) {
      if (this.fileList.length >= 3) {
        return false
      }
      var formdata = new FormData()
      formdata.append('file', file)
      var config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.$httpPost(this.$basePath.uploadImage, formdata, config)
        .then(res => {
          this.$message.success('上传成功！')
          fileList.forEach(item => {
            if (item.uid === file.uid) {
              Object.assign(item, {
                url: res.result
              })
            }
          })
          this.fileList = fileList
        })
    },
    save () {
      this.form.validateFields((err, values) => {
        if (!err) {
          var param = this.form.getFieldsValue()
          param.menuId = '1dfc4991bbf14116becba59a2431a70b'
          param.carNumber = this.$route.query.carNumber
          param.pictureList = []
          this.fileList.forEach(item => {
            if (item.url) {
              param.pictureList.push(item.url)
            }
          })
          this.$httpPost(this.$basePath.addEditCar, param)
            .then(res => {
              this.$message.success(res.msg)
              this.$router.push({
                path: '/device/carManage/carList'
              })
            })
        }
      })
    },
    back () {
      this.$router.push({
        path: '/device/carManage/carList'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.tilte_
  font-weight 500
.red
  color #FF0A0A
.upload-tip
  font-size 12px
  color #999999
  .tip-icon
    margin-right 6px
</style>
