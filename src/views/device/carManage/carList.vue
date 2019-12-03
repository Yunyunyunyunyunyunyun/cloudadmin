<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form ref="searchForm" :form="form">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="车辆编号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['carNumber']"
                  allow-clear placeholder="请输入车辆编号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="车牌号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['carNo']"
                  allow-clear placeholder="请输入车牌号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="绑定用户"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['realName']"
                  allow-clear placeholder="请输入绑定的用户"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="车辆类型"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['carType']"
                  allow-clear
                  placeholder="全部"
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
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="车辆属性"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['type']"
                  allow-clear
                  placeholder="全部"
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
            <a-col class="search-item" :span="18" align="right">
              <a-button type="primary" class="mr8" @click="toSearch">
                查询
              </a-button>
              <a-button class="mr8" @click="resetForm">
                重置
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="card-container">
      <div class="card-title">
        <a-row
          type="flex" align="middle"
        >
          <a-col :span="12">
            已入库车辆列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button class="mr8" @click="toAdd">
              添加车辆
            </a-button>
            <a-button @click="importBatch">
              批量入库
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :row-key="record => record.carNumber"
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="pagination"
          :scroll="{x: 1500}"
          @change="handleTableChange"
        >
          <template slot="operate" slot-scope="text, record">
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toView(record)"
            >
              查看
            </a-button>
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toEdit(record)"
            >
              编辑
            </a-button>
            <a-button
              v-if="record.audit == 1"
              class="table-btn-link" type="link" size="small"
              @click="toUntying(record)"
            >
              解绑
            </a-button>
            <a-button
              v-if="record.type == 1"
              class="table-btn-link" type="link" size="small"
              @click="cashEnter(record)"
            >
              押金录入
            </a-button>
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toDelete(record)"
            >
              删除
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal
      title="批量入库" centered :visible="batchObj.visible" :mask-closable="false"
      @cancel="batchObj.visible=false"
    >
      <a-row>
        <a-col :span="2">
          <div class="iconfont batch">
            &#xe617;
          </div>
        </a-col>
        <a-col :span="22" class="batch-container">
          <div class="batch-title">
            填写导入车辆的信息
          </div>
          <div class="batch-tip">
            请按照数据模板的格式准备导入数据，请勿更改模板中字段
          </div>
          <a-button icon="download" class="batch-btn" @click="batchDownload">
            下载模板
          </a-button>
        </a-col>
      </a-row>
      <a-row style="margin-top: 40px;">
        <a-col :span="2">
          <div class="iconfont batch">
            &#xe62b;
          </div>
        </a-col>
        <a-col :span="22" class="batch-container">
          <div class="batch-title">
            上传填好的车辆的信息表
          </div>
          <div class="batch-tip">
            上传后缀名必须为 xls 或 xlsx（即excel格式），文件 ≤ 10M
          </div>
          <a-upload
            name="file" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload"
          >
            <a-button icon="upload" type="primary">
              上传文件
            </a-button>
          </a-upload>
        </a-col>
      </a-row>
      <div slot="footer">
        <a-button @click="batchObj.visible = false">
          取消
        </a-button>
        <a-button type="primary" :loading="uploading" @click="batchConfirm">
          确定
        </a-button>
      </div>
    </a-modal>
    <comfirmModal :dialog-obj="dialogObj" :is-btnok="dialogObj.isBtnok" @handleOk="handleOk">
      <a-form :form="dialogObj.form">
        <a-form-item>
          <a-input
            v-decorator="['deposit']"
            style="width: 80%"
            :disabled="!dialogObj.isBtnok"
            placeholder="请输入金额，提交后无法修改请谨慎"
          ></a-input>
        </a-form-item>
      </a-form>
    </comfirmModal>
  </div>
</template>

