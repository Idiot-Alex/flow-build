<script setup lang="ts">
import { listFlow, deleteFlow } from '../api/flow'
import { onMounted, ref } from 'vue'
import type { Dialog, Res } from '@/tools/types'
import { useToast } from '@/tools/toast'
import { format } from 'date-fns'
import { useDialog } from '@/tools/dialog'

const toast = useToast()
const dialog = useDialog()

const flowList = ref<any>([])
const pagination = ref({
  page: 1,
  size: 5,
  pages: 0,
  total: 0,
})
const loadFlowList = async () => {
  const res = await listFlow(pagination.value.page, pagination.value.size, {}) as unknown as Res
  if (res.code === 'ok') {
    flowList.value = res.data
    pagination.value.page = res.page as number
    pagination.value.size = res.size as number
    pagination.value.pages = res.pages as number
    pagination.value.total = res.total as number

    toast.showSuccess(res.msg)
  } else {
    toast.showError(res.msg)
  }
}

const onEdit = () => {
  const dl: Dialog = {
    title: '提示',
    message: '测试信息',
    closeBtn: '关闭',
    confirmBtn: '确认',
    confirmFunc: () => {
      alert('id')
    }
  }
  dialog.showDialog(dl)
}

const onDeleteFlow = async (id: string) => {
  const dl: Dialog = {
    title: '注意',
    message: '该操作会删除记录哦...',
    closeBtn: '取消',
    confirmBtn: '确认',
    confirmFunc: async () => {
      const res: any = await deleteFlow(id)
      if (res.code === 'ok') {
        toast.showSuccess(res.msg)
        loadFlowList()
      } else {
        toast.showError(res.msg)
      }
    }
  }
  dialog.showDialog(dl)
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
  <div class="card bg-base-100 shadow-xl overflow-x-auto px-4 py-2">
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>创建时间</th>
          <th>修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="flow in flowList" :key="flow.id">
          <th>{{ flow.idStr }}</th>
          <td>{{ flow.name }}</td>
          <td>{{ format(new Date(flow.createdAt), 'yyyy-MM-dd HH:mm:ss') }}</td>
          <td>{{ format(new Date(flow.updatedAt), 'yyyy-MM-dd HH:mm:ss') }}</td>
          <td class="flex gap-2">
            <button class="btn btn-outline btn-sm" @click="onEdit">编辑</button>
            <button class="btn btn-outline btn-sm" @click="onDeleteFlow(flow.idStr)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center gap-4 mt-2">
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
  </div>
</template>

<style scoped>

</style>