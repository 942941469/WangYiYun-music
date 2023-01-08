<template>
  <div class="footer">
    <div class="lef">
      <img :src="playList[playIndex].al.picUrl" alt="">
      <div class="info">
        <p>{{playList[playIndex].al.name}}</p>
        <span>横划切换上下首哦</span>
      </div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true" v-if="isPlay" @click="playMusic">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="playMusic">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
  <audio ref="audioRef" :src='`https://music.163.com/song/media/outer/url?id=${playList[playIndex].id}.mp3`'></audio>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
const audioRef = ref()
const store = useStore()
// 获取底部播放数据
const playList = computed(() => store.state.playList.playList)
// 播放歌曲序号
const playIndex = computed(() => store.state.playList.playListIndex)
// 播放歌曲按钮
const isPlay = computed(() => store.state.playList.isPlay)
// 专辑页是否显示
const isAlbum = computed(() => store.state.footer.isAlbum)
// 播放音乐
const playMusic = () => {
  if (audioRef.value.paused) {
    audioRef.value.play()
    // 将vuex中数据修改
    store.dispatch('playList/UNDISPLAYED', true)
  } else {
    audioRef.value.pause()
    store.dispatch('playList/UNDISPLAYED', false)
  }
}
watch(playIndex, (newValue, oldValue) => {
  audioRef.value.autoplay = true
  store.dispatch('playList/UNDISPLAYED', true)
})
watch(playList, (newValue, oldValue) => {
  audioRef.value.autoplay = true
  store.dispatch('playList/UNDISPLAYED', true)
})
</script>

<style lang="less" scoped>
.footer{
  width: 100%;
  height: 1.4rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: .2rem;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #999;
  .lef{
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    -webkit-box-orient: vertical;
    align-items: center;
    img{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .info{
      width: 100%;
      height: 1rem;
      p{
        height: .5rem;
        overflow: hidden;
        font-weight: 900;
      }
    }
  }
  .right{
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
