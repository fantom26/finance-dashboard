<template>
  <ChartBase ref="chartBase" />
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'
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

useAmChart(chartBase, (root) => {
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
})
</script>
