<script setup lang="ts">
import type { CodeType } from '~/data/maps'

defineProps<{
  code: CodeType
}>()
</script>

<template>
  <Suspense>
    <template #default>
      <MapTemplate
        :map-name="code.toString()"
        :map-code="code"
        :path="`/province/period?start=2022-03-15&end=2022-03-15&code=${code}`"
      />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
