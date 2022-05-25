import type { GeoComponentOption } from 'echarts'

const geo: GeoComponentOption = {
  map: 'china',
  roam: true,
  label: {
    color: '#DADADA',
    // show: true,
  },
  itemStyle: {
    shadowColor: 'rgba(248, 217, 128, 1)',
    shadowOffsetX: -2,
    shadowOffsetY: 2,
    shadowBlur: 10,
    borderWidth: 0.3,
    areaColor: {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.8,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(248, 235, 147, 0)', // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(248, 235, 147, .2)', // 100% 处的颜色
        },
      ],
    },
  },
  emphasis: {
    label: {
      color: '#000',
      fontWeight: 'bold',
    },
    itemStyle: {
      areaColor: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.8,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(248, 235, 147, 0.2)', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(248, 235, 147, 0.6)', // 100% 处的颜色
          },
        ],
      },
    },
  },
}

export default geo
