<template>
  <div>
    <div class="card-container">
      <div class="card-title">
        设备信息
      </div>
      <div class="card-content">
        <a-form ref="detailForm" :form="form" class="detail-form">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备名称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="设备类型"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productType']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备型号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productMark']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="设备编号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productNumber']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="所在区域"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['areaName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="小区"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['housingEstate']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备安装时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productInstallTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="运营人员"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['operateName']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="card-title mt16">
        设备运维记录
      </div>
      <div class="card-content">
        <a-row>
          <a-col v-if="stepList.length!=0" :span="23" align="right">
            <a-button @click="toExport">
              导出
            </a-button>
          </a-col>
          <a-col :span="21" :offset="2">
            <a-empty v-if="stepList.length==0" />
            <div v-else class="process-step">
              <a-steps direction="vertical">
                <a-step v-for="(item, index) in stepList" :key="index" :status="index == 0 ? 'finish' : 'wait'">
                  <i slot="icon" class="iconfont">&#xe63e;</i>
                  <div slot="title">
                    <span class="content-left time">
                      {{ item.createTime }}
                    </span>
                    <span v-if="item.processingUserType" class="content-right people">
                      {{ item.processingUserType }}：{{ item.processingUserName }} {{ item.processingUserPhone }}
                    </span>
                  </div>
                  <div slot="description">
                    <span class="content-left state">
                      {{ item.operateEvent }}
                    </span>
                    <span v-if="item.remark" class="content-right remark">
                      备注：{{ item.remark }}
                    </span>
                  </div>
                </a-step>
              </a-steps>
              <div v-if="showLoadMore" align="center">
                <a-button type="primary" @click="loadMore">
                  加载更多...
                </a-button>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="card-title mt16">
        设备使用数据
      </div>
      <div class="card-content">
        <a-row>
          <a-col :span="23">
            <a-tabs default-active-key="1" @change="tabChange">
              <a-tab-pane key="1" tab="拍照记录">
                <a-row>
                  <a-col v-for="(item, index) in photoRecord.imgList" :key="index" :span="6">
                    <div class="img-container">
                      <div class="table-img">
                        <img :src="item.path" alt="">
                      </div>
                      <div class="photo-time">
                        {{ item.photoTime }}
                      </div>
                    </div>
                  </a-col>
                </a-row>
                <div v-if="photoRecord.imgList.length" class="table-pagination">
                  <a-pagination
                    class="table-content"
                    show-quick-jumper
                    show-size-changer
                    :page-size-options="['8', '16', '24', '32']"
                    :default-page-size="photoRecord.pageSize"
                    :default-current="1"
                    :total="photoRecord.total"
                    :show-total="total => `共${total}条记录`"
                    @change="changePhotoPage"
                    @showSizeChange="changPhotoSize"
                  />
                </div>
                <a-list v-else class="no-photo" :data-source="[]" />
              </a-tab-pane>
              <a-tab-pane key="2" tab="投递记录">
                <a-table
                  class="table-content"
                  :row-key="record => record.id"
                  :columns="columns1"
                  :data-source="data1"
                  :loading="loading"
                  :pagination="pagination"
                  @change="handleTableChange"
                >
                  <template slot="deliverPhoto" slot-scope="text">
                    <template v-if="text">
                      <viewer class="item-img_list" :images="text.split(',')">
                        <a v-for="(item, index) in text.split(',')" :key="index" href="javascript:;">
                          <img
                            class="td-image"
                            :style="index == 0?'':'display:none;'"
                            :src="item"
                          >
                        </a>
                      </viewer>
                    </template>
                  </template>
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="3" tab="补币记录">
                <a-table
                  class="table-content"
                  :row-key="record => record.id"
                  :columns="columns2"
                  :data-source="data2"
                  :loading="loading"
                  :pagination="pagination"
                  @change="handleTableChange"
                >
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="4" tab="取币记录">
                <a-table
                  class="table-content"
                  :row-key="record => record.id"
                  :columns="columns3"
                  :data-source="data3"
                  :loading="loading"
                  :pagination="pagination"
                  @change="handleTableChange"
                >
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="5" tab="清运记录">
                <a-table
                  class="table-content"
                  :row-key="record => record.id"
                  :columns="columns4"
                  :data-source="data4"
                  :loading="loading"
                  :pagination="pagination"
                  @change="handleTableChange"
                >
                </a-table>
              </a-tab-pane>
              <a-tab-pane key="6" tab="广告记录">
                <a-table
                  class="table-content"
                  :row-key="record => record.id"
                  :columns="columns5"
                  :data-source="data5"
                  :loading="loading"
                  :pagination="pagination"
                  @change="handleTableChange"
                >
                  <template slot="advSourceMaterial" slot-scope="text">
                    <template v-if="text">
                      <viewer class="item-img_list" :images="text.split(',')">
                        <a v-for="(item, index) in text.split(',')" :key="index" href="javascript:;">
                          <img
                            class="td-image"
                            :style="index == 0?'':'display:none;'"
                            :src="item.split('.')[item.split('.').length - 1] == 'jpg'?item:defaultVideo"
                          >
                        </a>
                      </viewer>
                    </template>
                  </template>
                  <template slot="advMainPic" slot-scope="text">
                    <viewer v-if="text" class="item-img_list" :images="text.split(',')">
                      <a v-if="text" href="javascript:;">
                        <img
                          class="td-image" :src="text"
                        >
                      </a>
                    </viewer>
                  </template>
                </a-table>
              </a-tab-pane>
            </a-tabs>
          </a-col>
        </a-row>
      </div>
      <div class="card-content mb40 mt40">
        <a-row type="flex" justify="center">
          <a-col
            :span="12" type="flex" align="middle"
            style="text-align:center;"
          >
            <a-button class="mr8" type="primary" @click="back">
              返回
            </a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <comfirmModal :dialog-obj="dialogObj" @handleOk="handleOk">
      <a-form>
        <a-form-item class="comfirm-formitem">
          <a-month-picker
            v-model="startValue"
            style="margin-right: 10px;"
            placeholder="开始月份"
            :disabled-date="disabledStartDate"
          >
          </a-month-picker>
          <a-month-picker
            v-model="endValue"
            placeholder="结束月份"
            :disabled-date="disabledEndDate"
          >
          </a-month-picker>
        </a-form-item>
      </a-form>
    </comfirmModal>
    <a-modal
      :visible="previewImage" centered :footer="null"
      @cancel="previewImage = false"
    >
      <img alt="example" style="width: 100%" :src="imgSrc">
    </a-modal>
  </div>
