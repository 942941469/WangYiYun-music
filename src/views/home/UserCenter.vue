<template>
  <div class="user">
    <img :src="profile.avatarUrl" alt="">
    <div class="name">{{profile.nickname}}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const profile = computed(() => store.state.footer.profile)
</script>

<style lang="less" scoped>
.user{
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  margin-top: .7rem;
  img{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  .name{
    font-weight: 700;
    font-size: .4rem;
  }
}
</style>
