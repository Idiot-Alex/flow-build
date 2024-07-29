<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  type: 'target',
  id: 'input',
})

const nodeData = useNodesData(() => {
  return connections.value[0]?.source
})

const dataType = computed(() => {
  const node = nodeData.value
  if (node?.data === null) {
    return 'null'
  } else if (Array.isArray(node?.data)) {
    return 'array'
  } else {
    return typeof node?.data
  }
})
</script>

<template>
  <div class="console w-auto">
    <div v-if="nodeData" v-for="nKey in Object.keys(nodeData)" :key="nKey">
      <div v-if="nKey !== 'data'">
        {{ nKey }}: {{ nodeData[nKey] }}
      </div>
      <div v-else>
        <div>data: </div>
        <div v-if="dataType === 'array'">
          <div v-for="item in nodeData.data" :key="item">
            {{ item }}
          </div>
        </div>
        <div v-else-if="dataType === 'object'">
          <div v-for="dKey in Object.keys(nodeData.data)" :key="dKey">
          {{ dKey }}: {{ nodeData.data[dKey] }}
          </div>
        </div>
        <div v-else>
          {{ nodeData.data }}
        </div>
      </div>
    </div>
    <Handle id="input" type="target" class="handle-input" connectable="single" :position="Position.Left" />
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