<template>
  <ChartBase ref="chartBase" />
</template>

<script setup lang="ts">
import { toRefs, watch, shallowRef, ref } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import ChartBase from './ChartBase.vue'
import { useAmChart } from '@/composables/useAmChart'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const { data } = toRefs(props)

const chartBase = ref<InstanceType<typeof ChartBase> | null>(null)

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

useAmChart(chartBase, (root) => {
  const chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout,
    }),
  )

  series.value = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: 'value',
      categoryField: 'category',
    }),
  )

  series.value.data.setAll(data.value)
  series.value.labels.template.set('forceHidden', true)
  series.value.ticks.template.set('forceHidden', true)

  legend.value = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: am5.GridLayout.new(root, {
        maxColumns: 3,
        fixedWidthGrid: true,
      }),
    }),
  )
  legend.value.data.setAll(series.value.dataItems)
})
</script>
