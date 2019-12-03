<template>
  <div class="add-account">
    <div class="title">
      {{ type == 1 ? "查看账号" : type == 2 ? "编辑账号" : "新建账号" }}
    </div>
    <a-form :form="form">
      <div class="content">
        <div class="content-l">
          <div class="content-title">
            账号信息
          </div>
          <a-form-item
            label="用户名"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: '请填写用户名' },
                    {
                      validator: validateUserName
                    }
                  ],
                  validateTrigger: 'change'
                }
              ]"
              :disabled="type === 1"
              maxlength="30"
              placeholder="请填写登录名，支持英文、数字或手机号"
            />
          </a-form-item>
          <a-form-item
            v-if="type !== 1"
            label="密码"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input-password
              v-decorator="['password']"
              maxlength="30"
              placeholder="请输入密码，不填则默认为123456"
            />
          </a-form-item>
          <a-form-item
            label="昵称"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'nickName',
                {
                  rules: [
                    {
                      required: true,
                      message: '请填写昵称,建议输入真实姓名，最长15个字',
                      max: 15
                    }
                  ]
                }
              ]"
              :disabled="type === 1"
              placeholder="请填写昵称"
            />
          </a-form-item>
          <a-form-item
            label="手机号"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'mobile',
                {
                  rules: [
                    {
                      required: true,
                      pattern: /^1[34578]\d{9}$/,
                      message: '请输入正确的手机号'
                    }
                  ],
                  validateTrigger: 'change'
                }
              ]"
              :disabled="type === 1"
              type="text"
              placeholder="手机号"
            />
          </a-form-item>
          <a-form-item
            label="头像"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            :extra="
              type == 1 ? '' : '只能上传ipg/png格式文件，建议上传200px*200px'
            "
          >
            <div v-if="type == 1">
              <img v-if="imageUrl" :src="imageUrl" alt="avatar">
            </div>
            <div v-else>
              <a-upload
                list-type="picture-card"
                :class="imageUrl ? 'avatar-uploader_reset' : 'avatar-uploader'"
                :show-upload-list="false"
                :action="serveUrl"
                :headers="headers"
                :before-upload="beforeUpload"
                @change="handleImgChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar">
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    上传图片
                  </div>
                </div>
              </a-upload>
            </div>
          </a-form-item>
          <a-form-item
            label="猫运维APP"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <div v-if="type === 1 && detail.isLogin">
              <a-input :value="detail.isLogin" disabled />
            </div>
            <div v-else>
              <a-radio-group v-decorator="['isLogin', { initialValue: 0 }]">
                <a-radio :value="0">
                  允许登录
                </a-radio>
                <a-radio :value="1">
                  禁用登录
                </a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
          <a-form-item
            label="真实姓名"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="['realName']"
              :disabled="type === 1"
              placeholder="请填写真实姓名"
            />
          </a-form-item>
          <a-form-item
            label="岗位"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="['uPost']"
              :disabled="type === 1"
              placeholder="请填写岗位"
            />
          </a-form-item>
          <a-form-item
            label="账号类型"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <div v-if="(type == 1 || type === 2) && detail.userType">
              <a-input :value="detail.userType" disabled />
            </div>
            <div v-else>
              <a-radio-group
                v-decorator="['userType', { initialValue: 1 }]"
                @change="handleRadioChange"
              >
                <a-radio :value="1">
                  管理员
                </a-radio>
                <a-radio :value="2">
                  操作员
                </a-radio>
                <a-radio :value="3">
                  商户
                </a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
          <a-form-item
            label="关联角色"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <div v-if="type == 1 && detail.role">
              <a-input :value="detail.role" disabled />
            </div>
            <div v-else>
              <a-select
                v-decorator="[
                  'roleList',
                  {
                    rules: [{ required: true, message: '请选择关联角色' }]
                  }
                ]"
                mode="multiple"
                placeholder="请选择关联角色"
              >
                <a-select-option v-for="item in roleList" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </a-form-item>
          <div v-if="userType == 3">
            <a-form-item
              label="关联商户"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <div v-if="type === 1 && detail.merchantInfo">
                <a-input :value="detail.merchantInfo" disabled />
              </div>
              <div v-else>
                <a-select
                  v-decorator="[
                    'merchantId',
                    { rules: [{ required: true, message: '请选择关联商户' }] }
                  ]"
                  placeholder="关联商户"
                >
                  <a-select-option v-for="item in merchantList" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </div>
            </a-form-item>
          </div>
          <a-form-item
            label="启用状态"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <div v-if="type == 1 && detail.isEnable">
              <a-input :value="detail.isEnable" disabled />
            </div>
            <div v-else>
              <a-radio-group v-decorator="['isEnable', { initialValue: 0 }]">
                <a-radio :value="0">
                  启用
                </a-radio>
                <a-radio :value="1">
                  禁用
                </a-radio>
              </a-radio-group>
            </div>
          </a-form-item>
          <a-form-item
            label="备注"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-textarea
              v-decorator="['remark']"
              :disabled="type === 1"
              maxlength="50"
              placeholder="请输入备注"
              rows="1"
            />
          </a-form-item>
        </div>
        <div class="content-r">
          <!-- 管理区域 -->
          <div v-if="userType === 1 && type != 1">
            <div class="content-title">
              管理区域
            </div>
            <a-form-item
              label="城市"
              class="pd-r-16"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <div v-if="treeData.length">
                <a-tree-select
                  :tree-data="treeData"
                  allow-clear
                  tree-checkable
                  placeholder="省市"
                  @change="handleRegionChange"
                />
              </div>
            </a-form-item>
            <a-form-item
              label="区域"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <div v-if="areaTreeData.length" class="tree">
                <a-tree
                  v-model="checkedKeys"
                  checkable
                  default-expand-all
                  :tree-data="areaTreeData"
                  @check="onCheck"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-form-item>
          </div>
          <div v-if="type === 1 && userType === 1">
            <div class="content-title">
              管理区域
            </div>
            <div v-if="detail.region">
              <a-tree default-expand-all :tree-data="detail.region" />
            </div>
          </div>
          <!-- 管理小区 -->
          <div v-if="userType === 2 && type != 1">
            <div class="content-title">
              管理小区
            </div>
            <a-row>
              <a-col :span="19">
                <a-form-item
                  label="小区"
                  :label-col="{ span: 5 }"
                  :wrapper-col="{ span: 19 }"
                >
                  <a-cascader
                    v-model="areas"
                    :options="options"
                    :load-data="loadData"
                    change-on-select
                    :field-names="{
                      label: 'name',
                      value: 'id',
                      children: 'children'
                    }"
                    placeholder="省市区、街道"
                    @change="changeArea"
                  />
                </a-form-item>
              </a-col>
              <a-col class="btn-pd-16" :span="4" align="right">
                <a-button type="primary" @click="getAreaInfo()">
                  查询
                </a-button>
              </a-col>
            </a-row>
            <a-form-item
              label="设备"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <div v-if="areaTreeData.length" class="tree">
                <a-tree
                  v-model="checkedKeys"
                  checkable
                  default-expand-all
                  :tree-data="areaTreeData"
                  @check="onCheck"
                />
              </div>
              <div v-else>
                <a-empty />
              </div>
            </a-form-item>
          </div>
          <div v-if="type === 1 && userType === 2">
            <div class="content-title">
              管理小区
            </div>
            <div v-if="detail.community">
              <a-tree default-expand-all :tree-data="detail.community" />
            </div>
          </div>
          <!-- 商户 -->
          <div v-if="userType === 3" style="margin-top:350px">
            <a-empty description="商户账号无需选择管理区域" />
          </div>
        </div>
      </div>
      <div class="btn-list">
        <a-button
          v-if="type == 3 || type == 2"
          :loading="confirmLoading"
          type="primary"
          @click="handleSubmit"
        >
          保存
        </a-button>
        <a-button @click="handleGoBack">
          {{ type == 1 ? "返回" : "取消" }}
        </a-button>
      </div>
    </a-form>
  </div>
