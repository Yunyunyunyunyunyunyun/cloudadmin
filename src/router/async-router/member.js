export default [
  {
    path: '/member/memberList',
    name: 'memberList',
    meta: {
      title: '会员列表'
    },
    component: () =>
        import(/* webpackChunkName: "memberList" */ '@/views/member/memberList.vue')
  },
  {
    path: '/member/memberList/memberDetails',
    name: 'memberDetails',
    meta: {
      title: '会员详情'
    },
    component: () =>
        import(/* webpackChunkName: "memberDetails" */ '@/views/member/memberDetails.vue')
  },
  {
    path: '/member/openCard',
    name: 'openCard',
    meta: {
      title: '线下开卡'
    },
    component: () =>
        import(/* webpackChunkName: "openCard" */ '@/views/member/openCard.vue')
  }
]

