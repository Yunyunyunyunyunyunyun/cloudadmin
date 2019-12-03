<template>
  <div class="order-record">
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form ref="searchForm" :form="form">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item label="区域" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
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
              <a-form-item label="预约方式" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-select
                  v-decorator="['type',{
                    initialValue:''
                  }]"
                >
                  <a-select-option :value="''">
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
              <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="接单时间">
                <a-range-picker v-decorator="['createTime', rangeConfig]" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="订单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['orderId']" allow-clear placeholder="请输入订单号" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item label="联系人" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['userName']" allow-clear placeholder="请输入联系人或设备名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="手机号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-input v-decorator="['mobile']" allow-clear placeholder="请输入手机号或设备编号" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item label="订单状态" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-select
                  v-decorator="['state',{
                    initialValue:''
                  }]"
                >
                  <a-select-option :value="''">
                    全部
                  </a-select-option>
                  <!-- <a-select-option value="0">
                    待接单
                  </a-select-option>-->
                  <a-select-option value="1">
                    待回收
                  </a-select-option>
                  <a-select-option value="2">
                    回收完成
                  </a-select-option>
                  <a-select-option :value="3">
                    回收取消
                  </a-select-option>
                  <!-- <a-select-option :value="4">
                    失效
                  </a-select-option>-->
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="超时状态"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-decorator="[
                    'isTimeOut',
                    {
                      initialValue: ''
                    }
                  ]"
                >
                  <a-select-option value="">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    未超时
                  </a-select-option>
                  <a-select-option value="1">
                    已超时
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="24" align="right">
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
      <div class="card-title">
        接单回收订单列表
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="formData"
          :loading="loading"
          :pagination="pagination"
          :row-key="record => record.orderId"
          :scroll="{ x: 1500}"
          @change="handleTableChange"
        >
          <template slot="code" slot-scope="record">
            <span v-if="record.code.length==11">{{ record.code | mobileFl }}</span>
            <span v-else>{{ record.code }}</span>
          </template>
          <template slot="type" slot-scope="record">
            <span>{{ record.type| typeFl }}</span>
          </template>
          <template slot="state" slot-scope="record">
            <span>{{ record.state | stateFl }}</span>
          </template>
          <template slot="isTimeOut" slot-scope="record">
            <span>{{ record.isTimeOut ? "已超时" : "未超时" }}</span>
          </template>
          <span slot="action" slot-scope="record">
            <template>
              <a-button
                type="link" class="table-btn-link" size="small"
                @click="linkDetail(record)"
              >查看</a-button>
            </template>
            <a-dropdown
              v-if="record.state===1"
              :trigger="['click']"
              :get-popup-container="getPopupContainer"
            >
              <a class="ant-dropdown-link">
                更多
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="showModal(record)">取消用户订单</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="showModal(record,2)">取消小哥订单</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="showModal(record,3)">修改预约时间</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 操作的弹出框 -->
    <a-modal
      centered
      :closable="false"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="ant-modal-confirm-body">
        <a-icon class="model-icon" type="question-circle" />
        <span class="ant-modal-confirm-title">{{ cancelType===3?'是否确定修改预约上门回收时间':'是否确定取消此订单' }}</span>
        <div v-if="cancelType!==3" class="ant-modal-confirm-content">
          <div>{{ cancelType==1?'取消后此订单将作废，不会出现在抢单队列':'取消后此订单将重新回到抢单队列' }}</div>
        </div>
      </div>
      <a-form class="modal-form" :form="modalFrom">
        <div v-if="cancelType===3">
          <a-form-item label="预约上门日期" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-date-picker
              v-decorator="['homeDate',dateConfig]"
              style="width: 100%"
              :disabled-date="disabledDate"
              @change="handleTimeList"
            />
          </a-form-item>
          <a-form-item label="预约上门时间" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-select
              v-decorator="['homeTime',{rules: [{ required: true, message: '请选择预约上门时间' }], validateTrigger: 'change'}]"
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
          <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-textarea
              v-decorator="['remark', {rules: [{required: true, message: '请填写备注'}]}]"
              placeholder="请填写备注"
              rows="3"
              maxlength="50"
            />
          </a-form-item>
        </div>
        <div v-else>
          <a-form-item>
            <a-textarea
              v-decorator="['reason', {rules: [{required: true, message: '请填写取消原因'}]}]"
              placeholder="请填写取消原因（必填）"
              rows="3"
              maxlength="50"
            />
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import moment from 'moment'
import { getArea, getEstate } from '@/components/mixins/mixins'
import {
  reserveList,
  extendedTime,
  cancelReserve,
  cancelOrder
} from '@/api/order'
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
    title: '手机号',
    dataIndex: '',
    key: 'code',
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '预约方式',
    dataIndex: '',
    key: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '接单时间',
    dataIndex: 'receiptTime'
  },
  {
    title: '预约上门时间',
    dataIndex: 'recycleDate'
  },
  {
    title: '订单状态',
    dataIndex: '',
    key: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '超时状态',
    dataIndex: '',
    key: 'isTimeOut',
    scopedSlots: { customRender: 'isTimeOut' }
  },
  {
    title: '回收完成时间',
    dataIndex: 'finishTime'
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 130,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  mixins: [getArea, getEstate],
  data () {
    return {
      cancelType: 1, // 取消预约 2 取消订单 3 延时回收
      modalTitle: '取消预约提示',
      visible: false,
      confirmLoading: false,
      loading: false,
      currentId: '',
      timeList: [],
      region: [],
      columns,
      rangeConfig: {
        rules: [{ type: 'array' }]
      },
      dateConfig: {
        rules: [
          { type: 'object', required: true, message: '请选择预约上门时间' }
        ]
      },
      formData: [],
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
      modalFrom: this.$form.createForm(this, { name: 'modal_from' }),
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
          type: data.type,
          isTimeOut: data.isTimeOut,
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
          class: '2'
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
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      this.getOrderList()
    },
    handleOk () {
      const {
        modalFrom: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (this.cancelType === 1) {
            const params = {
              id: this.currentId,
              remark: values.reason
            }
            cancelReserve(params).then(res => {
              this.handleResetData()
              this.$message.success('取消成功')
            })
          }
          if (this.cancelType === 2) {
            const params = {
              id: this.currentId,
              remark: values.reason
            }
            cancelOrder(params).then(res => {
              this.handleResetData()
              this.$message.success('取消成功')
            })
          }
          if (this.cancelType === 3) {
            const date = values.homeDate.format('YYYY-MM-DD')
            const startTime = `${date} ${JSON.parse(values.homeTime).start}:00`
            const endTime = `${date} ${JSON.parse(values.homeTime).end}:00`
            const params = {
              id: this.currentId,
              startTime,
              endTime,
              remark: values.remark
            }
            extendedTime(params).then(res => {
              this.handleResetData()
              this.$message.success('修改成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
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
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      this.getArea(targetOption.id, targetOption.layer + 1, targetOption, true)
    },
    handleCancel (e) {
      this.visible = false
    },
    showModal (item, type = 1) {
      this.modalTitle = type === 1 ? '取消预约提示' : '取消订单提示'
      this.cancelType = type
      this.currentId = item.id
      this.visible = true
    },
    linkDetail (item) {
      this.$router.replace({
        path: '/order/takeBack/meetDetail',
        query: {
          id: item.id
        }
      })
    },
    getPopupContainer: function (trigger) {
      return document.body
    },
    handleResetData () {
      this.visible = false
      this.confirmLoading = false
      this.modalFrom.resetFields()
      this.getOrderList()
    },
    handleTimeList (value) {
      this.timeList = []
      let startTime = 6
      if (value.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        startTime = moment().hour() > 6 ? moment().hour() + 2 : 6
      }
      const list = this.range(startTime, 22)
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
      const date = this.modalFrom.getFieldValue('homeDate')
      if (!date) {
        this.$message.error('抱歉请先选择日期')
      }
    },
    disabledDate (current) {
      return current && current < moment().subtract(1, 'days')
    }
  }
}
</script>
<style lang="stylus">
.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title
  font-size 12px
</style>
<style lang="stylus" scoped>
.model-icon
  font-size 22px
  color #faad14
.modal-form
  margin-top 20px
</style>
