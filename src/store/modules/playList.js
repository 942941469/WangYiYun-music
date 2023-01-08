const state = {
  // 播放数据
  playList: [{
    al: {
      id: 7546,
      name: '打包',
      pic: 84662395344387,
      picUrl: 'https://p1.music.126.net/BWbiOPu29IZkxQN7sxpGPw==/84662395344387.jpg'
    },
    id: 29343276
  }],
  playListIndex: 0,
  // 是否播放
  isPlay: false
}
const mutations = {
  upDataIsPlay(state, isPlay) {
    state.isPlay = isPlay
  },
  upDataPlayList(state, { musicList, index }) {
    state.playList = musicList
    state.playListIndex = index
  }
}
const actions = {
  UNDISPLAYED({ commit }, data) {
    commit('upDataIsPlay', data)
  },
  UPDATEPLAYLIST({ commit }, { musicList, index }) {
    commit('upDataPlayList', { musicList, index })
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
