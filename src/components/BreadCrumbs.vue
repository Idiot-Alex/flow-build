<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import type { Breadcrumb } from '@/tools/types';

const breadcrumbStore = useBreadcrumbStore()
const router = useRouter()
const breadcrumbList = ref<Breadcrumb[]>([])

onMounted(() => {
  breadcrumbList.value = breadcrumbStore.breadcrumbList
})

</script>

<template>
  <div class="breadcrumbs text-sm pl-4">
    <ul>
      <li v-for="ele in breadcrumbList">
        <a :href="ele.path">{{ ele.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
