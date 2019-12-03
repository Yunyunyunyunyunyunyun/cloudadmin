<template>
  <div class="reserve">
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form ref="searchForm" :form="form">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="区域"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-cascader
                  v-model="region"
                  :load-data="loadData"
                  :options="options"
                  change-on-select
                  :field-names="{
                    label: 'name',
                    value: 'name',
                    children: 'children'
                  }"
                  placeholder="省市区"
                  @change="changeArea"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="预约方式"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-decorator="[
                    'type',
                    {
                      initialValue: ''
                    }
                  ]"
                >
                  <a-select-option value>
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    回收站满溢
                  </a-select-option>
                  <a-select-option value="1">
                    网上预约（app）
                  </a-select-option>
                  <a-select-option value="2">
                    客服录入(电话)
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="创建时间"
              >
                <a-range-picker v-decorator="['createTime', rangeConfig]" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="订单号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input
                  v-decorator="['orderId']"
                  allow-clear
                  placeholder="请输入订单号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="联系人"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input
                  v-decorator="['userName']"
                  allow-clear
                  placeholder="请输入联系人或设备名称"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="手机号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input
                  v-decorator="['mobile']"
                  allow-clear
                  placeholder="请输入手机号或设备编号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="订单状态"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-decorator="[
                    'state',
                    {
                      initialValue: ''
                    }
                  ]"
                >
                  <a-select-option :value="''">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    待接单
                  </a-select-option>
                  <a-select-option value="3">
                    预约取消
                  </a-select-option>
                  <a-select-option value="4">
                    失效
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6" align="right">
              <a-button type="primary" class="mr8" @click="toSearch">
                查询
              </a-button>
              <a-button @click="resetForm">
                重置
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="card-container mrt16">
      <a-row>
        <a-col :span="12">
          <div class="card-title">
            预约订单列表
          </div>
        </a-col>
        <a-col :span="12" align="right">
          <a-button type="primary" @click="showOrderMoal">
            录入订单
          </a-button>
        </a-col>
      </a-row>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="formData"
          :loading="loading"
          :pagination="pagination"
          :row-key="record => record.orderId"
          :scroll="{ x: 1500 }"
          @change="handleTableChange"
        >
          <template slot="code" slot-scope="record">
            <span v-if="record.code.length == 11">{{
              record.code | mobileFl
            }}</span>
            <span v-else>{{ record.code }}</span>
          </template>
          <template slot="type" slot-scope="record">
            <span>{{ record.type | typeFl }}</span>
          </template>
          <template slot="state" slot-scope="record">
            <span>{{ record.state | statusFl }}</span>
          </template>
          <template slot="action" slot-scope="record" class="btn-list">
            <a-button
              class="table-btn-link"
              type="link"
              size="small"
              @click="linkDetail(record)"
            >
              查看
            </a-button>
            <a-button
              v-if="record.state == 0"
              type="link"
              :size="'small'"
              @click="showModal(record)"
            >
              取消预约
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
    <!-- 取消预约弹框 -->
    <a-modal
      width="420px"
      centered
      :closable="false"
      :visible="visible"
      :confirm-loading="cancelLoading"
      @ok="handleOk"
      @cancel="handleIsVisible"
    >
      <div class="ant-modal-confirm-body">
        <a-icon class="model-icon" type="question-circle" />
        <span class="ant-modal-confirm-title">是否确定取消此订单</span>
      </div>
      <a-form class="modal-form" :form="modalForm">
        <a-form-item>
          <a-textarea
            v-decorator="[
              'reason',
              { rules: [{ required: true, message: '请填写取消原因' }] }
            ]"
            placeholder="请填写取消原因（必填）"
            rows="3"
            maxlength="50"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 预约订单录入 -->
    <a-modal
      title="电话预约订单录入"
      centered
      :visible="orderVisible"
      @cancel="handleIsOrderVisible"
    >
      <a-form :form="orderForm" class="detail-form">
        <a-form-item
          label="手机号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-select
            v-decorator="[
              'mobile',
              { rules: [{ required: true, message: '请输入或选择手机号' }, {validator: validatePhoneNum}] }
            ]"
            show-search
            label-in-value
            placeholder="请查询手机号，若为新用户保存后自动注册为会员"
            style="width: 100%"
            :filter-option="false"
            :not-found-content="fetching ? undefined : null"
            @search="getMemberList"
            @change="handleMemberChange"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option v-for="d in userList" :key="d.value">
              {{ d.text }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="联系人"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'contact',
              {
                rules: [{ required: true, message: '请输入联系人' }],
                validateTrigger: 'change'
              }
            ]"
            maxlength="20"
            type="text"
            placeholder="请输入联系人"
          />
        </a-form-item>
        <a-form-item
          label="预约上门日期"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-date-picker
            v-decorator="['homeDate', dateConfig]"
            style="width: 100%"
            :disabled-date="disabledDate"
            @change="handleTimeList"
          />
        </a-form-item>
        <a-form-item
          label="预约上门时间"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-select
            v-decorator="[
              'homeTime',
              {
                rules: [{ required: true, message: '请选择预约上门时间' }],
                validateTrigger: 'change'
              }
            ]"
            style="width: 100%"
            placeholder="请选择预约上门时间"
            @dropdownVisibleChange="dropdownVisibleChange"
          >
            <a-select-option
              v-for="(item, index) in timeList"
              :key="index"
              :value="JSON.stringify(item)"
            >
              {{ item.start }}---{{ item.end }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="上门回收地址"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'community',
              { rules: [{ required: true, message: '上门回收地址是必填的' }] }
            ]"
            type="text"
            read-only
            placeholder="请选择上门回收地址"
            @click="choosePos"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="详细地址"
        >
          <a-input
            v-decorator="[
              'address',
              { rules: [{ required: true, message: '详细地址是必填的' }] }
            ]"
            maxlength="100"
            type="text"
            placeholder="请输入详细地址"
          />
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-textarea
            v-decorator="['remark']"
            type="text"
            maxlength="100"
            placeholder="请填写备注信息"
            rows="1"
          />
        </a-form-item>
      </a-form>
      <template slot="footer">
        <div class="model-btn">
          <a-button
            :loading="confirmLoading"
            type="primary"
            @click="handleOrderOk"
          >
            保存放入抢单队列
          </a-button>
        </div>
      </template>
    </a-modal>
    <chooseSite
      ref="chooseMap"
      :map-dialog-obj="mapDialogObj"
      @getPosition="getPosition"
    />
  </div>
