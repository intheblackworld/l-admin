<template>
  <div class="chart" :style="{height:height,width:width}" />
</template>
<style lang="scss" scoped>
.chart {
  width: 100% !important;
  overflow: scroll !important;
}
</style>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    // 橫軸的 aAxis 欄位，要變成日期或者週或者月
    // legend
    setOptions({ countData, xAxis, countNames, transData, transNames, colors } = {}) {
      this.chart.setOption({
        xAxis: {
          data: xAxis,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 50,
          right: 50,
          bottom: 0,
          top: 30,
          containLabel: true,
          show: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: []
        },
        series: [
          ...countData.map((item, index) => ({
            name: countNames[index],
            itemStyle: {
              normal: {
                color: colors[index],
                lineStyle: {
                  color: colors[index],
                  width: 2
                }
              }
            },
            smooth: false,
            step: false,
            type: 'line',
            data: item,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          })),
          ...transData.map((item, index) => ({
            name: transNames[index],
            itemStyle: {
              normal: {
                color: colors[index],
                lineStyle: {
                  color: colors[index],
                  width: 2
                }
              }
            },
            smooth: false,
            stack: true,
            step: false,
            type: 'bar',
            barWidth: '20',
            data: item,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }))
        ]
      }, true)
    }
  }
}
</script>
