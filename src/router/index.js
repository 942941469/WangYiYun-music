import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index'

const routes = [
  {
    // 首页
    path: '/',
    name: 'home',
    component: () => import('@/views/layout/Home')
  },
  {
    // 歌单
    path: '/playlist',
    name: 'playlist',
    component: () => import('@/views/layout/PlayList')
  },
  {
    // 搜索
    path: '/search',
    name: 'search',
    component: () => import('@/views/layout/Search')
  },
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/home/Login')
  },
  {
    // 个人中心
    path: '/userCenter',
    name: 'userCenter',
    component: () => import('@/views/home/UserCenter'),
    // 判断是否登录
    beforeEnter: (to, from, next) => {
      if (store.state.footer.isLogin || localStorage.getItem('token')) {
        next()
      } else {
        next({ name: 'login' })
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  store.state.footer.isFooter = to.path !== '/login' && to.path !== '/userCenter'
  next()
})

export default router
