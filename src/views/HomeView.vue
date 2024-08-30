<script setup lang="ts">
import Header from '../components/Header.vue'
import BreadCrumbs from '../components/BreadCrumbs.vue'
import { listFlow } from '../api/flow'
import { onMounted, ref } from 'vue'

const flowList = ref<Res[]>([])

onMounted(async () => {
  const res: any = await listFlow(1, 10, {})
  if (res.code === 'ok') {
    flowList.value = res.data
  }
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
    <div class="join">
      <input
        class="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        checked="checked" />
      <input class="join-item btn btn-square" type="radio" name="options" aria-label="2" />
      <input class="join-item btn btn-square" type="radio" name="options" aria-label="3" />
      <input class="join-item btn btn-square" type="radio" name="options" aria-label="4" />
    </div>
  </main>
</template>
