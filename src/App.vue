<script setup>
import { ref } from 'vue'
import { googleOneTap } from 'vue3-google-login'

const user = ref(null)
const isLoggedIn = ref(false)

// 當登入成功時執行的功能
const callback = (response) => {
  // 解碼 Google 傳回來的資料 (JWT)
  const userData = decodeCredential(response.credential)
  user.value = userData
  isLoggedIn.value = true
  console.log("使用者資料:", userData)
}

// 解碼 JWT 的小工具 (這是 Google 登入的標準解法)
const decodeCredential = (credential) => {
  const base64Url = credential.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}
</script>

<template>
  <div class="container">
    <h1>歡迎來到 Abby 的靜態網站</h1>
    
    <div v-if="!isLoggedIn" class="login-box">
      <p>請使用 Google 帳號登入</p>
      <GoogleLogin :callback="callback" />
    </div>

    <div v-else class="welcome-box">
      <img :src="user.picture" class="avatar" />
      <h2>你好, {{ user.name }}!</h2>
      <p>你的 Email 是: {{ user.email }}</p>
      <button @click="isLoggedIn = false">登出</button>
    </div>
  </div>
</template>

<style scoped>
.container { text-align: center; margin-top: 50px; font-family: sans-serif; }
.avatar { border-radius: 50%; width: 100px; margin-bottom: 20px; }
.login-box, .welcome-box { border: 1px solid #ddd; padding: 20px; border-radius: 10px; display: inline-block; }
button { margin-top: 10px; padding: 5px 15px; cursor: pointer; }
</style>
<script setup>
import { ref } from 'vue'
import TheHeader from './components/TheHeader.vue'
import TenderTable from './components/TenderTable.vue'
import ContestTable from './components/ContestTable.vue'

// 控制目前顯示哪個分頁
const currentTab = ref('tender') // 預設顯示標案
</script>

<template>
  <TheHeader />

  <div class="container">
    <ul class="nav nav-tabs mb-3">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: currentTab === 'tender' }" 
           @click.prevent="currentTab = 'tender'" href="#">
           🏛️ 政府標案
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: currentTab === 'contest' }" 
           @click.prevent="currentTab = 'contest'" href="#">
           🥇 我要參加
        </a>
      </li>
    </ul>

    <div class="border p-3 bg-white rounded shadow-sm">
      <TenderTable v-if="currentTab === 'tender'" />
      <ContestTable v-if="currentTab === 'contest'" />
    </div>
  </div>
</template>

<style>
/* 可以在這裡加一些全域微調 */
body { background-color: #f8f9fa; }
</style>