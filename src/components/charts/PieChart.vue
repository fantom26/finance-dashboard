<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, watch, shallowRef } from 'vue'
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

const root = shallowRef(null)
const series = shallowRef(null)
const legend = shallowRef(null)

watch(data, (newData) => {
  if (series.value) {
    series.value.data.clear()
    series.value.data.setAll(newData)

    legend.value.data.clear()
    legend.value.data.setAll(series.value.dataItems)
  }
})

onMounted(() => {
  root.value = am5.Root.new(id.value)
  root.value.setThemes([am5themes_Animated.new(root.value)])

  const chart = root.value.container.children.push(
    am5percent.PieChart.new(root.value, {
      layout: root.value.verticalLayout,
    }),
  )

  series.value = chart.series.push(
    am5percent.PieSeries.new(root.value, {
      valueField: 'value',
      categoryField: 'category',
    }),
  )

  series.value.data.setAll(data.value)
  series.value.labels.template.set('forceHidden', true)
  series.value.ticks.template.set('forceHidden', true)

  legend.value = chart.children.push(
    am5.Legend.new(root.value, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: am5.GridLayout.new(root.value, {
        maxColumns: 3,
        fixedWidthGrid: true,
      }),
    }),
  )
  legend.value.data.setAll(series.value.dataItems)

  return () => root.value.dispose()
})
</script>
