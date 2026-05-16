<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import { onMounted, toRefs, ref } from 'vue'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

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

const chartRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!chartRef.value) return
  const root = am5.Root.new(chartRef.value)

  root.setThemes([am5themes_Animated.new(root)])

  let chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout,
    }),
  )

  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  )

  let xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField: 'category',
    }),
  )
  xAxis.data.setAll(data.value)

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

  let legend = chart.children.push(am5.Legend.new(root, {}))
  legend.data.setAll(chart.series.values)

  chart.set('cursor', am5xy.XYCursor.new(root, {}))

  return () => root.dispose()
})
</script>
