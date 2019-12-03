export default [
  {
    path: '/rule/recyclePrice',
    name: 'recyclePrice',
    meta: {
      title: '回收价格配置'
    },
    component: () =>
      import(/* webpackChunkName: "recyclePrice" */ '@/views/rule/recyclePrice.vue')
  },
  {
    path: '/rule/recyclePrice/recyclePriceDetails',
    name: 'recyclePriceDetails',
    meta: {
      title: '回收价格配置详情'
    },
    component: () =>
      import(/* webpackChunkName: "recyclePriceDetails" */ '@/views/rule/recyclePriceDetails.vue')
  },
  {
    path: '/rule/recycleOperate',
    name: 'recycleOperate',
    meta: {
      title: '回收运营规则'
    },
    component: () =>
      import(/* webpackChunkName: "recycleOperate" */ '@/views/rule/recycleOperate.vue')
  },
  {
    path: '/rule/customerPhone',
    name: 'customerPhone',
    meta: {
      title: '客服电话配置'
    },
    component: () =>
      import(/* webpackChunkName: "customerPhone" */ '@/views/rule/customerPhone.vue')
  }
]
