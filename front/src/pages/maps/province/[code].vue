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
        path="/province/period"
      />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <Back content="../" />
</template>
