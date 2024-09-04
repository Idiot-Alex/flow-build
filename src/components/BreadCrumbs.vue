<script setup lang="ts">
import { onMounted, ref,watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'

const breadcrumbStore = useBreadcrumbStore()
const router = useRouter()
const breadcrumbPath = ref([])

onMounted(() => {
  console.log(breadcrumbStore.breadcrumbList)
})

</script>

<template>
  <div class="breadcrumbs text-sm pl-4">
    <ul>
      <li><a>Home</a></li>
      <li><a>Documents</a></li>
      <li>Add Document</li>
    </ul>
  </div>
</template>

<style scoped>

</style>
