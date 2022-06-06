<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import useMyFetch from '~/composables/useMyFetch'
import type { CodeType } from '~/data/maps'

const globalProps = defineProps<{
  path: string
  startTime: string
  endTime: string
  mapCode: CodeType
}>()

const echarts = inject('echarts') as any
let myChart: ECharts
const pieChart = $ref<HTMLElement>()

const getData = async () => {
  // 读取时间范围内最后一天的数据
  const url = `${globalProps.path}?start=${globalProps.startTime}&end=${globalProps.endTime}&code=${globalProps.mapCode}`
  const { data } = await useMyFetch(url).json()
  // eslint-disable-next-line no-console
  console.log('three', data.value)
  // const { updateTime, province_confirmedCount, province_suspectedCount, province_curedCount, province_deadCount } = data.value.data
  return data.value.data
}

let raw = reactive({
  updateTime: '',
  province_confirmedCount: 0,
  province_suspectedCount: 0,
  province_curedCount: 0,
  province_deadCount: 0,
})

let compShow = $ref(true)

const { updateTime, province_confirmedCount, province_curedCount, province_deadCount, province_suspectedCount } = toRefs(raw)

const getPieOptions = () => {
  return {
    title: {
      text: '人数分布',
      left: 'center',
      top: 'top',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['现存确诊', '疑似人数', '治愈人数', '死亡人数'],
    },
    color: ['crimson', 'orange', 'yellowgreen', 'gray'],
    series: [
      {
        name: '人数分布',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: province_confirmedCount.value - province_curedCount.value, name: '现存确诊' },
          { value: province_suspectedCount.value, name: '疑似人数' },
          { value: province_curedCount.value, name: '治愈人数' },
          { value: province_deadCount.value, name: '死亡人数' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  } as EChartsOption
}

const refreshData = async () => {
  raw = await getData()
  if (!raw) {
    compShow = false
    return
  }
  compShow = true
  updateTime.value = raw.updateTime
  province_confirmedCount.value = raw.province_confirmedCount
  province_curedCount.value = raw.province_curedCount
  province_deadCount.value = raw.province_deadCount
  province_suspectedCount.value = raw.province_suspectedCount
  if (myChart)
    myChart.setOption(getPieOptions())
}

const initCharts = async () => {
  myChart = echarts.init(pieChart) as ECharts
  await refreshData()
}

nextTick(initCharts)

defineExpose({
  refreshData,
})
</script>

<template>
  <div v-if="compShow" m-4>
    <div>{{ updateTime }}</div>
    <div flex justify-center>
      <div id="chart" ref="pieChart" />
      <div grid>
        <DataDisplay icon="i-carbon-coronavirus" title="感染" :data="province_confirmedCount" style-class="text-red-700" />
        <DataDisplay icon="i-carbon-warning" title="疑似" :data="province_suspectedCount" style-class="text-orange" />
        <DataDisplay icon="i-carbon-face-wink" title="治愈" :data="province_curedCount" style-class="text-green-600" />
        <DataDisplay icon="i-carbon-face-dizzy" title="死亡" :data="province_deadCount" style-class="text-zinc" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#chart {
  width: 40%;
  height: 400px;
}
</style>
