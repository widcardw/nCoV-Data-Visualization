<script setup lang="ts">
import type { ECharts } from 'echarts'
import type { DailyData } from '~/composables/data_parse'
import { getTimeLine } from '~/composables/data_parse'
import tooltip from '~/composables/MyEchartOptions/tooltip'
import getVisualMap from '~/composables/MyEchartOptions/visualMap'
import useMyFetch from '~/composables/useMyFetch'
import type { CodeType } from '~/data/maps'
import { links, mapCodes, provinces } from '~/data/maps'
import * as nameMaps from '~/data/nameMaps.json'

const globalProps = defineProps<{
  mapName: string
  mapCode: CodeType
  path?: string
  startTime: string
  endTime: string
}>()

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
    // 从 composable 读取配置
    tooltip,
    // 由原始数计算出 timeLine，主要获取日期
    timeline: getTimeLine(rawData),
    // 图表的配置，同时负责着色
    visualMap: getVisualMap(rawData),
    // 用于 bar 的配置
    xAxis: {
      type: 'category',
      name: '地区',
      // x 轴按地区分类
      data: rawData && rawData.length >= 1 && rawData.at(rawData.length - 1)?.data.map(it => it.name),
      axisTick: {
        alignWithLabel: true,
        interval: 0,
      },
      axisLabel: {
        interval: 0,
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: '确诊人数',
    },
    // 柱状图配置
    grid: {
      // 底部边距
      bottom: 130,
    },
    // 两个数据系列
    series: [
      {
        // map 系列
        name: 'nCoV map',
        type: 'map',
        roam: true,
        // map 属性要与 registerMap 中的名称一致
        map: globalProps.mapName,
        emphasis: {
          label: {
            show: true,
          },
        },
        // 地图数据布局
        layoutCenter: ['75%', '40%'],
        layoutSize: '60%',
        // 名称映射
        nameMap: nameMaps.data[globalProps.mapCode],
      },
      {
        // 柱状图数据系列
        name: 'bar',
        type: 'bar',
        roam: true,
        emphasis: {
          label: {
            show: true,
          },
        },
        // 名称映射
        nameMap: nameMaps.data[globalProps.mapCode],
      },
    ],
    // 用于给实际的数据赋值
    options: rawData?.map((it) => {
      return {
        // 图表标题
        title: { text: `${it.time} 数据` },
        series: [
          { // 地图数据
            data: it.data,
          },
          { // 柱状图数据
            data: it.data,
          },
        ],
      }
    }),
  }
}

// 刷新数据
const refreshData = async () => {
  if (globalProps.path) {
    // 拼接 url
    const url = `${globalProps.path}?start=${globalProps.startTime}&end=${globalProps.endTime}&code=${globalProps.mapCode}`
    // eslint-disable-next-line no-console
    console.log(url)
    // 获取 json 数据
    const { data } = await useMyFetch(url).json()
    // 根据 json 数据计算出 option
    const options = getOption(data.value.data)
    // eslint-disable-next-line no-console
    console.log(options)
    // 设置地图的选项
    myChart.setOption(options)
  }
}

// 初始化图表
const initCharts = async () => {
  myChart = echarts.init(chartEl.value) as ECharts
  // 从阿里地图获取地图 json
  const { data } = await useFetch(links[globalProps.mapCode]).json()
  // 注册地图
  echarts.registerMap(globalProps.mapName, data.value)
  // 对全国地图增加点击事件
  myChart.on('click', (params) => {
    // 获取点击的省份的名称
    // index 有不确定因素，故没有什么用
    const { name, dataIndex } = params
    // eslint-disable-next-line no-console
    console.log(name, dataIndex)

    // 判断是否是省份，如果是省份，那么其实无需跳转
    if (!provinces.includes(name))
      return

    // 从省份名称获取省份编码
    const code = mapCodes[name]
    // 跳转到该省份的页面
    router.push(`/maps/province/${encodeURIComponent(code)}`)
  })
  // 刷新数据
  await refreshData()
}

// 在 dom 加载完成时，初始化图表
nextTick(initCharts)

defineExpose({
  refreshData,
})
</script>

<template>
  <div ref="chartEl" class="chart" />
</template>

<style scoped>
.chart {
  width: 100%;
  height: 600px;
}
</style>
