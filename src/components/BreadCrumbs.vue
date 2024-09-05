<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import type { Breadcrumb } from '@/tools/types'

const breadcrumbStore = useBreadcrumbStore()
const router = useRouter()
const breadcrumbList = ref<Breadcrumb[]>([])

const go = (path: string) => {
  console.log(path)
  router.push({ path })
}

watch(() => router.currentRoute.value, () => {
  breadcrumbList.value = breadcrumbStore.breadcrumbList
})

onMounted(() => {
  breadcrumbList.value = breadcrumbStore.breadcrumbList
})

</script>

<template>
  <div class="breadcrumbs text-sm pl-4">
    <ul>
      <li v-for="ele in breadcrumbList" :key="ele.path">
        <a @click.prevent="go(ele.path)">{{ ele.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
