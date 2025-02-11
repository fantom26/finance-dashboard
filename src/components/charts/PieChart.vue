<script setup>
import { onMounted } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'

const CHART_ID = 'pie-chart-div'

onMounted(() => {
  const root = am5.Root.new(CHART_ID)

  const chart = root.container.children.push(am5percent.PieChart.new(root, {}))

  const series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: 'value',
      categoryField: 'category',
    }),
  )

  series.data.setAll([
    {
      category: 'Research',
      value: 1000,
    },
    {
      category: 'Marketing',
      value: 1200,
    },
    {
      category: 'Sales',
      value: 850,
    },
  ])

  return () => root.dispose()
})
</script>

<template>
  <div :id="CHART_ID" style="width: 100%; height: 400px"></div>
</template>
