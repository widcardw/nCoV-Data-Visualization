import type { VisualMapComponentOption } from 'echarts'
import type { DailyData } from '../data_parse'

// const visualMap: VisualMapComponentOption = {
//   min: 0,
//   max: 5000,
//   text: ['High', 'Low'],
//   realtime: false,
//   calculable: true,
//   inRange: {
//     color: ['white', 'orange', 'crimson'],
//   },
// }

const getVisualMap = (rawData: DailyData[]) => {
  let maxCount = 0
  if (rawData && rawData.length >= 1) {
    const lastData = rawData.at(rawData.length - 1) as DailyData
    for (const d of lastData.data) {
      if (d.name.slice(0, 2) === '境外' || d.name.slice(0, 2) === '待明')
        continue
      if (d.value > maxCount)
        maxCount = d.value
    }
    if (maxCount > 2000)
      maxCount = 2000
    else if (maxCount < 100)
      maxCount = 100
  }
  return {
    min: 0,
    max: maxCount,
    text: ['High', 'Low'],
    realtime: false,
    calculable: true,
    inRange: {
      color: ['white', 'orange', 'crimson'],
    },
  } as VisualMapComponentOption
}

export default getVisualMap
