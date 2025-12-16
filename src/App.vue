<script setup lang="ts">
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