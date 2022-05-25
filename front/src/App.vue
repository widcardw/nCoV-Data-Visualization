<script setup lang="ts">
import * as echarts from 'echarts'
provide('echarts', echarts)
</script>

<template>
  <main font-sans px-4 py-10 text="center gray-700 dark:gray-200">
    <router-view />
    <Footer />
  </main>
</template>

<style>
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
