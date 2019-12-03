<template>
  <div class="account">
    <div class="card-container">
      <div class="card-title">
        筛选查询
      </div>
      <div class="card-content">
        <a-form :form="form" @submit="toSearch">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="用户名"
              >
                <a-input
                  v-decorator="['userName']"
                  placeholder="请输入用户账号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="昵称"
              >
                <a-input
                  v-decorator="['nickName']"
                  placeholder="请输入用户昵称"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="手机号"
              >
                <a-input
                  v-decorator="['mobile']"
                  placeholder="请输入用手机号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="角色"
              >
                <a-select
                  v-decorator="[
                    'roleNames',
                    {
                      initialValue: 0
                    }
                  ]"
                >
                  <a-select-option :value="0">
                    全部
                  </a-select-option>
                  <a-select-option :value="1">
                    运营主管
                  </a-select-option>
                  <a-select-option :value="2">
                    运营专员
                  </a-select-option>
                  <a-select-option :value="3">
                    清运人员
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="启用状态"
              >
                <a-select
                  v-decorator="[
                    'isEnable',
                    {
                      initialValue: ''
                    }
                  ]"
                >
                  <a-select-option :value="''">
                    全部
                  </a-select-option>
                  <a-select-option :value="0">
                    启用
                  </a-select-option>
                  <a-select-option :value="1">
                    禁用
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="18" align="right">
              <a-form-item>
                <a-button type="primary" class="mr8" html-type="submit">
                  查询
                </a-button>
                <a-button @click="resetForm">
                  重置
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="card-container mrt16">
      <a-row>
        <a-col :span="12">
          <div class="card-title">
            账号列表
          </div>
        </a-col>
        <a-col :span="12" align="right">
          <a-button v-action:addedituser type="primary" @click="linkDetail()">
            新建账号
          </a-button>
        </a-col>
      </a-row>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="formData"
          :loading="loading"
          :pagination="false"
          :row-key="record => record.id"
        >
          <template slot="isEnable" slot-scope="record">
            <span v-if="record.isEnable === 0" class="tag green">启用</span>
            <span v-else class="tag grey">停用</span>
          </template>
          <template slot="productSize" slot-scope="record">
            <a-button type="link" size="small" @click="showRoleModal(record)">
              {{ record.productSize }}
            </a-button>
          </template>
          <template slot="operate" slot-scope="record">
            <a-button
              class="table-btn-link"
              type="link"
              size="small"
              @click="linkDetail(record, 1)"
            >
              查看
            </a-button>
            <a-button
              v-action:addedituser
              type="link"
              size="small"
              @click="linkDetail(record, 2)"
            >
              编辑
            </a-button>
            <a-button
              v-action:deluser
              type="link"
              size="small"
              @click="del(record)"
            >
              删除
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
    <!-- 关联用户数弹出框 -->
    <a-modal
      v-model="visible"
      title="设备管理"
      centered
      width="1400"
      wrap-class-name="account-modal"
      @ok="() => (visible = false)"
    >
      <div class="account-table">
        <a-table
          class="table-content"
          :loading="listLoading"
          :columns="tableColumns"
          :data-source="userList"
          :row-key="record => record.productCode"
          :pagination="false"
          bordered
        ></a-table>
      </div>
      <template slot="footer">
        <a-button @click="() => (visible = false)">
          关闭
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import { accountList, productList, delUser } from '@/api/system'
const columns = [
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '昵称',
    dataIndex: 'nickName'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '角色',
    dataIndex: 'roleNames'
  },
  {
    title: '管理设备',
    dataIndex: '',
    key: 'productSize',
    scopedSlots: { customRender: 'productSize' }
  },
  {
    title: '状态',
    dataIndex: '',
    key: 'isEnable',
    scopedSlots: { customRender: 'isEnable' }
  },
  {
    title: '操作',
    dataIndex: '',
    align: 'center',
    key: 'operate',
    scopedSlots: { customRender: 'operate' }
  }
]
const tableColumns = [
  {
    title: '小区',
    dataIndex: 'areaName'
  },
  {
    title: '设备名称',
    dataIndex: 'productName'
  },
  {
    title: '设备类型',
    dataIndex: 'productType'
  },
  {
    title: '设备编码',
    dataIndex: 'productCode'
  },
  {
    title: '设备安装时间',
    dataIndex: 'createTime'
  },
  {
    title: '已分配用户',
    dataIndex: 'userName'
  }
]
export default {
  data () {
    return {
      loading: false,
      listLoading: false,
      visible: false,
      currentId: '',
      columns,
      tableColumns,
      formData: [],
      userList: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'filter_from' })
  },
  mounted: function () {
    this.getAccountList()
  },
  methods: {
    getAccountList () {
      const seachData = this.form.getFieldsValue()
      const params = {
        menuId: 'af78e49e9f1c4df990335b4b3cdc9b38',
        userName: seachData.userName || '',
        nickName: seachData.nickName || '',
        roleNames: seachData.roleNames || '',
        mobile: seachData.mobile || '',
        isEnable: seachData.isEnable || ''
      }
      this.loading = true
      accountList(params).then(res => {
        this.loading = false
        const list = res.result.list
        function filter (item) {
          for (let i = 0; i < item.length; i++) {
            if (item[i].children.length) {
              filter(item[i].children)
            } else {
              item[i].children = ''
            }
          }
        }
        filter(list)
        this.formData = list
      })
    },
    getProductList () {
      this.listLoading = true
      productList(this.currentId).then(res => {
        const result = res.result
        this.userList = result.productList
        this.listLoading = false
      })
    },
    toSearch (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.getAccountList()
        }
      })
    },
    resetForm () {
      this.form.resetFields()
    },
    del (item) {
      const userNum = item.children.length
      const msg = userNum
        ? '需将关联的子账号的全部删除或禁用后方可进行此操作'
        : '删除后此账号将被注销，请谨慎操作！'
      this.$confirm({
        title: userNum
          ? '该账号存在正常使用中的子账号，不允许删除'
          : '是否确定删除此账户',
        centered: true,
        class: userNum ? 'del-modal' : '',
        content: h => <div>{msg}</div>,
        onOk: () => {
          delUser(item.id).then(res => {
            this.getAccountList()
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    showRoleModal (item) {
      if (item.productSize === 0) return false
      this.currentId = item.id
      this.visible = true
      this.getProductList()
    },
    linkDetail (item, type = 3) {
      // type 1 查看 2 编辑 3 新建
      this.$router.replace({
        path: '/system/account/add',
        query: {
          type,
          id: (item && item.id) || '',
          userType: item && item.userType
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.account-modal .ant-modal-footer
  text-align center
.del-modal .ant-btn-primary
  display none
</style>

<style lang="stylus" scoped>
.tag
  display inline-block
  min-width 38px
  height 18px
  color #ffffff
  font-size $font12
  line-height 18px
  text-align center
  border-radius 2px
  background-color #000000
  &.grey
    background-color #8F96B3
  &.green
    background-color #57C22D
</style>
