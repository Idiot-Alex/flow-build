<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  // type: 'target',
})

const nodesData = useNodesData(() => {
  console.log(connections.value)
  connections.value[0]?.source
})
</script>

<template>
  <div class="console w-24">
    {{ nodesData?.data?.isGradient ? 'GRADIENT' : nodesData?.data?.color }}

    <!-- <Handle id="input" type="source" class="handle-input" :position="Position.Left" /> -->
    <Handle
      type="target"
      :position="Position.Right"
      :style="{ height: '16px', width: '6px', backgroundColor: nodesData?.data?.color, filter: 'invert(100%)' }"
    />
  </div>
</template>

<style lang="css">
.vue-flow__node-console {
  border: 1px solid #777;
  padding: 10px;
  border-radius: 10px;
  background: #f5f5f5;
}

.vue-flow__node-console .vue-flow__handle {
  height:24px;
  width:8px;
  border-radius:4px
}
</style>