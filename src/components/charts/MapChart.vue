<template>
  <ChartBase ref="chartBase" />
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
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
  if (!Array.isArray(data.value)) return

  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      projection: am5map.geoNaturalEarth1(),
    }),
  )

  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      valueField: 'value',
      calculateAggregates: true,
    }),
  )

  const countryCounts = data.value.reduce((acc, consumer) => {
    acc[consumer.country_code] = acc[consumer.country_code] + 1 || 1
    return acc
  }, {})

  const countriesData = am5geodata_worldLow.features.map((country) => ({
    id: country.id,
    name: country.properties.name,
    value: countryCounts[country.id] ?? 0,
  }))

  polygonSeries.set('heatRules', [
    {
      target: polygonSeries.mapPolygons.template,
      dataField: 'value',
      min: am5.color('#f5e0f8'),
      max: am5.color('#790881'),
      key: 'fill',
    },
  ])

  polygonSeries.data.setAll(countriesData)

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: '{name}: {value} Consumers',
    interactive: true,
  })

  polygonSeries.mapPolygons.template.states.create('hover', {
    fill: am5.color('#e86dbf'),
  })
})
</script>
