import { createApp } from 'vue'
import App from './App.vue'

// 1. 引入 Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// 2. 引入 Bootstrap JS (為了某些互動功能)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).mount('#app')