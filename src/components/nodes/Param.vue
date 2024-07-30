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

const param = ref({
  key1: 'value1',
})
const addParam = () => {
  const count = Object.keys(param.value).length
  const key = `key${count + 1}`
  const val = `value${count + 1}`
  param.value[key] = val
}

const delParam = (key) => {
  delete param.value[key]
}

</script>

<template>
  <div class="param w-auto">
    <details class="collapse collapse-arrow border-base-300 bg-base-200 border">
      <summary class="collapse-title text-xl font-medium">Param</summary>
      <div class="collapse-content">
        <p>1. 请在下方定义输入的参数信息</p>
      </div>
    </details>
    <div class="form-control">
      <div class="label">
        <span class="label-text">输入参数信息</span>
        <button class="btn btn-outline label-text-alt nodrag" @click="addParam">新增参数</button>
      </div>
      <div class="join join-horizontal mb-2" v-for="(val, key) in param" :key="key">
        <input :value="key" class="input input-bordered join-item w-32" placeholder="key" />
        <button class="btn btn-outline join-item"> = </button>
        <input :value="val" class="input input-bordered join-item w-32" placeholder="value" />
        <button class="btn btn-outline join-item" @click="delParam(key)">删除</button>
      </div>
    </div>
    <Handle id="input" type="target" class="handle-input" :position="Position.Left" />
    <Handle id="output" type="source" class="handle-output" :position="Position.Right" />
  </div>
</template>

<style lang="css">
.vue-flow__node-param {
  border: 1px solid #777;
  padding: 10px;
  border-radius: 10px;
  background: #f5f5f5;
}
.vue-flow__node-param .vue-flow__handle {
  height:24px;
  width:8px;
  border-radius:4px
}
</style>