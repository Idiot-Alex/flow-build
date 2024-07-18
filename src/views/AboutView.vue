<script lang="ts" setup>
import { Position, VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import ColorSelect from '@/components/nodes/ColorSelect.vue'
import Output from '@/components/nodes/Output.vue'

const nodes = ref([
  { 
    id: '1', 
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
    // Add a class name to the node
    class: 'vue-flow__node-custom',
    // You can pass an object containing CSSProperties or CSS variables
    style: { },
  },
  {
    id: '2',
    type: 'color-selector',
    data: { color: '#1C1C1C' },
    position: { x: 0, y: 50 },
  },
  {
    id: '3',
    type: 'output',
    position: { x: 350, y: 114 },
    targetPosition: Position.Left,
  },
])
const edges = ref([
  {
    id: 'e1a-2',
    source: '2',
    sourceHandle: 'a',
    target: '3',
    animated: true,
    style: {
      stroke: '#1C1C1C',
    },
  },
])
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>

    <VueFlow
      :nodes="nodes"
      :edges="edges"
      class="my-diagram-class"
    >
      <Background />
      <MiniMap />
      <Controls />
      <template #node-color-selector="props">
        <ColorSelect :id="props.id" :data="props.data" />
      </template>

      <template #node-output>
        <Output />
      </template>
    </VueFlow>
  </div>
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

/* Use a purple theme for our custom node */
.vue-flow__node-custom {
  background: purple;
  color: white;
  border: 1px solid purple;
  border-radius: 4px;
  box-shadow: 0 0 0 1px purple;
  padding: 8px;
}
.vue-flow__edges {
    filter:invert(100%)
}
</style>
