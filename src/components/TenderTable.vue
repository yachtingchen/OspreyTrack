<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import draggable from 'vuedraggable' // 引入拖曳功能

interface Tender {
  deadline: string
  tenderNo: string
  tenderName: string
  budget: string
  url: string
}

const urlInput = ref('')
const tenders = ref<Tender[]>([])
const isLoading = ref(false)

// 1. 載入資料 (取代 loadTenderData)
onMounted(() => {
  const saved = localStorage.getItem('MyTenderData')
  if (saved) tenders.value = JSON.parse(saved)
})

// 2. 自動存檔 (取代 saveTenderData)
// 只要 tenders 變數有任何變動，Vue 會自動執行這行
watch(tenders, (newVal) => {
  localStorage.setItem('MyTenderData', JSON.stringify(newVal))
}, { deep: true })

// 3. 抓取資料 (模擬功能)
const fetchTender = async () => {
  if (!urlInput.value) return alert('請輸入網址！')
  isLoading.value = true
  
  // TODO: 這裡未來要換成呼叫 Azure Functions
  // 現在先模擬延遲 1 秒後產生假資料
  setTimeout(() => {
    tenders.value.unshift({
      deadline: '114/12/31',
      tenderNo: 'MOCK-123456',
      tenderName: '範例：新網站架設測試案',
      budget: '1,000,000',
      url: urlInput.value
    })
    urlInput.value = ''
    isLoading.value = false
  }, 1000)
}

// 4. 刪除資料
const removeRow = (index: number) => {
  if (confirm('確定刪除？')) tenders.value.splice(index, 1)
}
</script>

<template>
  <div class="p-3">
    <div class="input-group mb-3">
      <input v-model="urlInput" type="text" class="form-control" placeholder="請貼上標案網址...">
      <button @click="fetchTender" class="btn btn-success" :disabled="isLoading">
        {{ isLoading ? '處理中...' : '抓取標案資訊' }}
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr class="table-dark">
            <th width="50">🔄</th>
            <th>截止</th>
            <th>案號</th>
            <th>名稱</th>
            <th>預算</th>
            <th width="80">操作</th>
          </tr>
        </thead>
        <draggable v-model="tenders" tag="tbody" item-key="tenderNo" handle=".drag-handle">
          <template #item="{ element, index }">
            <tr>
              <td class="drag-handle" style="cursor:move">⋮⋮</td>
              <td><input v-model="element.deadline" class="form-control-plaintext"></td>
              <td><input v-model="element.tenderNo" class="form-control-plaintext"></td>
              <td><input v-model="element.tenderName" class="form-control-plaintext"></td>
              <td><input v-model="element.budget" class="form-control-plaintext"></td>
              <td>
                <button @click="removeRow(index)" class="btn btn-sm btn-danger">刪除</button>
              </td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
  </div>
</template>