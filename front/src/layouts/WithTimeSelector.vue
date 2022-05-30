<script setup lang="ts">
const startTime = useStorageAsync('startTime', '2022-03-15')
const endTime = useStorageAsync('endTime', '2022-03-20')
</script>

<template>
  <router-view />
  <div>
    <OriCalender v-model:date="startTime" />
    -
    <OriCalender v-model:date="endTime" />
  </div>
</template>
