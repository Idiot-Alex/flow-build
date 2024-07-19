<script lang="ts" setup>
import { Position, VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'

</script>

<template>
  <main data-theme="dark" class="theme-dark bg-line" w-100vw h-100vh>
    <div class="drawer" z-1>
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
          <li :draggable="true"><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
    <VueFlow>
      <Background />
      <MiniMap />
      <Controls />
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