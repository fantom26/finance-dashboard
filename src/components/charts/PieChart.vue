<script setup>
import { onMounted, toRefs } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import { defineProps } from 'vue'

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
  <div :id="id" style="width: 100%; height: 400px"></div>
</template>
