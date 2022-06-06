<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">
        Vitesse Lite
      </a>
    </p>
    <p>
      <em text-sm op75>Opinionated Vite Starter Template</em>
    </p>
    <div py-4 />

    <button btn text-sm @click="router.push('/maps/Country')">
      展示
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
