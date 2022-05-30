<script setup lang="ts">
const props = defineProps<{
  date: string
}>()

const emits = defineEmits(['update:date'])
const input = useVModel(props, 'date', emits, { passive: true })
</script>

<template>
  <input
    v-model="input" type="date"
    p="x-4 y-2"
    text-sm
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  >
</template>
