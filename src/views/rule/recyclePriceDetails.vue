<template>
  <div class="recyclePriceDetails">
    <div class="commonTitle">
      回收价格配置
    </div>
    <a-form :form="form" @submit="handleSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="规则名称"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              v-decorator="['ruleName', { rules: [{ required: true, message: '请填写规则名称' }] }]"
              allow-clear
              placeholder="请填写规则名称" :disabled="mainTitle==='查看'"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="适用场景"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-select
              v-model="scenario"
              placeholder="请选择适用场景"
              :disabled="mainTitle==='查看'"
              allow-clear
              show-search
              option-filter-prop="children"
              @change="onScenarioChange"
            >
              <a-select-option v-for="item in scenarios" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="适用区域"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
            class="areaItem"
          >
            <a-tree-select
              v-decorator="['area', { rules: [{ required: true, message: '请选择具体的区县' }] }]"
              class="areaSelect"
              :tree-data="treeData"
              :load-data="loadData"
              tree-checkable
              allow-clear
              placeholder="请展开选择具体的区县"
              :disabled="mainTitle==='查看'"
              @treeExpand="onTreeExpand"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="备注"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-input
              v-model="desc"
              allow-clear
              maxlength="50"
              :placeholder="mainTitle!=='查看'?'请填写备注':''" :disabled="mainTitle==='查看'"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="品类价格"
            :label-col="{ span: 2 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-table
              :columns="columns"
              :data-source="categoryList"
              :pagination="false"
              :row-key="record => record.categoryId"
              :loading="loading"
            >
              <template slot="imgUrl" slot-scope="imgUrl">
                <img
                  :src="imgUrl" class="cp" height="50"
                  @click="showPicture(imgUrl)"
                >
              </template>
              <template slot="isLadder" slot-scope="text, record, index">
                <a-select
                  :value="text"
                  placeholder="请选择有无阶梯价"
                  show-search
                  option-filter-prop="children"
                  :disabled="mainTitle==='查看'||scenarioDisable"
                  @change="e => handleLadderChange(e, index, 'isLadder')"
                >
                  <a-select-option v-for="item in isLadderOptions" :key="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </template>
              <template slot="priceMode" slot-scope="text, record, index">
                <a-select
                  :value="text"
                  placeholder="请选择计价方式"
                  show-search
                  option-filter-prop="children"
                  :disabled="mainTitle==='查看'"
                  @change="e => handleValuationChange(e, index, 'priceMode')"
                >
                  <a-select-option v-for="item in priceModeOptions" :key="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </template>
              <template slot="detailList" slot-scope="text, record, index">
                <a-row :gutter="8">
                  <span v-if="record.isLadder===1">
                    <a-col :span="7" align="center">
                      <a-input
                        value="0"
                        class="mb"
                        :addon-after="record.priceMode===0?'Kg':'个'"
                        placeholder="请输入" disabled
                      />
                      <a-input
                        :value="text.length>0?text[1]?text[1].minValue:'':''"
                        class="mb"
                        :addon-after="record.priceMode===0?'Kg':'个'"
                        placeholder="请输入" disabled
                      />
                      <a-input
                        :value="text.length>0?text[2]?text[2].minValue:'':''"
                        :addon-after="record.priceMode===0?'Kg':'个'"
                        placeholder="请输入" disabled
                      />
                    </a-col>
                    <a-col :span="7" align="center">
                      <a-input
                        :value="text.length>0?text[0]?text[0].maxValue:'':''"
                        class="mb"
                        :addon-after="record.priceMode===0?'Kg':'个'"
                        placeholder="请输入" :disabled="mainTitle==='查看'"
                        @change="e => handleMaxValue0Change(e.target.value, index, 'detailList')"
                        @blur="onOneBlur(text, index)"
                      />
                      <a-input
                        :value="text.length>0?text[1]?text[1].maxValue:'':''"
                        class="mb"
                        :addon-after="record.priceMode===0?'Kg':'个'"
                        placeholder="请输入" :disabled="mainTitle==='查看'"
                        @change="e => handleMaxValue1Change(e.target.value, index, 'detailList')"
                        @blur="onTwoBlur(text, index)"
                      />
                      <a-input
                        value="~"
                        :addon-after="record.priceMode===0?'Kg':'个'"
                        placeholder="请输入" disabled
                      />
                    </a-col>
                    <a-col :span="10" align="center">
                      <a-input
                        :value="text.length>0?text[0]?text[0].unitPrice:'':''"
                        class="mb"
                        :addon-after="record.priceMode===0?'元/Kg':'元/个'"
                        placeholder="请输入" :disabled="mainTitle==='查看'"
                        @change="e => handleUnitPrice0Change(e.target.value, index, 'detailList')"
                      />
                      <a-input
                        :value="text.length>0?text[1]?text[1].unitPrice:'':''"
                        class="mb"
                        :addon-after="record.priceMode===0?'元/Kg':'元/个'"
                        placeholder="请输入" :disabled="mainTitle==='查看'"
                        @change="e => handleUnitPrice1Change(e.target.value, index, 'detailList')"
                      />
                      <a-input
                        :value="text.length>0?text[2]?text[2].unitPrice:'':''"
                        :addon-after="record.priceMode===0?'元/Kg':'元/个'"
                        placeholder="请输入" :disabled="mainTitle==='查看'"
                        @change="e => handleUnitPrice2Change(e.target.value, index, 'detailList')"
                      />
                    </a-col>
                  </span>
                  <span v-else>
                    <a-col :span="24" align="center">
                      <a-input
                        :value="text.length>0?text[0]?text[0].unitPrice:'':''"
                        :addon-after="record.priceMode===0?'元/Kg':'元/个'"
                        placeholder="请输入" :disabled="mainTitle==='查看'"
                        @change="e => handleUnitPrice0Change(e.target.value, index, 'detailList')"
                      />
                    </a-col>
                  </span>
                </a-row>
              </template>
              <template slot="isShow" slot-scope="text, record, index">
                <a-select
                  :value="text"
                  placeholder="请选择是否客户端展示"
                  show-search
                  option-filter-prop="children"
                  :disabled="mainTitle==='查看'"
                  @change="e => handleShowChange(e, index, 'isShow')"
                >
                  <a-select-option v-for="item in isShowOptions" :key="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </template>
            </a-table>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item v-if="mainTitle==='添加'||mainTitle==='编辑'" :wrapper-col="{ span: 24 }" class="bottomBtn">
            <a-button class="mr16" @click="backPage()">
              取消
            </a-button>
            <a-button type="primary" html-type="submit" :loading="confirmLoading">
              保存
            </a-button>
          </a-form-item>
          <a-form-item v-else-if="mainTitle==='查看'" :wrapper-col="{ span: 24 }" class="bottomBtn">
            <a-button type="primary" @click="backPage()">
              返回
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal v-model="picVisible" :footer="null">
      <img :src="picSrc">
    </a-modal>
  </div>
