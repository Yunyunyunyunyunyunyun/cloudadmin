<template>
  <div class="role">
    <div class="card-container">
      <div class="card-title">
        筛选查询
      </div>
      <div class="card-content">
        <a-form :form="form" @submit="handleSubmit">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="操作人员">
                <a-input
                  v-decorator="[
                    'userName'
                  ]"
                  placeholder="请输入操作人员"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="操作日期">
                <a-range-picker v-decorator="['date',rangeConfig]" format="YYYY-MM-DD" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="12" align="right">
              <a-form-item>
                <a-button type="primary" class="mr8" html-type="submit">
                  查询
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="card-container mrt16">
      <div class="card-title">
        操作日志列表
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="formData"
          :loading="loading"
          :pagination="pagination"
          :row-key="record => record.id"
          @change="handleTableChange"
        >
          <template slot="status" slot-scope="record">
            <span v-if="record.status===1" class="tag green">启用</span>
            <span v-else class="tag grey">停用</span>
          </template>
          <template slot="userNum" slot-scope="record">
            <a-button type="link" size="small" @click="showRoleModal">
              {{ record.userNum }}
            </a-button>
          </template>
          <template slot="operate" slot-scope="record">
            <a-button type="link" size="small" @click="toView(record)">
              查看
            </a-button>
            <a-button type="link" size="small" @click="toConfig(record)">
              编辑
            </a-button>
            <a-button type="link" size="small" @click="delRole(record)">
              删除
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { logList } from '@/api/system'
const columns = [
  {
    title: '编辑号',
    dataIndex: 'id'
  },
  {
    title: '操作人员',
    dataIndex: 'userName'
  },
  {
    title: '操作日期',
    dataIndex: 'createDate'
  },
  {
    title: 'IP地址',
    dataIndex: 'userIp'
  },
  {
    title: '操作记录',
    dataIndex: 'operDesc'
  }
]
export default {
  data () {
    return {
      loading: false,
      columns,
      rangeConfig: {
        initialValue: [moment(), moment()],
        rules: [{ type: 'array' }]
      },
      formData: [
        {
          id: '19072209052500000001',
          operator: 'admin',
          operatorTime: '2017-07-07 16:58:11',
          IP: '220.231.210.22',
          operationRecord: '编辑会员账号: windir'
        },
        {
          id: '19072209052500000002',
          operator: 'admin',
          operatorTime: '2017-07-07 16:58:11',
          IP: '220.231.210.22',
          operationRecord: '编辑会员账号: windir'
        }
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => '共' + total + '条记录',
        pageSizeOptions: ['10', '20', '30', '40'],
        defaultPageSize: 10,
        total: 0
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'filter_from' })
  },
  mounted: function () {
    this.getLogList()
  },
  methods: {
    getLogList () {
      const date = this.form.getFieldValue('date')
      const params = {
        menuId: '2e39f20448914e40a42322140562321e',
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        userName: this.form.getFieldValue('userName') || '',
        startDate: date[0].format('YYYY-MM-DD'),
        endDate: date[1].format('YYYY-MM-DD')
      }
      this.loading = true
      logList(params).then(res => {
        this.loading = false
        const result = res.result
        this.formData = result.list
        this.pagination.total = result.totalCount
      })
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      this.getLogList()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.pagination.current = 1
          this.getLogList()
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
//
</style>
