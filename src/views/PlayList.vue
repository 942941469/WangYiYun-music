<template>
  <div>歌单详情</div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayList } from '@/api/playlist'
onMounted(async () => {
  // 获取歌单详情
  const id = useRoute().query.id
  const { data, status } = await getPlayList(id)
  if (status === 200) {
    sound.playlist = data.playlist
  }
})
const sound = reactive({
  playlist: {}
})
</script>

<style scoped>

</style>
