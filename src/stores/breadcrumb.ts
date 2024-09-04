import type { Breadcrumb } from '@/tools/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const breadcrumbList = ref<Breadcrumb[]>([])

  const setBreadcrumbList = (path: Breadcrumb[]) => {
    breadcrumbList.value = path
  }

  return {
    breadcrumbList,
    setBreadcrumbList,
  }
})
