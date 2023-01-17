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
  width: 70%;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: .5rem auto;
  border-radius: .7rem;
  background-color: red;
  img{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin: .3rem auto;
  }
  .name{
    font-weight: 700;
    font-size: .4rem;
    text-align: center;
  }
}
</style>