</template>
<script>
import { getArea, getEstate } from '@/components/mixins/mixins.js'
import md5 from 'md5'
import Host from '@/config/apiHost'
import {
  addUser,
  cityInfo,
  merchantList,
  userRoleList,
  areaInfo,
  userDetail
} from '@/api/system'
import { mapGetters } from 'vuex'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
export default {
  mixins: [getArea, getEstate],
  data () {
    return {
      type: 1,
      userId: '',
      userType: '',
      imageUrl: '',
      serveUrl: `${Host.uploadImgHost}/building/adv/upload`,
      loading: false,
      confirmLoading: false,
      confirmCheckedKeys: [],
      areas: [],
      checkedKeys: [],
      treeData: [],
      rawData: [],
      regionData: [],
      areaTreeData: [],
      roleListVal: [],
      merchantList: [],
      roleList: [],
      formItemLayout,
      detail: {},
      headers: {
        token: ''
      },
      form: this.$form.createForm(this)
    }
  },
  created: function () {
    this.headers.token = this.token()
    this.handleQuery()
  },
  mounted: function () {
    this.load()
  },
  methods: {
    ...mapGetters(['token']),
    load () {
      if (this.type === 1) {
        this.getDetail()
      } else {
        this.getCity()
        this.getMerchantList()
        this.getArea('', 2)
        this.getEstate()
        this.userType ? this.getRoleList(this.userType) : this.getRoleList()
        this.userId && this.userType && this.getDetail()
      }
    },
    // 获取省市的信息
    getCity () {
      cityInfo().then(res => {
        const result = res.result
        this.rawData = result.areaInfo
        const _area = JSON.parse(JSON.stringify(result.areaInfo))
        if (_area && _area.length) {
          _area.forEach(item => {
            this.treeData.push(this.handleTreeData(item))
          })
        }
      })
    },
    // 获取区域信息
    getAreaInfo (list = []) {
      const params = {
        id: this.userId,
        provinceId: this.areas[0] || '',
        cityId: this.areas[1] || '',
        areaId: this.areas[2] || '',
        street: this.areas[3] || '',
        userType: this.form.getFieldValue('userType') || this.userType,
        children: list
      }
      areaInfo(params).then(res => {
        this.areaTreeData = []
        const result = res.result
        this.regionData = result.areaInfo
        this.checkedKeys = this.handleSelectData(result.areaInfo)
        const _area = JSON.parse(JSON.stringify(result.areaInfo))
        if (_area && _area.length) {
          _area.forEach(item => {
            this.areaTreeData.push(this.handleTreeData(item))
          })
        }
      })
    },
    // 获取关联角色列表
    getRoleList (userType = 1) {
      const params = {
        userType
      }
      userRoleList(params).then(res => {
        const result = res.result
        this.roleList = result.roleList
      })
    },
    // 获取商户列表
    getMerchantList () {
      merchantList().then(res => {
        const result = res.result
        this.merchantList = result.merChantList
      })
    },
    getDetail () {
      const data = {
        id: this.userId,
        userType: this.userType
      }
      userDetail(data).then(res => {
        const result = res.result.info
        const {
          form: { setFieldsValue }
        } = this
        this.imageUrl = result.headPath
        const defValue = {
          userName: result.userName,
          nickName: result.nickName,
          mobile: result.mobile,
          isLogin: result.isLogin,
          uPost: result.uPost,
          isEnable: result.isEnable,
          remark: result.remark,
          realName: result.realName,
          userType: this.userType,
          roleList: this.handleRoleInfo(result.roleList)
        }
        if (result.merchantId) {
          Object.assign(defValue, {
            merchantId: result.merchantId
          })
        }
        const detail = {
          isLogin: result.isLogin === 1 ? '禁止登录' : '允许登录',
          userType:
            this.userType === 1
              ? '管理员'
              : this.userType === 2
                ? '操作员'
                : '商户',
          isEnable: result.isEnable ? '禁用' : '启用',
          role: this.handleRoleInfo(result.roleList, 'name').toString(','),
          merchantInfo: result.merchantInfo,
          region: [],
          community: []
        }
        const _region =
          result.provinceInfos &&
          JSON.parse(JSON.stringify(result.provinceInfos))
        if (_region && _region.length) {
          _region.forEach(item => {
            detail.region.push(this.handleTreeData(item))
          })
        }
        const _community =
          result.streetList && JSON.parse(JSON.stringify(result.streetList))
        if (_community && _community.length) {
          _community.forEach(item => {
            detail.community.push(this.handleTreeData(item))
          })
        }
        this.detail = detail
        setFieldsValue(defValue)
        if (this.type === 2) this.getAreaInfo()
      })
    },
    changeArea (areasId) {
      this.estateList = []
      this.form.setFieldsValue({ estateId: undefined })
      if (areasId.length < 4) {
        this.getEstate(areasId)
      } else if (areasId.length === 4) {
        this.getEstate(null, areasId[3])
      }
    },
    handleQuery () {
      const { type, id, userType } = this.$route.query
      this.type = parseInt(type)
      this.userType = parseInt(userType || 1)
      this.userId = id
    },
    handleRadioChange (e) {
      this.areaTreeData = []
      const {
        form: { setFieldsValue }
      } = this
      setFieldsValue({
        roleList: []
      })
      this.getRoleList(e.target.value)
      this.userType = e.target.value
    },
    handleRegionChange (value) {
      const result = []
      for (let i = 0; i < value.length; i++) {
        const obj = this.handleFilterData(this.rawData, value[i])
        result.push(obj)
      }
      if (value.length) {
        this.getAreaInfo(result)
      } else {
        if (this.type === 2) {
          this.getAreaInfo()
        } else {
          this.areaTreeData = []
        }
      }
    },
    handleImgChange (info) {
      if (info.file.status === 'uploading') {
        this.imageUrl = ''
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        const result = info.file.response.result
        this.imageUrl = result
        this.loading = false
      }
    },
    beforeUpload (file) {
      const isTYPE = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isTYPE) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isTYPE && isLt2M
    },
    onCheck (checkedKeys, info) {
      // 合并两个数组
      this.confirmCheckedKeys = checkedKeys.concat(info.halfCheckedKeys)
    },
    // 处理默认选中的菜单 UI展示
    handleSelectData (items) {
      const result = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (!list[i].children && list[i].isSelected) {
            result.push(list[i].id)
          }
          if (list[i].children && list[i].children.length) {
            filter(list[i].children)
          }
        }
      }
      filter(items)
      return result
    },
    // 处理默认选中的菜单 提交服务赌
    handleDefSelectData (items) {
      const result = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].isSelected) result.push(list[i].id)
          if (list[i].children && list[i].children.length) {
            filter(list[i].children)
          }
        }
      }
      filter(items)
      return result
    },
    handleTreeData (item) {
      const childrenNode = {
        title: item.name,
        key: item.id,
        value: item.id
      }
      if (item.children && item.children.length) {
        childrenNode.children = []
        item.children.forEach(subItem => {
          childrenNode.children.push(this.handleTreeData(subItem))
        })
      }
      return childrenNode
    },
    handleGoBack () {
      this.$router.replace('/system/account')
    },
    handleDeviceData (keys) {
      const list = JSON.parse(JSON.stringify(this.regionData))
      const result = []
      function filter (items) {
        for (let i = 0; i < items.length; i++) {
          if (keys.includes(items[i].id)) {
            items[i].isSelected = 1
          } else {
            items[i].isSelected = 0
          }
          if (items[i].children && items[i].children.length) {
            filter(items[i].children)
          }
        }
      }
      function generateData (item) {
        const childrenNode = {
          id: item.id,
          children: []
        }
        if (item.isSelected && item.children && item.children.length) {
          childrenNode.children = []
          item.children.forEach(subItem => {
            if (subItem.isSelected) {
              childrenNode.children.push(generateData(subItem))
            }
          })
        }
        return childrenNode
      }
      filter(list)
      for (let i = 0; i < list.length; i++) {
        if (list[i].isSelected) {
          result.push(generateData(list[i]))
        }
      }
      return result
    },
    handleSubmitData (keys) {
      const result = []
      for (let i = 0; i < keys.length; i++) {
        const obj = this.handleFilterData(this.regionData, keys[i])
        obj && result.push(obj)
      }
      return result
    },
    handleRoleListData (list) {
      const result = []
      for (let i = 0; i < list.length; i++) {
        const obj = {
          id: list[i]
        }
        result.push(obj)
      }
      return result
    },
    handleRoleInfo (list, key = 'id') {
      const result = []
      for (let i = 0; i < list.length; i++) {
        result.push(list[i][key])
      }
      return result
    },
    // 处理提交区域数据
    handleRegionData () {
      let result = this.handleSubmitData(this.confirmCheckedKeys)
      if (this.type === 2 && !this.confirmCheckedKeys.length) {
        // 编辑
        const list = this.handleDefSelectData(this.regionData)
        result = this.handleSubmitData(list)
      }
      return result
    },
    // 处理提交小区数据
    handleCommunityData () {
      let result = this.handleDeviceData(this.confirmCheckedKeys)
      if (this.type === 2 && !this.confirmCheckedKeys.length) {
        // 编辑
        const list = this.handleDefSelectData(this.regionData)
        result = this.handleDeviceData(list)
      }
      return result
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      validateFields((err, values) => {
        if (!err) {
          const params = { ...values }
          params.userType = params.userType ? params.userType : this.userType
          console.log(params.userType)
          const region = params.userType === 1 ? this.handleRegionData() : []
          const community =
            params.userType === 2 ? this.handleCommunityData() : []
          if (params.userType === 1 && !region.length) {
            this.$message.error('抱歉请选择管理区域')
            return false
          }
          if (params.userType === 2 && !community.length) {
            this.$message.error('抱歉请选择管理小区')
            return false
          }
          params.id = this.userId
          params.password = md5(params.password || '123456')
          params.merchantId = params.merchantId || ''
          params.headPath = this.imageUrl
          params.children = region
          params.roleList = this.handleRoleListData(params.roleList)
          params.streetList = community
          this.confirmLoading = true
          addUser(params)
            .then(res => {
              this.confirmLoading = false
              const msg = this.userId ? '账号信息修改成功' : '账号配置成功'
              this.$message.success(msg)
              this.handleGoBack()
            })
            .catch(() => {
              this.confirmLoading = false
            })
        }
      })
    },
    validateUserName (rule, value, callback) {
      const myreg1 = /^[A-Za-z]+$/
      const myreg2 = /^(?!\d+$)[\da-zA-Z]+$/
      const myreg3 = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!myreg1.test(value) && !myreg2.test(value) && !myreg3.test(value)) {
        return callback(new Error('请输入正确的用户名格式'))
      }
      callback()
    },
    handleFilterData (items, id) {
      let obj = null
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].children && list[i].children.length) {
            filter(list[i].children)
          } else {
            if (list[i].id === id) {
              obj = list[i]
            }
          }
        }
      }
      filter(items)
      return obj
    }
  }
}
</script>
//
<style lang="stylus">
.add-account
  .ant-form label
    font-size 12px
  .ant-input
    font-size 12px
  .ant-tree
    font-size 12px
  .avatar-uploader
    width 104px
    height 104px
    img
      width 104px
      height 104px
      border-radius 2px
  .avatar-uploader_reset
    .ant-upload.ant-upload-select-picture-card
      border none
    .ant-upload.ant-upload-select-picture-card > .ant-upload
      padding 0
</style>
<style lang="stylus" scoped>
.pd-r-16
  padding-right 16px
.btn-pd-16
  padding-right 16px
  margin-top 4px
.add-account
  width 100%
  padding 16px 20px
  background-color #fff
  .btn-list
    width 100%
    padding 30px 0
    text-align center
    button
      margin-left 10px
  .content
    width 100%
    border 1px solid #E6E6E6
    display flex
    border-radius 2px
    margin-top 16px
    .content-title
      font-size 12px
      color #333333
      font-weight 500
      margin-bottom 16px
    >div
      width 50%
    .content-l
      padding 10px 16px
      border-right 1px solid #E6E6E6
      img
        width 104px
        height 104px
        border-radius 2px
    .content-r
      padding 10px 0
      padding-left 16px
      .tree
        width 100%
        height 720px
        overflow-y scroll
</style>
