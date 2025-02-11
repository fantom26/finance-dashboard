<script setup>
import { onMounted, toRefs } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import { defineProps } from 'vue'

const CHART_ID = 'pie-chart-div'
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const { data } = toRefs(props)

onMounted(() => {
  const root = am5.Root.new(CHART_ID)

  const chart = root.container.children.push(am5percent.PieChart.new(root, {}))

  const series = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: 'value',
      categoryField: 'category',
    }),
  )

  series.data.setAll(data.value)

  return () => root.dispose()
})
</script>

<template>
  <div :id="CHART_ID" style="width: 100%; height: 400px"></div>
</template>
