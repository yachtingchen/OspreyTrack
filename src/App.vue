<script setup>
import { ref } from 'vue'
// 這裡引入妳之前建立好的零件
import TheHeader from './components/TheHeader.vue'
import TenderTable from './components/TenderTable.vue'
import ContestTable from './components/ContestTable.vue'

// 這是控制分頁切換的開關
const currentTab = ref('tender')
</script>

<template>
  <TheHeader />
  <header class="header-section container">
    <h1 class="brand-text">鷹巡，追蹤最新標案與職缺</h1>
    <img src="/images/logo.png" class="brand-img" alt="Logo" />
  </header>

  <section class="container text-base mb-4" style="font-size: 18px;">
    <p>
      每天在<strong>政府採購網</strong>、<strong>人力銀行</strong>上找案子找工作，眼花撩亂又怕錯過？機會常常不是沒有，是太慢想起來！<br>
      <strong>「鷹巡追蹤器」</strong>，專為繁忙的你設計。貼上網址，自動擷取標案與職缺關鍵資訊。
    </p>
  </section>
  <div class="container mt-4">
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

<style scoped>
  /* 建議放在 App.vue 的 <style> 中 */
  :root {
    --brand-red: #d9534f;
  }

  body {
    font-family: "Microsoft JhengHei", "Segoe UI", sans-serif;
    background-color: #fff;
  }

  /* 頂部 Header 樣式 */
  .header-section {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 3px solid var(--brand-red); /* 那條紅線 */
    margin-bottom: 15px;
    padding-bottom: 5px;
  }

  .brand-text {
    font-family: 'Times New Roman', serif;
    font-size: 3rem; /* 配合 RWD 可稍微縮小 */
    font-weight: bold;
    line-height: 1;
    color: #000;
  }

  .brand-img {
    height: 80px; /* 調整圖片高度 */
    object-fit: contain;
  }

  /* 表格樣式 - 讓它看起來像 Excel */
  .spreadsheet-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: 14px;
    table-layout: fixed;
  }

    .spreadsheet-table th, .spreadsheet-table td {
      border: 1px solid #ccc;
      padding: 8px;
      vertical-align: top;
      word-break: break-all;
      white-space: pre-wrap;
    }

    .spreadsheet-table th {
      background-color: #000;
      color: #fff;
      font-weight: normal;
    }
</style>
