<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { onMounted, toRefs } from 'vue'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: 'Series',
  },
})

const { data, id, name } = toRefs(props)

onMounted(() => {
  const root = am5.Root.new(id.value)

  root.setThemes([am5themes_Animated.new(root)])

  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout,
    }),
  )

  // Create Y-axis
  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  )

  // Create X-Axis
  let xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField: 'category',
    }),
  )
  xAxis.data.setAll(data.value)

  // Create series
  let series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name.value,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'value',
      categoryXField: 'category',
    }),
  )
  series.data.setAll(data.value)

  // Add legend
  let legend = chart.children.push(am5.Legend.new(root, {}))
  legend.data.setAll(chart.series.values)

  // Add cursor
  chart.set('cursor', am5xy.XYCursor.new(root, {}))

  return () => root.dispose()
})
</script>