</template>
<script>
import moment from 'moment'
import { getArea, getEstate } from '@/components/mixins/mixins'
import chooseSite from '@/components/map/chooseSite.vue'
import { reserveList, addOrder, memberList, cancelReserve } from '@/api/order'
import debounce from 'lodash/debounce'
const columns = [
  {
    title: '订单号',
    dataIndex: 'orderId'
  },
  {
    title: '联系人',
    dataIndex: 'name'
  },
  {
    title: '用户手机号',
    dataIndex: '',
    key: 'code',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '预约回收品类',
    dataIndex: 'categoryName'
  },
  {
    title: '预约方式',
    dataIndex: '',
    key: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '预约上门时间',
    dataIndex: 'recycleDate'
  },
  {
    title: '订单录入人员',
    dataIndex: 'createUser'
  },
  {
    title: '订单状态',
    dataIndex: '',
    key: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 130,
    scopedSlots: { customRender: 'action' }
  }
]
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 }
}
export default {
  components: { chooseSite },
  filters: {
    statusFl: function (value) {
      let str = ''
      switch (value) {
        case 0:
          str = '待接单'
          break
        case 1:
          str = '待回收'
          break
        case 2:
          str = '回收完成'
          break
        case 3:
          str = '预约取消'
          break
        default:
          str = '失效'
          break
      }
      return str
    }
  },
  mixins: [getArea, getEstate],
  data () {
    this.lastFetchId = 0
    this.getMemberList = debounce(this.getMemberList, 800)
    return {
      currentOrderId: '',
      fetching: false,
      loading: false,
      confirmLoading: false,
      cancelLoading: false,
      visible: false,
      orderVisible: false,
      region: [],
      userList: [],
      formData: [],
      timeList: [],
      columns,
      formItemLayout,
      positionInfo: null,
      rangeConfig: {
        rules: []
      },
      mapDialogObj: {
        visible: false
      },
      dateConfig: {
        rules: [
          { type: 'object', required: true, message: '请选择预约上门时间' }
        ]
      },
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => '共' + total + '条记录',
        pageSizeOptions: ['10', '20', '30', '40'],
        defaultPageSize: 10,
        total: 0
      },
      form: this.$form.createForm(this, { name: 'filter_from' }),
      modalForm: this.$form.createForm(this, { name: 'modal_from' }),
      orderForm: this.$form.createForm(this, { name: 'order_from' }),
      range (start, end) {
        const result = []
        for (let i = start; i < end; i += 2) {
          result.push(i)
        }
        return result
      }
    }
  },
  mounted: function () {
    this.load()
  },
  methods: {
    load () {
      this.getOrderList()
      this.getArea('', 2, null, true)
    },
    getOrderList () {
      const data = this.form.getFieldsValue()
      const params = {
        menuId: '91193b7fb2804e9caef46a9caa554da8',
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        queryParams: {
          provinceName: this.region[0] || '',
          cityName: this.region[1] || '',
          countyName: this.region[2] || '',
          orderId: data.orderId || '',
          type: data.type || '',
          startTime:
            (data.createTime &&
              data.createTime.length &&
              data.createTime[0].format('YYYY-MM-DD')) ||
            '',
          endTime:
            (data.createTime &&
              data.createTime.length &&
              data.createTime[1].format('YYYY-MM-DD')) ||
            '',
          receipt: data.userName || '',
          mobile: data.mobile || '',
          class: '1'
        }
      }
      if (data.state) {
        Object.assign(params.queryParams, {
          state: data.state
        })
      }
      this.loading = true
      reserveList(params).then(res => {
        this.loading = false
        const result = res.result
        this.formData = result.data
        this.pagination.total = result.totalCount
      })
    },
    validatePhoneNum (rule, value, callback) {
      const reg = /^[1][3-9][0-9]{9}$/
      if (value.label && !reg.test(`${parseInt(value.label)}`)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
    getMemberList (value) {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      const params = {
        cellPhone: value
      }
      this.userList = []
      this.fetching = true
      memberList(params).then(res => {
        this.fetching = false
        if (fetchId !== this.lastFetchId) {
          return
        }
        const data = res.result.map(user => ({
          text: `${user.cellPhone}`,
          value: user.id
        }))
        this.userList = data
        if (this.userList.length === 0) {
          this.orderForm.setFieldsValue({ mobile: { label: value, key: '' }})
        }
        this.fetching = false
      })
    },
    toSearch (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.pagination.current = 1
          this.getOrderList()
        }
      })
    },
    resetForm () {
      this.region = []
      this.form.resetFields()
    },
    getPosition (positionInfo) {
      // 获取地区选取信息
      if (positionInfo.address) {
        this.positionInfo = positionInfo
        this.orderForm.setFieldsValue({ community: positionInfo.address })
      } else {
        this.$message.error('抱歉您暂未选择地址')
      }
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
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      this.getArea(targetOption.id, targetOption.layer + 1, targetOption, true)
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      this.getOrderList()
    },
    disabledDate (current) {
      return current && current < moment().subtract(1, 'days')
    },
    handleIsVisible (e) {
      this.visible = !this.visible
    },
    handleIsOrderVisible () {
      this.orderForm.resetFields()
      this.confirmLoading = false
      this.orderVisible = !this.orderVisible
    },
    // 录入订单
    showOrderMoal () {
      this.handleIsOrderVisible()
    },
    // 取消预约
    showModal (item) {
      this.currentOrderId = item.id
      this.modalForm.resetFields()
      this.handleIsVisible()
    },
    choosePos () {
      this.mapDialogObj.visible = true
      this.$refs.chooseMap.initMap()
    },
    // 取消订单确认
    handleOk () {
      const {
        modalForm: { validateFields }
      } = this
      validateFields((errors, values) => {
        if (!errors) {
          const params = {
            id: this.currentOrderId,
            remark: values.reason
          }
          this.cancelLoading = true
          cancelReserve(params).then(res => {
            this.visible = false
            this.cancelLoading = false
            this.$message.success('取消预约成功')
            this.resetForm()
            this.getOrderList()
          })
        }
      })
    },
    // 录入订单确认
    handleOrderOk () {
      const {
        orderForm: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          const date = values.homeDate.format('YYYY-MM-DD')
          const startTime = `${date} ${JSON.parse(values.homeTime).start}:00`
          const endTime = `${date} ${JSON.parse(values.homeTime).end}:00`
          const params = {
            menuId: '0e5f47e1c8e24726939741870b392c05',
            recycleTime: startTime,
            overTime: endTime,
            remark: values.remark || '',
            name: values.contact || '',
            applyId: values.mobile.key,
            code: `${parseInt(values.mobile.label)}`,
            lo: this.positionInfo.point.lng,
            la: this.positionInfo.point.lat,
            province: this.positionInfo.province,
            city: this.positionInfo.city,
            area: this.positionInfo.district,
            address: values.address
          }
          addOrder(params).then(res => {
            this.handleIsOrderVisible()
            this.confirmLoading = false
            this.$message.success('录入成功')
            this.resetForm()
            this.orderForm.resetFields()
            this.getOrderList()
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleMemberChange (value) {
      Object.assign(this, {
        memberList: [],
        fetching: false
      })
    },
    // 生成时间区间列表
    handleTimeList (value) {
      this.timeList = []
      let startTime = 6
      if (value.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        startTime = moment().hour() > 6 ? moment().hour() + 2 : 6
      }
      const list = this.range(startTime, 22)
      list[list.length - 1] = 21
      for (let i = 0; i < list.length; i++) {
        if (i !== list.length - 1) {
          const obj = {
            start: `${list[i]}:00`,
            end: `${list[i + 1]}:00`
          }
          this.timeList.push(obj)
        }
      }
    },
    dropdownVisibleChange () {
      const date = this.orderForm.getFieldValue('homeDate')
      if (!date) {
        this.$message.error('抱歉请先选择日期')
      }
    },
    linkDetail (item) {
      this.$router.replace({
        path: '/order/takeBack/reserveDetail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>
<style lang="stylus">
.model-btn
  width 100%
  text-align center
</style>
<style lang="stylus" scoped>
.model-icon
  font-size 22px
  color #faad14
.modal-form
  margin-top 20px
</style>
