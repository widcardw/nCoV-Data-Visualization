<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import timeline from '~/composables/MyEchartOptions/timeline'
import tooltip from '~/composables/MyEchartOptions/tooltip'
import visualMap from '~/composables/MyEchartOptions/visualMap'
import type { CodeType } from '~/data/maps'
import { mapCodes, provinces } from '~/data/maps'

const globalProps = defineProps<{
  mapName: string
  mapCode: CodeType
}>()

const chartEl = ref<HTMLElement>()
const echarts = inject('echarts') as any

const router = useRouter()

const geoOptions: EChartsOption[] = [
  {
    title: {
      text: '中国疫情数据一览',
      subtext: '数据来自丁香园',
    },
    series: [
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
    ],
  },
]

const option: EChartsOption = {
  backgroundColor: 'transparent',
  tooltip,
  timeline,
  visualMap,
  options: geoOptions,
}

const initCharts = async () => {
  const myChart = echarts.init(chartEl.value) as ECharts
  const { data } = await useFetch(`https://geo.datav.aliyun.com/areas_v3/bound/${globalProps.mapCode}_full.json`)
  echarts.registerMap(globalProps.mapName, data.value)
  myChart.on('click', (params) => {
    const { name, dataIndex } = params

    // eslint-disable-next-line no-console
    console.log(name)
    if (!provinces.includes(name))
      return

    const code = mapCodes[dataIndex]
    router.push(`/maps/province/${encodeURIComponent(code)}`)
  })
  myChart.setOption(option)
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
