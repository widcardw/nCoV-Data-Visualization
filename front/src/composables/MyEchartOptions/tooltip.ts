import type { TooltipComponentOption } from 'echarts'

const tooltip: TooltipComponentOption = {
  show: true,
  trigger: 'item',
  alwaysShowContent: false,
  backgroundColor: 'rgba(0, 0, 0,.5)',
  borderColor: 'rgba(0, 0, 0, 0.16);',
  hideDelay: 100,
  triggerOn: 'mousemove',
  enterable: true,
  textStyle: {
    color: '#DADADA',
    fontSize: '12',
    width: 20,
    height: 30,
  },
  showDelay: 100,
}

export default tooltip
