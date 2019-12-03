<template>
  <div class="floorAdvertDetails">
    <div class="commonTitle">
      Banner配置
    </div>
    <div class="card-content">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="广告名称"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['advertName', { rules: [{ required: true, message: '请填写广告名称' }] }]"
                placeholder="请填写广告名称" allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="适用范围"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select
                v-decorator="['applicableEnd', { rules: [{ required: true, message: '请选择适用范围' }] }]"
                placeholder="请选择适用范围"
                allow-clear
                show-search
                option-filter-prop="children"
              >
                <a-select-option v-for="item in applicableEnds" :key="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="广告排序"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['advertSort', {
                  rules: [{
                    required: true, message: '请填写广告排序'
                  }, {
                    validator: validateToAdvertSort,
                  }]}]"
                allow-clear
                placeholder="请填写正整数，数字越小越靠前"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="广告位置"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select
                v-decorator="['advertPosition', { rules: [{ required: true, message: '请选择广告位置' }] }]"
                placeholder="请选择广告位置"
                allow-clear
                show-search
                option-filter-prop="children"
              >
                <a-select-option v-for="item in advertPositions" :key="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="广告有效期"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-range-picker
                v-model="advertDate"
                class="w100"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="跳转链接"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-model="jumpUrl"
                placeholder="请填写跳转链接"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="广告图片"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <div>
                <a-upload
                  ref="advertFileUpload"
                  v-decorator="[
                    'advertFileList',
                    { rules: [{ required: true, message: '请上传广告图片' }] }
                  ]"
                  :action="serveUrl"
                  :headers="headers"
                  list-type="picture-card"
                  :file-list="advertFileList"
                  :before-upload="advertBeforeUpload"
                  :remove="removePicture"
                  @preview="handleAdvertPreview"
                  @change="handleAdvertChange"
                >
                  <div v-if="advertFileList.length < 1">
                    <a-icon type="plus" />
                    <div>
                      上传图片
                    </div>
                  </div>
                </a-upload>
                <a-modal :visible="advertVisible" :footer="null" @cancel="handleAdvertCancel">
                  <img class="w100" :src="advertImage">
                </a-modal>
              </div>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="备注"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-model="desc"
                placeholder="请填写备注" type="textarea" rows="1" maxlength="50"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item v-if="mainTitle==='编辑'" :wrapper-col="{ span: 24 }" class="bottomBtn">
              <a-button class="mr16" @click="backPage()">
                取消
              </a-button>
              <a-button type="primary" html-type="submit" :loading="confirmLoading">
                保存
              </a-button>
            </a-form-item>
            <a-form-item v-else-if="mainTitle==='添加'" :wrapper-col="{ span: 24 }" class="bottomBtn">
              <a-button class="mr16" @click="backPage()">
                取消
              </a-button>
              <a-button class="mr16" html-type="submit" :loading="confirmLoading">
                保存暂不发布
              </a-button>
              <a-button
                type="primary" html-type="submit" :loading="publishLoading"
                @click="publish"
              >
                立即发布
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>
<script>
import Host from '@/config/apiHost'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { getAdvDetails, addAdv, editAdv } from '@/api/advert'
import { delPicture } from '@/api/common'
export default {
  name: 'FloorAdvertDetails',
  components: {
  },
  data () {
    return {
      mainTitle: '',
      form: this.$form.createForm(this, { name: 'floorAdvertDetails' }),
      advertPositions: [
        {
          value: '1',
          label: '首页轮播'
        }, {
          value: '2',
          label: '启动图'
        }, {
          value: '3',
          label: '首页楼层'
        }, {
          value: '4',
          label: '社区楼层'
        }
      ],
      applicableEnds: [
        {
          value: '1',
          label: '猫先生APP'
        }, {
          value: '2',
          label: '猫回收APP'
        }
      ],
      jumpUrl: '',
      advertDate: [],
      desc: '',
      serveUrl: `${Host.uploadImgHost}/building/adv/upload`,
      headers: {
        token: ''
      },
      advertVisible: false,
      advertImage: '',
      advertFileList: [],
      aId: '',
      currentStatus: '',
      confirmLoading: false,
      publishLoading: false
    }
  },
  created () {
    this.headers.token = this.token()
    this.mainTitle = this.$route.query.title
    this.aId = this.$route.query.id
  },
  mounted () {
    this.form.setFieldsValue({
      applicableEnd: '1',
      advertPosition: '1'
    })
    const params = {}
    params.menuId = '2a374d2f7af54af095b2c4cb742b9a2a'
    if (this.aId) {
      params.id = this.aId
    }
    if (this.mainTitle !== '添加') {
      this.getAdvInfo(params)
    }
  },
  methods: {
    getAdvInfo (params) {
      getAdvDetails(params)
        .then(res => {
          const newAdvertFiles = []
          res.result.images.forEach((item) => {
            newAdvertFiles.push({ uid: item.id, name: item.path, url: item.path })
          })
          this.form.setFieldsValue({
            advertName: res.result.name,
            applicableEnd: res.result.type,
            advertSort: res.result.sort,
            advertPosition: res.result.advPosition,
            advertFileList: newAdvertFiles
          })
          this.advertFileList = newAdvertFiles
          this.jumpUrl = res.result.images[0].jumpLink
          this.desc = res.result.remark
          this.advertDate = [moment(res.result.startTime), moment(res.result.endTime)]
          this.currentStatus = res.result.status
        })
    },
    moment,
    ...mapGetters(['token']),
    validateToAdvertSort (rule, value, callback) {
      const myreg = /^[1-9]\d*$/
      if (value && !myreg.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.name = values.advertName
          params.sort = values.advertSort
          params.advPosition = values.advertPosition
          params.startTime = this.advertDate[0].format('YYYY-MM-DD') + ' 00:00:00'
          params.endTime = this.advertDate[1].format('YYYY-MM-DD') + ' 23:59:59'
          const newImgs = []
          newImgs.push({
            path: this.advertFileList[0].response ? this.advertFileList[0].response.result : this.advertFileList[0].url,
            jumpLink: this.jumpUrl,
            type: '1'
          })
          params.images = newImgs
          params.type = values.applicableEnd
          params.remark = this.desc
          if (this.mainTitle === '添加') {
            params.status = '1'
            params.menuId = 'f753305f3d12401187aaadb1eeb900e2'
            this.confirmLoading = true
            addAdv(params).then(res => {
              this.confirmLoading = false
              this.$message.success('已保存成功，暂不发布')
              this.backPage()
            }).catch(() => {
              this.confirmLoading = false
            })
          } else if (this.mainTitle === '编辑') {
            params.id = this.aId
            params.status = this.currentStatus
            params.menuId = 'b5ab40f1938b43e8836c68d258a6a385'
            this.confirmLoading = true
            editAdv(params).then(res => {
              this.confirmLoading = false
              this.$message.success('广告修改成功')
              this.backPage()
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        }
      })
    },
    publish (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.menuId = 'f753305f3d12401187aaadb1eeb900e2'
          params.status = '2'
          params.name = values.advertName
          params.sort = values.advertSort
          params.advPosition = values.advertPosition
          params.startTime = this.advertDate[0].format('YYYY-MM-DD') + ' 00:00:00'
          params.endTime = this.advertDate[1].format('YYYY-MM-DD') + ' 23:59:59'
          const newImgs = []
          newImgs.push({
            path: this.advertFileList[0].response ? this.advertFileList[0].response.result : this.advertFileList[0].url,
            jumpLink: this.jumpUrl,
            type: '1'
          })
          params.images = newImgs
          params.type = values.applicableEnd
          params.remark = this.desc
          if (this.mainTitle === '添加') {
            this.publishLoading = true
            addAdv(params).then(res => {
              this.publishLoading = false
              this.$message.success('广告发布成功')
              this.backPage()
            })
          }
        }
      })
    },
    removePicture (obj) {
      if (obj.uid) {
        const params = {}
        params.id = obj.uid
        delPicture(params).then(res => {
          this.form.setFieldsValue({
            advertFileList: []
          })
        })
      }
    },
    handleAdvertCancel () {
      this.advertVisible = false
    },
    handleAdvertPreview (file) {
      this.advertImage = file.url || file.thumbUrl
      this.advertVisible = true
    },
    handleAdvertChange ({ fileList }) {
      this.advertFileList = fileList
    },
    advertBeforeUpload (file) {
      const isTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isTYPE) {
        this.$message.error('上传的合同照片只能是 JPG/PNG/JPEG 格式!')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传的合同照片每张大小不超过10MB!')
      }
      if (!isTYPE || !isLt10M) {
        this.$refs.advertFileUpload.handleRemove(file)
      }
      return isTYPE && isLt10M
    },
    backPage () {
      this.$router.push({ path: '/advert/floorAdvertList' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.floorAdvertDetails
  background-color #fff
  padding 16px 20px 0 20px
  margin-bottom 20px
  font-size 12px
  color #000
  .w100
    width 100%
  .mr16
    margin-right 16px
  .commonTitle
    font-size 16px
    font-weight 600
    color #333
  .line-item
    height 40px
    line-height 40px
    margin-bottom 14px
  .card-content
    margin-top 16px
  .bottomBtn
    margin-top 12px
    margin-bottom 36px !important
    text-align center
</style>
<style lang="stylus">
.floorAdvertDetails
  .bottomBtn
    .ant-btn
      border-radius 2px
      font-size 12px
      line-height normal
</style>
