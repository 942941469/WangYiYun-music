<template>
  <div class="playlistTop">
    <img :src="playlist.coverImgUrl" alt="" class="backgroundImg">
    <div class="playlist-left">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-jiantou_xiangzuo"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="playlist-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="listInfo">
    <div class="img">
      <img :src="playlist.coverImgUrl" alt="">
    </div>
    <div class="info">
      <span>{{playlist.name}}</span>
      <div class="author">
        <img :src="playlist.creator.backgroundUrl" alt="">
        <span>{{playlist.creator.nickname}}</span>
      </div>
      <div class="description">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="listTool">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun2"></use>
      </svg>
      <span>{{changeCount(playlist.commentCount)}}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{playlist.shareCount}}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xuanze-duoxuan-tianchong"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
  <musicList :musicList="sound.musicList" :subscribedCount="sound.playlist.subscribedCount"/>
</template>

<script setup>
import MusicList from '@/components/MusicList'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListInfo, getPlayListMusic } from '@/api/playlist'
import { changeCount } from '@/views/hook/changeCount'
onMounted(async () => {
  // 获取歌单信息详情
  const id = useRoute().query.id
  const { data, status } = await getPlayListInfo(id)
  if (status === 200) {
    sound.playlist = data.playlist
  }
  const res = await getPlayListMusic(id)
  if (res.status === 200) {
    sound.musicList = res.data.songs
  }
})
// 歌单信息数据
const sound = reactive({
  playlist: {
    creator: {}
  },
  musicList: []
})
const { playlist } = toRefs(sound)
</script>

<style lang="less" scoped>
// 头部
.playlistTop{
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .backgroundImg{
    height: 12rem;
    width: 100%;
    position: absolute;
    z-index: -1;
    // 虚化
    filter: blur(5px);
  }
  .playlist-left, .playlist-right{
    width: 25%;
    display: flex;
    justify-content: space-between;
    margin: 0 .2rem;
  }
}
// 身体
.listInfo{
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .img{
    width: 40%;
    height: 2.6rem;
    position: relative;
    img{
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }
  }
  .info{
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    span{
      font-size: 0.3rem;
      font-weight: 1000;
      color: #fff;
    }
  }
  .author{
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    margin-top: .2rem;
    img{
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      vertical-align: middle;
    }
    span{
      font-family: "微软雅黑", serif;
      margin-left: .1rem;
      color: #ccc;
      font-size: .2rem;
    }
  }
  .description{
    width: 100%;
    height: .7rem;
    display: flex;
    align-items: center;
    margin-top: .5rem;
    justify-content: space-between;
    span{
      display: inline-block;
      width: 95%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      // 从顶部向底部垂直布置子元素
      -webkit-box-orient: vertical;
      font-size: 0.24rem;
      color: #ccc;
    }
  }
}
// 底部
.listTool{
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-around;
  margin-top: .2rem;
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    span{
      margin-top: .1rem;
    }
  }
}
</style>
