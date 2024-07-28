<script setup>
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'

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
  <div class="maven w-90">
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
      <textarea class="textarea textarea-primary w-full" placeholder="such as: clean package"></textarea>
    </div>
    <div mt-2 flex>
      <button class="btn btn-outline btn-primary mr-2">测试</button>
      <button class="btn btn-outline btn-accent mr-2">执行</button>
    </div>
    <div class="form-control">
      <div class="label">
        <span class="label-text">输出参数信息</span>
      </div>
    </div>
    <NodeToolbar is-visible="true">
      <button class="btn">delete</button>
      <button class="btn">copy</button>
      <button class="btn">expand</button>
    </NodeToolbar>
    <Handle id="input" type="source" class="handle-input" :position="Position.Left" />
    <Handle id="output" type="target" class="handle-output" :position="Position.Right" />
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