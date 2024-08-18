<script lang="ts" setup>
import { Panel, VueFlow, type ElementData, ConnectionMode, useVueFlow, type NodeComponent, type EdgeComponent, type GraphNode, type Edge, type Connection, type NodeChange, type EdgeChange } from '@vue-flow/core'

import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import Console from '@/components/nodes/Console.vue'
import Maven from '@/components/nodes/Maven.vue'
import Shell from '@/components/nodes/Shell.vue'
import Param from '@/components/nodes/Param.vue'
import Start from '@/components/nodes/Start.vue'
import Animation from '@/components/edges/Animation.vue'
import { useLayout } from '@/tools/layout'
import { useNodeProcess } from '@/tools/node-process'

import { initialEdges, initialNodes } from '@/tools/test-elements.ts'
import { markRaw, nextTick, onMounted, ref, toValue } from 'vue'

const nodes = ref<GraphNode[]>([])
const edges = ref<Edge[]>([])

const cancelOnError = ref(true)
const { findNode, addNodes, onConnect, onNodesChange, applyNodeChanges, addEdges, getNodes, getEdges, fitView, updateNodeData } = useVueFlow()
const { graph, layout, previousDirection } = useLayout()
const { run, stop, reset, isRunning, bfs } = useNodeProcess(graph, cancelOnError.value)

onMounted(() => {
  nodes.value = toValue(getNodes)
  edges.value = toValue(getEdges)
})

async function layoutGraph(direction: string) {
  await stop()

  reset(nodes.value)

  nodes.value = layout(nodes.value, edges.value, direction)

  nextTick(() => {
    fitView()
  })
}

const nodeTypes = {
  'console': markRaw(Console) as NodeComponent,
  'maven': markRaw(Maven) as NodeComponent,
  'shell': markRaw(Shell) as NodeComponent,
  'param': markRaw(Param) as NodeComponent,
  'start': markRaw(Start) as NodeComponent,
}

const edgeTypes = {
  'animation': markRaw(Animation) as EdgeComponent,
}


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
      dialog.value = {
        title: '提示',
        message: '该节点同时只能存在一个',
        closeBtn: '我知道了',
      }
      // @ts-ignore
      document.getElementById('dialog').showModal()
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

const exportFlow = () => {
  const nodes = getNodes
  const edges = getEdges
  console.log(JSON.stringify(nodes.value))
  console.log(JSON.stringify(edges.value))
  bfs()
}

const connectionMode = ConnectionMode.Strict

const dialog = ref({
  title: '提示',
  message: '提示信息',
  closeBtn: '关闭',
})
</script>

<template>
  <main data-theme="dark" class="theme-dark bg-line flex" z-1 flex w-100vw h-100vh>
    <div :class="{'drawer-open': drawerOpen}" class="w-auto z-2 nodrag">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <!-- <label for="my-drawer-2" pos-absolute top-10px class="btn btn-primary drawer-button">Open drawer</label> -->
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <h2 class="text-xl font-bold text-center mt-2">节点列表</h2>
        <ul class="menu bg-base-200 text-base-content min-h-full w-40 p-4 gap-10px">
          <!-- Sidebar content here -->
          <li>
            <div class="btn btn-primary" @click="addNode({type: 'start'})">开始节点</div>
          </li>
          <li>
            <div class="btn btn-primary" @click="addNode({type: 'param'})">参数节点</div>
          </li>
          <li>
            <div class="btn btn-primary" @click="addNode({type: 'console'})">输出节点</div>
          </li>
          <li>
            <div class="btn btn-primary" @click="addNode({type: 'shell'})">Shell 节点</div>
          </li>
          <li>
            <div class="btn btn-primary" @click="addNode({type: 'maven'})">Maven 节点</div>
          </li>
        </ul>
      </div>
    </div>
    <VueFlow flex-1 :nodes="nodes" :edges="edges" :node-types="nodeTypes" :edge-types="edgeTypes" :connection-mode="connectionMode"  @nodes-initialized="layoutGraph('LR')">
      <Background />
      <MiniMap />
      <Controls />
      <Panel class="flex gap-2" position="top-right">
        <label class="btn btn-outline btn-accent" @click="execFlow">测试执行</label>
        <label class="btn btn-outline btn-primary" @click="exportFlow">导出流程</label>
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
    <!-- dialog -->
    <dialog id="dialog" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ dialog.title }}</h3>
        <p class="py-4">{{ dialog.message }}</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">{{ dialog.closeBtn }}</button>
          </form>
        </div>
      </div>
    </dialog>
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