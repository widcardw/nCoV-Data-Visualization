<script setup lang="ts">
import type { ECharts, EChartsOption, PiecewiseVisualMapComponentOption } from 'echarts'
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

// 数值插值
const interpolate = (left: number, right: number, alpha: number) => {
  return left * (1 - alpha) + right * alpha
}

// 颜色插值，输入格式应当是 r,g,b
const interpolateColor = (left: string, right: string, alpha: number) => {
  const [lR, lG, lB] = left.split(',').map(it => parseInt(it))
  const [rR, rG, rB] = right.split(',').map(it => parseInt(it))
  return `rgb(${interpolate(lR, rR, alpha)}, ${interpolate(lG, rG, alpha)}, ${interpolate(lB, rB, alpha)})`
}

const getOption = (data: Array<[string, number]>) => {
  let pieces
  let minVal = Math.min(...data.map(([, value]) => value))
  let maxVal = Math.max(...data.map(([, value]) => value))

  if (!isFinite(minVal) || !isFinite(maxVal))
    minVal = maxVal = 0

  if (data && data.length >= 1) {
    // 计算确诊人数的最大最小值

    // 折线图纵坐标分片数 - 1
    const piecesNum = 4
    pieces = Array(piecesNum + 1).fill(0).map((_, index) => {
      return {
        gt: interpolate(minVal, maxVal, index / piecesNum),
        lte: interpolate(minVal, maxVal, (index + 1) / piecesNum),
        color: interpolateColor('255,204,168', '224,48,0', index / piecesNum),
      }
    }) as PiecewiseVisualMapComponentOption
  }

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
    },
    visualMap: {
      // 图例边距
      top: 50,
      right: 10,
      // 分片配置
      pieces,
      outOfRange: {
        color: '#999',
      },
    },
    pieces,
    // x 轴为时间
    xAxis: {
      data: data.map(([time]) => time),
    },
    // y 轴为确诊人数
    yAxis: {
      min: minVal,
    },
    series: {
      // 折线图
      type: 'line',
      // 数据为确诊人数
      data: data.map(([, value]) => value),
    },
  } as EChartsOption
}

const refreshData = async () => {
  if (globalProps.path) {
    const url = `${globalProps.path}?start=${globalProps.startTime}&end=${globalProps.endTime}&code=${globalProps.mapCode}`
    // eslint-disable-next-line no-console
    console.log('daily', url)
    const { data } = await useMyFetch(url).json()
    const options = getOption(data.value.data)
    // eslint-disable-next-line no-console
    console.log('daily', options)
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
    width: 100%;
    height: 300px;
}
</style>
