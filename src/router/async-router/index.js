// 数据统计
import data from './data'
// 会员管理
import member from './member'
// 订单管理
import order from './order'
// 设备管理
import device from './device'
// 商户管理
import merchant from './merchant'
// 回收人员管理
import takeBack from './take-back'
// 系统管理
import system from './system'
// 财务管理
import finance from './finance'
// 广告资讯管理
import advert from './advert'
// 规则管理
import rule from './rule'
// 活动管理
import activity from './activity'

const asyncRouterMap = [
  {
    path: '/home',
    component: () => import('@/views/common/home.vue'),
    name: 'home',
    meta: { title: '首页' }
  },
  {
    path: '/home/msg',
    component: () => import('@/views/message/index.vue'),
    name: 'msg',
    meta: { title: '系统消息 ' }
  },
  ...data,
  ...order,
  ...member,
  ...device,
  ...system,
  ...merchant,
  ...takeBack,
  ...finance,
  ...advert,
  ...rule,
  ...activity
]

// 异步路由（需要权限的页面）
export {
  asyncRouterMap
}
