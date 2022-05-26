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
