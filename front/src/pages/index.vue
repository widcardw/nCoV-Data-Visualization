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
    <div flex gap-20 justify-center>
      <DataDisplay icon="i-carbon-coronavirus" title="感染" :data="9" style-class="text-red-700" />
      <DataDisplay icon="i-carbon-warning" title="疑似" :data="9" style-class="text-orange" />
      <DataDisplay icon="i-carbon-face-wink" title="治愈" :data="9" style-class="text-green-600" />
      <DataDisplay icon="i-carbon-face-dizzy" title="死亡" :data="9" style-class="text-zinc" />
    </div>

    <button btn text-sm @click="router.push('/maps/Country')">
      展示
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
