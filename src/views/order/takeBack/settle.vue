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
              <a-form-item
                label="回收人员"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input
                  v-decorator="['recycleName']"
                  allow-clear
                  placeholder="请输入回收人员"
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
                label="订单号"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input
                  v-decorator="['orderId']"
                  allow-clear
                  placeholder="请输入结算单号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="结算品类"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-decorator="[
                    'categoryId',
                    {
                      initialValue: ''
                    }
                  ]"
                  show-search
                  :filter-option="filterOption"
                >
                  <a-select-option :key="''">
                    全部
                  </a-select-option>
                  <a-select-option v-for="item in categoryList" :key="item.id">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="结算时间"
              >
                <a-range-picker v-decorator="['createTime', rangeConfig]" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="结算状态"
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
                  <a-select-option value>
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    待结算
                  </a-select-option>
                  <a-select-option value="1">
                    已结算
                  </a-select-option>
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
      <div class="card-title">
        结算回收订单列表
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="formData"
          :loading="loading"
          :pagination="pagination"
          :row-key="record => record.id"
          :scroll="{ x: 1500 }"
          @change="handleTableChange"
        >
          <template slot="mobile" slot-scope="record">
            <span>{{ record.mobile | mobileFl }}</span>
          </template>
          <template slot="state" slot-scope="record">
            <span>{{ record.state | statusFl }}</span>
          </template>
          <template slot="isTimeOut" slot-scope="record">
            <span>{{ record.isTimeOut ? "已超时" : "未超时" }}</span>
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
              v-if="record.state === 0"
              type="link"
              size="small"
              @click="showModal(record)"
            >
              延长结算
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
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
        <span class="ant-modal-confirm-title">是否确定延长结算时间</span>
      </div>
      <a-form class="modal-form" :form="modalFrom">
        <a-form-item
          label="延长小时数"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-input-number
            v-decorator="[
              'hour',
              {
                rules: [
                  { required: true, message: '请填写延长小时数' },
                  {
                    max: 24,
                    min: 1,
                    message: '只可输入小于24的正整数',
                    type: 'number'
                  }
                ]
              }
            ]"
            style="width:100%"
            placeholder="未超时按将超时时间延长，已超时按当前时间"
          />
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-textarea
            v-decorator="[
              'reason',
              { rules: [{ required: true, message: '请填写延长结算原因' }] }
            ]"
            placeholder="请填写延长结算原因（必填）"
            rows="3"
            maxlength="50"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { getArea, getEstate } from '@/components/mixins/mixins'
import { settleList, dictType, extendSettlement } from '@/api/order'
const columns = [
  {
    title: '订单号',
    dataIndex: 'orderId'
  },
  {
    title: '回收人员',
    dataIndex: 'userName'
  },
  {
    title: '回收人员手机号',
    dataIndex: '',
    key: 'mobile',
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '结算品类',
    dataIndex: 'categoryName'
  },
  {
    title: '结算总量',
    dataIndex: 'total'
  },
  {
    title: '结算状态',
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
    title: '结算金额（元）',
    dataIndex: 'settlePrice'
  },
  {
    title: '结算时间',
    dataIndex: 'settleTime'
  },
  {
    title: '操作人员',
    dataIndex: 'settleUser'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 130,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  filters: {
    statusFl: function (value) {
      let str = ''
      switch (value) {
        case 1:
          str = '已结算'
          break

        default:
          str = '待结算'
          break
      }
      return str
    }
  },
  mixins: [getArea, getEstate],
  data () {
    return {
      visible: false,
      confirmLoading: false,
      loading: false,
      currentId: '',
      columns,
      categoryList: [],
      rangeConfig: {
        rules: [{ type: 'array' }]
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
      modalFrom: this.$form.createForm(this, { name: 'modal_from' })
    }
  },
  mounted: function () {
    this.load()
  },
  methods: {
    load () {
      this.getOrderList()
      this.getDictType()
    },
    // 获取结算订单列表
    getOrderList () {
      const data = this.form.getFieldsValue()
      const params = {
        menuId: 'c0ef4e8e1a594043a98f81a376ccdf2c',
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        queryParams: {
          orderId: data.orderId || '',
          categoryId: data.categoryId || '',
          recycleName: data.recycleName || '',
          mobile: data.mobile || '',
          isTimeOut: data.isTimeOut,
          state: data.state,
          startTime:
            (data.createTime &&
              data.createTime.length &&
              data.createTime[0].format('YYYY-MM-DD')) ||
            '',
          endTime:
            (data.createTime &&
              data.createTime.length &&
              data.createTime[1].format('YYYY-MM-DD')) ||
            ''
        }
      }
      if (data.state) {
        Object.assign(params.queryParams, {
          state: data.state
        })
      }
      this.loading = true
      settleList(params).then(res => {
        const result = res.result
        this.loading = false
        this.formData = result.data
        this.pagination.total = result.totalCount
      })
    },
    // 获取回收种类
    getDictType () {
      dictType().then(res => {
        this.categoryList = res.result
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
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
    toSearch (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.pagination.current = 1
          this.getOrderList()
        }
      })
    },
    handleCancel (e) {
      this.visible = false
    },
    showModal (item) {
      this.currentId = item.id
      this.visible = true
    },
    handleOk () {
      const {
        modalFrom: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const params = {
            id: this.currentId,
            hour: values.hour,
            remark: values.remark
          }
          extendSettlement(params).then(res => {
            this.visible = false
            this.confirmLoading = false
            this.modalFrom.resetFields()
          }).catch(() => {
            this.visible = false
            this.confirmLoading = false
            this.modalFrom.resetFields()
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    linkDetail (item) {
      this.$router.replace({
        path: '/order/takeBack/settleDetail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>
<style lang="stylus">
.ant-input-number-input
  font-size 12px
</style>
<style lang="stylus" scoped>
.model-icon
  font-size 22px
  color #faad14
.modal-form
  margin-top 20px
</style>
