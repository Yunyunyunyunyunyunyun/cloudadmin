export default function loadBMap () {
  return new Promise(function (resolve, reject) {
    if (typeof BMap !== 'undefined') {
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function () {
      resolve(BMap)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=Q27Xz4aG9wCMWn9T95H8DMNgpLhHv8Bd&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
