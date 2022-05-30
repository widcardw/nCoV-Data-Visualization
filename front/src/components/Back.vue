<script setup lang="ts">
defineProps<{
  content: string
}>()
const router = useRouter()
</script>

<template>
  <a href="#" font-mono @click="router.back()">{{ content }}</a>
</template>
