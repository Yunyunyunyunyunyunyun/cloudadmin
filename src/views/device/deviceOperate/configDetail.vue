<template>
  <div>
    <a-form ref="detailForm" :form="form" class="detail-form">
      <div class="card-container">
        <div class="card-title">
          基础配置
        </div>
        <div class="card-content">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备编号"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['productId']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="设备名称"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['name']"
                  :disabled="!isEdit"
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
                  v-decorator="['productMarkName']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="运营人员"
                v-bind="formItemLayout"
                show-search
                :filter-option="filterOption"
              >
                <a-select
                  v-decorator="['operation']"
                  placeholder="全部"
                  :disabled="!isEdit"
                >
                  <a-select-option v-for="(item, index) in userList" :key="index" :value="item.id">
                    {{ item.userName }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="绑定区域"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['areas']"
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
                  v-decorator="['estateName']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="详细地址"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['address']"
                  :disabled="!isEdit"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="设备安装时间"
                v-bind="formItemLayout"
              >
                <a-input
                  v-decorator="['updateTime']"
                  disabled
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备坐标"
                v-bind="formItemLayout"
              >
                <a-input
                  v-if="isEdit"
                  v-decorator="['pos']"
                  read-only
                  @click="choosePos"
                />
                <a-input
                  v-if="!isEdit"
                  v-decorator="['pos']"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="启用状态"
                v-bind="formItemLayout"
              >
                <a-radio-group
                  name="radioGroup" default-value="启用"
                  :disabled="!isEdit"
                >
                  <a-radio value="启用">
                    启用
                  </a-radio>
                  <a-radio value="停用" disabled>
                    停用
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="设备工作时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 18 }"
              >
                <a-radio-group
                  v-decorator="['workTime', { initialValue: '0-24' }]"
                  :disabled="!isEdit"
                >
                  <a-radio value="0-24">
                    全天
                  </a-radio>
                  <a-radio value="6-20">
                    白天（6:00-20:00）
                  </a-radio>
                  <a-radio value="20-6">
                    夜间（20:00-6:00）
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <template v-if="saveScenario != 1">
          <div class="card-title mt16">
            设备补币
          </div>
          <div class="card-content">
            <a-row>
              <a-col v-if="isEdit" :span="12">
                <a-form-item
                  label="设备补币前余额"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-decorator="['coinNum']"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col v-if="isEdit" :span="12">
                <a-form-item
                  label="本次补币金额"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-decorator="['addCoinNum', {
                      rules: [
                        {pattern: new RegExp(/^(0\.0[1-9]|0\.[1-9]\d|[1-9]\d?(\.\d\d)?|[1-3]\d\d?|400)$/, 'g'), message: '请输入小于等于400的正整数！'}
                      ]
                    }]"
                  />
                </a-form-item>
              </a-col>
              <a-col v-if="!isEdit" :span="12">
                <a-form-item
                  label="设备当前余额"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-decorator="['currentCoinNum']"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col v-if="!isEdit" :span="12">
                <a-form-item
                  label="最近补币时间"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-decorator="['createTime']"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col v-if="!isEdit" :span="12">
                <a-form-item
                  label="总计补币金额"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-decorator="['totalCoin']"
                    disabled
                  />
                </a-form-item>
              </a-col>
              <a-col v-if="!isEdit" :span="12">
                <a-form-item
                  label="补币人员"
                  v-bind="formItemLayout"
                >
                  <a-input
                    v-decorator="['userName']"
                    disabled
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </template>
        <div class="card-title mt16">
          回收价格
        </div>
        <div class="card-content">
          <a-row style="padding-left: 12px;">
            <a-col :span="23">
              <a-table
                class="table-content"
                :row-key="record => record.dictId"
                :columns="columns"
                :data-source="data"
                :pagination="false"
                bordered
              >
                <template
                  v-for="col in ['ruleValue', 'ruleKey']"
                  :slot="col"
                  slot-scope="text, record"
                >
                  <div v-if="isEdit" :key="col">
                    <a-input
                      class="input-table"
                      :value="text"
                      onkeyup="value=value==''?0:value.replace(/^\D*(\d*(?:\.\d{0,7})?).*$/g, '$1')"
                      @change="e => handleChange(e.target.value, record.key, col)"
                    />
                  </div>
                  <span v-else :key="col">
                    {{ text }}
                  </span>
                </template>
              </a-table>
            </a-col>
          </a-row>
        </div>
        <div class="card-content mb40 mt40">
          <a-row type="flex" justify="center">
            <a-col
              :span="12" type="flex" align="middle"
              style="text-align:center;"
            >
              <a-button class="mr8" :type="isEdit?'':'primary'" @click="back">
                返回
              </a-button>
              <a-button v-if="isEdit" type="primary" @click="save">
                保存
              </a-button>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-form>
    <chooseSite
      ref="chooseMap"
      :map-dialog-obj="mapDialogObj"
      @getPosition="getPosition"
    />
  </div>
