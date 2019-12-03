<template>
  <a-modal
    title="查看地图"
    centered
    class="modal-common"
    :width="724"
    :body-style="{padding: '16px 24px'}"
    :visible="mapDialogObj.visible"
    :mask-closable="false"
    @cancel="handleCalcel"
  >
    <a-input-search
      id="suggestId" v-model="searchKeyword" allow-clear class="map-search"
      placeholder="请输入进行搜索"
    />
    <div id="map" ref="map" class="map"></div>
    <div slot="footer" align="center">
      <a-button type="primary" @click="chooseConfirm">
        确定
      </a-button>
    </div>
  </a-modal>
</template>

<script>
import loadMap from '@/utils/loadMap.js'
export default {
  props: {
    mapDialogObj: {
      type: Object,
      default: () => {
        return {
          visible: false
        }
      }
    }
  },
  data () {
    return {
      searchKeyword: '',
      positionInfo: {},
      map: null,
      ac: null
    }
  },
  methods: {
    initMap () {
      this.searchKeyword = ''
      loadMap().then((BMap) => {
        var self = this
        var map = this.map = new BMap.Map('map', { enableMapClick: false })
        var point = new BMap.Point(116.331398, 39.897445) // 默认南京
        map.centerAndZoom(point, 12) // 初始化地图,设置城市和地图级别
        map.enableScrollWheelZoom(true)
        this.getLocation(map)

        // 点击坐标事件
        map.addEventListener('click', function (e) {
          self.getPosition(e.point)
          self.addMarker(e.point)
        })
      })
    },
    getLocation () { // 定位
      var LocalCity = new BMap.LocalCity()
      LocalCity.get((result) => {
        this.map.setCenter(result.name)
        this.search(result.name)
      })
    },
    search (name) {
      var self = this
      if (this.ac === null) {
        this.ac = new BMap.Autocomplete({ // 建立一个自动完成的对象
          'input': 'suggestId',
          'location': name
        })
      }
      this.ac.addEventListener('onconfirm', function (e) { // 鼠标点击下拉列表后的事件
        var _value = e.item.value
        var myValue = _value.province + _value.city + _value.district + _value.street + _value.business
        self.searchKeyword = myValue
        self.setPlace(myValue)
      })
    },
    setPlace (myValue) { // 定位到点
      var self = this
      this.map.clearOverlays()
      var local = new BMap.LocalSearch(
        self.map,
        {
          onSearchComplete: function () {
            var pp = local.getResults().getPoi(0).point // 获取第一个智能搜索的结果
            self.getPosition(pp)
            self.map.centerAndZoom(pp, 18)
            self.addMarker(pp)
          }
        }
      )
      local.search(myValue)
    },
    addMarker (pos) {
      this.map.clearOverlays()
      var marker = new BMap.Marker(pos)
      this.map.addOverlay(marker)
    },
    getPosition (pos) {
      // 定位拾坐标
      this.positionInfo = {}
      var self = this
      var geoc = new BMap.Geocoder()
      geoc.getLocation(pos, function (rs) {
        self.positionInfo.point = rs.point
        self.positionInfo.province = rs.addressComponents.province
        self.positionInfo.city = rs.addressComponents.city
        self.positionInfo.district = rs.addressComponents.district
        self.positionInfo.address = self.searchKeyword
      })
    },
    handleCalcel () {
      this.mapDialogObj.visible = false
    },
    chooseConfirm () {
      this.mapDialogObj.visible = false
      this.$emit('getPosition', this.positionInfo)
    }
  }
}
</script>

<style lang="stylus" scoped>
.map
  width 684px
  height 400px
  margin 0 auto
  margin-top 16px
</style>
