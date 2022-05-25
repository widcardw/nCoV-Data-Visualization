import type { EChartsOption } from 'echarts'

const options: EChartsOption[] = [{
  title: {
    text: '中国疫情数据一览',
    subtext: '数据来自丁香园',
  },
  series: [
    {
      name: 'China 2020-01-01',
      type: 'map',
      roam: true,
      map: 'china',
      emphasis: {
        label: {
          show: true,
        },
      },
      data: [

      ],
    },
  ],
}]

export default options
