<template>
  <div class="merchantDetails">
    <div class="commonTitle">
      基础信息
    </div>
    <div class="card-content">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="商户名称"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['merchantName', { rules: [{ required: true, message: '请填写商户名称' }] }]"
                allow-clear
                placeholder="请填写商户名称，填写后不允许修改请谨慎操作" :disabled="disabledValue||mainTitle==='编辑'" maxlength="50"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="联系人"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['linkname', { rules: [{ required: true, message: '请填写联系人姓名' }] }]"
                allow-clear
                placeholder="请填写联系人姓名" :disabled="disabledValue"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="手机号"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <div v-if="mainTitle==='查看'" class="commonLine">
                {{ phoneNum }}
                <span v-if="showpn" class="showComplete" @click="showAllPhoneNum()">完整展示</span>
              </div>
              <a-input
                v-else
                v-decorator="['phoneNum', { rules: [{ required: true, message: '请填写手机号' }, {validator: validatePhoneNum}] }]"
                allow-clear
                placeholder="请填写手机号"
                maxlength="11"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="身份证号"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <div v-if="mainTitle==='查看'" class="commonLine">
                {{ IDNumber }}
                <span v-if="showin&&IDNumber" class="showComplete" @click="showAllIDNumber()">完整展示</span>
              </div>
              <a-input
                v-else
                v-decorator="['IDNumber', { rules: [{ required: true, message: '请填写身份证号' }, {validator: validateIdNo}] }]"
                allow-clear
                placeholder="请填写身份证号"
                maxlength="18"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="店铺简介"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['shopBrief', { rules: [{ required: true, message: '请填写店铺简介' }] }]"
                allow-clear
                placeholder="请填写店铺简介" :disabled="disabledValue" maxlength="100"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="经营范围"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-model="businessScope"
                placeholder="请填写商户经营范围"
                :disabled="disabledValue"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="区域"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-cascader
                v-decorator="['area', { rules: [{ required: true, message: '请选择省市区' }] }]"
                :load-data="loadData"
                :options="options"
                :field-names="{
                  label: 'name',
                  value: 'id',
                  children: 'children'
                }"
                placeholder="请选择省市区"
                :disabled="disabledValue"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="详细地址"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-decorator="['detailedAddress', { rules: [{ required: true, message: '请填写店铺详细地址' }] }]"
                allow-clear
                placeholder="请填写店铺详细地址" :disabled="disabledValue"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="企业名称"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-model="companyName"
                placeholder="请填写商户所属企业名称"
                :disabled="disabledValue"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="客户经理"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select
                v-model="accountManager"
                placeholder="请选择客户经理"
                :disabled="disabledValue"
                allow-clear
                show-search
                option-filter-prop="children"
              >
                <a-select-option v-for="item in accountManagers" :key="item.managerId">
                  {{ item.managerName }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="入驻日期"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-if="mainTitle==='查看'||mainTitle==='编辑'"
                v-model="entryDate"
                placeholder="请选择入驻日期"
                disabled
              />
              <a-date-picker
                v-else
                v-model="signTime"
                placeholder="请选择入驻日期"
                format="YYYY-MM-DD"
                class="w100"
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="商户类型"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-select
                v-model="merchantType"
                placeholder="请选择商户类型"
                :disabled="disabledValue||mainTitle==='编辑'"
                allow-clear
                show-search
                option-filter-prop="children"
              >
                <a-select-option v-for="item in merchantTypes" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-if="mainTitle==='查看'||mainTitle==='编辑'" class="line-item" :span="12">
            <a-form-item
              label="可用余额"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input v-model="availableBalance" disabled />
            </a-form-item>
          </a-col>
          <a-col v-if="mainTitle==='查看'||mainTitle==='编辑'" class="line-item" :span="12">
            <a-form-item
              label="可用环保值"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input v-model="availableEnvValue" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="备注"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 20 }"
            >
              <a-input
                v-model="remark"
                placeholder="请填写备注"
                maxlength="50"
                :disabled="disabledValue"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" class="mt16">
            <div class="commonTitle">
              资质信息
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item mt16" :span="24">
            <a-form-item
              label="证件照片"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <div>
                <a-upload
                  ref="credentialsFileUpload"
                  :action="serveUrl"
                  :headers="headers"
                  list-type="picture-card"
                  :remove="removePicture"
                  :file-list="credentialsFileList"
                  :before-upload="credentialsBeforeUpload"
                  :disabled="mainTitle==='查看'"
                  :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: mainTitle!=='查看' }"
                  @preview="handleCredentialsPreview"
                  @change="handleCredentialsChange"
                >
                  <div v-if="credentialsFileList.length < 2&&mainTitle!=='查看'">
                    <a-icon type="plus" />
                    <div>
                      上传图片
                    </div>
                  </div>
                  <div v-if="credentialsFileList.length===0&&mainTitle==='查看'"></div>
                </a-upload>
                <div v-if="mainTitle==='添加'||mainTitle==='编辑'" class="photoWarn">
                  <a-icon type="exclamation-circle" />  证件照片最多可以上传2张，正反面各1张，每张大小不超过10M，格式为png，jpeg，jpg。
                </div>
                <a-modal :visible="credentialsVisible" :footer="null" @cancel="handleCredentialsCancel">
                  <img class="w100" :src="credentialsImage">
                </a-modal>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="店铺照片"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <div>
                <a-upload
                  ref="shopFileUpload"
                  :action="serveUrl"
                  :headers="headers"
                  :remove="removePicture"
                  list-type="picture-card"
                  :file-list="shopFileList"
                  :before-upload="shopBeforeUpload"
                  :disabled="mainTitle==='查看'"
                  :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: mainTitle!=='查看' }"
                  @preview="handleShopPreview"
                  @change="handleShopChange"
                >
                  <div v-if="shopFileList.length < 3&&mainTitle!=='查看'">
                    <a-icon type="plus" />
                    <div>
                      上传图片
                    </div>
                  </div>
                  <div v-if="shopFileList.length===0&&mainTitle==='查看'"></div>
                </a-upload>
                <div v-if="mainTitle==='添加'||mainTitle==='编辑'" class="photoWarn">
                  <a-icon type="exclamation-circle" />  店铺照片每张大小不超过10M，最多可以上传3张，格式为png，jpeg，jpg，第一张默认为主图。
                </div>
                <a-modal :visible="shopVisible" :footer="null" @cancel="handleShopCancel">
                  <img class="w100" :src="shopImage">
                </a-modal>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="资质证书"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <div>
                <a-upload
                  ref="qualificationFileUpload"
                  :action="serveUrl"
                  :headers="headers"
                  :remove="removePicture"
                  list-type="picture-card"
                  :file-list="qualificationFileList"
                  :before-upload="qualificationBeforeUpload"
                  :disabled="mainTitle==='查看'"
                  :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: mainTitle!=='查看' }"
                  @preview="handleQualificationPreview"
                  @change="handleQualificationChange"
                >
                  <div v-if="qualificationFileList.length < 3&&mainTitle!=='查看'">
                    <a-icon type="plus" />
                    <div>
                      上传图片
                    </div>
                  </div>
                  <div v-if="qualificationFileList.length===0&&mainTitle==='查看'"></div>
                </a-upload>
                <div v-if="mainTitle==='添加'||mainTitle==='编辑'" class="photoWarn">
                  <a-icon type="exclamation-circle" />  上传营业执照、组织机构代码证、税务登记证扫描件或照片，每张大小不超过10M，最多可以上传3张，格式为png，jpeg，jpg。
                </div>
                <a-modal :visible="qualificationVisible" :footer="null" @cancel="handleQualificationCancel">
                  <img class="w100" :src="qualificationImage">
                </a-modal>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" class="mt16">
            <div class="commonTitle">
              合同照片
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item mt16" :span="24">
            <a-form-item
              label="合同照片"
              :label-col="{ span: 2 }"
              :wrapper-col="{ span: 22 }"
            >
              <div>
                <a-upload
                  ref="contractFileUpload"
                  :action="serveUrl"
                  :headers="headers"
                  :remove="removePicture"
                  list-type="picture-card"
                  :file-list="contractFileList"
                  :disabled="mainTitle==='查看'"
                  :show-upload-list="{ showPreviewIcon: true, showRemoveIcon: mainTitle!=='查看' }"
                  :before-upload="contractBeforeUpload"
                  @preview="handleContractPreview"
                  @change="handleContractChange"
                >
                  <div v-if="contractFileList.length < 6&&mainTitle!=='查看'">
                    <a-icon type="plus" />
                    <div>
                      上传图片
                    </div>
                  </div>
                  <div v-if="contractFileList.length===0&&mainTitle==='查看'"></div>
                </a-upload>
                <div v-if="mainTitle==='添加'||mainTitle==='编辑'" class="photoWarn">
                  <a-icon type="exclamation-circle" />  上传合同扫描件或照片，每张大小不超过10M，最多可以上传6张，格式为png，jpeg，jpg。
                </div>
                <a-modal :visible="contractVisible" :footer="null" @cancel="handleContractCancel">
                  <img class="w100" :src="contractImage">
                </a-modal>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-if="mainTitle === '查看'" :span="24" class="mt16">
            <div class="commonTitle">
              交易记录
            </div>
            <a-tabs default-active-key="1" class="mt16" @change="callback">
              <a-tab-pane
                v-for="item in tabsTitle" :key="item.value"
                :tab="item.title"
              >
                <a-table
                  :columns="columns"
                  :data-source="tableData"
                  :pagination="pagination"
                  :row-key="record => record.id"
                  :loading="loading"
                  class="table-content"
                  @change="handleTableChange"
                >
                  <template slot="payKind" slot-scope="payKind">
                    <span>{{ payKind == 1?"刷卡支付":"" }}</span>
                    <span>{{ payKind == 2?"扫码支付 ":"" }}</span>
                  </template>
                </a-table>
              </a-tab-pane>
              <icon-font
                slot="tabBarExtraContent"
                type="iconshangchuan"
                class="cp"
                title="导出"
                @click="toExport"
              ></icon-font>
            </a-tabs>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item v-if="mainTitle==='添加'||mainTitle==='编辑'" :wrapper-col="{ span: 24 }" class="bottomBtn">
              <a-button class="mr16" @click="backPage()">
                取消
              </a-button>
              <a-button type="primary" html-type="submit" :loading="confirmLoading">
                保存
              </a-button>
            </a-form-item>
            <a-form-item v-else-if="mainTitle==='查看'" :wrapper-col="{ span: 24 }" class="bottomBtn">
              <a-button type="primary" @click="backPage()">
                返回
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-modal
      v-model="exportVisible" class="commonModal" @ok="exportSure" @cancel="exportVisible=false"
    >
      <div class="dlContent">
        <icon-font type="icongaojingtishi" class="dlIcon"></icon-font>
        <span class="dlTitle">请选择导出此页面数据的起止日期</span>
        <a-form :form="exportForm" class="mt16">
          <a-form-item>
            <a-range-picker
              v-decorator="['exportDate',rangeConfig]" format="YYYY-MM-DD"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>
