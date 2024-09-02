<script setup lang="ts">
import { listFlow } from '../api/flow'
import { onMounted, ref } from 'vue'
import type { Res } from '@/tools/types'
import { useToast } from '@/tools/toast'

const toast = useToast()

const flowList = ref<Res[]>([])
const pagination = ref({
  page: 1,
  size: 5,
  pages: 0,
  total: 0,
})

const loadFlowList = async () => {
  const res: any = await listFlow(pagination.value.page, pagination.value.size, {})
  if (res.code === 'ok') {
    flowList.value = res.data
    pagination.value.page = res.page
    pagination.value.size = res.size
    pagination.value.pages = res.pages
    pagination.value.total = res.total

    toast.showSuccess(res.msg)
  } else {
    toast.showError(res.msg)
  }
}

const prevPage = () => {
  pagination.value.page --
  loadFlowList()
}

const nextPage = () => {
  pagination.value.page ++
  loadFlowList()
}

const changePageSize = () => {
  pagination.value.page = 1
  loadFlowList()
}

onMounted(async () => {
  loadFlowList()
})
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>创建时间</th>
          <th>修改时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flow in flowList">
          <th>{{ flow.id }}</th>
          <td>{{ flow.name }}</td>
          <td>{{ flow.createdAt }}</td>
          <td>{{ flow.updatedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-center gap-4">
    <div class="join grid grid-cols-2">
      <button class="join-item btn btn-outline" :disabled="pagination.page <= 1" @click="prevPage">上一页</button>
      <button class="join-item btn btn-outline" :disabled="pagination.page >= pagination.pages" @click="nextPage">下一页</button>
    </div>
    <div class="join grid grid-cols-2 items-center gap-2">
      <span class="join-item">第 {{ pagination.page }} / {{ pagination.pages }} 页 / 共 {{ pagination.total }} 条</span>
      <select class="select select-bordered" v-model="pagination.size" @change="changePageSize">
        <option value="5" selected>5 条</option>
        <option value="10">10 条</option>
        <option value="50" >50 条</option>
        <option value="100" >100 条</option>
      </select>
    </div>
  </div>
</template>

<style scoped>

</style>