<script setup lang="ts">
const startTime = useStorage('startTime', '2020-03-15')
const endTime = useStorage('endTime', '2020-03-20')

const dataLineRef = $ref<HTMLElement>()
const mapRef = $ref<HTMLElement>()
const threeCountRef = $ref<HTMLElement>()
const newAddsRef = $ref<HTMLElement>()

const refreshData = () => {
  nextTick(() => {
    (dataLineRef as any).refreshData();
    (mapRef as any).refreshData();
    (threeCountRef as any).refreshData();
    (newAddsRef as any).refreshData()
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
    <MapTemplate
      ref="mapRef"
      map-name="china"
      :map-code="100000"
      path="/country/period"
      :start-time="startTime"
      :end-time="endTime"
    />
  </Suspense>
  <Suspense>
    <div flex>
      <DataLine
        ref="dataLineRef"
        path="/china/daily"
        :map-code="100000"
        :start-time="startTime"
        :end-time="endTime"
      />
      <NewAdds
        ref="newAddsRef"
        path="/china/newAdd"
        :map-code="100000"
        :start-time="startTime"
        :end-time="endTime"
      />
    </div>
  </Suspense>
  <div mb-4>
    <OriCalender v-model:date="startTime" />
    <span p="x-4 y-2" icon-btn i="carbon-arrow-right" @click="refreshData" />
    <OriCalender v-model:date="endTime" />
  </div>
  <Suspense>
    <News />
  </Suspense>
</template>

<route lang="yaml">
meta:
  layout: chinaLayout
</route>
