import type { VisualMapComponentOption } from 'echarts'

const visualMap: VisualMapComponentOption = {
  min: 0,
  max: 200000,
  text: ['High', 'Low'],
  realtime: false,
  calculable: true,
  inRange: {
    color: ['lightskyblue', 'yellow', 'orangered'],
  },
}

export default visualMap