</template>
<script>
import { getAreaList } from '@/api/common'
import { getCategoryList, getRuleInfo, addRule, editPriceRule } from '@/api/rule'
const columns = [{
  title: '品类',
  key: 'categoryName',
  dataIndex: 'categoryName',
  align: 'center',
  width: 50
}, {
  title: '品类图片',
  key: 'imgUrl',
  dataIndex: 'imgUrl',
  align: 'center',
  width: 100,
  scopedSlots: { customRender: 'imgUrl' }
}, {
  title: '阶梯价',
  key: 'isLadder',
  dataIndex: 'isLadder',
  align: 'center',
  width: 50,
  scopedSlots: { customRender: 'isLadder' }
}, {
  title: '计价方式',
  key: 'priceMode',
  dataIndex: 'priceMode',
  align: 'center',
  width: 50,
  scopedSlots: { customRender: 'priceMode' }
}, {
  title: '单价',
  key: 'detailList',
  dataIndex: 'detailList',
  align: 'center',
  width: 300,
  scopedSlots: { customRender: 'detailList' }
}, {
  title: '客户端展示',
  key: 'isShow',
  dataIndex: 'isShow',
  align: 'center',
  width: 100,
  scopedSlots: { customRender: 'isShow' }
}]
export default {
  name: 'RecyclePriceDetails',
  data () {
    return {
      mainTitle: '',
      form: this.$form.createForm(this, { name: 'merchantDetails' }),
      treeData: [],
      scenarios: [
        {
          id: 0,
          name: '上门回收'
        },
        {
          id: 1,
          name: '回收结算'
        },
        {
          id: 2,
          name: '设备清运'
        }
      ],
      scenario: 0,
      scenarioDisable: false,
      desc: '',
      categoryList: [],
      loading: false,
      columns,
      isLadderOptions: [
        {
          value: 0,
          label: '无'
        },
        {
          value: 1,
          label: '有'
        }
      ],
      priceModeOptions: [
        {
          value: 0,
          label: '重量'
        },
        {
          value: 1,
          label: '个数'
        }
      ],
      isShowOptions: [
        {
          value: 0,
          label: '是'
        },
        {
          value: 1,
          label: '否'
        }
      ],
      rId: '',
      editArea: [],
      confirmLoading: false,
      picSrc: '',
      picVisible: false
    }
  },
  created () {
    this.mainTitle = this.$route.query.title
    this.rId = this.$route.query.id
  },
  mounted () {
    this.getArea('', 2)
    if (this.mainTitle === '添加') {
      this.getCategory({})
    }
    if (this.mainTitle === '编辑' || this.mainTitle === '查看') {
      const params = {}
      params.menuId = '16a28695bd684742aecc2ab19cda2c78'
      params.id = this.rId
      this.getInfo(params)
    }
  },
  methods: {
    getArea (id, layer) {
      getAreaList({
        id: id,
        layer: layer
      })
        .then(res => {
          let newData = JSON.parse(JSON.stringify(res.result.data).replace(/name/g, 'title'))
          newData = JSON.parse(JSON.stringify(newData).replace(/id/g, 'value'))
          newData.forEach(item => {
            if (item.layer === 2 || item.layer === 3) {
              item.disabled = true
            }
          })
          this.treeData = newData
        })
    },
    loadData (treeNode) {
      const _this = this
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) { // 有值了直接渲染
          resolve()
          return
        }
        // 没有值根据当前父节点获取下面子节点并挂在树节点中，添加到对应父节点的children中
        getAreaList({
          id: treeNode.dataRef.value,
          layer: treeNode.dataRef.layer + 1
        })
          .then(res => {
            res.result.data.forEach(item => {
              if (item.layer === 4) {
                this.$set(item, 'isLeaf', true)
              }
            })
            let newData = JSON.parse(JSON.stringify(res.result.data).replace(/name/g, 'title'))
            newData = JSON.parse(JSON.stringify(newData).replace(/id/g, 'value'))
            newData.forEach(item => {
              if (item.layer === 2 || item.layer === 3) {
                item.disabled = true
              }
              if (item.layer === 4) {
                this.editArea.forEach(itemx => {
                  if (item.title === itemx.name) {
                    item.disabled = true
                  }
                })
              }
            })
            treeNode.dataRef.children = newData
            _this.treeData = [..._this.treeData]
          })
        resolve()
      })
    },
    onTreeExpand (val) {
      if (this.mainTitle === '添加') {
        this.treeData.forEach((item) => {
          if (item.children) {
            item.children.forEach(value => {
              if (value.layer === 3) {
                val.forEach((thing) => {
                  if (value.value === thing) {
                    value.disabled = false
                  }
                })
              }
            })
          }
        })
        const newArr = []
        this.treeData.forEach((item) => {
          if (item.layer === 2) {
            val.forEach((thing) => {
              if (item.value === thing) {
                if (item.children) {
                  item.children.forEach((it) => {
                    newArr.push(it.disabled)
                  })
                }
              }
            })
          }
        })
        this.treeData.forEach((item) => {
          if (newArr.length !== 0) {
            if (newArr.indexOf(true) === -1) {
              val.forEach((thing) => {
                if (item.value === thing) {
                  item.disabled = false
                }
              })
            }
          }
        })
      }
    },
    getCategory (params) {
      this.loading = true
      getCategoryList(params).then(res => {
        this.loading = false
        const newArr = [{
          'unitPrice': ''
        }]
        res.result.list.forEach(item => {
          item.detailList = newArr
        })
        this.categoryList = res.result.list
      })
    },
    handleFilterData (items) {
      const result = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (!list[i].children || (list[i].children && list[i].children.length === 0)) {
            if (list[i].isSelected) {
              result.push(list[i].name)
            }
          } else {
            filter(list[i].children)
          }
        }
      }
      filter(items)
      return result
    },
    handleFilterAllData (items) {
      const result = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          if (!list[i].children || (list[i].children && list[i].children.length === 0)) {
            if (list[i].isSelected) {
              result.push({ id: list[i].id, name: list[i].name })
            }
          } else {
            filter(list[i].children)
          }
        }
      }
      filter(items)
      return result
    },
    showPicture (url) {
      this.picSrc = url
      this.picVisible = true
    },
    getInfo (params) {
      getRuleInfo(params).then(res => {
        this.categoryList = res.result.info.priceList
        this.form.setFieldsValue({
          ruleName: res.result.info.name,
          area: this.handleFilterData(res.result.info.areaList)
        })
        this.editArea = this.handleFilterAllData(res.result.info.areaList)
        this.scenario = res.result.info.type
        this.desc = res.result.info.remark
        res.result.info.priceList.forEach(item => {
          if (item.detailList.length === 0) {
            item.detailList.push({ 'unitPrice': '' })
          }
        })
        this.categoryList = res.result.info.priceList
        this.onScenarioChange(this.scenario)
      })
    },
    handleLadderChange (value, key, column) {
      const newData = [...this.categoryList]
      const target = newData.filter((item, index) => key === index)[0]
      const newOneDetailList = [{
        'unitPrice': ''
      }]
      const newTwoDetailList = [{
        'maxValue': '',
        'minValue': 0,
        'unitPrice': ''
      }, {
        'maxValue': '',
        'minValue': '',
        'unitPrice': ''
      }, {
        'minValue': '',
        'unitPrice': ''
      }]
      if (target) {
        target[column] = Number(value)
        if (value === 0) {
          target.detailList = newOneDetailList
        } else if (value === 1) {
          target.detailList = newTwoDetailList
        }
        this.categoryList = newData
      }
    },
    handleValuationChange (value, key, column) {
      const newData = JSON.parse(JSON.stringify([...this.categoryList]))
      const target = newData.filter((item, index) => key === index)[0]
      if (target) {
        target[column] = Number(value)
        this.categoryList = newData
      }
    },
    handleShowChange (value, key, column) {
      const newData = JSON.parse(JSON.stringify([...this.categoryList]))
      const target = newData.filter((item, index) => key === index)[0]
      if (target) {
        target[column] = Number(value)
        this.categoryList = newData
      }
    },
    handleMaxValue0Change (value, key, column) {
      const newData = JSON.parse(JSON.stringify([...this.categoryList]))
      const target = newData.filter((item, index) => key === index)[0]
      if (target) {
        const reg = /^\+?[1-9]\d*$/
        if ((!isNaN(value) && reg.test(value)) || value === '') {
          target[column][0].maxValue = value
          target[column][1].minValue = value
          this.categoryList = newData
        }
      }
    },
    handleMaxValue1Change (value, key, column) {
      const newData = JSON.parse(JSON.stringify([...this.categoryList]))
      const target = newData.filter((item, index) => key === index)[0]
      if (target) {
        const reg = /^\+?[1-9]\d*$/
        if ((!isNaN(value) && reg.test(value)) || value === '') {
          target[column][1].maxValue = value
          target[column][2].minValue = value
          this.categoryList = newData
        }
      }
    },
    onOneBlur (obj, index) {
      if (obj[1].maxValue && Number(obj[1].maxValue) < Number(obj[1].minValue)) {
        this.$message.warn('请输入小于最大值的数字！')
        obj[0].maxValue = null
        obj[1].minValue = null
      }
    },
    onTwoBlur (obj, index) {
      if (obj[1].minValue && Number(obj[1].maxValue) < Number(obj[1].minValue)) {
        this.$message.warn('请输入大于最小值的数字！')
        obj[1].maxValue = null
        obj[2].minValue = null
      }
    },
    handleUnitPrice0Change (value, key, column) {
      const newData = JSON.parse(JSON.stringify([...this.categoryList]))
      const target = newData.filter((item, index) => key === index)[0]
      if (target) {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '') {
          target[column][0].unitPrice = value
          this.categoryList = newData
        }
      }
    },
    handleUnitPrice1Change (value, key, column) {
      const newData = JSON.parse(JSON.stringify([...this.categoryList]))
      const target = newData.filter((item, index) => key === index)[0]
      if (target) {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '') {
          target[column][1].unitPrice = value
          this.categoryList = newData
        }
      }
    },
    handleUnitPrice2Change (value, key, column) {
      const newData = JSON.parse(JSON.stringify([...this.categoryList]))
      const target = newData.filter((item, index) => key === index)[0]
      if (target) {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '') {
          target[column][2].unitPrice = value
          this.categoryList = newData
        }
      }
    },
    onScenarioChange (value) {
      if (value === 1) {
        this.scenarioDisable = true
        this.categoryList.forEach(item => {
          item.isLadder = 0
        })
      } else {
        this.scenarioDisable = false
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = {}
          params.name = values.ruleName
          params.type = this.scenario
          params.remark = this.desc
          if (this.mainTitle === '编辑') {
            const newArea = JSON.parse(JSON.stringify([...values.area]))
            this.editArea.forEach(item => {
              for (let i = 0; i < newArea.length; i++) {
                if (newArea[i] === item.name) {
                  newArea[i] = item.id
                }
              }
            })
            params.areas = newArea
          } else {
            params.areas = values.area
          }
          params.priceList = this.categoryList
          if (this.mainTitle === '添加') {
            params.menuId = '41171458133e4d3cbda8c484c13ee2c8'
            this.confirmLoading = true
            addRule(params).then(res => {
              this.confirmLoading = false
              this.$message.success(res.msg)
              this.backPage()
            }).catch(() => {
              this.confirmLoading = false
            })
          } else if (this.mainTitle === '编辑') {
            params.id = this.rId
            params.menuId = '7724e8e7557c4e89beb2501f3e258a9d'
            this.confirmLoading = true
            editPriceRule(params).then(res => {
              this.confirmLoading = false
              this.$message.success(res.msg)
              this.backPage()
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        }
      })
    },
    backPage () {
      this.$router.push({ path: '/rule/recyclePrice' })
    }
  }
}
</script>
<style lang="stylus" scoped>
.recyclePriceDetails
  background-color #fff
  padding 16px 20px 0 20px
  margin-bottom 20px
  font-size 12px
  color #000
  .mr16
    margin-right 16px
  .mb
    margin-bottom 6px
  .cp
    cursor pointer
  .commonTitle
    font-size 16px
    font-weight 600
    color #333
  .categoryTitle
    font-size 14px
    color #333
  .bottomBtn
    margin-top 12px
    margin-bottom 36px !important
    text-align center
</style>
<style lang="stylus">
.recyclePriceDetails
  .bottomBtn
    .ant-btn
      border-radius 2px
      font-size 12px
      line-height normal
  .ant-select-dropdown
    max-height 400px !important
  .areaItem
    .ant-form-item-control
      line-height normal
    .areaSelect
      .ant-select-selection
        max-height 112px
        overflow auto
</style>
