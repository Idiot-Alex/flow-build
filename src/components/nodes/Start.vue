<script lang="ts" setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { useNodeStatus } from '@/tools/node-status'
import { ref } from 'vue'
import NodeStatus from '@/components/NodeStatus.vue'

const { getNodeStatus } = useNodeStatus()
const { } = useVueFlow()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  sourcePosition: {
    type: String,
    default: Position.Right,
  },
  targetPosition: {
    type: String,
    default: Position.Left,
  },
})

const loading = ref(false)
const nodeStatus = getNodeStatus(props.id)
</script>

<template>
  <div ref="consoleRef" class="console w-auto">
    <details class="collapse collapse-arrow border-base-300 bg-base-200 border">
      <summary class="collapse-title text-xl font-medium">Start</summary>
      <div class="collapse-content">
        <p>流程的起始节点</p>
        <p>只能有唯一一个</p>
      </div>
    </details>
    <NodeStatus :id="props.id" />
    <Handle id="output" type="source" class="handle-output" :connectable-start="true" :connectable-end="false" :position="sourcePosition" />
  </div>
</template>

<style lang="css">
.vue-flow__node-start {
  border: 1px solid #777;
  padding: 10px;
  border-radius: 10px;
  background: #f5f5f5;
}
.vue-flow__node-start .vue-flow__handle {
  height:24px;
  width:8px;
  border-radius:4px
}
</style>