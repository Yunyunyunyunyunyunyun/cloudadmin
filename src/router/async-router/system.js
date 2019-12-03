export default [
  {
    path: '/system/role',
    name: 'systemRole',
    meta: {
      title: '角色配置'
    },
    component: () =>
      import(/* webpackChunkName: "systemRole" */ '@/views/system/role/index.vue')
  },
  {
    path: '/system/role/add',
    name: 'addRole',
    meta: {
      title: '新建角色'
    },
    component: () =>
      import(/* webpackChunkName: "systemRole" */ '@/views/system/role/addRole.vue')
  },
  {
    path: '/system/account',
    name: 'systemAccount',
    meta: {
      title: '账号配置'
    },
    component: () =>
      import(
        /* webpackChunkName: "systemAccount" */ '@/views/system/account/index.vue'
      )
  },
  {
    path: '/system/account/add',
    name: 'systemAccountAdd',
    meta: {
      title: '账号配置'
    },
    component: () =>
      import(
        /* webpackChunkName: "systemAccount" */ '@/views/system/account/addAccount.vue'
      )
  },
  {
    path: '/system/log',
    name: 'systemLog',
    meta: {
      title: '操作日志'
    },
    component: () =>
      import(/* webpackChunkName: "systemLog" */ '@/views/system/log.vue')
  }
]
