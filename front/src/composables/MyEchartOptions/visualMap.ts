import type { VisualMapComponentOption } from 'echarts'

const visualMap: VisualMapComponentOption = {
  min: 0,
  max: 5000,
  text: ['High', 'Low'],
  realtime: false,
  calculable: true,
  inRange: {
    color: ['white', 'orange', 'crimson'],
  },
}

export default visualMap
