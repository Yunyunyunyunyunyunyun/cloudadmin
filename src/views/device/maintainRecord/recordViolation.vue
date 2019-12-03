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
                label="区域"
                v-bind="formItemLayout"
              >
                <a-cascader
                  v-decorator="['region']"
                  :options="options"
                  :load-data="loadData"
                  :field-names="{
                    label: 'name',
                    value: 'id',
                    children: 'children'
                  }"
                  placeholder="省市区、街道"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="小区"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['member']"
                  allow-clear placeholder="请输入小区名称"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="用户手机号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['member']"
                  allow-clear placeholder="请输入用户手机号"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="设备编号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['aaa']"
                  allow-clear
                  placeholder="请输入设备编号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="抽检人员"
                v-bind="formItemLayout"
              >
                <a-select
                  v-decorator="['state']"
                  allow-clear
                  placeholder="全部"
                >
                  <a-select-option value="0">
                    启用
                  </a-select-option>
                  <a-select-option value="1">
                    未启用
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="6">
              <a-form-item
                label="违规时间"
                v-bind="formItemLayout"
              >
                <a-range-picker
                  v-decorator="['time']"
                />
              </a-form-item>
            </a-col>
            <a-col class="search-item" :span="12" align="right">
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
    <div class="card-container">
      <div class="card-title">
        <a-row>
          <a-col :span="12">
            违规列表
          </a-col>
          <a-col :span="12" align="right">
            <a-button @click="toExport">
              导出
            </a-button>
          </a-col>
        </a-row>
      </div>
      <div class="card-content">
        <a-table
          class="table-content"
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="pagination"
        >
          <template slot="view" slot-scope="record">
            <a-button
              class="table-btn-link" type="link" size="small"
              @click="toView(record)"
            >
              查看
            </a-button>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { httpPost } from '@/request'
export default {
  components: {},
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      },
      form: this.$form.createForm(this, {}),
      options: [],
      columns: [
        {
          title: '区域',
          dataIndex: 'a',
          key: 'a'
        },
        {
          title: '小区',
          dataIndex: 'b',
          key: 'b'
        },
        {
          title: '设备名称',
          dataIndex: 'c',
          key: 'c'
        },
        {
          title: '设备编号',
          dataIndex: 'd',
          key: 'd'
        },
        {
          title: '用户手机号',
          dataIndex: 'e',
          key: 'e'
        },
        {
          title: '投递时间',
          dataIndex: 'f',
          key: 'f'
        },
        {
          title: '违规时间',
          dataIndex: 'g',
          key: 'g'
        },
        {
          title: '抽检人员',
          dataIndex: 'i',
          key: 'i'
        },
        {
          title: '操作',
          dataIndex: '',
          key: 'operate',
          scopedSlots: { customRender: 'view' }
        }
      ],
      data: [
        {
          key: '1',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '2',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '3',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '4',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '5',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '6',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '7',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '8',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '9',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        },
        {
          key: '10',
          a: '南京市鼓楼区中海街道', b: '中海凤凰城小区', c: '世纪城H300 4-2',
          d: '垃圾回收站', e: 'H006四分类（室外分体秤）', f: 'MXS190412M05', g: '00:00~24:00', h: '100',
          i: '运营李四', j: '启用'
        }
      ],
      loading: false,
      currentPage: 1,
      totalPage: 50,
      pagination: {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => '共' + total + '条记录',
        pageSizeOptions: ['10', '20', '30', '40'],
        defaultPageSize: 10
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getArea('', 2)
  },
  methods: {
    getArea (id, layer, targetOption) {
      httpPost(this.$basePath.getArea, {
        id: id,
        layer: layer
      })
        .then(res => {
          res.result.data.forEach(item => {
            if (layer !== 5) {
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
    toSearch () {
      console.log(this.form.getFieldsValue())
    },
    resetForm () {
      this.form.resetFields()
    },
    toExport () {},
    toView (record) {
      this.$router.push({
        path: '/device/maintain/recordViolation/violationDetail'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
</style>
