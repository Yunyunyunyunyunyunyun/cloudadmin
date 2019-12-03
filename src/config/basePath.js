export default {
  getArea: '/login/user/areaList', // 获取省市区、街道
  findMarkList: '/product/findMarkList', // 设备型号
  findAllGroupMark: '/product/findAllGroupMark', // 设备组型号
  getEstate: 'product/getEstateByStreet', // 获取小区
  findUser: '/product/findUserByRole', // 运营列表
  uploadImage: '/building/adv/upload', // 上传图片
  // 设备配置
  deviceGetList: '/product/getList', // 设备管理查询
  deviceDetail: '/product/getDetail', // 设备详情
  deviceSave: '/product/save', // 设备保存
  exportProduct: '/product/exportProduct', // 导出
  // 设备运维
  getDashBoard: '/equipment/operation/getDashBoard', // 运维看板
  getEquipmentList: '/equipment/operation/getEquipmentList', // 查询设备列表
  getEquipmentInfo: '/equipment/operation/getEquipmentInfo', // 查询设备详情
  getRecords: '/equipment/operation/getRecords', // 各个记录查询
  exportEquipmentList: '/equipment/operation/exportEquipmentList', // 导出设备列表
  exportOperateRecord: '/equipment/operation/exportOperateRecord', // 运维记录导出
  // 车辆列表
  getRecycleCarList: '/carManage/getRecycleCarList', // 车辆列表查询
  addEditCar: '/carManage/addEditCar', // 编辑新增
  bindCarInfo: '/carManage/bindCarInfo', // 解绑/交押金/删除
  getCarInfo: '/carManage/getCarInfo', // 查看
  getRecycleUserList: '/carManage/getRecycleUserList', // 手机号码获取回收小哥名称
  importCarInfo: '/carManage/importCarInfo', // 批量导入
  // 满溢记录
  getSpillOverList: '/operation/spillOver/getSpillOverList', // 查询满溢记录
  exportSpillOver: '/operation/spillOver/exportSpillOver', // 导出满溢记录
  getSpillOverInfo: '/operation/spillOver/getSpillOverInfo', // 满溢详情
  // 清运记录
  getCleanPerson: '/operation/pickUp/getCleanPerson', // 获取清运人员
  getPickRecordList: '/operation/pickUp/getPickRecordList', // 查询清运记录
  exportPickRecord: '/operation/pickUp/exportPickRecord', // 清运导出
  getPickUpInfoById: '/operation/pickUp/getPickUpInfoById', // 清运详情
  // 日检记录
  getDayUsers: '/operation/userSign/getUsers', // 获取日检人员
  getUserSignList: '/operation/userSign/getUserSignList', // 查询日检记录
  exportUserSign: '/operation/userSign/exportUserSign', // 导出日检记录
  getUserSignInfo: '/operation/userSign/getUserSignInfo', // 日检详情
  // 报修记录
  getRepairUsers: '/operation/repair/getUsers', // 获取报修人员
  getRepairRecords: '/operation/repair/getRepairRecords', // 查询报修记录
  exportRepair: '/operation/repair/exportRepair', // 报修导出
  getRepairRecord: '/operation/repair/getRepairRecord', // 报修详情
  // 提现审核
  postalList: '/postal/list', // 查询
  getStatistics: '/postal/getStatistics', // 看板
  postalVerify: '/postal/verify', // 审核
  // 提现记录
  withdrawList: '/withdraw/withdrawList', // 查询
  withdrawExport: '/withdraw/export', // 导出
  // 充值记录
  findUserPayTradeList: '/memberUser/findUserPayTradeList', // 查询
  exportUserPayTrade: '/memberUser/exportUserPayTrade', // 导出
  // 余额流水
  balanceFlow: '/data/balanceFlow', // 查询
  balanceFlowExport: '/data/balanceFlowExport', // 导出
  integralType: '/data/integralType', // 查询类型
  // 环保值流水
  envFlow: '/data/envFlow', // 查询
  envFlowExport: '/data/envFlowExport', // 导出
  environmentType: '/data/environmentType', // 查询类型
  // 提现审核打款
  auditTotal: '/withdrawAudit/auditTotal', // 统计数据查询
  auditList: '/withdrawAudit/auditList', // 查询申请记录
  auditCashout: '/withdrawAudit/audit', // 审核
  payCashout: '/withdrawAudit/pay', // 打款
  // 账户余额流水
  balanceRecordList: '/userBalanceRecord/balanceRecordList', // 查询账户余额流水
  balanceRecordExport: '/userBalanceRecord/balanceRecordExport', // 导出
  // 保证金处置
  bailDisposal: '/userBail/bailDisposal', // 保证金处置
  getOrderNumber: '/userBail/getOrderNumber', // 查询扣减保证金关联结算单号
  getRecycleUser: '/userBail/getRecycleUser', // 退换保证金用户信息
  getUserBail: '/userBail/getUserBail', // 查询撤销扣减单号
  bailEdit: '/userBail/edit', // 保存
  // 保证金流水
  userBailExport: '/userBail/export', // 导出
  recordList: '/userBail/recordList' // 保证金流水
}
