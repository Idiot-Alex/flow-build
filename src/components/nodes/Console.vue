<script lang="ts" setup>
import { Handle, Position, useHandleConnections, useNodesData, useVueFlow } from '@vue-flow/core'
// import { NodeResizer } from '@vue-flow/node-resizer'

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

  sourcePosition: {
    type: String,
    default: Position.Right,
  },
  targetPosition: {
    type: String,
    default: Position.Left,
  },
})

const consoleRef = ref(null)

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

// maybe you don't need this
const shouldResize = (event, param) => {
  // event.dy y 轴缩小为负，放大为正
  const minHeight = consoleRef.value.offsetHeight + 20
  if (event.dy <= 0 && minHeight >= param.height) {
    param.height = minHeight
    return false
  }
  const node = findNode(props.id)
  node.dimensions.height = param.height
  updateNode(props.id, node)
  return true
}

// you don't need this
/* const updateNodeSize = () => {
  if (consoleRef.value) {
    const node = findNode(props.id)
    node.dimensions.height = consoleRef.value.offsetHeight + 20
    updateNode(props.id, node)
  }
}

const resizeObserver = new ResizeObserver(updateNodeSize)

onMounted(() => {
  if (consoleRef.value) {
    resizeObserver.observe(consoleRef.value)
  }
}) */

</script>

<template>
  <div ref="consoleRef" class="console w-auto">
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
          <div class="label-text-alt w-full">
            <textarea :value="JSON.stringify(nodeData[nKey])" readonly class="textarea textarea-primary min-w-64 w-full nowheel nodrag"></textarea>
          </div>
        </div>
        <div v-else class="label">
          <div class="label-text w-12">{{ nKey }}: </div>
          <div class="label-text-alt">{{ nodeData[nKey] }}</div>
        </div>
      </div>
    </div>
    <!-- <NodeResizer min-width="360" :should-resize="shouldResize"/> -->
    <Handle id="input" type="target" class="handle-input" connectable="single" :position="targetPosition" />
  </div>
</template>

<style lang="css">
/* @import '@vue-flow/node-resizer/dist/style.css'; */
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