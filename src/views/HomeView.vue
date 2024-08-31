<script setup lang="ts">
import Header from '../components/Header.vue'
import BreadCrumbs from '../components/BreadCrumbs.vue'
import { listFlow } from '../api/flow'
import { onMounted, ref } from 'vue'
import type { Res } from '@/tools/types'
import { useToast } from '@/tools/toast'

const toast = useToast()

const flowList = ref<Res[]>([])
const pagination = ref({
  page: 1,
  size: 10,
  total: 0,
})

const loadFlowList = async () => {
  const res: any = await listFlow(pagination.value.page, pagination.value.size, {})
  if (res.code === 'ok') {
    flowList.value = res.data
    pagination.value.page = res.page
    pagination.value.size = res.size
    pagination.value.total = res.total

    toast.showSuccess(res.msg)
  } else {
    toast.showError(res.msg)
  }
}

onMounted(async () => {
  loadFlowList()
})
</script>

<template>
  <main>
    <Header />
    <BreadCrumbs />
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
        <button class="join-item btn btn-outline">上一页</button>
        <button class="join-item btn btn-outline">下一页</button>
      </div>
      <div class="join grid grid-cols-2 items-center gap-2">
        <span class="join-item">第 {{ pagination.page }} 页 / 共 {{ pagination.total }} 条</span>
        <select class="select select-bordered" v-model="pagination.size">
          <option value="10" selected>10 条</option>
          <option value="50" >50 条</option>
          <option value="100" >100 条</option>
        </select>
      </div>
    </div>
  </main>
</template>