</template>

<script>
import { toExportExcel } from '@/components/mixins/mixins.js'
import comfirmModal from '@/components/commonModal/comfirmModal.vue'
export default {
  components: {
    comfirmModal
  },
  mixins: [toExportExcel],
  data () {
    return {
      defaultVideo: require('@/assets/image/defaultVideo.png'),
      stepList: [
        // { createTime: '2019-01-01 15:15:58', processingUserType: '巡检人员', processingUserName: '巡检人员',
        //   processingUserPhone: '熊大 13912912345', operateEvent: '设备保修', remark: '设备主屏开裂' },
        // { createTime: '2019-01-01 15:15:58', processingUserType: '巡检人员', processingUserName: '巡检人员',
        //   processingUserPhone: '熊大 13912912345', operateEvent: '设备保修', remark: '设备主屏开裂' },
        // { createTime: '2019-01-01 15:15:58', processingUserType: '巡检人员', processingUserName: '巡检人员',
        //   processingUserPhone: '熊大 13912912345', operateEvent: '设备保修', remark: '设备主屏开裂' },
        // { createTime: '2019-01-01 15:15:58', processingUserType: '巡检人员', processingUserName: '巡检人员',
        //   processingUserPhone: '熊大 13912912345', operateEvent: '设备保修', remark: '设备主屏开裂' }
      ],
      stepIndex: 1,
      previewImage: false,
      imgSrc: '',
      type: '1',
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: 'detailForm' }),
      loading: false,
      columns1: [ // 投递记录
        {
          title: '投递照片',
          dataIndex: 'path',
          scopedSlots: { customRender: 'deliverPhoto' }
        },
        {
          title: '订单号',
          dataIndex: 'orderNum'
        },
        {
          title: '投递用户',
          dataIndex: 'deliveryUser'
        },
        {
          title: '投递手机号',
          dataIndex: 'deliveryPhone'
        },
        {
          title: '投递时间',
          dataIndex: 'deliveryTime'
        },
        {
          title: '投递类型',
          dataIndex: 'deliveryType'
        },
        {
          title: '重量（Kg）',
          dataIndex: 'weight'
        },
        {
          title: '新增余额',
          dataIndex: 'newBalance'
        },
        {
          title: '新增环保值',
          dataIndex: 'newEnviron'
        },
        {
          title: '状态',
          dataIndex: 'status',
          customRender (text, record, index) {
            return '成功'
          }
        }
      ],
      columns2: [ // 补币记录
        {
          title: '订单号',
          dataIndex: 'orderNum'
        },
        {
          title: '补币人员',
          dataIndex: 'addCoinUser'
        },
        {
          title: '补币时间',
          dataIndex: 'addCoinTime'
        },
        {
          title: '补币金额（元）',
          dataIndex: 'addCoinValue'
        }
      ],
      columns3: [ // 取币记录
        {
          title: '订单号',
          dataIndex: 'orderNum'
        },
        {
          title: '取币用户',
          dataIndex: 'withdrawUser'
        },
        {
          title: '取币手机号',
          dataIndex: 'withdrawPhone'
        },
        {
          title: '取币时间',
          dataIndex: 'withdrawTime'
        },
        {
          title: '取币金额（元）',
          dataIndex: 'withdrawValue'
        },
        {
          title: '状态',
          dataIndex: 'withdrawStatus',
          customRender (text, record, index) {
            return '成功'
          }
        }
      ],
      columns4: [ // 清运记录
        {
          title: '清运完成时间',
          dataIndex: 'pickUpTime'
        },
        {
          title: '清运人员',
          dataIndex: 'cleanName'
        },
        {
          title: '清运品类',
          dataIndex: 'cleanType'
        },
        {
          title: '称重总重量（kg）',
          dataIndex: 'cleanWeight'
        }
      ],
      columns5: [ // 广告记录
        {
          title: '广告素材',
          dataIndex: 'advSourceMaterial',
          scopedSlots: { customRender: 'advSourceMaterial' }
        },
        {
          title: '截屏图片',
          dataIndex: 'advMainPic',
          scopedSlots: { customRender: 'advMainPic' }
        },
        {
          title: '广告名称',
          dataIndex: 'advName'
        },
        {
          title: '广告类型',
          dataIndex: 'advType',
          customRender (text, record, index) {
            if (text === '0') return '主屏广告'
            if (text === '1') return '左屏广告'
            if (text === '2') return '右屏广告'
            if (text === '3') return '未知'
          }
        },
        {
          title: '开始时间',
          dataIndex: 'advStartTime'
        },
        {
          title: '结束时间',
          dataIndex: 'advEndTime'
        },
        {
          title: '状态',
          dataIndex: 'status',
          customRender (text, record, index) {
            if (text === '2') {
              return '发送成功'
            } else {
              return '待确认'
            }
          }
        }
      ],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
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
      photoRecord: {
        imgList: [],
        total: 0,
        pageSize: 8
      },
      dialogObj: {
        visible: false,
        iconType: 'exclamation-circle',
        title: '请选择导出运维记录数据的起止月份'
      },
      startValue: null,
      endValue: null,
      showLoadMore: true
    }
  },
  mounted () {
    this.getDetail()
    this.getRecords()
    this.getMaintainRecord()
  },
  methods: {
    tabChange (type) {
      this.loading = false
      this.pagination.pageSize = 10
      this.pagination.current = 1
      this.type = type
      this.getRecords()
    },
    getDetail () {
      this.$httpGet(this.$basePath.getEquipmentInfo, {
        menuId: '7eaeb872c94f42cea7450a008857bd23',
        id: this.$route.query.id
      })
        .then(res => {
          var data = res.result
          this.form.setFieldsValue({
            operateName: data.operateName,
            productName: data.productName,
            areaName: data.areaName,
            housingEstate: data.housingEstate,
            productNumber: data.productNumber,
            productType: data.productType,
            productMark: data.productMark,
            productInstallTime: data.productInstallTime
          })
        })
    },
    getMaintainRecord () {
      var params = {}
      params.pageNo = this.stepIndex
      params.pageSize = 10
      params.type = '7'
      params.productId = this.$route.query.id
      this.$httpPost(this.$basePath.getRecords, params)
        .then(res => {
          if (res.result.list.length < 10) this.showLoadMore = false
          this.stepIndex += 1
          this.stepList = this.stepList.concat(res.result.list)
        })
    },
    loadMore () {
      this.getMaintainRecord()
    },
    getRecords (type) {
      var params = {}
      params.pageNo = 1
      params.pageSize = 10
      if (this.type === '1') {
        params.pageSize = 8
      }
      if (type) {
        params.type = type
      } else {
        params.type = this.type
      }
      params.productId = this.$route.query.id
      this.getTableData(params)
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination.pageSize = pagination.pageSize
      this.pagination.current = pagination.current
      var params = {}
      params.pageNo = pagination.current
      params.pageSize = pagination.pageSize
      params.type = this.type
      params.productId = this.$route.query.id
      this.getTableData(params)
    },
    getTableData (param) {
      this.loading = true
      this.$httpPost(this.$basePath.getRecords, param)
        .then(res => {
          this.loading = false
          if (this.type === '1') {
            this.photoRecord.total = res.result.total
            this.photoRecord.imgList = res.result.list
          } else {
            this['data' + (this.type - 1)] = res.result.list
            this.pagination.total = res.result.total
          }
        })
    },
    toExport () {
      this.dialogObj.visible = true
    },
    disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleOk () {
      if (!this.startValue) {
        this.$message.error('请选择开始月份！')
        return false
      }
      if (!this.endValue) {
        this.$message.error('请选择结束月份！')
        return false
      }
      if (this.endValue.diff(this.startValue, 'months') > 2) {
        this.$message.error('月份间隔最长不能超过3个月！')
        return false
      }
      var param = {}
      param.menuId = '39ea2ba8392440efac9ef765a7b5f66f'
      param.id = this.$route.query.id
      param.startTime = this.startValue.format('YYYYMM')
      param.endTime = this.endValue.format('YYYYMM')
      this.toExportExcel(this.$basePath.exportOperateRecord, param, '设备运维记录.xlsx')
      this.dialogObj.visible = false
    },
    changPhotoSize (current, size) {
      this.getPhotoRecord(current, size)
    },
    changePhotoPage (page, pageSize) {
      this.getPhotoRecord(page, pageSize)
    },
    getPhotoRecord (page, pageSize) {
      this.$httpPost(this.$basePath.getRecords, {
        pageNo: page,
        pageSize: pageSize,
        type: '1',
        productId: this.$route.query.id
      })
        .then(res => {
          this.photoRecord.total = res.result.total
          this.photoRecord.imgList = res.result.list
        })
    },
    back () {
      this.$router.push({
        path: '/device/operation/deviceMaintain'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.td-image
  width 48px
  height 48px
  margin 6px 0
.no-photo
  border-bottom 1px solid #e8e8e8
.table-pagination
  >>>.ant-pagination-total-text
    height 28px
    line-height 28px
  >>>.ant-pagination
    font-size $font12
    color #333
    float right
  >>>.ant-pagination-item, >>>.ant-pagination-prev, >>>.ant-pagination-next, >>>.ant-pagination-jump-prev, >>>.ant-pagination-jump-next
    min-width 28px
    height 28px
    line-height 28px
    border-radius 2px
  >>>.ant-pagination-item a
    color #333
  >>>.ant-pagination-prev .ant-pagination-item-link, >>>.ant-pagination-next .ant-pagination-item-link
    border-radius 2px
  >>>.ant-pagination-options-quick-jumper
    height 28px
    line-height 28px
    input
      width 48px
      height 28px
      max-width 80px
      border-radius 2px
      font-size $font12
      text-align center
      padding 4px 6px
.img-container
  width 90%
  margin-bottom 20px
  padding 8px
  border 1px solid #e8e8e8
  border-radius 2px
  .table-img
    position relative
    width 100%
    height 0
    padding-bottom 95%
    img
      position absolute
      width 100%
      height 100%
  .photo-time
    font-size 12px
    color #333333
    margin-top 5px
.process-step
  margin-top 10px
  max-height 580px
  overflow-y auto
  >>>.ant-steps-item-finish > .ant-steps-item-tail::after
    background #e8e8e8
  >>>.ant-steps-vertical > .ant-steps-item > .ant-steps-item-tail
    padding 22px 0 0 0
    height 119%
  >>>.ant-steps-icon
    line-height 16px
  .content-left
    display inline-block
    width 112px
    margin-right 80px
    &.time
      font-size 12px
      color #999999
    &.state
      font-size 14px
      color #333333
  .content-right
    display inline-block
    &.people
      font-size 12px
      color #333333
    &.remark
      font-size 12px
      color #999999
</style>
