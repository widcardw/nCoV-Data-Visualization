<script setup lang="ts">
import type { CodeType } from '~/data/maps'
defineProps<{
  code: CodeType
}>()

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

// eslint-disable-next-line no-console
console.log('province', startTime.value, endTime.value)
</script>

<template>
  <Suspense>
    <ThreeCount
      ref="threeCountRef"
      path="/province/display"
      :start-time="startTime"
      :end-time="endTime"
      :map-code="code"
    />
  </Suspense>
  <Suspense>
    <MapTemplate
      ref="mapRef"
      :map-name="code.toString()"
      :map-code="code"
      path="/province/period"
      :start-time="startTime"
      :end-time="endTime"
    />
  </Suspense>
  <Suspense>
    <div flex>
      <DataLine
        ref="dataLineRef"
        path="/province/daily"
        :map-code="code"
        :start-time="startTime"
        :end-time="endTime"
      />
      <NewAdds
        ref="newAddsRef"
        path="/province/newAdd"
        :map-code="code"
        :start-time="startTime"
        :end-time="endTime"
      />
    </div>
  </Suspense>
  <div>
    <OriCalender v-model:date="startTime" />
    <span p="x-4 y-2" icon-btn i="carbon-arrow-right" @click="refreshData" />
    <OriCalender v-model:date="endTime" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: provinceLayout
</route>
