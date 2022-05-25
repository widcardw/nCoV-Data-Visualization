<template>
  <Suspense>
    <template #default>
      <MapTemplate map-name="china" :map-code="100000" />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

