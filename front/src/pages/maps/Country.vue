<script setup lang="ts">
</script>

<template>
  <Suspense>
    <template #default>
      <MapTemplate
        map-name="china"
        :map-code="100000"
        path="/country/period"
      />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
