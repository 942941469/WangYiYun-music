<template>
  <h2>欢迎登录</h2>
  <van-form ref="loginRef">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" @click="login">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { ref } from 'vue'
import { getLogin } from '@/api/home'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const username = ref('')
const password = ref('')
const loginRef = ref()
// 登录
const login = () => {
  loginRef.value.validate().then(async () => {
    const { data: res } = await getLogin(username.value, password.value)
    if (res.code === 200) {
      await store.dispatch('footer/UPDATALOGIN', true)
      await store.dispatch('footer/UPDATATOKEN', { token: res.token, profile: res.profile })
      await router.push({ name: 'home' })
    } else {
      alert('用户名或密码错误')
      password.value = ''
    }
  }).catch(err => console.log(err))
}
</script>

<style lang="less" scoped>
h2{
  width: 100%;
  text-align: center;
  margin: 1rem 0;
}
</style>
