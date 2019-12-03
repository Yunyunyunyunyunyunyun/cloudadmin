export default [
  {
    path: '/finance/MetranManage/cashoutApply',
    name: 'cashoutApplyme',
    meta: {
      title: '提现审核'
    },
    component: () =>
      import(/* webpackChunkName: "cashoutApplyme" */ '@/views/finance/MetranManage/cashoutApply.vue')
  },
  {
    path: '/finance/MetranManage/cashoutApply/view',
    name: 'cashoutApplyView',
    meta: {
      title: '查看'
    },
    component: () =>
      import(/* webpackChunkName: "cashoutApplyView" */ '@/views/finance/MetranManage/cashoutOperate.vue')
  },
  {
    path: '/finance/MetranManage/cashoutApply/apply',
    name: 'cashoutApplyApply',
    meta: {
      title: '审核'
    },
    component: () =>
      import(/* webpackChunkName: "cashoutApplyApply" */ '@/views/finance/MetranManage/cashoutOperate.vue')
  },
  {
    path: '/finance/MetranManage/cashoutRecord',
    name: 'cashoutRecord',
    meta: {
      title: '提现记录'
    },
    component: () =>
      import(/* webpackChunkName: "cashoutRecord" */ '@/views/finance/MetranManage/cashoutRecord.vue')
  },
  {
    path: '/finance/MetranManage/rechargeRecord',
    name: 'rechargeRecord',
    meta: {
      title: '充值记录'
    },
    component: () =>
      import(/* webpackChunkName: "rechargeRecord" */ '@/views/finance/MetranManage/rechargeRecord.vue')
  },
  {
    path: '/finance/MetranManage/balanceFlow',
    name: 'balanceFlowMe',
    meta: {
      title: '余额流水'
    },
    component: () =>
      import(/* webpackChunkName: "balanceFlowme" */ '@/views/finance/MetranManage/balanceFlow.vue')
  },
  {
    path: '/finance/MetranManage/envalueFlow',
    name: 'envalueFlow',
    meta: {
      title: '环保值流水'
    },
    component: () =>
      import(/* webpackChunkName: "envalueFlow" */ '@/views/finance/MetranManage/envalueFlow.vue')
  },
  {
    path: '/finance/cashoutManage/cashoutApply',
    name: 'cashoutApply',
    meta: {
      title: '提现审核打款'
    },
    component: () =>
      import(/* webpackChunkName: "cashoutApply" */ '@/views/finance/cashoutManage/cashoutApply.vue')
  },
  {
    path: '/finance/cashoutManage/cashoutApply/view',
    name: 'view',
    meta: {
      title: '查看'
    },
    component: () =>
      import(/* webpackChunkName: "cashoutDetail" */ '@/views/finance/cashoutManage/cashoutDetail.vue')
  },
  {
    path: '/finance/cashoutManage/cashoutApply/apply',
    name: 'apply',
    meta: {
      title: '审核'
    },
    component: () =>
      import(/* webpackChunkName: "cashoutDetail" */ '@/views/finance/cashoutManage/cashoutDetail.vue')
  },
  {
    path: '/finance/cashoutManage/balanceFlow',
    name: 'balanceFlow',
    meta: {
      title: '账户余额流水'
    },
    component: () =>
      import(/* webpackChunkName: "balanceFlow" */ '@/views/finance/cashoutManage/balanceFlow.vue')
  },
  {
    path: '/finance/bondManage/bondHandle',
    name: 'bondHandle',
    meta: {
      title: '保证金处置'
    },
    component: () =>
      import(/* webpackChunkName: "bondHandle" */ '@/views/finance/bondManage/bondHandle.vue')
  },
  {
    path: '/finance/bondManage/bondHandle/handleDetail',
    name: 'handleDetail',
    meta: {
      title: '处置详情'
    },
    component: () =>
      import(/* webpackChunkName: "handleDetail" */ '@/views/finance/bondManage/handleDetail.vue')
  },
  {
    path: '/finance/bondManage/bondFlow',
    name: 'bondFlow',
    meta: {
      title: '保证金流水'
    },
    component: () =>
      import(/* webpackChunkName: "bondFlow" */ '@/views/finance/bondManage/bondFlow.vue')
  }
]
