<script lang="ts" setup>
import { useNodeStatus } from '@/tools/node-status'
import { ref } from 'vue'

const { getNodeStatus } = useNodeStatus()
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})

const nodeStatus = getNodeStatus(props.id)
</script>

<template>
  <div class="form-control">
    <div class="divider">
      <span v-if="loading" class="loading loading-spinner loading-lg"></span>
        <div v-else  class="tooltip" :data-tip="nodeStatus.tip">
          <span class="label-text">节点状态：</span>
          <span class="text-base-500">{{ nodeStatus.emoji }}</span>
        </div>
    </div>
  </div>
</template>

<style lang="css">

</style>