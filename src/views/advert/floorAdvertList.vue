<template>
  <div class="floorAdvertList">
    <div class="card-container">
      <div class="card-title">
        数据筛选
      </div>
      <div class="card-content">
        <a-form>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="广告名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-input v-model="advertName" allow-clear placeholder="请输入广告名称" />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="广告位置"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="advertLocation"
                  placeholder="请选择会员状态"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="1">
                    首页轮播
                  </a-select-option>
                  <a-select-option value="2">
                    启动图
                  </a-select-option>
                  <a-select-option value="3">
                    首页楼层
                  </a-select-option>
                  <a-select-option value="4">
                    社区楼层
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="广告状态"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="advertStatus"
                  placeholder="请选择注册来源"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option value="全部">
                    全部
                  </a-select-option>
                  <a-select-option value="1">
                    待发布
                  </a-select-option>
                  <a-select-option value="2">
                    已发布
                  </a-select-option>
                  <a-select-option value="3">
                    已下线
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="发布时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-range-picker
                  v-model="publishDate"
                  class="w100"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="操作人"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 19 }"
              >
                <a-select
                  v-model="operator"
                  placeholder="请选择会员状态"
                  class="w100"
                  allow-clear
                  show-search
                  option-filter-prop="children"
                >
                  <a-select-option v-for="item in operators" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="18" align="right">
              <a-button type="primary" class="mr8" @click="toSearch">
                查询
              </a-button>
              <a-button @click="resetTable">
                重置
              </a-button>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="bottomContent">
      <div class="mb20">
        <a-row>
          <a-col :span="12" class="title">
            Banner列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button type="primary" @click="addAdvert()">
              添加广告
            </a-button>
          </a-col>
        </a-row>
      </div>
      <a-table
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :row-key="record => record.id"
        :loading="loading"
        class="table-content"
        @change="handleTableChange"
      >
        <template slot="images" slot-scope="images">
          <img :src="images[0].path" class="cp" @click="showPicture(images[0].path)">
        </template>
        <template slot="advPosition" slot-scope="advPosition">
          <span>{{ advPosition == '1'?"首页轮播":"" }}</span>
          <span>{{ advPosition == '2'?"启动图":"" }}</span>
          <span>{{ advPosition == '3'?"首页楼层":"" }}</span>
          <span>{{ advPosition == '4'?"社区楼层":"" }}</span>
        </template>
        <template slot="status" slot-scope="status">
          <span>{{ status == '1'?"待发布":"" }}</span>
          <span>{{ status == '2'?"已发布":"" }}</span>
          <span>{{ status == '3'?"已下线":"" }}</span>
        </template>
        <template slot="operate" slot-scope="text">
          <a-button type="link" size="small" @click="edit(text)">
            编辑
          </a-button>
          <a-button type="link" size="small" @click="del(text)">
            删除
          </a-button>
          <span @click="handle(text)">
            <a-button v-if="text.status == '1'" type="link" size="small">发布</a-button>
            <a-button v-if="text.status == '2'" type="link" size="small">下线</a-button>
            <a-button v-if="text.status == '3'" type="link" size="small">重新发布</a-button>
          </span>
        </template>
      </a-table>
    </div>
    <a-modal
      v-model="handleVisible" :title="handleMain+'提示'" class="commonModal" @ok="handleModal" @cancel="handleVisible=false"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">是否确定{{ handleMain }}此广告</span>
        <a-form :form="handleForm" class="mt16">
          <a-form-item>
            <a-input
              v-decorator="['handleDesc', { rules: [{ required: true, message: '请填写备注' }] }]"
              placeholder="请填写备注（必填）" type="textarea" rows="3" maxlength="50"
            >
            </a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-modal
      v-model="deleteVisible" ok-text="确定"
      cancel-text="取消" class="comModal" @ok="deleteModal"
    >
      <div class="dlContent">
        <icon-font type="iconShape" class="dlIcon"></icon-font>
        <span class="dlTitle">提示</span>
        <div class="dlMain">
          是否确定删除此广告？
        </div>
      </div>
    </a-modal>
    <a-modal v-model="picVisible" :footer="null">
      <img :src="picSrc">
    </a-modal>
  </div>
