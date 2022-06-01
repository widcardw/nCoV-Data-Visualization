<script setup lang="ts">
import type { CodeType } from '~/data/maps'
defineProps<{
  code: CodeType
}>()

const startTime = useStorage('startTime', '2020-03-15')
const endTime = useStorage('endTime', '2020-03-20')

const dataLineRef = $ref<HTMLElement>()
const mapRef = $ref<HTMLElement>()

const refreshData = () => {
  nextTick(() => {
    (dataLineRef as any).refreshData();
    (mapRef as any).refreshData()
  })
}

// eslint-disable-next-line no-console
console.log('province', startTime.value, endTime.value)
</script>

<template>
  <Suspense>
    <template #default>
      <div>
        <MapTemplate
          ref="mapRef"
          :map-name="code.toString()"
          :map-code="code"
          path="/province/period"
          :start-time="startTime"
          :end-time="endTime"
        />
        <DataLine
          ref="dataLineRef"
          path="/province/daily"
          :map-code="code"
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
  layout: provinceLayout
</route>
