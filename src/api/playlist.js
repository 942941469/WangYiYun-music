import service from '@/utils/request'
// 获取歌单信息详情
export const getPlayListInfo = (id) => {
  return service({
    method: 'get',
    url: `/playlist/detail?id=${id}`
  })
}
// 获取歌单音乐
export const getPlayListMusic = (id) => {
  return service({
    method: 'get',
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}
