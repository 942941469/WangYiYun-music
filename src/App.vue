<template>
  <router-view/>
  <Footer v-if="footer"/>
</template>

<script setup>
import Footer from '@/views/layout/Footer'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const footer = computed(() => store.state.footer.isFooter)
</script>

<style lang="less">

</style>
