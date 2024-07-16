<script lang="ts" setup>
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  { 
    id: '1', 
    position: { x: 250, y: 5 },
    data: { label: 'Node 1' },
    
    // Add a class name to the node
    class: 'my-custom-node-class',
    
    // You can pass an object containing CSSProperties or CSS variables
    style: { backgroundColor: 'green', width: '200px', height: '100px' },
  },
])
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <VueFlow
      :nodes="nodes"
      class="my-diagram-class"  
      :style="{ background: 'red' }"
    />
  </div>
</template>

<style>
/* these are necessary styles for vue flow */
@import '@vue-flow/core/dist/style.css';
/* this contains the default theme, these are optional styles */
@import '@vue-flow/core/dist/theme-default.css';
/* Use a purple theme for our custom node */
.vue-flow__node-custom {
    background: purple;
    color: white;
    border: 1px solid purple;
    border-radius: 4px;
    box-shadow: 0 0 0 1px purple;
    padding: 8px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
