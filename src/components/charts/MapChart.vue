<script setup>
import { onMounted, toRefs } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5map from '@amcharts/amcharts5/map'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'

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

const { id } = toRefs(props)

onMounted(() => {
  const root = am5.Root.new(id.value)
  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      projection: am5map.geoNaturalEarth1(),
    }),
  )

  const polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
    }),
  )

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: '{name}',
    interactive: true,
  })

  polygonSeries.mapPolygons.template.states.create('hover', {
    fill: am5.color('#A8E5A9'),
  })
})
</script>

<template>
  <div :id="id" style="width: 100%; height: 400px"></div>
</template>
