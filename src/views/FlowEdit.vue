<script lang="ts" setup>
import { Panel, VueFlow, type ElementData, ConnectionMode, useVueFlow, type NodeComponent, type EdgeComponent, type GraphNode, type Edge, type Connection, type NodeChange, type EdgeChange, VueFlowError } from '@vue-flow/core'

import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import Animation from '@/components/edges/Animation.vue'
import { useLayout } from '@/tools/layout'
import { useNodeProcess } from '@/tools/node-process'
import { useDialog } from '@/tools/dialog'
import { initialEdges, initialNodes } from '@/tools/test-elements.ts'
import { nextTick, onMounted, ref, toValue } from 'vue'
import type { Dialog } from '@/tools/types'
import { useNodeEdge } from '@/tools/node-edge'
import { getFlowById, saveFlow } from '@/api/flow'
import { useToast } from '@/tools/toast'
import { useRoute } from 'vue-router'

const route = useRoute()
const toast = useToast()
const nodeEdge = useNodeEdge()
const dialog = useDialog()
const nodes = ref<GraphNode[]>([])
const edges = ref<Edge[]>([])

const cancelOnError = ref(true)
const { findNode, addNodes, onConnect, onNodesChange, applyNodeChanges, addEdges, getNodes, getEdges, fitView, updateNodeData } = useVueFlow()
const { graph, layout, previousDirection } = useLayout()
const { run, stop, reset, isRunning, sorting } = useNodeProcess(graph, cancelOnError.value)

const flowId = route.params.id as string
const tempFlow = ref<any>({})

const loadFlow = async () => {
  if (flowId) {
    const res = await getFlowById(flowId)
    if (res.code === 'ok') {
      tempFlow.value = res.data
      const jsonData = JSON.parse(res.data.jsonData)
      if (jsonData) {
        nodes.value = jsonData.nodes || []
        edges.value = jsonData.edges || []
      }
    } else {
      toast.showError(res.msg)
    }
  }
}


onMounted(() => {
  loadFlow()
  // nodes.value = toValue(getNodes)
  // edges.value = toValue(getEdges)
})

const layoutGraph = async (direction: string) => {
  await stop()
  reset(nodes.value)
  nodes.value = layout(nodes.value, edges.value, direction)
  await nextTick(() => fitView())
}

const nodeTypes = nodeEdge.nodeTypes
const nodeTypeNameMap: any = nodeEdge.nodeTypeNameMap
const edgeTypes = nodeEdge.edgeTypes

onConnect((connection: Connection) => {
  const newConnection = {
    ...connection,
    type: 'animation',
    animated: true,
  } as Edge
  addEdges(newConnection)
  edges.value.push(newConnection)

  const sourceNode = findNode(connection.source) as GraphNode
  updateNodeData(sourceNode.id, {...sourceNode.data, timestamp: new Date().getTime()})
  const targetNode = findNode(connection.target) as GraphNode
  updateNodeData(targetNode.id, {...targetNode.data, timestamp: new Date().getTime()})

  layoutGraph(previousDirection.value)
})

onNodesChange(async (changes: NodeChange[]) => {
  nodes.value = applyNodeChanges(changes)
})

// onEdgesChange(async (changes: EdgeChange[]) => {
//   for (const change of changes) {
//     edges.value = applyEdgeChanges([change])
//   }
// })

const addNode = async (data: ElementData) => {
  if (data.type === 'start') {
    const nodes = getNodes
    if (nodes.value.some(node => node.type === 'start')) {
      const dl: Dialog = {
        title: '提示',
        message: '该节点同时只能存在一个',
        closeBtn: '我知道了',
      }
      dialog.showDialog(dl)
      return
    }
  }
  const node: GraphNode = {
    ...data,
    id: new Date().getTime().toString(),
    position: { x: 0, y: 50 },
  }
  addNodes([node])

  layoutGraph(previousDirection.value)
}

const drawerOpen = ref(false)
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

const execFlow = () => {
  run(nodes.value)
}

const exportFlow = async () => {
  const fileName = prompt('请输入文件名', 'flow.json')
  if (fileName) {
    const nodes = getNodes
    const edges = getEdges
    const sort = await sorting()
    const flow = {
      nodes: nodes.value,
      edges: edges.value,
      sort: sort,
    }
    const flowJson = JSON.stringify(flow, null, 2)
    const blob = new Blob([flowJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

const submitFlow = async () => {
  const nodes = getNodes
  const edges = getEdges
  const sort = await sorting()
  const flow = {
    nodes: nodes.value,
    edges: edges.value,
    sort: sort,
  }
  const flowJson = JSON.stringify(flow, null, 2)
  tempFlow.value = {
    ...tempFlow.value,
    id: flowId,
    jsonData: flowJson,
  }
  const res = await saveFlow(tempFlow.value)
  if (res.code === 'ok') {
    toast.showSuccess(res.msg)
  } else {
    toast.showError(res.msg)
  }
}

const connectionMode = ConnectionMode.Strict

</script>

<template>
  <main data-theme="dark" class="theme-dark bg-line flex w-100% h-100%" z-100 flex>
    <transition name="slide-fade">
      <div v-if="drawerOpen" :style="[drawerOpen ? 'display: block': 'display: none']">
        <h2 class="text-xl font-bold text-center mt-2">节点列表</h2>
        <ul class="menu bg-base-200 text-base-content w-40 p-4 gap-10px">
          <li v-for="(nodeKey, index) in Object.keys(nodeTypes)" :key="index">
            <div class="btn btn-primary" @click="addNode({type: nodeKey})">{{ nodeTypeNameMap[nodeKey] }}</div>
          </li>
        </ul>
      </div>
    </transition>
    <VueFlow flex-1 :nodes="nodes" :edges="edges" :node-types="nodeTypes" :edge-types="edgeTypes" :connection-mode="connectionMode"  @nodes-initialized="layoutGraph('LR')">
      <Background />
      <MiniMap />
      <Controls />
      <Panel class="flex gap-2" position="top-right">
        <label class="btn btn-outline btn-accent" @click="execFlow">测试执行</label>
        <label class="btn btn-outline btn-primary" @click="exportFlow">导出流程</label>
        <label class="btn btn-outline btn-primary" @click="submitFlow">保存流程</label>
        <label for="my-drawer-2" class="btn btn-outline btn-secondary drawer-button" @click="toggleDrawer">{{ drawerOpen ? '关闭' : '打开' }}侧边栏</label>
      </Panel>
      <template #edge-animation="edgeProps">
        <Animation
          :id="edgeProps.id"
          :source="edgeProps.source"
          :target="edgeProps.target"
          :source-x="edgeProps.sourceX"
          :source-y="edgeProps.sourceY"
          :targetX="edgeProps.targetX"
          :targetY="edgeProps.targetY"
          :source-position="edgeProps.sourcePosition"
          :target-position="edgeProps.targetPosition"
        />
      </template>
    </VueFlow>
  </main>
</template>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';
/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
/* import default minimap styles */
@import '@vue-flow/minimap/dist/style.css';
/* import default controls styles */
@import '@vue-flow/controls/dist/style.css';
</style>