<script>
import comfirmModal from '@/components/commonModal/comfirmModal.vue'
export default {
  components: { comfirmModal },
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, {}),
      fileList: [],
      uploading: false,
      columns: [
        {
          title: '车辆编号',
          dataIndex: 'carNumber'
        },
        {
          title: '车牌号',
          dataIndex: 'carNo'
        },
        {
          title: '车辆类型',
          dataIndex: 'carType',
          customRender (val, row, index) {
            if (val === 1) return '三轮车'
            if (val === 2) return '小货车'
            if (val === 3) return '中型货车'
            if (val === 4) return '大型货车'
          }
        },
        {
          title: '车辆属性',
          dataIndex: 'type',
          customRender (val, row, index) {
            if (val === 0) return '用户自有'
            if (val === 1) return '公司配备'
          }
        },
        {
          title: '入库时间',
          dataIndex: 'createTime'
        },
        {
          title: '入库人员',
          dataIndex: 'createUser',
          customRender (val, row, index) {
            if (!val || val === '') {
              return '自动入库'
            } else {
              return val
            }
          }
        },
        {
          title: '绑定用户',
          dataIndex: 'realName'
        },
        {
          title: '操作',
          fixed: 'right',
          width: 230,
          scopedSlots: { customRender: 'operate' }
        }
      ],
      data: [],
      loading: false,
      totalPage: 50,
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
      batchObj: {
        visible: false
      },
      dialogObj: {
        isBtnok: true,
        visible: false,
        iconType: 'exclamation-circle',
        title: '',
        form: this.$form.createForm(this, { name: 'cash' })
      }
    }
  },
  computed: {
  },
  mounted () {
    this.toSearch()
  },
  methods: {
    toSearch () {
      this.pagination.current = 1
      this.getTableData()
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.getTableData()
    },
    getTableData () {
      var param = this.form.getFieldsValue()
      param.menuId = '377c32de289d41e18248456615cf59a3'
      param.page = this.pagination.current
      param.pageSize = this.pagination.pageSize
      this.loading = true
      this.$httpPost(this.$basePath.getRecycleCarList, param)
        .then(res => {
          this.loading = false
          this.data = res.result.list
          this.pagination.total = res.result.totalCount
        })
    },
    resetForm () {
      this.form.resetFields()
    },
    importBatch () {
      this.batchObj.visible = true
      this.fileList = []
    },
    batchDownload () {
      window.open('http://h5.mymrmao.com/车辆批量入库信息.xlsx')
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      const isText = file.type === 'application/vnd.ms-excel'
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const isExcel = file.name.split('.')[file.name.split('.').length - 1] === 'xlsx' || file.name.split('.')[file.name.split('.').length - 1] === 'xls'
      if (isText || isTextComputer || isExcel) {
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过 10MB!')
          return false
        }
      } else {
        this.$message.error('请选择Excel文件上传!')
        return false
      }
      this.fileList = [file]
      return false
    },
    batchConfirm () {
      const { fileList } = this
      if (fileList.length <= 0) {
        this.$message.error('请选择文件再上传!')
        return false
      }
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', file)
      })
      this.uploading = true
      var config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.$httpPost(this.$basePath.importCarInfo, formData, config)
        .then(res => {
          this.uploading = false
          this.batchObj.visible = false
          this.getTableData()
        })
        .catch(() => {
          this.uploading = false
        })
    },
    toAdd () {
      this.$router.push({
        path: '/device/carManage/carList/addCar'
      })
    },
    toView (row) {
      this.$router.push({
        path: '/device/carManage/carList/viewCar',
        query: { carNumber: row.carNumber, menuId: '739abb3f639d4462a9b3a4a35cb274c5' }
      })
    },
    toEdit (row) {
      this.$router.push({
        path: '/device/carManage/carList/editCar',
        query: { carNumber: row.carNumber, menuId: 'bc28d4cdeb0248a09782d1b3c7a83af4' }
      })
    },
    toUntying (row) {
      var self = this
      this.$confirm({
        centered: true,
        title: '是否确定将此车辆与用户解绑',
        onOk () {
          self.carOperate('f88721fb213548cc84905a4e43b0f539', row.carNo, 1)
        }
      })
    },
    carOperate (menuId, carNo, type, deposit) {
      this.$httpPost(this.$basePath.bindCarInfo, {
        menuId: menuId,
        carNo: carNo,
        type: type,
        deposit: deposit
      })
        .then(res => {
          this.$message.success(res.msg)
          this.toSearch()
        })
    },
    cashEnter (row) {
      this.dialogObj.visible = true
      this.$nextTick(() => {
        this.dialogObj.form.resetFields()
      })
      if (row.deposit === 0) {
        this.dialogObj.title = '请录入已收到的车辆押金'
        this.dialogObj.isBtnok = true
        this.dialogObj.carNo = row.carNo
      } else {
        this.dialogObj.isBtnok = false
        this.dialogObj.title = '已收到的车辆押金'
        this.$nextTick(() => {
          this.dialogObj.form.setFieldsValue({ deposit: row.deposit })
        })
      }
    },
    handleOk () {
      this.dialogObj.visible = false
      this.carOperate('0d5bfa3050a446a9bc8893cd583d4fc1', this.dialogObj.carNo, 3, Number(this.dialogObj.form.getFieldValue('deposit')))
    },
    toDelete (row) {
      var self = this
      this.$confirm({
        centered: true,
        title: '是否确定删除此车辆',
        onOk () {
          self.carOperate('080d5ec4ca064749a1cc9e007d205a84', row.carNo, 2)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.iconfont.batch
  text-align center
  font-size 20px
  color #cdcdcd
  margin-top 10px
.batch-container
  padding-left 15px
  .batch-title
    font-size 14px
    color #333333
    font-weight 600
  .batch-tip
    font-size 12px
    color #666666
    margin 16px 0
  .batch-btn
    color #333333
</style>
