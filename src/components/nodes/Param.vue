<script lang="ts" setup>
import { Handle, Position, useHandleConnections, useVueFlow, type ElementData } from '@vue-flow/core'
import { NodeToolbar } from '@vue-flow/node-toolbar'
import { ref, toRef, watch } from 'vue';

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

const loading = ref(false)
const statusMsg = ref('')
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

watch(param, (newVal: any) => {
  console.log(newVal)
  const data = {
    ...props.data,
    param: newVal,
  }
  updateParamNode({data})
}, {deep: true})


const sourceConnections = useHandleConnections({
  type: 'target',
})

const targetConnections = useHandleConnections({
  type: 'source',
})

const isSender = toRef(() => sourceConnections.value.length <= 0)

const isReceiver = toRef(() => targetConnections.value.length <= 0)

const bgColor = toRef(() => {
  if (isSender.value) {
    return '#2563eb'
  }

  if (props.data.hasError) {
    return '#f87171'
  }

  if (props.data.isFinished) {
    return '#42B983'
  }

  if (props.data.isCancelled) {
    return '#fbbf24'
  }

  return '#4b5563'
})

const processLabel = toRef(() => {
  if (props.data.hasError) {
    return '❌'
  }
  if (props.data.isSkipped) {
    return '🚧'
  }
  if (props.data.isCancelled) {
    return '🚫'
  }
  if (isSender.value) {
    return '📦'
  }
  if (props.data.isFinished) {
    return '😎'
  }

  return '🏠'
})
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
    <div class="form-control">
      <div class="divider">
        <span v-if="loading" class="loading loading-spinner loading-lg"></span>
        <span v-else class="text-base-500">{{ statusMsg }}{{ processLabel }}</span>
      </div>
    </div>
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