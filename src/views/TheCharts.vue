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
import types from '@/store/modules/consumers/types.js'
import { useStore } from 'vuex'
import PieChart from '@/components/charts/PieChart.vue'
import MapChart from '@/components/charts/MapChart.vue'
import XYChart from '@/components/charts/XYChart.vue'
import DonutChart from '@/components/charts/DonutChart.vue'
import { getFromConsumerModule } from '@/store/modules/consumers/getters.js'

const store = useStore()
const hasConsumers = computed(() => store.getters[getFromConsumerModule(types.HAS_CONSUMERS_STATE)])
const consumers = computed(() => store.getters[getFromConsumerModule(types.CONSUMERS_STATE)])
const dataByTransTypeDistribution = computed(
  () => store.getters[getFromConsumerModule(types.TRANSACTION_TYPE_DISTRIBUTION_STATE)],
)
const dataByGender = computed(
  () => store.getters[getFromConsumerModule(types.CONSUMERS_GENDER_STATE)],
)
const dataByTransLocation = computed(
  () => store.getters[getFromConsumerModule(types.TRANSACTION_LOCATION_STATE)],
)

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
