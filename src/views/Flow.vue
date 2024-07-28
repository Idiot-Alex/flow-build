<script lang="ts" setup>
import { Position, VueFlow, type Node, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { useDragAndDropStore } from '@/stores/dnd'
import ColorSelect from '@/components/nodes/ColorSelect.vue'
import Output from '@/components/nodes/Output.vue'
import Maven from '@/components/nodes/Maven.vue'
import Param from '@/components/nodes/Param.vue'

const { onDragOver, onDrop, onDragLeave, onDragStart, isDragOver } = useDragAndDropStore()
const { addNodes, onConnect, addEdges } = useVueFlow()

onConnect(addEdges)

const addNode = (config: object) => {
  const node: Node = {
    ...config,
    id: new Date().getTime().toString(),
    position: { x: 0, y: 50 }
  }
  console.log(node)
  addNodes([node])
}
</script>

<template>
  <main data-theme="dark" class="theme-dark bg-line" z-1 flex w-100vw h-100vh @drop="onDrop">
    <div w-300px>
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <label for="my-drawer-2" pos-absolute top-10px class="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <!-- Sidebar content here -->
          <li>
            <div class="btn" @click="addNode({type: 'color-select'})">颜色选择</div>
          </li>
          <li>
            <div class="btn" @click="addNode({type: 'output',data: { color: '#1C1C1C' }})">颜色输出</div>
          </li>
          <li>
            <div class="btn" @click="addNode({type: 'maven',data: { color: '#1C1C1C' }})">maven</div>
          </li>
          <li>
            <div class="btn" @click="addNode({type: 'param',data: { color: '#1C1C1C' }})">param</div>
          </li>
        </ul>
      </div>
    </div>
    <VueFlow flex-1 @dragover="onDragOver" @dragleave="onDragLeave">
      <Background />
      <MiniMap />
      <Controls />
      <template #node-color-select="props">
        <ColorSelect :id="props.id" :data="props.data" />
      </template>
      <template #node-output>
        <Output />
      </template>
      <template #node-maven="props">
        <Maven :id="props.id" :data="props.data"/>
      </template>
      <template #node-param="props">
        <Param :id="props.id" :data="props.data"/>
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