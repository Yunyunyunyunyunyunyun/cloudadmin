<template>
  <div class="add-role">
    <div class="title">
      {{ type == 1 ? "查看角色" : type == 2 ? "编辑角色" : "新建角色" }}
    </div>
    <a-form :form="form">
      <div class="content">
        <div class="content-l">
          <div class="content-title">
            角色信息
          </div>
          <a-form-item
            label="角色名称"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请填写角色名称' }] }
              ]"
              :disabled="type === 1 || roleType === 0"
              placeholder="请填写角色名称"
            />
          </a-form-item>
          <a-form-item
            label="角色类型"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input v-decorator="['roleType']" disabled />
          </a-form-item>
          <a-form-item
            label="状态"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <div v-if="type === 1">
              <a-input v-decorator="['isEnable']" disabled />
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
            label="角色描述"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-textarea
              v-decorator="['remark']"
              :disabled="type === 1 || roleType === 0"
              maxlength="50"
              placeholder="请输入角色描述"
              rows="1"
            />
          </a-form-item>
        </div>
        <div class="content-r">
          <div class="content-title">
            菜单权限
          </div>
          <div v-if="treeData.length" class="tree">
            <a-tree
              ref="tree"
              v-model="checkedKeys"
              :checkable="type !== 1 && roleType !== 0"
              default-expand-all
              :tree-data="treeData"
              @check="onCheck"
            />
          </div>
        </div>
      </div>
      <div class="btn-list">
        <a-button
          v-if="type == 3 || type == 2"
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
import { menuList, roleInfo, addRole } from '@/api/system'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
export default {
  data () {
    return {
      type: 3, // 1 查看用户 2编辑用户 3 新建用户
      roleType: 1, // 1默认 0自建
      roleId: '',
      loading: false,
      confirmCheckedKeys: [],
      checkedKeys: [],
      treeData: [],
      menuData: [],
      formItemLayout,
      form: this.$form.createForm(this)
    }
  },
  created: function () {
    this.handleQuery()
  },
  mounted: function () {
    this.load()
  },
  methods: {
    load () {
      if (this.roleId) {
        this.getRoleInfo()
        this.type === 2 &&
          this.roleType !== 0 &&
          this.getRoleMenuList(this.roleId)
      } else {
        this.form.setFieldsValue({
          roleType: '自建'
        })
        this.getRoleMenuList()
      }
    },
    getRoleInfo () {
      const params = {
        menuId: 'b05b7f42a5bc419fb2229658587f4316',
        id: this.roleId
      }
      roleInfo(params).then(res => {
        const result = res.result
        const {
          form: { setFieldsValue }
        } = this
        const defValue = {
          name: result.name,
          roleType: result.roleType ? '自建' : '默认',
          remark: result.remark,
          isEnable:
            this.type === 1
              ? result.isEnable
                ? '禁用'
                : '启用'
              : result.isEnable
        }
        setFieldsValue(defValue)
        if (this.type === 1 || this.roleType === 0) {
          const _menu = JSON.parse(JSON.stringify(result.roleMenuList))
          if (_menu && _menu.length) {
            _menu.forEach(item => {
              this.treeData.push(this.handleTreeData(item))
            })
          }
        }
      })
    },
    getRoleMenuList (id) {
      const params = {
        menuId: '1ba8eb03fa7d402ab995c309f7035ef9',
        roleId: id
      }
      menuList(params).then(res => {
        const result = res.result
        this.checkedKeys = this.handleSelectData(result.list)
        this.type === 2 && (this.menuData = result.list)
        const _menu = JSON.parse(JSON.stringify(result.list))
        if (_menu && _menu.length) {
          _menu.forEach(item => {
            this.treeData.push(this.handleTreeData(item))
          })
        }
      })
    },
    handleTreeData (item) {
      const childrenNode = {
        title: item.aliasName,
        key: item.id
      }
      if (item.children && item.children.length) {
        childrenNode.children = []
        item.children.forEach(subItem => {
          childrenNode.children.push(this.handleTreeData(subItem))
        })
      }
      return childrenNode
    },
    handleQuery () {
      const { type, id, roleType } = this.$route.query
      this.type = parseInt(type)
      this.roleType = parseInt(roleType)
      this.roleId = id
    },
    onCheck (checkedKeys, info) {
      // 合并两个数组
      this.confirmCheckedKeys = checkedKeys.concat(info.halfCheckedKeys)
    },
    // 处理已选择权限
    handleChosen () {
      const menuList = JSON.parse(JSON.stringify(this.treeData))
      const checkedKeys = this.confirmCheckedKeys
      function filters (list) {
        for (let i = 0; i < list.length; i++) {
          if (checkedKeys.includes(list[i].key)) {
            if (list[i].children && list[i].children.length) {
              filters(list[i].children)
            } else {
              list.splice(i, 1)
            }
          } else {
            list.splice(i, 1)
          }
        }
      }
      filters(menuList)
    },
    handleMenuParams (list) {
      const _arr = []
      for (let i = 0; i < list.length; i++) {
        const obj = {
          menuId: list[i]
        }
        _arr.push(obj)
      }
      return _arr
    },
    // 处理默认选中的菜单 UI展示
    handleSelectData (items) {
      const result = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (!list[i].children.length && list[i].isSelect) {
            result.push(list[i].id)
          }
          if (list[i].children.length) {
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
          if (list[i].isSelect) result.push(list[i].id)
          if (list[i].children.length) {
            filter(list[i].children)
          }
        }
      }
      filter(items)
      return result
    },
    handleSubmitMenu () {
      let newArr = []
      if (this.confirmCheckedKeys.length) {
        newArr = this.handleMenuParams(this.confirmCheckedKeys)
      } else {
        if (this.menuData.length) {
          const defSelect = this.handleDefSelectData(this.menuData)
          newArr = this.handleMenuParams(defSelect)
        }
      }
      return newArr
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this
      validateFields((err, values) => {
        if (!err) {
          const menuList = this.handleSubmitMenu()
          if (!menuList.length && this.roleType !== 0) {
            this.$message.error('抱歉菜单权限是必选')
            return false
          }
          const params = {
            id: this.roleId,
            name: values.name,
            roleType: values.roleType === '自建' ? 1 : 0,
            remark: values.remark,
            isEnable: values.isEnable,
            roleMenuAddList: menuList
          }
          addRole(params).then(res => {
            const msg = this.roleId ? '角色信息修改成功' : '角色配置成功'
            this.$message.success(msg)
            this.handleGoBack()
          })
        }
      })
    },
    handleGoBack () {
      this.$router.replace('/system/role')
    }
  }
}
</script>
<style lang="stylus">
.add-role
  .ant-form label
    font-size 12px
  .ant-input
    font-size 12px
  .ant-tree
    font-size 12px
</style>
<style lang="stylus" scoped>
.add-role
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
    height 660px
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
    .content-r
      width 50%
      position relative
      .tree
        width 100%
        height 100%
        padding 36px 16px
        overflow-y scroll
      .content-title
        position absolute
        padding 10px 16px
        width 80%
        z-index 9
        background-color #fff
</style>
