const imgList = [
  {
    name: '会员列表',
    routeUrl: '/member/memberList',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572422301057f7d67fc535f34942aeda89f4f1bdec51.png'
  },
  {
    name: '商户列表',
    routeUrl: '/merchant/merchantList',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724223646690cdb7fb63fa24f27b675c2e77e304ca6.png'
  },
  {
    name: '人员入驻审核',
    routeUrl: '/takeBack/peopleAuditList',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572422535724eba83306d93b4f9faa5a0a0b44e89485.png'
  },
  {
    name: '回收人员列表',
    routeUrl: '/takeBack/recyclerList',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572422556080e5ac59f0f75a497e834587d0c344ba50.png'
  },
  {
    name: '车辆列表',
    routeUrl: '/device/carManage/carList',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572422582968000e12adb4be4eae99569e51d2f5d97f.png'
  },
  {
    name: 'banner列表',
    routeUrl: '/advert/floorAdvertList',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724226005935f2aad6cbe90491c95ebb451c6451abc.png'
  },
  {
    name: '投递列表',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/157242265129098e1c42017254c898e97f46a1bb68014.png'
  },
  {
    name: '设备配置',
    routeUrl: '/device/operation/deviceConfig',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/157242283221482421f1a4acc440c80c66f7a80caec61.png'
  },
  {
    name: '设备运维',
    routeUrl: '/device/operation/deviceMaintain',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572423306960a13bdf14490c4082bfaf882b6b9c6c4c.png'
  },
  {
    name: '账号配置',
    routeUrl: '/system/account',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572423340840cb96285c71f944c9a1fd17d5ae0f2512.png'
  },
  {
    name: '回收价格配置',
    routeUrl: '/rule/recyclePrice',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572423357314ecb797653a4f4bae9980d821c314007b.png'
  },
  {
    name: '回收运营规则',
    routeUrl: '/rule/recycleOperate',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572423382545f0c3d206811f4d399641a5a2bf6bb867.png'
  },
  {
    name: '保证金处置',
    routeUrl: '/finance/bondManage/bondHandle',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572423400737c9fa7941fd644da584e109d824f1c48e.png'
  },
  {
    name: '实体店铺兑换',
    routeUrl: '/order/exchange/entity',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572423495557fa1ed47bb4734ecc9a49816ef5b8e96f.png'
  },
  {
    name: '角色配置',
    routeUrl: '/system/role',
    imgSrc: 'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191109/15732781443789188efae0cc442738db8cb619303ca0c.png'
  },
  {
    name: '操作日志',
    routeUrl: '/system/log',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724237231838718fcc3a53b40ed9da463a2d3348f16.png'
  },
  {
    name: '满溢记录',
    routeUrl: '/device/maintain/recordOverflow',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572423998854f279732da84b49f584dc8c3c2fa81843.png'
  },
  {
    name: '清运记录',
    routeUrl: '/device/maintain/recordClearance',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/157242401835565a40773c15d4fd586904c4ac2ce5af1.png'
  },
  {
    name: '日检记录',
    routeUrl: '/device/maintain/recordDayinspect',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572424111895e8c632c62a06477c9cee1cd86d3ad840.png'
  },
  {
    name: '报修记录',
    routeUrl: '/device/maintain/recordRepair',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724241293246d547ec6a6884439809840926e852f02.png'
  },
  {
    name: '预约订单记录',
    routeUrl: '/order/takeBack/reserve',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572424172962e72744e3cdab40c699771b1d90a5fec1.png'
  },
  {
    name: '接单回收记录',
    routeUrl: '/order/takeBack/meet',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724241991295518a73c75a74f23b5cbca680226dac7.png'
  },
  {
    name: '结算订单记录',
    routeUrl: '/order/takeBack/settle',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724242177973eb77501d4c349e4921571ce17f19f76.png'
  },
  {
    name: '充值记录',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572424315213719ced284b1e4f028e46e5cc7cc48c25.png'
  },
  {
    name: '投递记录',
    routeUrl: '/order/delivery/record',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724243639933c29dcd4bdd441ba8b9e038c241996a2.png'
  },
  {
    name: '提现审核打款',
    routeUrl: '/finance/cashoutManage/cashoutApply',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/157242439535113e8aa9e687d4c908548f4d89175c3aa.png'
  },
  {
    name: '账户余额流水',
    routeUrl: '/finance/cashoutManage/balanceFlow',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724244311017cfc15bf77284e1e819fd4397034ee23.png'
  },
  {
    name: '保证金流水',
    routeUrl: '/finance/bondManage/bondFlow',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/15724244505147cba4b34b59046b2a302ece25e0b6352.png'
  },
  {
    name: '线下开卡',
    imgSrc:
      'http://ito-boss-img.oss-cn-hangzhou.aliyuncs.com/material/20191030/1572424472474389688f8da4142c4bc83ea3bada02310.png'
  }
]
export default imgList
