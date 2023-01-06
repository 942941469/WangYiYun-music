import service from '@/utils/request'
// 获取歌单详情
export const getPlayList = (id) => {
  return service({
    method: 'get',
    url: `/playlist/detail?id=${id}`
  })
}
