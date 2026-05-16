<!-- eslint-disable vue/multi-word-component-names -- TODO(file-based routes): reconcile with vue/multi-word-component-names; remove this when decided. -->

<template>
  <div>
    <base-container>
      <div class="charts-grid" v-if="hasConsumers">
        <div class="charts-grid__item">
          <pie-chart :data="dataByTransTypeDistribution" />
        </div>
        <div class="charts-grid__item">
          <map-chart :data="consumers" />
        </div>
        <div class="charts-grid__item">
          <XYChart name="Cities" :data="dataByTransLocation" />
        </div>
        <div class="charts-grid__item">
          <donut-chart :data="dataByGender" />
        </div>
      </div>
      <p v-else>Loading...</p>
    </base-container>
  </div>
</template>

<script setup lang="ts">
import PieChart from '@/components/charts/PieChart.vue'
import MapChart from '@/components/charts/MapChart.vue'
import XYChart from '@/components/charts/XYChart.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import { useConsumersStore } from '@/stores/consumers'
import { storeToRefs } from 'pinia'

const consumersStore = useConsumersStore()
const { hasConsumers, consumers, dataByTransTypeDistribution, dataByGender, dataByTransLocation } =
  storeToRefs(consumersStore)
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
