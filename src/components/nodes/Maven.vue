<script lang="ts" setup>
import { Handle, Position, useVueFlow, type ElementData } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

const { updateNode } = useVueFlow()
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
  const data = {
    ...props.data,
    cmd: cmd.value,
  }
  updateMavenNode({data})
}

const updateMavenNode = (data: ElementData) => {
  console.log(data)
  updateNode(props.id, data)
}
</script>

<template>
  <div class="maven w-auto">
    <details class="collapse collapse-arrow border-base-300 bg-base-200 border">
      <summary class="collapse-title text-xl font-medium">Maven</summary>
      <div class="collapse-content">
        <p>1. 请在下方定义输入的参数信息</p>
        <p>2. 请在下面文本域中输入需要执行的 maven 命令</p>
        <p>3. 执行完成之后会显示输出参数信息</p>
      </div>
    </details>
    <div class="form-control">
      <div class="label">
        <span class="label-text">请输入 maven 命令</span>
      </div>
      <textarea v-model="cmd" class="textarea textarea-primary min-w-80 nowheel nodrag" @change="onCmdChange" placeholder="such as: clean package"></textarea>
    </div>
    <!-- <div mt-2 flex>
      <button class="btn btn-outline btn-primary mr-2">测试</button>
      <button class="btn btn-outline btn-accent mr-2">执行</button>
    </div> -->
    <div class="form-control">
      <div class="label">
        <span class="label-text">执行状态</span>
      </div>
    </div>
    <NodeToolbar is-visible="true">
      <button class="btn btn-outline btn-primary mr-2">单步执行</button>
      <button class="btn btn-outline btn-accent mr-2">按钮 2 </button>
      <button class="btn btn-outline">凑个数</button>
    </NodeToolbar>
    <Handle id="input" type="target" class="handle-input" :position="Position.Left" />
    <Handle id="output" type="source" class="handle-output" :position="Position.Right" />
  </div>
</template>

<style lang="css">
.vue-flow__node-maven {
  border: 1px solid #777;
  padding: 10px;
  border-radius: 10px;
  background: #f5f5f5;
}
.vue-flow__node-maven .vue-flow__handle {
  height:24px;
  width:8px;
  border-radius:4px
}
</style>