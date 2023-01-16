<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <div class="topContent">
      <span @click="userCenter">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="search">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>

</template>

<script setup>
// 首页顶部功能框
import { useRouter } from 'vue-router'

const router = useRouter()
// 跳转到搜索界面
const search = () => {
  router.push({ name: 'search' })
}
// 跳转到个人中心
const userCenter = () => {
  router.push({ name: 'userCenter' })
}
</script>

<style lang="less" scoped>
.topNav{
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .topContent{
    width: 60%;
    height: 100%;
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    .active{
      font-weight: 900;
    }
  }
}
</style>
