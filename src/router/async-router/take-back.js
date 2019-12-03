export default [
  {
    path: '/takeBack/peopleAuditList',
    name: 'peopleAuditList',
    meta: {
      title: '人员入驻审核'
    },
    component: () =>
      import(/* webpackChunkName: "peopleAuditList" */ '@/views/take-back/peopleAuditList.vue')
  },
  {
    path: '/takeBack/peopleAuditList/peopleAuditDetails',
    name: 'peopleAuditDetails',
    meta: {
      title: '人员入驻审核详情'
    },
    component: () =>
      import(/* webpackChunkName: "peopleAuditDetails" */ '@/views/take-back/peopleAuditDetails.vue')
  },
  {
    path: '/takeBack/recyclerList',
    name: 'recyclerList',
    meta: {
      title: '回收人员列表'
    },
    component: () =>
      import(/* webpackChunkName: "recyclerList" */ '@/views/take-back/recyclerList.vue')
  },
  {
    path: '/takeBack/recyclerList/recyclerDetails',
    name: 'recyclerDetails',
    meta: {
      title: '回收人员详情'
    },
    component: () =>
      import(/* webpackChunkName: "recyclerDetails" */ '@/views/take-back/recyclerDetails.vue')
  }
]
