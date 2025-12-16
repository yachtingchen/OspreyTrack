<script setup>
import { ref, onMounted, watch } from 'vue'
import draggable from 'vuedraggable'

const contests = ref([])

onMounted(() => {
  const saved = localStorage.getItem('MyContestData')
  if (saved) contests.value = JSON.parse(saved)
})

watch(contests, (newVal) => {
  localStorage.setItem('MyContestData', JSON.stringify(newVal))
}, { deep: true })

const addRow = () => {
  contests.value.push({ date: '', name: '', host: '', note: '' })
}

const removeRow = (index) => {
  if (confirm('確定刪除？')) contests.value.splice(index, 1)
}
</script>

<template>
  <div class="p-3">
    <button @click="addRow" class="btn btn-primary mb-2">+ 新增一列</button>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th width="50">🔄</th>
          <th>日期</th>
          <th>比賽名稱</th>
          <th>主辦單位</th>
          <th>備註</th>
          <th width="80">操作</th>
        </tr>
      </thead>
      <draggable v-model="contests" tag="tbody" item-key="name" handle=".drag-handle">
        <template #item="{ element, index }">
          <tr>
            <td class="drag-handle" style="cursor:move">⋮⋮</td>
            <td><input v-model="element.date" class="form-control"></td>
            <td><input v-model="element.name" class="form-control"></td>
            <td><input v-model="element.host" class="form-control"></td>
            <td><input v-model="element.note" class="form-control"></td>
            <td><button @click="removeRow(index)" class="btn btn-sm btn-danger">刪除</button></td>
          </tr>
        </template>
      </draggable>
    </table>
  </div>
</template>