</template>
<script>
import moment from 'moment'
import { getUser, getAdvList, deleteAdv, offLineAdv, publishAdv } from '@/api/advert'
import { Icon } from 'ant-design-vue'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1442067_khhun27fquq.js'
})
const columns = [{
  title: '广告名称',
  key: 'name',
  dataIndex: 'name'
}, {
  title: '广告图片',
  key: 'images',
  dataIndex: 'images',
  scopedSlots: { customRender: 'images' }
}, {
  title: '广告位置',
  key: 'advPosition',
  dataIndex: 'advPosition',
  scopedSlots: { customRender: 'advPosition' }
}, {
  title: '排序',
  key: 'sort',
  dataIndex: 'sort'
}, {
  title: '发布状态',
  key: 'status',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' }
}, {
  title: '发布时间',
  key: 'publishTime',
  dataIndex: 'publishTime'
}, {
  title: '下线时间',
  key: 'offLineTime',
  dataIndex: 'offLineTime'
}, {
  title: '备注',
  key: 'remark',
  dataIndex: 'remark'
}, {
  title: '操作人',
  key: 'updateUser',
  dataIndex: 'updateUser'
}, {
  title: '操作',
  key: 'operate',
  width: 200,
  fixed: 'right',
  scopedSlots: { customRender: 'operate' }
}]
export default {
  name: 'FloorAdvertList',
  components: {
    IconFont
  },
  data () {
    return {
      advertName: '',
      advertLocation: '全部',
      advertStatus: '全部',
      publishDate: [],
      operators: [{
        id: '全部',
        name: '全部'
      }],
      operator: '全部',
      columns,
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
      handleVisible: false,
      handleMain: '',
      handleForm: this.$form.createForm(this, { name: 'handleForms' }),
      deleteVisible: false,
      delId: '',
      handleId: '',
      picSrc: '',
      picVisible: false
    }
  },
  mounted () {
    this.toSearch()
    const params = {}
    this.getUserList(params)
  },
  methods: {
    getUserList (params) {
      getUser(params).then(res => {
        const allRes = res.result
        for (let i = 0; i < allRes.length; i++) {
          this.operators.push(allRes[i])
        }
      })
    },
    showPicture (url) {
      this.picSrc = url
      this.picVisible = true
    },
    moment,
    getTableData (params) {
      this.loading = true
      getAdvList(params)
        .then(res => {
          this.loading = false
          this.tableData = res.result.list
          this.pagination.total = res.result.total
        })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      this.initData()
    },
    initData () {
      const params = {}
      params.menuId = '30fcb0f038d3479da2463e6c56962151'
      params.pageNo = this.pagination.current
      params.pageSize = this.pagination.pageSize
      if (this.advertName) {
        params.name = this.advertName
      }
      if (this.advertLocation !== '全部') {
        params.advPosition = this.advertLocation
      }
      if (this.advertStatus !== '全部') {
        params.status = this.advertStatus
      }
      if (this.publishDate.length !== 0) {
        params.startTime = this.publishDate[0].format('YYYY-MM-DD') + ' 00:00:00'
        params.endTime = this.publishDate[1].format('YYYY-MM-DD') + ' 23:59:59'
      }
      if (this.operator !== '全部') {
        params.updateUser = this.operator
      }
      this.getTableData(params)
    },
    toSearch () {
      this.pagination.current = 1
      this.initData()
    },
    resetTable () {
      this.advertName = ''
      this.advertLocation = '全部'
      this.advertStatus = '全部'
      this.publishDate = []
      this.operator = '全部'
      const params = {}
      params.menuId = '30fcb0f038d3479da2463e6c56962151'
      params.pageNo = 1
      params.pageSize = this.pagination.pageSize
      this.getTableData(params)
    },
    addAdvert () {
      this.$router.push({
        path: '/advert/floorAdvertList/floorAdvertDetails',
        query: { title: '添加' }
      })
    },
    handle (value) {
      this.handleId = value.id
      this.handleVisible = true
      if (value.status === '1' || value.status === '3') {
        this.handleMain = '发布'
      } else if (value.status === '2') {
        this.handleMain = '下线'
      }
      if (this.handleForm.getFieldValue('handleDesc')) {
        this.handleForm.setFieldsValue({
          handleDesc: ''
        })
      }
    },
    handleModal (e) {
      e.preventDefault()
      this.handleForm.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.id = this.handleId
          params.remark = values.handleDesc
          if (this.handleMain === '下线') {
            params.menuId = '83f108a194a84b75b12095425f1d1538'
            offLineAdv(params).then(res => {
              this.$message.success('下线' + res.msg)
              this.handleVisible = false
              this.initData()
            })
          } else if (this.handleMain === '发布') {
            params.menuId = '197755987dc7449a91714ecfaec98392'
            publishAdv(params).then(res => {
              this.$message.success('发布' + res.msg)
              this.handleVisible = false
              this.initData()
            })
          }
        }
      })
    },
    edit (value) {
      this.$router.push({
        path: '/advert/floorAdvertList/floorAdvertDetails',
        query: { id: value.id, title: '编辑' }
      })
    },
    del (value) {
      this.deleteVisible = true
      this.delId = value.id
    },
    deleteModal () {
      const params = {}
      params.menuId = 'fac0c0ff92454ea38d9227919e8ab7bc'
      params.id = this.delId
      deleteAdv(params).then(res => {
        this.$message.success('删除' + res.msg)
        this.deleteVisible = false
        this.initData()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.floorAdvertList
  .w100
    width 100%
  .cp
    cursor pointer
  .mr8
    margin-right 8px
  .bottomContent
    background-color #fff
    padding 16px 20px
    .mb20
      margin-bottom 20px
  .title
    color #333
    font-weight 600
    font-size 16px
.dlContent
  .dlIcon
    font-size 30px
  .dlTitle
    vertical-align text-bottom
    padding-left: 10px
    font-size: 16px
    color: #333
    font-weight: 500
  .dlMain
    position absolute
    top 64px
    left 64px
    color #666
    font-size 14px
  .mt16
    margin-top 16px
</style>
<style lang="stylus">
.commonModal
  .ant-modal-body
    padding-bottom 0px
  .ant-form-item
    margin-bottom 16px
  .ant-modal-footer
    padding 0 24px 20px 24px
  form textarea.ant-input, .ant-form-explain
    margin-left 40px
    width calc(100% - 40px)
.floorAdvertList
  .ant-btn-sm
    padding-left 0
    padding-right 10px
</style>
