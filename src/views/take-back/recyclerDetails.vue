<template>
  <div class="recyclerDetails">
    <div class="commonTitle">
      基础信息
    </div>
    <div class="card-content">
      <a-form :form="form" @submit="handleSubmit">
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="姓名"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div class="commonLine">
                {{ name }}
              </div>
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="手机号"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div v-if="mainTitle==='查看'" class="commonLine">
                {{ phoneNum }}
                <span v-if="showpn" class="showComplete" @click="showAllPhoneNum()">完整展示</span>
              </div>
              <a-input
                v-else
                v-model="phoneNum"
                allow-clear
                placeholder="请填写手机号"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="身份证号"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div class="commonLine">
                {{ IDNumber }}
                <span v-if="showin" class="showComplete" @click="showAllIDNumber()">完整展示</span>
              </div>
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="入驻时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div class="commonLine">
                {{ settlingTime }}
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="search-item" :span="12">
            <a-form-item
              label="注册区域"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div v-if="mainTitle==='查看'" class="commonLine">
                <span v-if="areaContain.length>0">{{ areaContain[0] }} / {{ areaContain[1] }} / {{ areaContain[2] }}</span>
              </div>
              <a-cascader
                v-else
                v-model="areaContain"
                :options="options"
                :load-data="loadData"
                :field-names="{
                  label: 'name',
                  value: 'name',
                  children: 'children'
                }"
                placeholder="省市区"
                change-on-select
              />
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="详细地址"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div v-if="mainTitle==='查看'" class="commonLine">
                {{ perAddress }}
              </div>
              <a-input
                v-else
                v-model="perAddress"
                allow-clear
                placeholder="请填写详细地址"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="缴纳押金总计（元）"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div class="commonLine">
                {{ depositTotal }}
              </div>
            </a-form-item>
          </a-col>
          <a-col class="line-item" :span="12">
            <a-form-item
              label="当前工作状态"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <div class="commonLine">
                {{ workStatus }}
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <span v-if="bond===0">
            <a-col class="line-item" :span="24">
              <a-form-item
                label="缴纳保证金（元）"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 21 }"
              >
                <div class="commonLine">
                  {{ bond }}
                </div>
              </a-form-item>
            </a-col>
          </span>
          <span v-else>
            <a-col class="line-item" :span="12">
              <a-form-item
                label="缴纳保证金（元）"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
              >
                <div class="commonLine">
                  {{ bond }}
                </div>
              </a-form-item>
            </a-col>
            <a-col class="line-item" :span="12">
              <a-form-item
                label="缴纳保证金时间"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
              >
                <div class="commonLine">
                  {{ bondTime }}
                </div>
              </a-form-item>
            </a-col>
          </span>
        </a-row>
        <a-row>
          <a-col class="line-item" :span="24">
            <a-form-item
              label="证件照片"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
            >
              <div v-if="!identityFront&&!identityBack&&!identityHold" class="viewPicture">
                <img class="passportPhoto">
              </div>
              <div v-else class="height90">
                <img :src="identityFront" class="passportPhoto" @click="showPicture(identityFront)">
                <img :src="identityBack" class="passportPhoto" @click="showPicture(identityBack)">
                <img :src="identityHold" class="passportPhoto" @click="showPicture(identityHold)">
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <div class="commonTitle mb16">
            账户数据
          </div>
        </a-row>
        <a-row>
          <span v-for="(item, index) in accountInfos" :key="index">
            <a-col
              v-if="index==='changeMoney'&&item===0"
              class="line-item"
              :span="24"
            >
              <a-form-item
                :label="index|accountTitleFilter"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 21 }"
              >
                <div class="commonLine">
                  {{ item }}
                </div>
              </a-form-item>
            </a-col>
            <a-col
              v-else-if="item!=undefined"
              class="line-item"
              :span="12"
            >
              <a-form-item
                :label="index|accountTitleFilter"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
              >
                <div class="commonLine">
                  {{ item }}
                </div>
              </a-form-item>
            </a-col>
          </span>
        </a-row>
        <a-row>
          <span v-if="carList.length>0">
            <div class="commonTitle mb16">
              车辆信息
            </div>
            <span v-for="(item, index) in carList" :key="index">
              <a-col v-if="carList.length>1" class="line-item" :span="24">
                <span class="carTitleLeft">车辆{{ index+1 }}</span>
              </a-col>
              <span v-for="(value, i) in item" :key="i">
                <a-col
                  v-if="i==='deposit'&&value===0"
                  class="line-item"
                  :span="24"
                >
                  <a-form-item
                    :label="i|carTitleFilter"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 21 }"
                  >
                    <div class="commonLine">
                      {{ value }}
                    </div>
                  </a-form-item>
                </a-col>
                <a-col
                  v-else
                  class="line-item"
                  :span="12"
                >
                  <a-form-item
                    :label="i|carTitleFilter"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 18 }"
                  >
                    <div class="commonLine">
                      <span v-if="i==='energyType'">{{ value==1?'电能':value==2?'汽油':value==3?'柴油':value==4?'天然气':'' }}</span>
                      <span v-else-if="i==='carType'">{{ value==1?'三轮车':value==2?'小货车':value==3?'中型货车':value==4?'大型货车':'' }}</span>
                      <span v-else-if="i==='audit'">{{ value==0?'未绑定':value==1?'已绑定':'' }}</span>
                      <span v-else-if="i==='type'">{{ value==0?'用户自有':value==1?'公司配备':'' }}</span>
                      <span v-else>{{ value }}</span>
                    </div>
                  </a-form-item>
                </a-col>
              </span>
            </span>
          </span>
        </a-row>
        <a-row>
          <a-col v-if="mainTitle === '查看'" :span="24" class="mt16">
            <div class="commonTitle">
              行为记录
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
                  :row-key="record => record.orderId"
                  :loading="loading"
                  class="table-content"
                  @change="handleTableChange"
                >
                  <template slot="firstType" slot-scope="type">
                    <span>{{ type == 1?"网上预约(app)":"" }}</span>
                    <span>{{ type == 2?"客服录入(电话)":"" }}</span>
                  </template>
                  <template slot="secondType" slot-scope="type">
                    <span>{{ type == 0?"回收":"" }}</span>
                    <span>{{ type == 1?"结算":"" }}</span>
                    <span>{{ type == 2?"提额":"" }}</span>
                    <span>{{ type == 3?"降额":"" }}</span>
                  </template>
                  <template slot="thirdType" slot-scope="type">
                    <span>{{ type == 0?"充值":"" }}</span>
                    <span>{{ type == 1?"处罚":"" }}</span>
                    <span>{{ type == 2?"撤销处罚":"" }}</span>
                    <span>{{ type == 3?"退还":"" }}</span>
                  </template>
                  <template slot="fouthType" slot-scope="type">
                    <span>{{ type == 0?"结算":"" }}</span>
                    <span>{{ type == 1?"提现":"" }}</span>
                  </template>
                  <template slot="channel" slot-scope="channel">
                    <span>{{ channel == 0?"银行卡":"" }}</span>
                    <span>{{ channel == 1?"支付宝":"" }}</span>
                    <span>{{ channel == 2?"微信":"" }}</span>
                  </template>
                </a-table>
              </a-tab-pane>
            </a-tabs>
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
            <a-form-item v-else-if="mainTitle==='查看'" :wrapper-col="{ span: 24 }" class="bottomBtn">
              <a-button type="primary" @click="backPage()">
                返回
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-modal v-model="picVisible" :footer="null">
      <img :src="picSrc">
    </a-modal>
  </div>
