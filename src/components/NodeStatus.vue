<script lang="ts" setup>
import { useNodeStatus } from '@/tools/node-status'
import { onMounted, ref, watch } from 'vue'
import { type NodeState } from '@/tools/types'

const { getNodeStatus } = useNodeStatus()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const nodeStatus = ref<NodeState>({
  emoji: '',
  tip: ''
})
onMounted(() => {
  nodeStatus.value = getNodeStatus(props.id)
})
watch(
  () => props.data,
  (val) => {
    nodeStatus.value = getNodeStatus(props.id)
    console.log('watch', val, nodeStatus)
  }, {deep: true}
)
</script>

<template>
  <div class="form-control">
    <div class="divider">
      <span v-if="props.data.isRunning" class="loading loading-spinner loading-lg"></span>
      <div class="tooltip" :data-tip="nodeStatus.tip">
        <span class="label-text">节点状态：</span>
        <span class="text-base-500">{{ nodeStatus.emoji }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="css">

</style>