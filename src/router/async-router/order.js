export default [
  {
    path: '/order/takeBack/reserve',
    name: 'reserve',
    meta: {
      title: '预约订单记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "reserve" */ '@/views/order/takeBack/reserve.vue'
      )
  },
  {
    path: '/order/takeBack/reserveDetail',
    name: 'reserveDetail',
    meta: {
      title: '预约订单记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "reserve" */ '@/views/order/takeBack/reserveDetail.vue'
      )
  },
  {
    path: '/order/takeBack/meet',
    name: 'meetOrder',
    meta: {
      title: '接单回收记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "meetOrder" */ '@/views/order/takeBack/order.vue'
      )
  },
  {
    path: '/order/takeBack/meetDetail',
    name: 'meetOrderDetail',
    meta: {
      title: '详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "meetOrder" */ '@/views/order/takeBack/orderDetail.vue'
      )
  },
  {
    path: '/order/exchange/entity',
    name: 'exchangeEntity',
    meta: {
      title: '实体店铺兑换'
    },
    component: () =>
      import(
        /* webpackChunkName: "exchangeEntity" */ '@/views/order/exchange/entity.vue'
      )
  },
  {
    path: '/order/exchange/entityDetail',
    name: 'exchangeEntityDetail',
    meta: {
      title: '详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "exchangeEntity" */ '@/views/order/exchange/entityDetail.vue'
      )
  },
  {
    path: '/order/exchange/onlineMall',
    name: 'onlineMall',
    meta: {
      title: '线上商城兑换'
    },
    component: () =>
      import(
        /* webpackChunkName: "onlineMall" */ '@/views/order/exchange/onlineMall.vue'
      )
  },
  {
    path: '/order/exchange/onlineMallDetails',
    name: 'onlineMallDetails',
    meta: {
      title: '线上商城兑换详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "onlineMallDetails" */ '@/views/order/exchange/onlineMallDetails.vue'
      )
  },
  {
    path: '/order/exchange/machineList',
    name: 'machineList',
    meta: {
      title: '兑换机兑换'
    },
    component: () =>
      import(
        /* webpackChunkName: "machineList" */ '@/views/order/exchange/machineList.vue'
      )
  },
  {
    path: '/order/exchange/machineDetails',
    name: 'machineDetails',
    meta: {
      title: '兑换机兑换详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "machineDetails" */ '@/views/order/exchange/machineDetails.vue'
      )
  },
  {
    path: '/order/takeBack/settle',
    name: 'settle',
    meta: {
      title: '结算回收记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "meetOrder" */ '@/views/order/takeBack/settle.vue'
      )
  },
  {
    path: '/order/takeBack/settleDetail',
    name: 'settleDetail',
    meta: {
      title: '详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "meetOrder" */ '@/views/order/takeBack/settleDetail.vue'
      )
  },
  {
    path: '/order/delivery/record',
    name: 'deliveryRecord',
    meta: {
      title: '投递记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "deliveryRecord" */ '@/views/order/device/deliveryRecord.vue'
      )
  },
  {
    path: '/order/delivery/recordDetail',
    name: 'deliveryRecordDetail',
    meta: {
      title: '投递记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "deliveryRecordDetail" */ '@/views/order/device/detail.vue'
      )
  },
  {
    path: '/order/delivery/withdrawRecord',
    name: 'withdrawRecord',
    meta: {
      title: '取币记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "withdrawRecord" */ '@/views/order/device/withdrawRecord.vue'
      )
  },
  {
    path: '/order/delivery/withdrawDetails',
    name: 'withdrawDetails',
    meta: {
      title: '取币记录详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "withdrawDetails" */ '@/views/order/device/withdrawDetails.vue'
      )
  },
  {
    path: '/order/delivery/supplementaryRecord',
    name: 'supplementaryRecord',
    meta: {
      title: '补币记录'
    },
    component: () =>
      import(
        /* webpackChunkName: "supplementaryRecord" */ '@/views/order/device/supplementaryRecord.vue'
      )
  },
  {
    path: '/order/delivery/supplementaryDetails',
    name: 'supplementaryDetails',
    meta: {
      title: '补币记录详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "supplementaryDetails" */ '@/views/order/device/supplementaryDetails.vue'
      )
  }
]
