<script setup lang="ts">
import Header from '../components/Header.vue'
import BreadCrumbs from '../components/BreadCrumbs.vue'
</script>

<template>
  <main>
    <Header />
    <BreadCrumbs />
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          <!-- row 2 -->
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="join">
      <input
        class="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        checked="checked" />
      <input class="join-item btn btn-square" type="radio" name="options" aria-label="2" />
      <input class="join-item btn btn-square" type="radio" name="options" aria-label="3" />
      <input class="join-item btn btn-square" type="radio" name="options" aria-label="4" />
    </div>
  </main>
</template>
