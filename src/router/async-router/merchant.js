export default [
  {
    path: '/merchant/intention',
    name: 'merchantIntention',
    meta: {
      title: '意向商户'
    },
    component: () =>
      import(/* webpackChunkName: "merchantIntention" */ '@/views/merchant/index.vue')
  },
  {
    path: '/merchant/merchantList',
    name: 'merchantList',
    meta: {
      title: '商户列表'
    },
    component: () =>
      import(/* webpackChunkName: "merchantList" */ '@/views/merchant/merchantList.vue')
  },
  {
    path: '/merchant/merchantList/merchantDetails',
    name: 'merchantDetails',
    meta: {
      title: '商户详情'
    },
    component: () =>
      import(/* webpackChunkName: "merchantDetails" */ '@/views/merchant/merchantDetails.vue')
  }
]
