<script setup lang="ts">
import type { ECharts } from 'echarts'
import type { Ref } from 'vue'
import type { DailyData } from '~/composables/data_parse'
import { getTimeLine } from '~/composables/data_parse'
import tooltip from '~/composables/MyEchartOptions/tooltip'
import visualMap from '~/composables/MyEchartOptions/visualMap'
import useMyFetch from '~/composables/useMyFetch'
import type { CodeType } from '~/data/maps'
import { links, mapCodes, provinces } from '~/data/maps'
import * as nameMaps from '~/data/nameMaps.json'

const globalProps = defineProps<{
  mapName: string
  mapCode: CodeType
  path?: string
}>()
const startTime = useStorageAsync('startTime', '2020-03-15')
const endTime = useStorageAsync('endTime', '2020-03-20')

const chartEl = ref<HTMLElement>()
const echarts = inject('echarts') as any

const router = useRouter()
let myChart: ECharts

const getOption = (rawData: DailyData[]) => {
  return {
    title: {
      text: '中国疫情数据一览',
      subtext: '数据来自丁香园',
    },
    backgroundColor: 'transparent',
    tooltip,
    timeline: getTimeLine(rawData),
    visualMap,
    series: [
      {
        name: 'nCoV map',
        type: 'map',
        roam: true,
        map: globalProps.mapName,
        emphasis: {
          label: {
            show: true,
          },
        },
        // data: [],
        nameMap: nameMaps.data[globalProps.mapCode],
      },
    ],
    options: rawData?.map((it) => {
      return {
        title: { text: `${it.time} 数据` },
        series: [
          {
            data: it.data,
          },
        ],
      }
    }),
  }
}

const refreshData = async () => {
  let raw
  if (globalProps.path) {
    const url = `${globalProps.path}?start=${startTime.value}&end=${endTime.value}&code=${globalProps.mapCode}`
    // eslint-disable-next-line no-console
    console.log(url)
    raw = await useMyFetch(url)
      .then(r => r.data) as Ref<string>
  }

  const rawJson = raw ? JSON.parse(raw.value) : null

  const options = getOption(rawJson.data.length > 0 ? rawJson.data : null)
  // eslint-disable-next-line no-console
  console.log(options)
  myChart.setOption(options)
}

const initCharts = async () => {
  myChart = echarts.init(chartEl.value) as ECharts
  const { data } = await useFetch(links[globalProps.mapCode])
  echarts.registerMap(globalProps.mapName, data.value)
  myChart.on('click', (params) => {
    const { name, dataIndex } = params
    // eslint-disable-next-line no-console
    console.log(name, dataIndex)

    if (!provinces.includes(name))
      return

    const code = mapCodes[name]
    router.push(`/maps/province/${encodeURIComponent(code)}`)
  })
  await refreshData()
  // let raw
  // if (globalProps.path) {
  //   const url = `${globalProps.path}?start=${startTime.value}&end=${endTime.value}&code=${globalProps.mapCode}`
  //   // eslint-disable-next-line no-console
  //   console.log(url)
  //   raw = await useMyFetch(url)
  //     .then(r => r.data) as Ref<string>
  // }

  // const rawJson = raw ? JSON.parse(raw.value) : null

  // const options = getOption(rawJson.data.length > 0 ? rawJson.data : null)
  // // eslint-disable-next-line no-console
  // console.log(options)
  // myChart.setOption(options)
}

nextTick(initCharts)
</script>

<template>
  <div id="chart" ref="chartEl" />
  <div>
    <OriCalender v-model:date="startTime" />
    -
    <OriCalender v-model:date="endTime" />
    <div py-1 />
    <button p="x-4 y-2" border="~ rounded gray-200 dark:gray-700" text-sm @click="refreshData()">
      刷新
    </button>
  </div>
</template>

<style scoped>
#chart {
  width: 100%;
  height: 600px;
}
</style>
