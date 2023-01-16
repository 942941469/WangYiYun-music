import { getLyric } from '@/api/playlist'

const state = {
  // 专辑页显示
  isAlbum: false,
  // 歌词
  lyric: '',
  // 当前播放时间
  currentTime: 0,
  // 歌曲总时长
  duration: 0,
  // 是否登录
  isLogin: false,
  // 是否显示底部组件
  isFooter: true,
  // 登录token
  token: '',
  // 用户信息
  profile: {}
}
const mutations = {
  upDataAlbum(state) {
    state.isAlbum = !state.isAlbum
  },
  updataLyric(state, lyric) {
    state.lyric = lyric
  },
  updataCurrentTime(state, currentTime) {
    state.currentTime = currentTime * 1000
  },
  updataDuration(state, duraion) {
    state.duration = duraion * 1000
  },
  updataLogin(state, login) {
    state.isLogin = login
  },
  updataToken(state, { token, profile }) {
    state.token = token
    state.profile = profile
  }
}
const actions = {
  UPDATAALBUM({ commit }) {
    commit('upDataAlbum')
  },
  async UPDATALYRIC({ commit }, id) {
    const { data, status } = await getLyric(id)
    if (status === 200) {
      commit('updataLyric', data.lrc.lyric)
    }
  },
  UPDATACURRENTTIME({ commit }, currentTime) {
    commit('updataCurrentTime', currentTime)
  },
  UPDATADURATION({ commit }, duration) {
    commit('updataDuration', duration)
  },
  UPDATALOGIN({ commit }, login) {
    commit('updataLogin', login)
  },
  UPDATATOKEN({ commit }, { token, profile }) {
    commit('updataToken', { token, profile })
    localStorage.setItem('token', token)
  }
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
