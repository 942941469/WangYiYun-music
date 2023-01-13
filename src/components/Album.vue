<template>
  <img :src="Album.al.picUrl" alt="" class="backgroundPic">
  <div class="albumTop">
    <div class="left">
      <svg class="icon" aria-hidden="true" @click="goAlbum">
        <use xlink:href="#icon-jiantou_xiangzuo"></use>
      </svg>
      <div class="albumInfo">
        <p><Vue3Marquee style="color: white">{{Album.al.name}}</Vue3Marquee></p>
        <span v-for="item in Album.ar" :key="item.id">{{item.name}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="albumContent" v-if="isShow" @click="changePage">
    <img src="@/assets/stylus.png" alt="" class="stylus" :class="{stylus_active: isPlay}">
    <img src="@/assets/cd.png" alt="" class="cd">
    <img :src="Album.al.picUrl" alt="" class="albumPic" :class="isPlay ? 'albumPic_active' : 'albumPic_paused'">
  </div>
  <div class="lyric" v-else @click="changePage" ref="lyricRef">
    <span v-for="(item, index) in lyricShow" :key="index" :class="{active: currentTime >= item.time && currentTime < item.next}">{{item.lrc}}</span>
  </div>
  <div class="albumFooter">
    <div class="tools">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-changpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun2"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="progress">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="play">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danxunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="changeMusic(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon playBtn" aria-hidden="true" v-if="isPlay" @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon playBtn" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="changeMusic(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
// 专辑详情页
import { computed, defineEmits, defineProps, ref, toRefs, watch } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { useStore } from 'vuex'
const lyricRef = ref()
const props = defineProps({
  Album: Object
})
const emit = defineEmits(['playMusic'])
const { Album } = toRefs(props)
const store = useStore()
// 控制唱盘与歌词的显示
const isShow = ref(true)
// 播放歌曲按钮
const isPlay = computed(() => store.state.playList.isPlay)
// 歌词
const lyric = computed(() => store.state.footer.lyric)
// 当前播放时间
const currentTime = computed(() => store.state.footer.currentTime)
// 当前播放总时长
const duration = computed(() => store.state.footer.duration)
// 弹出专辑页
const goAlbum = () => {
  store.dispatch('footer/UPDATAALBUM')
  isShow.value = true
}
// 切歌
const changeMusic = (num) => {
  store.dispatch('playList/CHANGEMUSIC', num)
}
// 调用父组件方法
const play = () => emit('playMusic')
// 处理后的歌词数据
const lyricShow = computed(() => handleLyric(lyric))
// 歌词自动滑动
watch(currentTime, (newValue, oldValue) => {
  const p = document.querySelector('span.active')
  if (p) {
    if (p.offsetTop > 300) {
      lyricRef.value.scrollTop = p.offsetTop - 300
    }
  }
  if (currentTime.value === duration.value) {
    store.dispatch('playList/CHANGEMUSIC', 1)
  }
})
// 切换页码
function changePage() {
  isShow.value = !isShow.value
}
// 处理歌词数据
function handleLyric(lyric) {
  let arr = []
  arr = lyric.value.split(/[(\r\n)]+/).map((item) => {
    const min = item.slice(1, 3)
    const sec = item.slice(4, 6)
    let mill = item.slice(7, 10)
    let lrc = item.slice(11, item.length)
    // 如果mill为NaN则少分割一项
    if (isNaN(Number(mill))) {
      mill = item.slice(7, 9)
      lrc = item.slice(10, item.length)
    }
    const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
    return { time, lrc }
  })
  arr.forEach((item, index) => {
    if (index === arr.length - 1 || isNaN(arr[index + 1].time)) {
      item.next = 1000000
    } else {
      item.next = arr[index + 1].time
    }
  })
  return arr
}
</script>

<style lang="less" scoped>
.backgroundPic{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  // 虚化
  filter: blur(70px);
}
.albumTop{
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  .left{
    display: flex;
    align-items: center;
    margin-left: .2rem;
    .albumInfo{
      width: 3rem;
      height: 100%;
      margin-left: .4rem;
      span{
        color: #999999;
      }
      .icon{
        width: .2rem;
        height: .2rem;
      }
    }
  }
  .right{
    display: flex;
    align-items: center;
    margin-right: .2rem;
  }
}
.albumContent{
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .stylus{
    width: 2rem;
    height: 3.3rem;
    position: absolute;
    left: 46%;
    // 原点
    transform-origin: 0 0;
    // 旋转角度
    transform: rotate(-30deg);
    transition: all 0.5s;
  }
  .stylus.stylus_active{
    width: 2rem;
    height: 3.3rem;
    position: absolute;
    left: 46%;
    // 原点
    transform-origin: 0 0;
    // 旋转角度
    transform: rotate(0deg);
    transition: all 0.5s;
  }
  .cd{
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 1.1rem;
    z-index: -1;

  }
  .albumPic{
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 1.95rem;
    // 匀速 无线循环
    animation: rotate 30s linear infinite;
  }
    .albumPic_active{
      animation-play-state: running;
    }
    .albumPic_paused{
      animation-play-state: paused;
    }
  // 旋转动画
  @keyframes rotate{
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }
}
.lyric{
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .5rem;
  // 溢出滚动
  overflow: scroll;
  span{
    color: #999999;
    margin-bottom: .4rem;
  }
  .active{
    color: #fff;
    font-size: .45rem;
  }
}
.albumFooter{
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  .tools{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon{
      width: .36rem;
      height: .36rem;
      fill: rgb(245, 234, 234);
    }
  }
  .play{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon{
      fill: rgb(245, 234, 234);
    }
    .playBtn{
      width: 1rem;
      height: 1rem;
    }
  }
  .progress{
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .range{
      width: 90%;
      height: 0.06rem;
    }
  }
}
</style>
