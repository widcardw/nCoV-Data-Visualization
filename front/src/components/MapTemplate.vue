<script setup lang="ts">
import type { ECharts, SeriesOption } from 'echarts'
import type { Ref } from 'vue'
import { parseSeries } from '~/composables/data_parse'
import timeline from '~/composables/MyEchartOptions/timeline'
import tooltip from '~/composables/MyEchartOptions/tooltip'
import visualMap from '~/composables/MyEchartOptions/visualMap'
import useMyFetch from '~/composables/useMyFetch'
import type { CodeType } from '~/data/maps'
import { links, mapCodes, provinces } from '~/data/maps'

const globalProps = defineProps<{
  mapName: string
  mapCode: CodeType
  path?: string
}>()

const chartEl = ref<HTMLElement>()
const echarts = inject('echarts') as any

const router = useRouter()

const getOption = (rawData: any) => {
  return {
    title: {
      text: '中国疫情数据一览',
      subtext: '数据来自丁香园',
    },
    backgroundColor: 'transparent',
    tooltip,
    timeline,
    visualMap,
    series: rawData
      ? parseSeries(rawData, globalProps.mapName) as SeriesOption
      : [
          {
            name: 'China 2020-01-01',
            type: 'map',
            roam: true,
            map: globalProps.mapName,
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [],
          },
        ] as SeriesOption,
  }
}

const initCharts = async () => {
  const myChart = echarts.init(chartEl.value) as ECharts
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
  let raw
  if (globalProps.path)
    raw = await useMyFetch(globalProps.path).then(r => r.data) as Ref<string>

  const rawJson = raw ? JSON.parse(raw.value) : null

  // eslint-disable-next-line no-console
  console.log(rawJson.data)

  const options = getOption(rawJson.data.length > 0 ? rawJson.data : null)
  myChart.setOption(options)
}

nextTick(initCharts)
</script>

<template>
  <div id="chart" ref="chartEl" />
</template>

<style scoped>
#chart {
  width: 600px;
  height: 600px;
}
</style>
