
export default [
  {
    path: '/device/operation/deviceConfig',
    name: 'deviceConfig',
    meta: {
      title: '设备配置'
    },
    component: () =>
      import(/* webpackChunkName: "deviceConfig" */ '@/views/device/deviceOperate/deviceConfig.vue')
  },
  {
    path: '/device/operation/deviceConfig/configDetail',
    name: 'configDetail',
    meta: {
      title: '配置'
    },
    component: () =>
      import(/* webpackChunkName: "configDetail" */ '@/views/device/deviceOperate/configDetail.vue')
  },
  {
    path: '/device/operation/deviceConfig/viewDetail',
    name: 'viewDetail',
    meta: {
      title: '查看'
    },
    component: () =>
      import(/* webpackChunkName: "viewDetail" */ '@/views/device/deviceOperate/configDetail.vue')
  },
  {
    path: '/device/operation/deviceMaintain',
    name: 'deviceMaintain',
    meta: {
      title: '设备运维'
    },
    component: () =>
      import(/* webpackChunkName: "deviceMaintain" */ '@/views/device/deviceOperate/deviceMaintain.vue')
  },
  {
    path: '/device/operation/deviceMaintain/maintainDetail',
    name: 'maintainDetail',
    meta: {
      title: '设备运维'
    },
    component: () =>
      import(/* webpackChunkName: "maintainDetail" */ '@/views/device/deviceOperate/maintainDetail.vue')
  },
  {
    path: '/device/maintain/recordOverflow',
    name: 'recordOverflow',
    meta: {
      title: '满溢记录'
    },
    component: () =>
      import(/* webpackChunkName: "recordOverflow" */ '@/views/device/maintainRecord/recordOverflow.vue')
  },
  {
    path: '/device/maintain/recordOverflow/flowDetail',
    name: 'flowDetail',
    meta: {
      title: '满溢详情'
    },
    component: () =>
      import(/* webpackChunkName: "flowDetail" */ '@/views/device/maintainRecord/flowDetail.vue')
  },
  {
    path: '/device/maintain/recordClearance',
    name: 'recordClearance',
    meta: {
      title: '清运记录'
    },
    component: () =>
      import(/* webpackChunkName: "recordClearance" */ '@/views/device/maintainRecord/recordClearance.vue')
  },
  {
    path: '/device/maintain/recordClearance/clearanceDetail',
    name: 'clearanceDetail',
    meta: {
      title: '清运详情'
    },
    component: () =>
      import(/* webpackChunkName: "clearanceDetail" */ '@/views/device/maintainRecord/clearanceDetail.vue')
  },
  {
    path: '/device/maintain/recordDayinspect',
    name: 'recordDayinspect',
    meta: {
      title: '日检记录'
    },
    component: () =>
      import(/* webpackChunkName: "recordDayinspect" */ '@/views/device/maintainRecord/recordDayinspect.vue')
  },
  {
    path: '/device/maintain/recordDayinspect/inspectDetail',
    name: 'inspectDetail',
    meta: {
      title: '日检详情'
    },
    component: () =>
      import(/* webpackChunkName: "inspectDetail" */ '@/views/device/maintainRecord/inspectDetail.vue')
  },
  {
    path: '/device/maintain/recordRepair',
    name: 'recordRepair',
    meta: {
      title: '报修记录'
    },
    component: () =>
      import(/* webpackChunkName: "recordRepair" */ '@/views/device/maintainRecord/recordRepair.vue')
  },
  {
    path: '/device/maintain/recordRepair/repairDetail',
    name: 'repairDetail',
    meta: {
      title: '报修详情'
    },
    component: () =>
      import(/* webpackChunkName: "repairDetail" */ '@/views/device/maintainRecord/repairDetail.vue')
  },
  // {
  //   path: '/device/maintain/recordViolation',
  //   name: 'recordViolation',
  //   meta: {
  //     title: '违规记录'
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "recordViolation" */ '@/views/device/maintainRecord/recordViolation.vue')
  // },
  // {
  //   path: '/device/maintain/recordViolation/violationDetail',
  //   name: 'violationDetail',
  //   meta: {
  //     title: '违规详情'
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "violationDetail" */ '@/views/device/maintainRecord/violationDetail.vue')
  // },
  {
    path: '/device/carManage/carList',
    name: 'carList',
    meta: {
      title: '车辆列表'
    },
    component: () =>
      import(/* webpackChunkName: "carList" */ '@/views/device/carManage/carList.vue')
  },
  {
    path: '/device/carManage/carList/addCar',
    name: 'addCar',
    meta: {
      title: '添加车辆'
    },
    component: () =>
      import(/* webpackChunkName: "listDetail" */ '@/views/device/carManage/listDetail.vue')
  },
  {
    path: '/device/carManage/carList/editCar',
    name: 'editCar',
    meta: {
      title: '编辑车辆'
    },
    component: () =>
      import(/* webpackChunkName: "listDetail" */ '@/views/device/carManage/listDetail.vue')
  },
  {
    path: '/device/carManage/carList/viewCar',
    name: 'viewCar',
    meta: {
      title: '查看车辆'
    },
    component: () =>
      import(/* webpackChunkName: "listDetail" */ '@/views/device/carManage/listDetail.vue')
  }
]
