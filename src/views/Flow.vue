<script lang="ts" setup>
import { Panel, Position, VueFlow, type Node, type ElementData, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import ColorSelect from '@/components/nodes/ColorSelect.vue'
import Console from '@/components/nodes/Console.vue'
import Maven from '@/components/nodes/Maven.vue'
import Shell from '@/components/nodes/Shell.vue'
import Param from '@/components/nodes/Param.vue'

const nodeTypes = {
  'color-select': markRaw(ColorSelect),
  console: markRaw(Console),
  maven: markRaw(Maven),
  shell: markRaw(Shell),
  param: markRaw(Param),
}

const { addNodes, onConnect, addEdges, getNodes, getEdges } = useVueFlow()

onConnect(addEdges)

const addNode = (data: ElementData) => {
  const node: Node = {
    ...data,
    id: new Date().getTime().toString(),
    position: { x: 0, y: 50 }
  }
  addNodes([node])
}

const drawerOpen = ref(false)
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}
</script>

<template>
  <main data-theme="dark" class="theme-dark bg-line flex" z-1 flex w-100vw h-100vh @drop="onDrop">
    <div :class="{'drawer-open': drawerOpen}" class="w-auto z-2 no-drag">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        <!-- Page content here -->
        <!-- <label for="my-drawer-2" pos-absolute top-10px class="btn btn-primary drawer-button">Open drawer</label> -->
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <!-- Sidebar content here -->
          <li>
            <div class="btn" @click="addNode({type: 'color-select'})">颜色选择</div>
          </li>
          <li>
            <div class="btn" @click="addNode({type: 'console'})">console</div>
          </li>
          <li>
            <div class="btn" @click="addNode({type: 'shell'})">shell</div>
          </li>
          <li>
            <div class="btn" @click="addNode({type: 'maven'})">maven</div>
          </li>
          <li>
            <div class="btn" @click="addNode({type: 'param'})">param</div>
          </li>
        </ul>
      </div>
    </div>
    <VueFlow flex-1 :nodeTypes="nodeTypes">
      <Background />
      <MiniMap />
      <Controls />
      <Panel class="flex gap-10" position="top-right">
        <label class="btn btn-outline btn-primary">导出流程</label>
        <label for="my-drawer-2" class="btn btn-outline btn-secondary drawer-button" @click="toggleDrawer">{{ drawerOpen ? '关闭' : '打开' }}侧边栏</label>
      </Panel>
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