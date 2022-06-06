<script setup lang="ts">
import type { ECharts, EChartsOption } from 'echarts'
import useMyFetch from '~/composables/useMyFetch'
import type { CodeType } from '~/data/maps'

const globalProps = defineProps<{
  mapCode: CodeType
  path: string
  startTime: string
  endTime: string
}>()

const lineChart = $ref<HTMLElement>()
const echarts = inject('echarts') as any
let myChart: ECharts

const getOption = (data: Array<{
  updateTime: string
  confirmedCount: number
  suspectedCount: number
  curedCount: number
  deadCount: number
}>) => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['新增确诊', '新增疑似', '新增治愈', '新增死亡'],
    },
    // x 轴为时间
    xAxis: {
      data: data.map(({ updateTime }) => updateTime),
    },
    // y 轴为人数
    yAxis: {
      type: 'value',
    },
    series: [{
      name: '新增确诊',
      color: 'crimson',
      // 折线图
      type: 'line',
      // 数据为确诊人数
      data: data.map(({ confirmedCount }) => confirmedCount),
    }, {
      name: '新增疑似',
      color: 'orange',
      // 折线图
      type: 'line',
      // 数据为疑似人数
      data: data.map(({ suspectedCount }) => suspectedCount),
    },
    {
      name: '新增治愈',
      color: 'green',
      // 折线图
      type: 'line',
      // 数据为治愈人数
      data: data.map(({ curedCount }) => curedCount),
    },
    {
      name: '新增死亡',
      color: 'grey',
      // 折线图
      type: 'line',
      // 数据为死亡人数
      data: data.map(({ deadCount }) => deadCount),
    },
    ],
  } as EChartsOption
}

const refreshData = async () => {
  if (globalProps.path) {
    const url = `${globalProps.path}?start=${globalProps.startTime}&end=${globalProps.endTime}&code=${globalProps.mapCode}`
    const { data } = await useMyFetch(url).json()
    const options = getOption(data.value.data)
    myChart.setOption(options)
  }
}

const initCharts = async () => {
  myChart = echarts.init(lineChart) as ECharts
  await refreshData()
}

nextTick(initCharts)

defineExpose({
  refreshData,
})
</script>

<template>
  <div id="chart" ref="lineChart" />
</template>

<style scoped>
#chart{
    width: 50%;
    height: 600px;
}
</style>
