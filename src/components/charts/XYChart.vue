<template>
  <ChartBase ref="chartBase" />
</template>

<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { toRefs, ref } from 'vue'
import ChartBase from './ChartBase.vue'
import { useAmChart } from '@/composables/useAmChart'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: 'Series',
  },
})

const { data, name } = toRefs(props)

const chartBase = ref<InstanceType<typeof ChartBase> | null>(null)

useAmChart(chartBase, (root) => {
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout,
    }),
  )

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  )

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField: 'category',
    }),
  )
  xAxis.data.setAll(data.value)

  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name.value,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'value',
      categoryXField: 'category',
    }),
  )
  series.data.setAll(data.value)

  const legend = chart.children.push(am5.Legend.new(root, {}))
  legend.data.setAll(chart.series.values)

  chart.set('cursor', am5xy.XYCursor.new(root, {}))
})
</script>