<script>
import Host from '@/config/apiHost'
import { mapGetters } from 'vuex'
import { getAreaList, delPicture } from '@/api/common'
import { toExportExcel } from '@/components/mixins/mixins.js'
import { getMerchantInfo, getManagerList, addMerchant, editMerchant, getEnviList, getInteList } from '@/api/merchant'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_cd12n3nbvgd.js'
})
export default {
  name: 'MerchantDetails',
  components: {
    IconFont
  },
  mixins: [toExportExcel],
  data () {
    return {
      mainTitle: '',
      form: this.$form.createForm(this, { name: 'merchantDetails' }),
      IDNumber: '',
      trueIDNumber: '',
      businessScope: '',
      options: [],
      phoneNum: '',
      trueNum: '',
      companyName: '',
      accountManagers: [],
      accountManager: [],
      entryDate: '',
      signTime: null,
      merchantTypes: [
        {
          id: 1,
          name: '实体商户'
        },
        {
          id: 2,
          name: '线上商户'
        },
        {
          id: 3,
          name: '综合商户'
        }
      ],
      merchantType: 1,
      remark: '',
      serveUrl: `${Host.uploadImgHost}/building/adv/upload`,
      headers: {
        token: ''
      },
      credentialsVisible: false,
      credentialsImage: '',
      credentialsFileList: [],
      shopVisible: false,
      shopImage: '',
      shopFileList: [],
      qualificationVisible: false,
      qualificationImage: '',
      qualificationFileList: [],
      contractVisible: false,
      contractImage: '',
      contractFileList: [],
      availableBalance: '',
      availableEnvValue: '',
      disabledValue: false,
      tabsTitle: [
        {
          title: '环保值记录',
          value: '1'
        },
        {
          title: '余额记录',
          value: '2'
        }
      ],
      columns: [],
      tableData: [],
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
      showpn: true,
      showin: true,
      mId: '',
      currentKey: '',
      exportVisible: false,
      exportForm: this.$form.createForm(this, { name: 'exportForms' }),
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: '请选择导出此页面数据的起止日期' }]
      },
      confirmLoading: false
    }
  },
  created () {
    this.headers.token = this.token()
    this.accountManager = this.userInfo().id
    this.mainTitle = this.$route.query.title
    this.mId = this.$route.query.id
  },
  mounted () {
    this.getArea('', 2)
    this.getManager()
    if (this.mainTitle === '查看') {
      this.disabledValue = true
      this.callback('1')
    }
    const params = {}
    params.menuId = '9f7eccedf6b24dbbbeb73487dce8b7f4'
    if (this.mId) {
      params.id = this.mId
    }
    if (this.mainTitle !== '添加') {
      this.getMerInfo(params)
    }
  },
  methods: {
    getArea (id, layer, targetOption) {
      getAreaList({
        id: id,
        layer: layer
      })
        .then(res => {
          res.result.data.forEach(item => {
            if (layer !== 4) {
              this.$set(item, 'isLeaf', false)
            }
          })
          if (layer === 2) {
            this.options = res.result.data
          } else {
            if (targetOption) {
              this.$set(targetOption, 'children', res.result.data)
            }
          }
        })
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      this.getArea(targetOption.id, targetOption.layer + 1, targetOption)
    },
    ...mapGetters(['token', 'userInfo']),
    getManager () {
      getManagerList()
        .then(res => {
          this.accountManagers = res.result.list
        })
    },
    getMerInfo (params) {
      getMerchantInfo(params)
        .then(res => {
          const newOptions = JSON.parse(JSON.stringify([...this.options]))
          newOptions.forEach(item => {
            if (item.id === res.result.info.provinceId) {
              getAreaList({
                id: item.id,
                layer: 3
              })
                .then(resp => {
                  item.children = resp.result.data
                  item.children.forEach(thing => {
                    getAreaList({
                      id: thing.id,
                      layer: 4
                    })
                      .then(respo => {
                        thing.children = respo.result.data
                      })
                  })
                })
            }
          })
          this.options = newOptions
          setTimeout(() => {
            this.form.setFieldsValue({
              area: [res.result.info.provinceId, res.result.info.cityId, res.result.info.areaId]
            })
          }, 500)
          this.form.setFieldsValue({
            merchantName: res.result.info.name,
            linkname: res.result.info.contacts,
            shopBrief: res.result.info.summary,
            detailedAddress: res.result.info.address
          })
          if (this.mainTitle === '查看') {
            this.phoneNum = this.formatPhone(res.result.info.mobile)
            this.trueNum = res.result.info.mobile
            this.IDNumber = this.formatIdentityNum(res.result.info.identity)
            this.trueIDNumber = res.result.info.identity
          } else if (this.mainTitle === '编辑') {
            this.form.setFieldsValue({
              phoneNum: res.result.info.mobile,
              IDNumber: res.result.info.identity
            })
          }
          this.businessScope = res.result.info.introduction
          this.companyName = res.result.info.enterName
          this.accountManager = res.result.info.managerId
          this.entryDate = res.result.info.signTime
          this.merchantType = res.result.info.merType
          this.availableBalance = res.result.info.creditLine
          this.availableEnvValue = res.result.info.environmental
          this.remark = res.result.info.remark
          const newCredentials = []
          res.result.info.passPhoto.forEach((item) => {
            newCredentials.push({ uid: item, name: item, url: item })
          })
          this.credentialsFileList = newCredentials
          const newShop = []
          res.result.info.shopPhoto.forEach((item) => {
            newShop.push({ uid: item, name: item, url: item })
          })
          this.shopFileList = newShop
          const newQualification = []
          res.result.info.quaCerts.forEach((item) => {
            newQualification.push({ uid: item, name: item, url: item })
          })
          this.qualificationFileList = newQualification
          const newContract = []
          res.result.info.contPhoto.forEach((item) => {
            newContract.push({ uid: item, name: item, url: item })
          })
          this.contractFileList = newContract
        })
    },
    validatePhoneNum (rule, value, callback) {
      const reg = /^[1][3-9][0-9]{9}$/
      if (value && !reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
    validateIdNo (rule, value, callback) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (value && !reg.test(value)) {
        callback(new Error('请输入正确的身份证号码'))
      } else {
        callback()
      }
    },
    formatPhone (val) {
      return val && val.length > 7 ? val.substr(0, 3) + '****' + val.substr(val.length - 4, 4) : val
    },
    formatIdentityNum (val) {
      return val && val.length > 2 ? val.substr(0, 1) + '****' + val.substr(val.length - 1, 1) : val
    },
    showAllPhoneNum () {
      this.phoneNum = this.trueNum
      this.showpn = false
    },
    showAllIDNumber () {
      this.IDNumber = this.trueIDNumber
      this.showin = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {}
          if (this.mainTitle === '编辑') {
            params.id = this.mId
          }
          params.name = values.merchantName
          if (this.mainTitle === '添加' && this.signTime) {
            params.signTime = this.signTime.format('YYYY-MM-DD')
          }
          if (this.mainTitle === '添加') {
            params.merType = this.merchantType
          }
          params.mobile = values.phoneNum
          params.contacts = values.linkname
          params.summary = values.shopBrief
          params.address = values.detailedAddress
          params.provinceId = values.area[0]
          params.cityId = values.area[1]
          params.areaId = values.area[2]
          params.identity = values.IDNumber
          params.introduction = this.businessScope
          params.remark = this.remark
          params.managerId = this.accountManager
          params.enterName = this.companyName
          const newCredentials = []
          this.credentialsFileList.forEach((item) => {
            if (item.response) {
              newCredentials.push(item.response.result)
            } else {
              newCredentials.push(item.url)
            }
          })
          params.passPhoto = newCredentials
          const newShop = []
          this.shopFileList.forEach((item) => {
            if (item.response) {
              newShop.push(item.response.result)
            } else {
              newShop.push(item.url)
            }
          })
          params.shopPhoto = newShop
          const newQualification = []
          this.qualificationFileList.forEach((item) => {
            if (item.response) {
              newQualification.push(item.response.result)
            } else {
              newQualification.push(item.url)
            }
          })
          params.quaCerts = newQualification
          const newContract = []
          this.contractFileList.forEach((item) => {
            if (item.response) {
              newContract.push(item.response.result)
            } else {
              newContract.push(item.url)
            }
          })
          params.contPhoto = newContract
          if (this.mainTitle === '添加') {
            params.menuId = '304183fa7df148deafacae08b674ded6'
            this.confirmLoading = true
            addMerchant(params).then(res => {
              this.confirmLoading = false
              this.$message.success(res.msg)
              this.backPage()
            }).catch(() => {
              this.confirmLoading = false
            })
          } else if (this.mainTitle === '编辑') {
            params.menuId = '6b61ed2e72df4f1580987c7593c13339'
            this.confirmLoading = true
            editMerchant(params).then(res => {
              this.confirmLoading = false
              this.$message.success(res.msg)
              this.backPage()
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        }
      })
    },
    backPage () {
      this.$router.push({ path: '/merchant/merchantList' })
    },
    removePicture (obj) {
      if (this.mainTitle === '查看') {
        return false
      } else {
        if (obj.uid) {
          const params = {}
          params.id = obj.uid
          delPicture(params)
        }
      }
    },
    handleCredentialsCancel () {
      this.credentialsVisible = false
    },
    handleCredentialsPreview (file) {
      this.credentialsImage = file.url || file.thumbUrl
      this.credentialsVisible = true
    },
    handleCredentialsChange ({ fileList }) {
      if (fileList) {
        this.credentialsFileList = fileList
      }
    },
    credentialsBeforeUpload (file) {
      const isTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isTYPE) {
        this.$message.error('上传的证件照片只能是 JPG/PNG/JPEG 格式!')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传的证件照片每张大小不超过10MB!')
      }
      if (!isTYPE || !isLt10M) {
        this.$refs.credentialsFileUpload.handleRemove(file)
      }
      return isTYPE && isLt10M
    },
    handleShopCancel () {
      this.shopVisible = false
    },
    handleShopPreview (file) {
      this.shopImage = file.url || file.thumbUrl
      this.shopVisible = true
    },
    handleShopChange ({ fileList }) {
      if (fileList) {
        this.shopFileList = fileList
      }
    },
    shopBeforeUpload (file) {
      const isTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isTYPE) {
        this.$message.error('上传的店铺照片只能是 JPG/PNG/JPEG 格式!')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传的店铺照片每张大小不超过10MB!')
      }
      if (!isTYPE || !isLt10M) {
        this.$refs.shopFileUpload.handleRemove(file)
      }
      return isTYPE && isLt10M
    },
    handleQualificationCancel () {
      this.qualificationVisible = false
    },
    handleQualificationPreview (file) {
      this.qualificationImage = file.url || file.thumbUrl
      this.qualificationVisible = true
    },
    handleQualificationChange ({ fileList }) {
      if (fileList) {
        this.qualificationFileList = fileList
      }
    },
    qualificationBeforeUpload (file) {
      const isTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isTYPE) {
        this.$message.error('上传的资质证书只能是 JPG/PNG/JPEG 格式!')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传的资质证书每张大小不超过10MB!')
      }
      if (!isTYPE || !isLt10M) {
        this.$refs.qualificationFileUpload.handleRemove(file)
      }
      return isTYPE && isLt10M
    },
    handleContractCancel () {
      this.contractVisible = false
    },
    handleContractPreview (file) {
      this.contractImage = file.url || file.thumbUrl
      this.contractVisible = true
    },
    handleContractChange ({ fileList }) {
      if (fileList) {
        this.contractFileList = fileList
      }
    },
    contractBeforeUpload (file) {
      const isTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      if (!isTYPE) {
        this.$message.error('上传的合同照片只能是 JPG/PNG/JPEG 格式!')
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传的合同照片每张大小不超过10MB!')
      }
      if (!isTYPE || !isLt10M) {
        this.$refs.contractFileUpload.handleRemove(file)
      }
      return isTYPE && isLt10M
    },
    getEnvi (params) {
      this.loading = true
      getEnviList(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.list
          this.pagination.total = res.result.totalCount
        })
    },
    getInte (params) {
      this.loading = true
      getInteList(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.list
          this.pagination.total = res.result.totalCount
        })
    },
    callback (key) {
      this.currentKey = key
      const params = {}
      params.id = this.mId
      this.pagination.current = 1
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      if (key === '1') {
        this.getEnvi(params)
        this.columns = [{
          title: '交易时间',
          key: 'createTime',
          dataIndex: 'createTime'
        }, {
          title: '用户名称',
          key: 'nickName',
          dataIndex: 'nickName'
        }, {
          title: '用户手机号',
          key: 'mobile',
          dataIndex: 'mobile'
        }, {
          title: '用户IC卡号',
          key: 'cardNum',
          dataIndex: 'cardNum'
        }, {
          title: '支付方式',
          key: 'payKind',
          dataIndex: 'payKind',
          scopedSlots: { customRender: 'payKind' }
        }, {
          title: '环保值',
          key: 'environstr',
          dataIndex: 'environstr'
        }, {
          title: '商户账户环保值',
          key: 'bsEnviron',
          dataIndex: 'bsEnviron'
        }]
      } else if (key === '2') {
        this.getInte(params)
        this.columns = [{
          title: '交易时间',
          key: 'createTime',
          dataIndex: 'createTime'
        }, {
          title: '用户名称',
          key: 'nickName',
          dataIndex: 'nickName'
        }, {
          title: '用户手机号',
          key: 'mobile',
          dataIndex: 'mobile'
        }, {
          title: '用户IC卡号',
          key: 'cardNum',
          dataIndex: 'cardNum'
        }, {
          title: '支付方式',
          key: 'payKind',
          dataIndex: 'payKind',
          scopedSlots: { customRender: 'payKind' }
        }, {
          title: '新增余额',
          key: 'changeCatstr',
          dataIndex: 'changeCatstr'
        }, {
          title: '商户账户余额',
          key: 'bsCat',
          dataIndex: 'bsCat'
        }]
      }
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      const params = {}
      params.id = this.mId
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      if (this.currentKey === '1') {
        this.getEnvi(params)
      } else if (this.currentKey === '2') {
        this.getInte(params)
      }
    },
    toExport () {
      this.exportVisible = true
      this.exportForm.setFieldsValue({
        exportDate: null
      })
    },
    exportSure (e) {
      e.preventDefault()
      this.exportForm.validateFields((err, values) => {
        if (!err) {
          const date = this.exportForm.getFieldValue('exportDate')
          var param = {}
          param.id = this.mId
          param.startDate = date[0].format('YYYY-MM-DD')
          param.endDate = date[1].format('YYYY-MM-DD')
          if (this.currentKey === '1') {
            param.menuId = '2b0c7307ea5043eca47064bc6ab8a914'
            this.toExportExcel('/merchant/info/exportEnvi', param, '环保值记录.xlsx')
          } else if (this.currentKey === '2') {
            param.menuId = 'e842a9d6b8b04831b974101ba94777e0'
            this.toExportExcel('/merchant/info/exportInte', param, '余额记录.xlsx')
          }
          this.exportVisible = false
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.merchantDetails
  background-color #fff
  padding 16px 20px 0 20px
  margin-bottom 20px
  font-size 12px
  color #000
  .mr16
    margin-right 16px
  .mt16
    margin-top 16px
  .w100
    width 100%
  .photoWarn
    color #999
    height 102px
    line-height 102px
  .commonTitle
    font-size 16px
    font-weight 600
    color #333
  .card-content
    margin-top 16px
    .commonLine
      height 32px
      line-height 32px
      background-color #f2f2f2
      padding 0 11px
      color #333
      font-size 12px
      .showComplete
        color #2F90FF
        font-size 12px
        float right
        cursor pointer
  .bottomBtn
    margin-top 40px
    margin-bottom 40px !important
    text-align center
  .cp
    cursor pointer
.dlContent
  .dlIcon
    font-size 30px
  .dlTitle
    vertical-align text-bottom
    padding-left: 10px
    font-size: 16px
    color: #333
    font-weight: 500
  .mt16
    margin-top 16px
</style>
<style lang="stylus">
.merchantDetails
  .card-content
    label
      font-size 12px
    .ant-input, .ant-form-explain
      font-size 12px
    .ant-form-item
      margin-bottom 16px
    .ant-select
      font-size 12px
    .ant-form-item-label
      height 32px
      line-height 32px
    .ant-form-item-control
      height 32px
      line-height 32px
    .ant-upload.ant-upload-select-picture-card
      float left
    .ant-input-disabled, .ant-cascader-picker-disabled, .ant-select-disabled .ant-select-selection
      background-color #f2f2f2
      border 1px solid #f2f2f2
      color #333
      cursor default
      .ant-select-arrow .ant-select-arrow-icon, .ant-cascader-picker-arrow
        display none
  .bottomBtn
    .ant-btn
      border-radius 2px
      font-size 12px
      line-height normal
.commonModal
  .ant-modal-body
    padding-bottom 0px
  .ant-form-item
    margin-bottom 16px
  .ant-modal-footer
    padding 0 24px 20px 24px
  .ant-calendar-picker, .ant-form-explain
    margin-left 40px
    width calc(100% - 40px)
</style>
