export default [
  {
    path: '/activity/activityList',
    name: 'activityList',
    meta: {
      title: '活动列表'
    },
    component: () =>
      import(/* webpackChunkName: "activityList" */ '@/views/activity/activityList.vue')
  },
  {
    path: '/activity/activityList/activityDetails',
    name: 'activityDetails',
    meta: {
      title: '活动详情'
    },
    component: () =>
      import(/* webpackChunkName: "activityDetails" */ '@/views/activity/activityDetails.vue')
  }
]
