function remSize() {
  // 获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }
  // 750px->1rem=100px 如果 html 元素 font-size=16px, 1rem=16px
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  // 设置字体大小
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
window.onresize = function () {
  remSize()
}
