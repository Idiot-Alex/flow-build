<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  type: 'target',
  id: 'input',
})

const dataType = ref('null')

const nodeData = useNodesData(() => {
  const data = connections.value[0]?.source
  if (data === null) {
    dataType.value = "null"
  } else if (Array.isArray(data)) {
    dataType.value = "array"
  } else {
    dataType.value = typeof data
  }
  console.log(dataType.value)
  console.log(data)
  return data
})

const formattedData = computed(() => {
  if (typeof nodeData.value === 'object') {
    return JSON.stringify(nodeData.value, null, 2);
  } else {
    return String(nodeData.value);
  }
})
</script>

<template>
  <div class="console w-24">
    {{ nodeData?.data?.isGradient ? 'GRADIENT' : nodeData?.data?.color }}
    <div v-if="dataType === 'array'">
      array
    </div>
    <div v-else-if="dataType === 'object'">
      object
    </div>
    <div v-else>
      {{ nodeData }}
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