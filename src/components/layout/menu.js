let list = [
  {
    id: '01',
    mIcon: '',
    mType: 0,
    routeUrl: '/home',
    mUrl: '',
    name: '工作台',
    pId: '0',
    sort: 1,
    children: [
      {
        id: '01001',
        mIcon: '',
        mType: 1,
        routeUrl: '/home/msg',
        mUrl: '',
        name: '系统消息',
        pId: '01',
        sort: 1,
        children: []
      }
    ]
  },
  // {
  //   id: '02',
  //   mIcon: '',
  //   mType: 0,
  //   mUrl: '',
  //   name: '数据统计',
  //   pId: '0',
  //   sort: 2,
  //   children: [
  //     {
  //       id: '021',
  //       mIcon: '',
  //       mType: 1,
  //       routeUrl: '/data/panel',
  //       mUrl: '',
  //       name: '数据看板',
  //       pId: '02',
  //       sort: 1,
  //       children: []
  //     }
  //   ]
  // },
  {
    id: '03',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '会员管理',
    pId: '0',
    sort: 3,
    children: [
      {
        id: '031',
        mIcon: '',
        mType: 1,
        mUrl: '',
        routeUrl: '/member/memberList',
        name: '会员列表',
        pId: '03',
        sort: 1,
        children: [
          {
            id: '0311',
            mIcon: '',
            mType: 2,
            routeUrl: '/member/memberList/memberDetails',
            mUrl: '',
            name: '会员详情',
            pId: '031',
            sort: 1,
            children: []
          }
        ]
      }
      // {
      //   id: '032',
      //   mIcon: '',
      //   mType: 1,
      //   routeUrl: '/member/openCard',
      //   mUrl: '',
      //   name: '线下开卡',
      //   pId: '03',
      //   sort: 2,
      //   children: []
      // }
    ]
  },
  {
    id: '04',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '订单管理',
    pId: '0',
    sort: 7,
    children: [
      {
        id: '041',
        mIcon: '',
        mType: 0,
        routeUrl: '',
        mUrl: '',
        name: '回收订单管理',
        pId: '04',
        sort: 1,
        children: [
          {
            id: '0411',
            mIcon: '',
            mType: 1,
            routeUrl: '/order/takeBack/reserve',
            mUrl: '',
            name: '预约订单记录',
            pId: '041',
            sort: 1,
            children: [
              {
                id: '04111',
                mIcon: '',
                mType: 2,
                routeUrl: '/order/takeBack/reserveDetail',
                mUrl: '',
                name: '详情',
                pId: '0411',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '0412',
            mIcon: '',
            mType: 1,
            routeUrl: '/order/takeBack/meet',
            mUrl: '',
            name: '接单回收记录',
            pId: '041',
            sort: 1,
            children: [
              {
                id: '04121',
                mIcon: '',
                mType: 2,
                routeUrl: '/order/takeBack/meetDetail',
                mUrl: '',
                name: '详情',
                pId: '0412',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '0413',
            mIcon: '',
            mType: 1,
            routeUrl: '/order/takeBack/settle',
            mUrl: '',
            name: '结算回收记录',
            pId: '041',
            sort: 1,
            children: [
              {
                id: '04131',
                mIcon: '',
                mType: 2,
                routeUrl: '/order/takeBack/settleDetail',
                mUrl: '',
                name: '详情',
                pId: '0413',
                sort: 1,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '042',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '兑换订单记录',
        pId: '04',
        sort: 1,
        children: [
          {
            id: '0421',
            mIcon: '',
            mType: 1,
            routeUrl: '/order/exchange/entity',
            mUrl: '',
            name: '实体店铺兑换',
            pId: '042',
            sort: 1,
            children: [
              {
                id: '04211',
                mIcon: '',
                mType: 2,
                routeUrl: '/order/exchange/entityDetail',
                mUrl: '',
                name: '详情',
                pId: '0421',
                sort: 1,
                children: []
              }
            ]
          }
          // {
          //   id: '0422',
          //   mIcon: '',
          //   mType: 1,
          //   routeUrl: '/order/takeBack/reserve',
          //   mUrl: '',
          //   name: '线上商城兑换',
          //   pId: '041',
          //   sort: 1,
          //   children: []
          // }
        ]
      },
      {
        id: '043',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '设备订单记录',
        pId: '04',
        sort: 1,
        children: [
          {
            id: '0431',
            mIcon: '',
            mType: 1,
            routeUrl: '/order/delivery/record',
            mUrl: '',
            name: '投递记录',
            pId: '043',
            sort: 1,
            children: [
              {
                id: '04311',
                mIcon: '',
                mType: 2,
                routeUrl: '/order/delivery/recordDetail',
                mUrl: '',
                name: '详情',
                pId: '0431',
                sort: 1,
                children: []
              }
            ]
          }
          // {
          //   id: '0432',
          //   mIcon: '',
          //   mType: 1,
          //   routeUrl: '/order/takeBack/reserve',
          //   mUrl: '',
          //   name: '取币记录',
          //   pId: '043',
          //   sort: 1,
          //   children: []
          // },
          // {
          //   id: '0433',
          //   mIcon: '',
          //   mType: 1,
          //   routeUrl: '/order/takeBack/reserve',
          //   mUrl: '',
          //   name: '补币记录',
          //   pId: '043',
          //   sort: 1,
          //   children: []
          // }
        ]
      }
    ]
  },
  {
    id: '05',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '设备管理',
    pId: '0',
    sort: 6,
    children: [
      {
        id: '051',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '回收设备运营',
        pId: '05',
        sort: 1,
        children: [
          {
            id: '0511',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/operation/deviceConfig',
            mUrl: '',
            name: '设备配置',
            pId: '051',
            sort: 1,
            children: [
              {
                id: '05111',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/operation/deviceConfig/viewDetail',
                mUrl: '',
                name: '查看',
                pId: '0511',
                sort: 1,
                children: []
              },
              {
                id: '05112',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/operation/deviceConfig/configDetail',
                mUrl: '',
                name: '配置',
                pId: '0511',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '0512',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/operation/deviceMaintain',
            mUrl: '',
            name: '设备运维',
            pId: '051',
            sort: 2,
            children: [
              {
                id: '05121',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/operation/deviceMaintain/maintainDetail',
                mUrl: '',
                name: '运维详情',
                pId: '0512',
                sort: 1,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: '052',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '运维记录',
        pId: '05',
        sort: 2,
        children: [
          {
            id: '0521',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/maintain/recordOverflow',
            mUrl: '',
            name: '满溢记录',
            pId: '052',
            sort: 1,
            children: [
              {
                id: '05211',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/maintain/recordOverflow/flowDetail',
                mUrl: '',
                name: '满溢详情',
                pId: '0521',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '0522',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/maintain/recordClearance',
            mUrl: '',
            name: '清运记录',
            pId: '052',
            sort: 2,
            children: [
              {
                id: '05221',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/maintain/recordClearance/clearanceDetail',
                mUrl: '',
                name: '清运详情',
                pId: '0522',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '0523',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/maintain/recordDayinspect',
            mUrl: '',
            name: '日检记录',
            pId: '052',
            sort: 3,
            children: [
              {
                id: '05231',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/maintain/recordDayinspect/inspectDetail',
                mUrl: '',
                name: '日检详情',
                pId: '0523',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '0524',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/maintain/recordRepair',
            mUrl: '',
            name: '报修记录',
            pId: '052',
            sort: 4,
            children: [
              {
                id: '05241',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/maintain/recordRepair/repairDetail',
                mUrl: '',
                name: '报修详情',
                pId: '0524',
                sort: 1,
                children: []
              }
            ]
          }
          /* {
            id: '0525',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/maintain/recordViolation',
            mUrl: '',
            name: '违规记录',
            pId: '052',
            sort: 4,
            children: [
              {
                id: '05251',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/maintain/recordViolation/violationDetail',
                mUrl: '',
                name: '违规详情',
                pId: '0525',
                sort: 1,
                children: []
              }
            ]
          } */
        ]
      },
      {
        id: '053',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '运营车辆管理',
        pId: '05',
        sort: 3,
        children: [
          {
            id: '0531',
            mIcon: '',
            mType: 1,
            routeUrl: '/device/carManage/carList',
            mUrl: '',
            name: '车辆列表',
            pId: '053',
            sort: 1,
            children: [
              {
                id: '05311',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/carManage/carList/addCar',
                mUrl: '',
                name: '添加车辆',
                pId: '0531',
                sort: 1,
                children: []
              },
              {
                id: '05312',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/carManage/carList/viewCar',
                mUrl: '',
                name: '查看',
                pId: '0531',
                sort: 2,
                children: []
              },
              {
                id: '05313',
                mIcon: '',
                mType: 2,
                routeUrl: '/device/carManage/carList/editCar',
                mUrl: '',
                name: '编辑',
                pId: '0531',
                sort: 3,
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '06',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '系统管理',
    pId: '0',
    sort: 11,
    children: [
      {
        id: '061',
        mIcon: '',
        mType: 1,
        routeUrl: '/system/role',
        mUrl: '',
        name: '角色配置',
        pId: '06',
        sort: 1,
        children: [
          {
            id: '0611',
            mIcon: '',
            mType: 2,
            routeUrl: '/system/role/add',
            mUrl: '',
            name: '新建角色',
            pId: '061',
            sort: 1,
            children: []
          }
        ]
      },
      {
        id: '062',
        mIcon: '',
        mType: 1,
        routeUrl: '/system/account',
        mUrl: '',
        name: '账号配置',
        pId: '06',
        sort: 2,
        children: [
          {
            id: '0621',
            mIcon: '',
            mType: 2,
            routeUrl: '/system/account/add',
            mUrl: '',
            name: '新建账号',
            pId: '062',
            sort: 1,
            children: []
          }
        ]
      },
      {
        id: '063',
        mIcon: '',
        mType: 1,
        routeUrl: '/system/log',
        mUrl: '',
        name: '操作日志',
        pId: '06',
        sort: 3,
        children: []
      }
    ]
  },
  {
    id: '07',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '商户管理',
    pId: '0',
    sort: 4,
    children: [
      // {
      //   id: '071',
      //   mIcon: '',
      //   mType: 1,
      //   routeUrl: '/merchant/intention',
      //   mUrl: '',
      //   name: '意向商户',
      //   pId: '07',
      //   sort: 1,
      //   children: []
      // },
      {
        id: '072',
        mIcon: '',
        mType: 1,
        routeUrl: '/merchant/merchantList',
        mUrl: '',
        name: '商户列表',
        pId: '07',
        sort: 2,
        children: [
          {
            id: '0721',
            mIcon: '',
            mType: 2,
            routeUrl: '/merchant/merchantList/merchantDetails',
            mUrl: '',
            name: '商户详情',
            pId: '072',
            sort: 1,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '08',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '回收人员管理',
    pId: '0',
    sort: 5,
    children: [
      {
        id: '081',
        mIcon: '',
        mType: 1,
        routeUrl: '/takeBack/peopleAuditList',
        mUrl: '',
        name: '人员入驻审核',
        pId: '08',
        sort: 1,
        children: [
          {
            id: '0811',
            mIcon: '',
            mType: 2,
            routeUrl: '/takeBack/peopleAuditList/peopleAuditDetails',
            mUrl: '',
            name: '人员入驻审核详情',
            pId: '081',
            sort: 1,
            children: []
          }
        ]
      },
      {
        id: '082',
        mIcon: '',
        mType: 1,
        routeUrl: '/takeBack/recyclerList',
        mUrl: '',
        name: '回收人员列表',
        pId: '08',
        sort: 2,
        children: [
          {
            id: '0821',
            mIcon: '',
            mType: 2,
            routeUrl: '/takeBack/recyclerList/recyclerDetails',
            mUrl: '',
            name: '回收人员详情',
            pId: '082',
            sort: 1,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '09',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '广告资讯管理',
    pId: '0',
    sort: 8,
    children: [
      {
        id: '091',
        mIcon: '',
        mType: 1,
        routeUrl: '/advert/floorAdvertList',
        mUrl: '',
        name: 'Banner列表',
        pId: '09',
        sort: 1,
        children: [
          {
            id: '0911',
            mIcon: '',
            mType: 2,
            routeUrl: '/advert/floorAdvertList/floorAdvertDetails',
            mUrl: '',
            name: 'Banner配置',
            pId: '091',
            sort: 1,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '010',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '规则管理',
    pId: '0',
    sort: 9,
    children: [
      {
        id: '0101',
        mIcon: '',
        mType: 1,
        routeUrl: '/rule/recyclePrice',
        mUrl: '',
        name: '回收价格配置',
        pId: '010',
        sort: 1,
        children: [
          {
            id: '01011',
            mIcon: '',
            mType: 2,
            routeUrl: '/rule/recyclePrice/recyclePriceDetails',
            mUrl: '',
            name: '回收价格配置详情',
            pId: '0101',
            sort: 1,
            children: []
          }
        ]
      },
      {
        id: '0102',
        mIcon: '',
        mType: 1,
        routeUrl: '/rule/recycleOperate',
        mUrl: '',
        name: '回收运营规则',
        pId: '010',
        sort: 1,
        children: []
      }
    ]
  },
  {
    id: '011',
    mIcon: '',
    mType: 0,
    mUrl: '',
    name: '财务管理',
    pId: '0',
    sort: 10,
    children: [
      {
        id: '0111',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '会员交易管理',
        pId: '011',
        sort: 1,
        children: [
          {
            id: '01111',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/MetranManage/cashoutApply',
            mUrl: '',
            name: '提现审核',
            pId: '0111',
            sort: 1,
            children: [
              {
                id: '011111',
                mIcon: '',
                mType: 2,
                routeUrl: '/finance/MetranManage/cashoutApply/view',
                mUrl: '',
                name: '查看',
                pId: '01111',
                sort: 1,
                children: []
              },
              {
                id: '011112',
                mIcon: '',
                mType: 2,
                routeUrl: '/finance/MetranManage/cashoutApply/apply',
                mUrl: '',
                name: '审核',
                pId: '01111',
                sort: 2,
                children: []
              }
            ]
          },
          {
            id: '01112',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/MetranManage/cashoutRecord',
            mUrl: '',
            name: '提现记录',
            pId: '0111',
            sort: 2,
            children: []
          },
          {
            id: '01113',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/MetranManage/rechargeRecord',
            mUrl: '',
            name: '充值记录',
            pId: '0111',
            sort: 3,
            children: []
          },
          {
            id: '01114',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/MetranManage/balanceFlow',
            mUrl: '',
            name: '余额流水',
            pId: '0111',
            sort: 4,
            children: []
          },
          {
            id: '01115',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/MetranManage/envalueFlow',
            mUrl: '',
            name: '环保值流水',
            pId: '0111',
            sort: 5,
            children: []
          }
        ]
      },
      {
        id: '0112',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '回收提现管理',
        pId: '011',
        sort: 2,
        children: [
          {
            id: '01121',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/cashoutManage/cashoutApply',
            mUrl: '',
            name: '提现审核打款',
            pId: '0112',
            sort: 1,
            children: [
              {
                id: '011211',
                mIcon: '',
                mType: 2,
                routeUrl: '/finance/cashoutManage/cashoutApply/view',
                mUrl: '',
                name: '查看',
                pId: '01121',
                sort: 1,
                children: []
              },
              {
                id: '011212',
                mIcon: '',
                mType: 2,
                routeUrl: '/finance/cashoutManage/cashoutApply/apply',
                mUrl: '',
                name: '审核',
                pId: '01121',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '01122',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/cashoutManage/balanceFlow',
            mUrl: '',
            name: '账户余额流水',
            pId: '0112',
            sort: 1,
            children: []
          }
        ]
      },
      {
        id: '0113',
        mIcon: '',
        mType: 0,
        mUrl: '',
        name: '保证金管理',
        pId: '011',
        sort: 3,
        children: [
          {
            id: '01131',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/bondManage/bondHandle',
            mUrl: '',
            name: '保证金处置',
            pId: '0113',
            sort: 1,
            children: [
              {
                id: '011311',
                mIcon: '',
                mType: 2,
                routeUrl: '/finance/bondManage/bondHandle/handleDetail',
                mUrl: '',
                name: '处置详情',
                pId: '01131',
                sort: 1,
                children: []
              }
            ]
          },
          {
            id: '01132',
            mIcon: '',
            mType: 1,
            routeUrl: '/finance/bondManage/bondFlow',
            mUrl: '',
            name: '保证金流水',
            pId: '0113',
            sort: 1,
            children: []
          }
        ]
      }
    ]
  }
]

list = list.sort((a, b) => a.sort - b.sort)

export default {
  list
}
