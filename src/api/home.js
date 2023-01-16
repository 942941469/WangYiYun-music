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
// 搜索
export const getSearch = (keywords) => {
  return service({
    method: 'get',
    url: `/search?keywords=${keywords}`
  })
}
// 登录
export const getLogin = (phone, password) => {
  return service({
    method: 'get',
    url: `/login/cellphone?phone=${phone}&password=${password}`
  })
}
