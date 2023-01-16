<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-jiantou_xiangzuo"></use>
    </svg>
    <input type="text" placeholder="陈奕迅" @keydown.enter="search" v-model="searchKey">
  </div>
  <div class="searchHistory">
    <div class="historyTop">
      <span class="history">历史</span>
      <svg class="icon" aria-hidden="true" @click="deleteHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <span class="info" v-for="(item, index) in historyKey.data" :key="index" @click="searchHistory(item)">{{item}}</span>
  </div>
  <div class="list">
    <div class="listItem" v-for="(item, index) in searchList[0]" :key="item.id">
      <div class="itemLeft" @click="playMusic(item, index)">
        <span class="index">{{index + 1}}</span>
        <div class="musicName">
          <span class="song">{{item.name}}</span>
          <div class="singer" >
            <span v-for="author in item.artists" :key="author.id">{{author.name}}&nbsp;</span>
          </div>
        </div>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true" v-if="item.mvid !== 0">
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
</template>

<script setup>
import { onMounted, reactive, ref, toRaw } from 'vue'
import { getSearch } from '@/api/home'
import { useStore } from 'vuex'
// 这里需要嵌套一层，因为要给响应式数据重新赋值
const historyKey = reactive({ data: [] })
// 搜索关键字
const searchKey = ref('')
// 搜索结果列表
const searchList = reactive([])
const store = useStore()
// 搜索
const search = async () => {
  if (searchKey.value !== '') {
    historyKey.data.unshift(searchKey.value)
    // 数组去重，再重新赋值
    historyKey.data = [...new Set(historyKey.data)]
    // 历史记录多余8个就删除
    if (historyKey.data.length > 8) {
      historyKey.data.splice(historyKey.data.length - 1, 1)
    }
    await getSearchList(searchKey.value)
    localStorage.setItem('historyKey', JSON.stringify(historyKey.data))
  }
}
// 删除历史记录
const deleteHistory = () => {
  localStorage.removeItem('historyKey')
  historyKey.data.length = 0
}
// 搜索历史记录
const searchHistory = async (item) => {
  searchKey.value = item
  await getSearchList(item)
}
// 获取搜索数据
const getSearchList = async (keywords) => {
  searchList.length = 0
  const { data, status } = await getSearch(keywords)
  if (status === 200) {
    searchList.push(data.result.songs)
  }
}
// 播放音乐
const playMusic = (item, index) => {
  // 修改图片路径
  item.al = item.album
  item.al.picUrl = item.album.artist.img1v1Url
  // 将Proxy数据修改为普通数据
  const music = toRaw(item)
  store.dispatch('playList/PUSHMUSIC', { music, index })
}
onMounted(() => {
  if (localStorage.getItem('historyKey')) {
    historyKey.data.push(...JSON.parse(localStorage.getItem('historyKey')))
  }
})
</script>

<style lang="less" scoped>
.searchTop{
  width: 100%;
  height: 1rem;
  padding: 0 .2rem;
  display: flex;
  align-items: center;
  input{
    margin-left: .3rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 80%;
    padding: .1rem;
  }
}
.searchHistory{
  width: 90%;
  padding: .2rem;
  position: relative;
  align-items: center;
  margin: auto;
  .historyTop{
    display: flex;
    justify-content: space-between;
    margin-bottom: .3rem;
    .history{
      font-weight: 700;
    }
    .icon{
      width: .3rem;
      height: .3rem;
      position: absolute;
      margin-top: .1rem;
      right: .4rem;
    }
  }
  .info{
    padding: .1rem .2rem;
    border-radius: .15rem;
    background: #d9c6c6;
    margin: .1rem .2rem;
    display: inline-block;
  }
}
.list{
  margin-top: .2rem;
  width: 100%;
  padding-bottom: 1.4rem;
  .listItem{
    height: 1rem;
    width: 100%;
    padding: 0 .4rem;
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
