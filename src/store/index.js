import { createStore } from 'vuex'
import playList from '@/store/modules/playList'
import footer from '@/store/modules/footer'
export default createStore({
  modules: {
    playList,
    footer
  }
})
