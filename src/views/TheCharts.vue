<template>
  <div>
    <base-container>
      <div class="charts-grid" v-if="hasConsumers">
        <div class="charts-grid__item" v-for="chart in charts" :key="chart.id">
          <component
            :is="chart.component"
            :id="chart.id"
            :data="toValue(chart.data)"
            :name="chart.name"
          />
        </div>
      </div>
      <p v-else>Loading...</p>
    </base-container>
  </div>
</template>

<script setup>
import { computed, shallowRef, toValue } from 'vue'
import PieChart from '@/components/charts/PieChart.vue'
import MapChart from '@/components/charts/MapChart.vue'
import XYChart from '@/components/charts/XYChart.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import { useConsumersStore } from '@/stores/consumers.js'

const consumersStore = useConsumersStore()
const hasConsumers = computed(() => consumersStore.hasConsumers)
const consumers = computed(() => consumersStore.consumers)
const dataByTransTypeDistribution = computed(() => consumersStore.dataByTransTypeDistribution)
const dataByGender = computed(() => consumersStore.dataByGender)
const dataByTransLocation = computed(() => consumersStore.dataByTransLocation)

const charts = shallowRef([
  {
    id: 'transaction-type',
    data: dataByTransTypeDistribution,
    component: PieChart,
  },
  {
    id: 'consumers-by-countries',
    data: consumers,
    component: MapChart,
  },
  {
    id: 'amount-by-cities',
    data: dataByTransLocation,
    name: 'Cities',
    component: XYChart,
  },
  {
    id: 'gender-chart',
    data: dataByGender,
    component: DonutChart,
  },
])
</script>

<style scoped>
.charts-grid {
  height: calc(100vh - var(--header-height));
  padding-block: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.charts-grid__item {
  border: 0.1rem solid black;
  border-radius: 1rem;
}
</style>
