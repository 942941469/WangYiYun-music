<template>
  <van-swipe :autoplay="3000" lazy-render indicator-color="red">
    <van-swipe-item v-for="image in swiperData.images" :key="image">
      <img :src="image.pic" alt=""/>
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
// 首页轮播图组件
import { onMounted, reactive } from 'vue'
import { getBanner } from '@/api/home'

onMounted(async () => {
  // 获取轮播图数据 type: 2表示设备是ipad
  const { data, status } = await getBanner({ type: 2 })
  if (status === 200) {
    swiperData.images = data.banners
  }
})
// 轮播图图片数据
const swiperData = reactive({
  images: []
})
</script>

<style lang="less" scoped>
.van-swipe{
  width: 100%;
  height: 3rem;
  .van-swipe-item{
    padding:.2rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: .2rem;
      }
  }
}
</style>