</template>

<script>
import chooseSite from '@/components/map/chooseSite.vue'
import { findUser } from '@/components/mixins/mixins.js'
export default {
  components: { chooseSite },
  mixins: [findUser],
  data () {
    return {
      isEdit: true,
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      },
      form: this.$form.createForm(this, { name: 'detailForm' }),
      columns: [
        {
          title: '回收分类',
          dataIndex: 'dataValue',
          align: 'center'
        },
        {
          title: '产生金额单价（元/千克）',
          dataIndex: 'ruleValue',
          align: 'center',
          scopedSlots: { customRender: 'ruleValue' }
        },
        {
          title: '产生金额起始重量（千克）',
          dataIndex: 'ruleKey',
          align: 'center',
          scopedSlots: { customRender: 'ruleKey' }
        }
      ],
      data: [],
      mapDialogObj: {
        visible: false
      },
      positionInfo: {},
      saveId: '',
      saveScenario: '',
      productId: ''
    }
  },
  mounted () {
    if (this.$route.name === 'configDetail') {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
    this.getDetail()
    this.findUser('operate')
  },
  methods: {
    getDetail () {
      this.$httpPost(this.$basePath.deviceDetail, {
        id: this.$route.query.id
      })
        .then(res => {
          this.saveId = res.result.id
          this.saveScenario = res.result.scenario
          this.productId = res.result.productId
          var data = res.result
          var dataArr = res.result.dictList
          if (dataArr.length > 0) {
            dataArr.forEach((item, index) => {
              item.key = index.toString()
            })
            this.data = dataArr
          }
          if (this.isEdit) {
            this.form.setFieldsValue({
              productId: data.productId,
              name: data.name,
              productMarkName: data.productMark ? data.productMark.name : '',
              areas: data.areas,
              estateName: data.estateName,
              address: data.address,
              updateTime: data.updateTime,
              pos: data.lo + ',' + data.la,
              workTime: data.productTime ? data.productTime.workTime : '0-24',
              coinNum: data.coinNum,
              operation: data.operation
            })
          } else {
            this.form.setFieldsValue({
              productId: data.productId,
              name: data.name,
              productMarkName: data.productMark ? data.productMark.name : '',
              areas: data.areas,
              estateName: data.estateName,
              address: data.address,
              updateTime: data.updateTime,
              pos: data.lo + ',' + data.la,
              workTime: data.productTime ? data.productTime.workTime : '0-24',
              currentCoinNum: data.coinNum,
              createTime: data.deviceCoinNum ? data.deviceCoinNum.createTime : '',
              totalCoin: data.totalCoin,
              userName: data.deviceCoinNum ? data.deviceCoinNum.userName : '',
              operation: data.operation
            })
          }
        })
    },
    handleChange (value, key, column) { // 表格input绑定值
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    choosePos () {
      this.mapDialogObj.visible = true
      this.$refs.chooseMap.initMap()
    },
    getPosition (positionInfo) { // 获取地区选取信息
      if (positionInfo.point) {
        this.form.setFieldsValue({ pos: positionInfo.point.lng + ',' + positionInfo.point.lat })
      }
    },
    back () {
      this.$router.push({
        path: '/device/operation/deviceConfig'
      })
    },
    save () {
      this.form.validateFields((err, values) => {
        if (!err) {
          var param = {}
          var dictList = JSON.parse(JSON.stringify(this.data))
          var formData = this.form.getFieldsValue()
          var pos = formData.pos.split(',')
          dictList.forEach(item => {
            delete item.key
          })
          param.menuId = '922715ab243345f3a54e5340cf1ef215'
          param.id = this.saveId
          param.scenario = this.saveScenario
          param.productId = this.productId
          param.name = formData.name
          param.address = formData.address
          param.operation = formData.operation
          param.addCoinNum = formData.addCoinNum
          param.dictList = dictList
          if (pos.length > 0) {
            param.lo = pos[0]
            param.la = pos[1]
          }
          param.productTime = {
            workTime: formData.workTime,
            productId: this.saveId
          }
          this.$httpPost(this.$basePath.deviceSave, param)
            .then(res => {
              this.$message.success(res.msg)
              this.$router.push({
                path: '/device/operation/deviceConfig'
              })
            })
        }
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
// 注释
</style>
