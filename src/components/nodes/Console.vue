<script setup>
import { Handle, Position, useHandleConnections, useNodesData } from '@vue-flow/core'

const connections = useHandleConnections({
  type: 'target',
  id: 'input',
})

const nodeData = useNodesData(() => {
  return connections.value[0]?.source
})

const valueType = (val) => {
  return typeof val
}
</script>

<template>
  <div class="console w-auto">
    <details class="collapse collapse-arrow border-base-300 bg-base-200 border">
      <summary class="collapse-title text-xl font-medium">Console</summary>
      <div class="collapse-content">
        <p>输出连接的节点信息</p>
      </div>
    </details>
    <div v-if="nodeData" class="form-control mt-2">
      <div v-for="nKey in Object.keys(nodeData)" :key="nKey" class="form-control">
        <div v-if="valueType(nodeData[nKey]) === 'object'" class="label">
          <div class="label-text w-12">{{ nKey }}: </div>
          <div class="label-text-alt">
            <textarea :value="JSON.stringify(nodeData[nKey])" readonly class="textarea textarea-primary min-w-64"></textarea>
          </div>
        </div>
        <div v-else class="label">
          <div class="label-text w-12">{{ nKey }}: </div>
          <div class="label-text-alt">{{ nodeData[nKey] }}</div>
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