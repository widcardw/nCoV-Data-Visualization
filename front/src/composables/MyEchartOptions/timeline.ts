import type { TimelineComponentOption } from 'echarts'

const timeline: TimelineComponentOption = {
  loop: false,
  axisType: 'time',
  data: [
    '2020-01-01',
    '2020-01-02',
    '2020-01-03',
    '2020-01-04',
  ],
  playInterval: 500,
  symbolSize: 5,
}

export default timeline
