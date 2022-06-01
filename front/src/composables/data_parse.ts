import type { TimelineComponentOption } from 'echarts'

export interface DailyData {
  time: string
  data: Array<{
    name: string
    value: number
  }>
}

export const parseSeries = (data: DailyData[], mapName: string) => {
  return data.map((it) => {
    // SeriesOption
    const serie = {
      name: `China ${it.time}`,
      type: 'map',
      roam: true,
      map: mapName,
      seriesName: `${mapName} ${it.time}`,
      emphasis: {
        label: { show: true },
      },
      data: it.data,
    }
    return serie
  })
}

export const getTimeLine = (data: DailyData[]) => {
  if (!data) {
    return {
      loop: false,
      axisType: 'time',
      data: ['2020-01-01'],
      playInterval: 500,
      symbolSize: 5,
    } as TimelineComponentOption
  }
  return {
    loop: false,
    autoPlay: false,
    axisType: 'time',
    data: data.map(it => it.time),
    playInterval: 500,
    symbolSize: 5,
    label: {
      show: false,
    },
  } as TimelineComponentOption
}
