<script lang="ts" setup>
import { Handle, Position, useVueFlow, type GraphNode } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { ref } from 'vue';

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

const cmd = ref('')

const onCmdChange = () => {
  const node: GraphNode = findNode(props.id) as GraphNode
  node.data.cmd = cmd.value
  updateNode(props.id, node)
}

const execCmd = async () => {
  const url = '/api/node/exec'
  const data = {
    'nodeName': 'shell',
    'cmd': cmd.value,
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const responseData = await response.json()
    console.log('Success:', responseData)

    const node: GraphNode = findNode(props.id) as GraphNode
    node.data.output = responseData
    updateNode(props.id, node)
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<template>
  <div class="shell w-auto">
    <details class="collapse collapse-arrow border-base-300 bg-base-200 border">
      <summary class="collapse-title text-xl font-medium">Shell</summary>
      <div class="collapse-content">
        <p>1. 请在下方定义输入的参数信息</p>
        <p>2. 请在下面文本域中输入需要执行的 shell 命令</p>
        <p>3. 执行完成之后会显示输出参数信息</p>
      </div>
    </details>
    <div class="form-control">
      <div class="label">
        <span class="label-text">请输入 shell 命令</span>
      </div>
      <textarea v-model="cmd" class="textarea textarea-primary min-w-80 nowheel nodrag" @change="onCmdChange" placeholder="such as: -c ls -l"></textarea>
    </div>
    <div class="form-control">
      <div class="label">
        <span class="label-text">执行状态</span>
      </div>
    </div>
    <NodeToolbar :is-visible="props.data.toolbarVisible">
      <button class="btn btn-outline btn-primary mr-2">测试节点</button>
      <button class="btn btn-outline btn-accent mr-2" @click="execCmd">单步执行</button>
      <button class="btn btn-outline">凑个数</button>
    </NodeToolbar>
    <Handle id="input" type="target" class="handle-input" :position="Position.Left" />
    <Handle id="output" type="source" class="handle-output" :position="Position.Right" />
  </div>
</template>

<style lang="css">
.vue-flow__node-shell {
  border: 1px solid #777;
  padding: 10px;
  border-radius: 10px;
  background: #f5f5f5;
}
.vue-flow__node-shell .vue-flow__handle {
  height:24px;
  width:8px;
  border-radius:4px
}
</style>