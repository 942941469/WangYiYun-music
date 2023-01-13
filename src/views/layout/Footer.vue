<template>
  <div class="footer">
    <div class="lef" @click="goAlbum">
      <img :src="playList[playIndex].al.picUrl" alt="">
      <div class="info">
        <p>{{playList[playIndex].name}}</p>
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
<!-- 专辑页弹出层 -->
  <van-popup v-model:show="isAlbum" position="right" :style="{ width: '100%', height: '100%' }">
    <Album :Album="playList[playIndex]" @playMusic="playMusic" />
  </van-popup>
</template>

<script setup>
import { computed, onUpdated, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Album from '@/components/Album'
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
// 弹出专辑页
const goAlbum = () => store.dispatch('footer/UPDATAALBUM')
// 播放音乐
const playMusic = () => {
  if (audioRef.value.paused) {
    audioRef.value.play()
    // 将vuex中数据修改
    store.dispatch('playList/UNDISPLAYED', true)
    updataPlayTime()
  } else {
    audioRef.value.pause()
    store.dispatch('playList/UNDISPLAYED', false)
    clearInterval(updataPlayTime)
  }
}
// 定时更新播放时间
const updataPlayTime = () => {
  setInterval(() => {
    store.dispatch('footer/UPDATACURRENTTIME', audioRef.value.currentTime)
  }, 1000)
}
// 获取歌曲时长
const updataDuration = () => {
  store.dispatch('footer/UPDATADURATION', audioRef.value.duration)
  console.log(audioRef.value.duration)
}
watch(playIndex, (newValue, oldValue) => {
  audioRef.value.autoplay = true
  store.dispatch('playList/UNDISPLAYED', true)
})
watch(playList, (newValue, oldValue) => {
  audioRef.value.autoplay = true
  store.dispatch('playList/UNDISPLAYED', true)
})
onUpdated(() => {
  store.dispatch('footer/UPDATALYRIC', playList.value[playIndex.value].id)
  updataDuration()
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
