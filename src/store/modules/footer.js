const state = {
  // 专辑页显示
  isAlbum: false
}
const mutations = {
  upDataAlbum(state) {
    state.isAlbum = !state.isAlbum
  }
}
const actions = {
  UPDATAALBUM({ commit }) {
    commit('upDataAlbum')
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
