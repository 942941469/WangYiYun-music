import service from '@/utils/request'
// 获取轮播图
export const getBanner = (params) => {
  return service({
    method: 'get',
    url: '/banner',
    params
  })
}
// 获取推荐歌单
export const getPlayRecommendList = (params) => {
  return service({
    method: 'get',
    url: '/personalized',
    params
  })
}
