export default [
  {
    path: '/data/panel',
    name: 'dataPanel',
    meta: {
      title: '数据看板'
    },
    component: () =>
      import(/* webpackChunkName: "data" */ '@/views/data/index.vue')
  }
]
