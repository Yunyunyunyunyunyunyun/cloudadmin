export default [
  {
    path: '/advert/floorAdvertList',
    name: 'floorAdvertList',
    meta: {
      title: 'Banner列表'
    },
    component: () =>
      import(/* webpackChunkName: "floorAdvertList" */ '@/views/advert/floorAdvertList.vue')
  },
  {
    path: '/advert/floorAdvertList/floorAdvertDetails',
    name: 'floorAdvertDetails',
    meta: {
      title: 'Banner配置'
    },
    component: () =>
      import(/* webpackChunkName: "floorAdvertDetails" */ '@/views/advert/floorAdvertDetails.vue')
  }
]
