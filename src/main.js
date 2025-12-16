import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

// 設定 Google 登入， CLIENT_ID 等一下會申請
app.use(vue3GoogleLogin, {
  clientId: '625564952566-mo7o26dqlaene4gk6upb5o9b16n22ao9.apps.googleusercontent.com' 
})

app.mount('#app')
import { createApp } from 'vue'
import App from './App.vue'

// 1. 引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 2. 引入 Bootstrap JS (為了某些互動功能)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).mount('#app')