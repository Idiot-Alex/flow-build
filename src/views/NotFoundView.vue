<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const url = ref(location.href)

</script>

<template>
  <div class="mockup-browser border-base-300 border">
    <div class="mockup-browser-toolbar">
      <div class="input border-base-300 border">{{ url }}</div>
    </div>
    <div class="border-base-300 flex justify-center border-t px-4 py-16">
      <div class="flex flex-items-center flex-col gap-2">
        <h2 class="font-bold text-lg">未找到页面</h2>
        <div class="text-xs">请检查路由地址重试，或者点击按钮返回</div>
        <div class="flex gap-2 flex-row mt-2">
          <button class="btn btn-sm" @click="router.back()">返回</button>
          <button class="btn btn-sm" @click="router.push('/')">首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>