<template>
  <div class="role">
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form :form="form" @submit="handleSubmit">
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="角色名称"
              >
                <a-input v-decorator="['name']" placeholder="请输入角色名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
                label="设备类型"
              >
                <a-select
                  v-decorator="[
                    'roleType',
                    {
                      initialValue: 3
                    }
                  ]"
                >
                  <a-select-option :value="3">
                    全部
                  </a-select-option>
                  <a-select-option :value="0">
                    默认
                  </a-select-option>
                  <a-select-option :value="1">
                    自建
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="12" align="right">
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
            角色列表
          </div>
        </a-col>
        <a-col :span="12" align="right">
          <a-button
            v-action:addroleandmenu
            type="primary"
            @click="linkDetail()"
          >
            新建角色
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
          :row-key="record => record.id"
          @change="handleTableChange"
        >
          <template slot="isEnable" slot-scope="record">
            <span v-if="record.isEnable === 0" class="tag green">启用</span>
            <span v-else class="tag grey">停用</span>
          </template>
          <template slot="roleType" slot-scope="record">
            <span>{{ record.roleType ? "自建" : "默认" }}</span>
          </template>
          <template slot="userNum" slot-scope="record">
            <a-button type="link" size="small" @click="showRoleModal(record)">
              {{ record.userNum }}
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
              v-action:editmenu
              type="link"
              size="small"
              @click="linkDetail(record, 2)"
            >
              编辑
            </a-button>
            <a-button
              v-if="record.roleType != 0"
              v-action:delrole
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
      title="角色用户"
      centered
      wrap-class-name="role-modal"
      @ok="() => (visible = false)"
    >
      <div class="role-table">
        <a-table
          class="table-content"
          :columns="tableColumns"
          :loading="userLoading"
          :data-source="userList"
          :row-key="record => record.id"
          :pagination="false"
          :scroll="userList.length > 10 ? { y: 300 } : {}"
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
import { roleList, userList, delRole } from '@/api/system'
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name'
  },
  {
    title: '创建人',
    dataIndex: 'createUser'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '状态',
    dataIndex: '',
    key: 'isEnable',
    scopedSlots: { customRender: 'isEnable' }
  },
  {
    title: '角色类型',
    dataIndex: '',
    key: 'roleType',
    scopedSlots: { customRender: 'roleType' }
  },
  {
    title: '关联用户数',
    dataIndex: '',
    key: 'userNum',
    scopedSlots: { customRender: 'userNum' }
  },
  {
    title: '角色描述',
    dataIndex: 'remark'
  },
  {
    title: '操作',
    dataIndex: '',
    key: 'operate',
    scopedSlots: { customRender: 'operate' }
  }
]
const tableColumns = [
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
  }
]
export default {
  data () {
    return {
      loading: false,
      userLoading: false,
      visible: false,
      columns,
      tableColumns,
      formData: [],
      userList: [],
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
  created: function () {
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      const params = {
        menuId: '59a6fa72182746db9d133cdcf02514a3',
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        name: this.form.getFieldValue('name') || '',
        roleType:
          this.form.getFieldValue('roleType') === 3
            ? ''
            : this.form.getFieldValue('roleType')
      }
      this.loading = true
      roleList(params).then(res => {
        this.loading = false
        const result = res.result
        this.formData = result.list
        this.pagination.total = result.totalCount
      })
    },
    getUserList (roleId) {
      const params = {
        menuId: 'b05b7f42a5bc419fb2229658587f4316',
        id: roleId
      }
      this.userLoading = true
      userList(params).then(res => {
        this.userLoading = false
        const result = res.result
        this.userList = result.list
      })
    },
    resetForm () {
      this.form.resetFields()
    },
    delRole (roleId) {
      const params = {
        menuId: '53f0be843263421c88e09ce46b316258',
        id: roleId
      }
      delRole(params).then(res => {
        this.$message.success('删除成功')
        this.form.resetFields()
        this.getRoleList()
      })
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      this.getRoleList()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.pagination.current = 1
          this.getRoleList()
        }
      })
    },
    del (item) {
      const userNum = item.userNum
      const msg = userNum
        ? '需将关联此角色的所有账号剔除后方可进行此操作！'
        : '删除后相关联的用户将失去此角色权限，请谨慎操作 ！'
      this.$confirm({
        title: userNum
          ? '此角色含有相关用户，不允许删除'
          : '是否确定删除此角色',
        centered: true,
        class: userNum ? 'del-modal' : '',
        content: h => <div>{msg}</div>,
        onOk: () => {
          this.delRole(item.id)
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    showRoleModal (item) {
      if (item.userNum === 0) return false
      this.visible = true
      this.getUserList(item.id)
    },
    linkDetail (item, type = 3) {
      // 1 查看 2 编辑 3 新建
      console.log(item)
      this.$router.replace({
        path: '/system/role/add',
        query: {
          type,
          id: (item && item.id) || '',
          roleType: item && item.roleType
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.role-modal .ant-modal-footer
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
