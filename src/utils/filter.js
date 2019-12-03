import Vue from 'vue'

Vue.filter('mobileFl', function (str) {
  const start = str.slice(0, 3)
  const end = str.slice(7)
  return `${start}****${end}`
})

// 将整数部分逢三一断
Vue.filter('numberFl', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  return intPartFormat
})

// 预约订单状态
Vue.filter('stateFl', function (value) {
  let str = ''
  switch (value) {
    case 0:
      str = '待接单'
      break
    case 1:
      str = '待回收'
      break
    case 2:
      str = '回收完成'
      break
    case 3:
      str = '回收取消'
      break
    default:
      str = '失效'
      break
  }
  return str
})

// 回收方式
Vue.filter('typeFl', function (value) {
  let str = ''
  switch (value) {
    case 0:
      str = '回收站满溢'
      break
    case 1:
      str = '网上预约（app）'
      break
    case 2:
      str = '客服录入(电话)'
      break
  }
  return str
})
