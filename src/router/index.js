import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    // 首页
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    // 歌单
    path: '/playlist',
    name: 'playlist',
    component: () => import('@/views/PlayList')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
