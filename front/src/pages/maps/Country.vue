<script setup lang="ts">
const startTime = useStorage('startTime', '2020-03-15')
const endTime = useStorage('endTime', '2020-03-20')

const dataLineRef = $ref<HTMLElement>()
const mapRef = $ref<HTMLElement>()
const threeCountRef = $ref<HTMLElement>()

const refreshData = () => {
  nextTick(() => {
    (dataLineRef as any).refreshData();
    (mapRef as any).refreshData();
    (threeCountRef as any).refreshData()
  })
}
</script>

<template>
  <Suspense>
    <ThreeCount
      ref="threeCountRef"
      path="/china/display"
      :start-time="startTime"
      :end-time="endTime"
      :map-code="100000"
    />
  </Suspense>
  <Suspense>
    <template #default>
      <div>
        <MapTemplate
          ref="mapRef"
          map-name="china"
          :map-code="100000"
          path="/country/period"
          :start-time="startTime"
          :end-time="endTime"
        />
        <DataLine
          ref="dataLineRef"
          path="/china/daily"
          :map-code="100000"
          :start-time="startTime"
          :end-time="endTime"
        />
      </div>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <div>
    <OriCalender v-model:date="startTime" />
    <span p="x-4 y-2" icon-btn i="carbon-arrow-right" />
    <OriCalender v-model:date="endTime" />
    <button block ma mt-2 p="x-4 y-2" border="~ rounded gray-200 dark:gray-700" text-sm @click="refreshData">
      刷新
    </button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: chinaLayout
</route>
