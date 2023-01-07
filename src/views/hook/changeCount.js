// 处理播放量数据
export const changeCount = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(2) + '万'
  } else {
    return num
  }
}
