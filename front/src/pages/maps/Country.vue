<template>
  <Suspense>
    <template #default>
      <MapTemplate
        map-name="china"
        :map-code="100000"
        path="/country/period?start=2022-03-15&end=2022-03-15"
      />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