</template>
<script>
import { getAreaList } from '@/api/common'
import { getRecycleUserDetails, getRecycleRecord, editRecycle } from '@/api/takeBack'
export default {
  name: 'RecyclerDetails',
  filters: {
    carTitleFilter: function (value) {
      switch (value) {
        case 'audit':
          return '车辆绑定状态'
        case 'auditTime':
          return '绑定日期'
        case 'carNo':
          return '车牌号'
        case 'carNumber':
          return '车辆编号'
        case 'carType':
          return '车辆类型'
        case 'type':
          return '车辆属性'
        case 'energyType':
          return '车辆能源'
        case 'carWeight':
          return '车辆自重（kg）'
        case 'deposit':
          return '缴纳押金（元）'
        case 'depositTime':
          return '押金录入时间'
        default:
          return '字段值异常，请检查后台数据'
      }
    },
    accountTitleFilter: function (value) {
      switch (value) {
        case 'orderTotal':
          return '累计接单数'
        case 'orderCancelCount':
          return '主动取消单数'
        case 'fixedMoney':
          return '固定担保额度（元）'
        case 'prestore':
          return '当前剩余额度（元）'
        case 'finesTotal':
          return '累计处罚金额（元）'
        case 'settlePriceTotal':
          return '累计结算金额（元）'
        case 'balanceTotal':
          return '累计提现金额（元）'
        case 'balance':
          return '可提现余额（元）'
        case 'changeMoney':
          return '提升额度（元）'
        case 'changeTime':
          return '提升额度时间'
        default:
          return '字段值异常，请检查后台数据'
      }
    }
  },
  data () {
    return {
      mainTitle: '',
      form: this.$form.createForm(this, { name: 'recyclerDetails' }),
      IDNumber: '',
      trueIDNumber: '',
      name: '',
      phoneNum: '',
      trueNum: '',
      perAddress: '',
      settlingTime: '',
      workStatus: '',
      bond: '',
      bondTime: '',
      depositTotal: '',
      identityFront: '',
      identityBack: '',
      identityHold: '',
      accountInfos: {},
      carList: [],
      tabsTitle: [
        {
          title: '上门回收记录',
          value: 1
        },
        {
          title: '设备回收记录',
          value: 2
        },
        {
          title: '结算记录',
          value: 3
        },
        {
          title: '担保额度记录',
          value: 4
        },
        {
          title: '保证金流水记录',
          value: 5
        },
        {
          title: '余额流水记录',
          value: 6
        },
        {
          title: '提现记录',
          value: 7
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
      rId: '',
      currentKey: '',
      confirmLoading: false,
      picSrc: '',
      picVisible: false,
      areaContain: [],
      options: []
    }
  },
  created () {
    this.mainTitle = this.$route.query.title
    this.rId = this.$route.query.id
  },
  mounted () {
    this.getArea('', 2)
    const params = {}
    params.menuId = '3f9291ce8fbb42018fa147bb38326d84'
    params.id = this.rId
    this.getInfo(params)
    if (this.mainTitle === '查看') {
      this.callback(1)
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
    getInfo (params) {
      getRecycleUserDetails(params)
        .then(res => {
          this.name = res.result.realName
          if (this.mainTitle === '查看') {
            this.phoneNum = this.formatPhone(res.result.mobile)
            this.trueNum = res.result.mobile
          } else if (this.mainTitle === '编辑') {
            this.phoneNum = res.result.mobile
          }
          this.IDNumber = this.formatIdentityNum(res.result.identity)
          this.trueIDNumber = res.result.identity
          this.perAddress = res.result.address
          this.settlingTime = res.result.createTime
          this.workStatus = res.result.isEnable === 1 ? '禁用中' : res.result.workState === 0 ? '休息中' : res.result.workState === 1 ? '接单中' : ''
          this.bond = res.result.bail
          this.bondTime = res.result.bailTime
          this.depositTotal = res.result.depositTotal
          this.identityFront = res.result.identityFront
          this.identityBack = res.result.identityBack
          this.identityHold = res.result.identityHold
          this.accountInfos.orderTotal = res.result.orderTotal
          this.accountInfos.orderCancelCount = res.result.orderCancelCount
          this.accountInfos.fixedMoney = res.result.fixedMoney
          this.accountInfos.prestore = res.result.prestore
          this.accountInfos.finesTotal = res.result.finesTotal
          this.accountInfos.settlePriceTotal = res.result.settlePriceTotal
          this.accountInfos.balanceTotal = res.result.balanceTotal
          this.accountInfos.balance = res.result.balance
          this.accountInfos.changeMoney = res.result.changeMoney
          this.accountInfos.changeTime = res.result.changeTime
          this.carList = res.result.carList
          const newOptions = JSON.parse(JSON.stringify([...this.options]))
          newOptions.forEach(item => {
            if (item.name === res.result.provinceName) {
              getAreaList({
                id: item.id,
                layer: 3
              })
                .then(resp => {
                  item.children = resp.result.data
                  item.children.forEach(thing => {
                    if (thing.name === res.result.cityName) {
                      getAreaList({
                        id: thing.id,
                        layer: 4
                      })
                        .then(respo => {
                          thing.children = respo.result.data
                        })
                    }
                  })
                })
            }
          })
          this.options = newOptions
          setTimeout(() => {
            if (res.result.provinceName && res.result.cityName && res.result.countyName) {
              this.areaContain = [res.result.provinceName, res.result.cityName, res.result.countyName]
            }
          }, 500)
        })
    },
    showPicture (url) {
      this.picSrc = url
      this.picVisible = true
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
          params.menuId = 'a54206193f054cb49af1449b2df517cf'
          params.id = this.rId
          params.address = this.perAddress
          params.mobile = this.phoneNum
          if (this.areaContain.length !== 0) {
            if (this.areaContain[0]) {
              params.provinceName = this.areaContain[0]
            }
            if (this.areaContain[1]) {
              params.cityName = this.areaContain[1]
            }
            if (this.areaContain[2]) {
              params.countyName = this.areaContain[2]
            }
          }
          this.confirmLoading = true
          editRecycle(params).then(res => {
            this.confirmLoading = false
            this.$message.success(res.msg)
            this.backPage()
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    backPage () {
      this.$router.push({ path: '/takeBack/recyclerList' })
    },
    getTabList (params) {
      this.loading = true
      getRecycleRecord(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.list
          this.pagination.total = res.result.totalCount
        })
    },
    callback (key) {
      this.currentKey = key
      const params = {}
      params.id = this.rId
      this.pagination.current = 1
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      params.type = key
      this.getTabList(params)
      if (key === 1) {
        this.columns = [{
          title: '订单号',
          key: 'orderId',
          dataIndex: 'orderId'
        }, {
          title: '联系人',
          key: 'name',
          dataIndex: 'name'
        }, {
          title: '用户手机号',
          key: 'code',
          dataIndex: 'code'
        }, {
          title: '预约方式',
          key: 'type',
          dataIndex: 'type',
          scopedSlots: { customRender: 'firstType' }
        }, {
          title: '预约上门时间',
          key: 'recycleTime',
          dataIndex: 'recycleTime'
        }, {
          title: '接单时间',
          key: 'receiptTime',
          dataIndex: 'receiptTime'
        }, {
          title: '回收完成时间',
          key: 'finishTime',
          dataIndex: 'finishTime'
        }, {
          title: '回收品类',
          key: 'categoryName',
          dataIndex: 'categoryName'
        }, {
          title: '回收总量',
          key: 'weight',
          dataIndex: 'weight'
        }, {
          title: '回收金额',
          key: 'balance',
          dataIndex: 'balance'
        }]
      } else if (key === 2) {
        this.columns = [{
          title: '订单号',
          key: 'orderId',
          dataIndex: 'orderId'
        }, {
          title: '设备名称',
          key: 'name',
          dataIndex: 'name'
        }, {
          title: '设备编号',
          key: 'code',
          dataIndex: 'code'
        }, {
          title: '满溢推送时间',
          key: 'recycleTime',
          dataIndex: 'recycleTime'
        }, {
          title: '接单时间',
          key: 'receiptTime',
          dataIndex: 'receiptTime'
        }, {
          title: '回收完成时间',
          key: 'finishTime',
          dataIndex: 'finishTime'
        }, {
          title: '回收品类',
          key: 'categoryName',
          dataIndex: 'categoryName'
        }, {
          title: '回收重量（kg）',
          key: 'weight',
          dataIndex: 'weight'
        }, {
          title: '回收金额（元）',
          key: 'balance',
          dataIndex: 'balance'
        }]
      } else if (key === 3) {
        this.columns = [{
          title: '订单号',
          key: 'orderId',
          dataIndex: 'orderId'
        }, {
          title: '结算品类',
          key: 'categoryName',
          dataIndex: 'categoryName'
        }, {
          title: '结算总量',
          key: 'weight',
          dataIndex: 'weight'
        }, {
          title: '结算金额',
          key: 'settlePrice',
          dataIndex: 'settlePrice'
        }, {
          title: '实际获得金额',
          key: 'balance',
          dataIndex: 'balance'
        }, {
          title: '结算时间',
          key: 'settleTime',
          dataIndex: 'settleTime'
        }, {
          title: '操作人员',
          key: 'settleUser',
          dataIndex: 'settleUser'
        }]
      } else if (key === 4) {
        this.columns = [{
          title: '流水号',
          key: 'orderId',
          dataIndex: 'orderId'
        }, {
          title: '时间',
          key: 'createTime',
          dataIndex: 'createTime'
        }, {
          title: '担保额度变动（元）',
          key: 'changePrestore',
          dataIndex: 'changePrestore'
        }, {
          title: '剩余担保额度（元）',
          key: 'surplusPrestore',
          dataIndex: 'surplusPrestore'
        }, {
          title: '担保额度变动类型',
          key: 'type',
          dataIndex: 'type',
          scopedSlots: { customRender: 'secondType' }
        }]
      } else if (key === 5) {
        this.columns = [{
          title: '流水号',
          key: 'orderId',
          dataIndex: 'orderId'
        }, {
          title: '时间',
          key: 'createTime',
          dataIndex: 'createTime'
        }, {
          title: '保证金变动（元）',
          key: 'changeDeposit',
          dataIndex: 'changeDeposit'
        }, {
          title: '剩余保证金（元）',
          key: 'surplusDeposit',
          dataIndex: 'surplusDeposit'
        }, {
          title: '变动类型',
          key: 'type',
          dataIndex: 'type',
          scopedSlots: { customRender: 'thirdType' }
        }, {
          title: '操作人',
          key: 'createUser',
          dataIndex: 'createUser'
        }, {
          title: '备注',
          key: 'remark',
          dataIndex: 'remark'
        }]
      } else if (key === 6) {
        this.columns = [{
          title: '流水号',
          key: 'orderId',
          dataIndex: 'orderId'
        }, {
          title: '时间',
          key: 'createTime',
          dataIndex: 'createTime'
        }, {
          title: '余额变动（元）',
          key: 'changeBalance',
          dataIndex: 'changeBalance'
        }, {
          title: '服务费（元）',
          key: 'serverChange',
          dataIndex: 'serverChange'
        }, {
          title: '账户可用余额（元）',
          key: 'surplusBalance',
          dataIndex: 'surplusBalance'
        }, {
          title: '余额变动类型',
          key: 'type',
          dataIndex: 'type',
          scopedSlots: { customRender: 'fouthType' }
        }]
      } else if (key === 7) {
        this.columns = [{
          title: '提现订单号',
          key: 'orderId',
          dataIndex: 'orderId'
        }, {
          title: '提现到账渠道',
          key: 'channel',
          dataIndex: 'channel',
          scopedSlots: { customRender: 'channel' }
        }, {
          title: '提现到账账号',
          key: 'account',
          dataIndex: 'account'
        }, {
          title: '提现金额（元）',
          key: 'auditPrice',
          dataIndex: 'auditPrice'
        }, {
          title: '服务费（元）',
          key: 'fee',
          dataIndex: 'fee'
        }, {
          title: '申请时间',
          key: 'createTime',
          dataIndex: 'createTime'
        }, {
          title: '审核人',
          key: 'auditUserName',
          dataIndex: 'auditUserName'
        }, {
          title: '审核完成时间',
          key: 'auditTime',
          dataIndex: 'auditTime'
        }]
      }
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      const params = {}
      params.id = this.rId
      params.page = this.pagination.current
      params.pageSize = this.pagination.pageSize
      params.type = this.currentKey
      this.getTabList(params)
    }
  }
}
</script>
<style lang="stylus" scoped>
.recyclerDetails
  background-color #fff
  padding 16px 20px 0 20px
  margin-bottom 20px
  font-size 12px
  color #000
  .viewPicture
    width 104px
    height 104px
    background-color #fafafa
    border 1px dashed #d9d9d9
    border-radius 4px
  .viewPicture:hover
    border 1px dashed #1890FF
  .mr16
    margin-right 16px
  .mt16
    margin-top 16px
  .mb16
    margin-bottom 16px
  .height90
    height 98px
    padding-top 4px
    padding-bottom 4px
  .commonTitle
    font-size 16px
    font-weight 600
    color #333
  .card-content
    margin-top 16px
    .commonLine
      background-color #f2f2f2
      padding-left 11px
      padding-right 11px
      height 32px
      line-height 32px
      color #333
      font-size 12px
      .showComplete
        color #2F90FF
        font-size 12px
        float right
        cursor pointer
    .passportPhoto
      height 90px
      margin-right 16px
      float left
    .carTitleLeft
      padding-left 32px
      font-size 14px
      font-weight 600
  .bottomBtn
    margin-top 40px
    margin-bottom 40px !important
    text-align center
</style>
<style lang="stylus">
.recyclerDetails
  .card-content
    label
      font-size 12px
    .ant-input, .ant-form-explain
      font-size 12px
    .ant-form-item
      margin-bottom 16px
    .ant-form-item-label
      height 32px
      line-height 32px
    .ant-form-item-control
      height 32px
      line-height 32px
  .bottomBtn
    .ant-btn
      border-radius 2px
      font-size 12px
      line-height normal
</style>
