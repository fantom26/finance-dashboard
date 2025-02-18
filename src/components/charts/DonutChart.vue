<script setup>
import { onMounted, toRefs } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
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
})

const { data, id } = toRefs(props)

onMounted(() => {
  const root = am5.Root.new(id.value)

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

<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>
