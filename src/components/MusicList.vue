<template>
  <div class="musicList">
    <div class="listTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部<span>(共{{musicList.length}}首)</span></span>
      </div>
      <div class="listRight">
        <van-button round type="danger">
          <div class="collect">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiahao"></use>
            </svg>
            <span>收藏({{changeCount(subscribedCount)}})</span>
          </div>
        </van-button>
      </div>
    </div>
    <div class="list">
      <div class="listItem" v-for="(item, index) in musicList" :key="item.id">
        <div class="itemLeft" @click="playMusic(index)">
          <span class="index">{{index + 1}}</span>
          <div class="musicName">
            <span class="song">{{item.al.name}}</span>
            <div class="singer" >
              <span v-for="author in item.ar" :key="author.id">{{author.name}}&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon" aria-hidden="true" v-if="item.mv !== 0">
            <use xlink:href="#icon-MV"></use>
          </svg>
          <div class="iconRight">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-liebiao"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps } from 'vue'
import { changeCount } from '@/views/hook/changeCount'
import { useStore } from 'vuex'
const props = defineProps({
  subscribedCount: Number,
  musicList: Array
})
const store = useStore()
// 播放列表音乐
const playMusic = (index) => {
  store.dispatch('playList/UPDATEPLAYLIST', { musicList, index })
}
const { subscribedCount, musicList } = toRefs(props)
</script>

<style lang="less" scoped>
.musicList{
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .listTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft{
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-weight: 700;
        span{
          font-weight: 400;
          font-size: .24rem;
          color: #999;
        }
      }
    }
    .listRight{
      .collect{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
          width: .4rem;
          height: .4rem;
        }
        span{
          align-items: center;
          color: #fff;
          font-size: .25rem;
        }
      }
    }
  }
}
.list{
  margin-top: .2rem;
  width: 100%;
  padding-bottom: 1.4rem;
  .listItem{
    height: 1rem;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    .itemLeft{
      width: 80%;
      display: flex;
      align-items: center;
      .index{
        width: .5rem;
        text-align: center;
      }
      .musicName{
        display: flex;
        flex-direction: column;
        .song{
          width: 4.54rem;
          height: .4rem;
          font-weight: 700;
          overflow: hidden;
        }
        .singer{
          span{
            font-weight: 400;
            font-size: .2rem;
            color: #999;
          }
        }
      }
    }
    .itemRight{
      width: 20%;
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      .iconRight{
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
