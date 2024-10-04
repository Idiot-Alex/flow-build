<script setup lang="ts">
import Header from '../components/Header.vue'
import BreadCrumbs from '../components/BreadCrumbs.vue'
import { useToast } from '@/tools/toast'

const toast = useToast()

</script>

<template>
  <Header />
  <div class="divider m-0 h-auto"></div>
  <BreadCrumbs />
  <main class="main-wrapper">
    <RouterView />
  </main>
  <footer class="footer footer-center bg-base-300 text-base-content p-4">
    <aside>
      <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
    </aside>
  </footer>
</template>

<style scoped>
.main-wrapper {
  width: 100%;
  height: calc(100vh - 120px);
}
</style>