<script lang="ts" setup>
import { VueFlow, Handle, Position } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { NodeResizer } from '@vue-flow/node-resizer'
import { NodeToolbar } from '@vue-flow/node-toolbar'

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
])
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <NodeToolbar>
      <button>delete</button>
      <button>copy</button>
      <button>expand</button>
    </NodeToolbar>

    
    <!-- <Handle type="target" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" /> -->
    <VueFlow
      :nodes="nodes"
      class="my-diagram-class"
    >
      <Background />
      <MiniMap />
      <Controls />
      <NodeResizer min-width="100" min-height="30" />
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
/* make sure to include the necessary styles! */
@import '@vue-flow/node-resizer/dist/style.css';

/* Use a purple theme for our custom node */
.vue-flow__node-custom {
  background: purple;
  color: white;
  border: 1px solid purple;
  border-radius: 4px;
  box-shadow: 0 0 0 1px purple;
  padding: 8px;
}
</style>
