<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  data: number
  styleClass: string
}>()
</script>

<template>
  <div>
    <div ml-2>
      <div text="xl" flex>
        <div :class="`${icon} ${styleClass}`" text-xl />
        {{ title }}
      </div>
      <div text="6xl left">
        {{ data }}
      </div>
    </div>
  </div>
</template>
