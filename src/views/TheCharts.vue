<template>
  <div>
    <base-container>
      <div class="charts-grid" v-if="hasConsumers">
        <div class="charts-grid__item">
          <pie-chart id="transaction-type" :data="dataByTransTypeDistribution" />
        </div>
        <div class="charts-grid__item">
          <map-chart id="consumers-by-countries" :data="consumers" />
        </div>
        <div class="charts-grid__item">
          <x-y-chart name="Cities" id="amount-by-cities" :data="dataByTransLocation" />
        </div>
        <div class="charts-grid__item">
          <donut-chart id="gender-chart" :data="dataByGender" />
        </div>
      </div>
      <p v-else>Loading...</p>
    </base-container>
  </div>
</template>

<script setup>
import PieChart from '@/components/charts/PieChart.vue'
import { computed } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { useStore } from 'vuex'
import MapChart from '@/components/charts/MapChart.vue'
import XYChart from '@/components/charts/XYChart.vue'
import DonutChart from '@/components/charts/DonutChart.vue'

const store = useStore()
const hasConsumers = computed(
  () => store.getters[`${types.CONSUMERS_MODULE}/${types.HAS_CONSUMERS_STATE}`],
)
const consumers = computed(
  () => store.getters[`${types.CONSUMERS_MODULE}/${types.CONSUMERS_STATE}`],
)

const dataByTransTypeDistribution = computed(
  () => store.getters[`${types.CONSUMERS_MODULE}/${types.TRANSACTION_TYPE_DISTRIBUTION_STATE}`],
)
const dataByGender = computed(
  () => store.getters[`${types.CONSUMERS_MODULE}/${types.CONSUMERS_GENDER_STATE}`],
)
const dataByTransLocation = computed(
  () => store.getters[`${types.CONSUMERS_MODULE}/${types.TRANSACTION_LOCATION_STATE}`],
)
</script>

<style lang="scss" scoped>
.charts-grid {
  height: calc(100vh - var(--header-height));
  padding-block: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  &__item {
    border: 0.1rem solid black;
    border-radius: 1rem;
  }
}
</style>
