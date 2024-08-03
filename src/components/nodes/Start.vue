<script setup>
import { Handle, Position, useHandleConnections, useNodesData, useVueFlow } from '@vue-flow/core'

const { updateNode, findNode } = useVueFlow()

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
</script>

<template>
  <div ref="consoleRef" class="console w-auto">
    <details class="collapse collapse-arrow border-base-300 bg-base-200 border">
      <summary class="collapse-title text-xl font-medium">Start</summary>
      <div class="collapse-content">
        <p>流程的起始节点</p>
      </div>
    </details>
    <Handle id="output" type="source" class="handle-output" :connectable-start="true" :connectable-end="false" :position="Position.Right" />
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