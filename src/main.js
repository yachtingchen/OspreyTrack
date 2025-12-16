import { createApp } from 'vue'
import App from './App.vue'

// --- 1. 引入 Google 登入套件 ---
import vue3GoogleLogin from 'vue3-google-login'

// --- 2. 引入 Bootstrap 樣式與功能 ---
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 建立 Vue 應用程式實體
const app = createApp(App)

// --- 3. 設定 Google 登入 (保留妳原本的 Client ID) ---
app.use(vue3GoogleLogin, {
  clientId: '625564952566-mo7o26dqlaene4gk6upb5o9b16n22ao9.apps.googleusercontent.com' 
})

// 掛載到網頁上
app.mount('#app')
