<script setup lang="ts">
import Header from '../components/Header.vue'
import BreadCrumbs from '../components/BreadCrumbs.vue'
import { useToast } from '@/tools/toast'

const toast = useToast()

</script>

<template>
  <Header />
  <BreadCrumbs />
  <main>
    <RouterView />
  </main>
</template>
