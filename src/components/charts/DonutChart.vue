<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, ref } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const { data } = toRefs(props)

const chartRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!chartRef.value) return
  const root = am5.Root.new(chartRef.value)

  root.setThemes([am5themes_Animated.new(root)])

  const chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      radius: am5.percent(50),
      innerRadius: am5.percent(30),
    }),
  )

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
