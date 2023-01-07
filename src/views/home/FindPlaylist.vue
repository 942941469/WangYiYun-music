<template>
  <div class="playlist">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="playlistSwipe">
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <van-swipe-item v-for="item in playlist" :key="item.id">
          <router-link :to="{name: 'playlist', query: {id: item.id}}">
            <img :src="item.picUrl" alt="">
            <div class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              <span class="CountNum">{{changeCount(item.playCount)}}</span>
            </div>
            <div class="describe"><span>{{item.name}}</span></div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { getPlayRecommendList } from '@/api/home'
import { onMounted, reactive, toRefs } from 'vue'
import { changeCount } from '@/views/hook/changeCount'
onMounted(async () => {
  // 获取推荐歌单 limit为数据量
  const { data, status } = await getPlayRecommendList({ limit: 10 })
  if (status === 200) {
    recommendPlayList.playlist = data.result
  }
})
// 推荐歌单数据
const recommendPlayList = reactive({
  playlist: []
})
const { playlist } = { ...toRefs(recommendPlayList) }
</script>

<style lang="less" scoped>
.playlist{
  width: 100%;
  height: 5rem;
  padding: .2rem;
  .musicTop{
    display: flex;
    justify-content: space-between;
    margin-bottom: .2rem;
    .title{
      font-size: .4rem;
      font-weight: 900;
    }
    .more{
      border: 1px solid #ccc;
      text-align: center;
      line-height: .6rem;
      padding: 0 .2rem;
      border-radius: .4rem;
    }
  }
  .playlistSwipe{
    width: 100%;
    height: 4rem;
    .van-swipe{
      height: 100%;
      position: relative;
      .van-swipe-item{
        .describe{
          padding: .2rem;
          font-size: .2rem;
          font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
          'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
        }
      }
      img{
        width: 100%;
        height: 150px;
        padding: 10px;
        border-radius: .3rem;
      }
      .playCount{
        position: absolute;
        display: flex;
        top: .3rem;
        right: .3rem;
        color: white;
        .icon{
          width: .4rem;
          height: .4rem;
        }
        .CountNum{
          height: .4rem;
          line-height: .4rem;
        }
      }
    }
  }
}
</style>
