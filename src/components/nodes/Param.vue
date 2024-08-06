<script lang="ts" setup>
import { Handle, Position, useHandleConnections, useVueFlow, type ElementData } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { ref, watch } from 'vue'
import NodeStatus from '@/components/NodeStatus.vue'

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
  sourcePosition: {
    type: String,
    default: Position.Right,
  },
  targetPosition: {
    type: String,
    default: Position.Left,
  },
})

const param = ref<any>({})
const addParam = () => {
  const count = Object.keys(param.value).length
  const key = `key${count + 1}`
  const val = `value${count + 1}`
  param.value[key] = val
}

const delParam = (key: any) => {
  delete param.value[key]
}


const updateParamNode = (data: ElementData) => {
  console.log(data)
  updateNode(props.id, data)
}

watch(
  () => param,
  (newVal: any) => {
    console.log(newVal)
    const data = {
      ...props.data,
      param: newVal,
    }
    updateParamNode({data})
  },
  {deep: true}
)
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
      <div class="label gap-4">
        <span class="label-text">输入参数信息</span>
        <button class="btn btn-outline label-text-alt nodrag" @click="addParam">新增参数</button>
      </div>
      <div class="join join-horizontal mb-2" v-for="(val, key) in param" :key="key">
        <input :value="key" class="input input-bordered join-item w-32 nowheel nodrag" placeholder="key" />
        <button class="btn btn-outline join-item"> = </button>
        <input :value="val" class="input input-bordered join-item w-32 nowheel nodrag" placeholder="value" />
        <button class="btn btn-outline join-item" @click="delParam(key)">删除</button>
      </div>
    </div>
    <NodeStatus :id="props.id" :data="props.data"/>
    <Handle id="input" type="target" class="handle-input" :position="targetPosition" />
    <Handle id="output" type="source" class="handle-output" :position="sourcePosition" />
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