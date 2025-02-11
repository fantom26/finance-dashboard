<script setup>
import TheContainer from '@/components/base/BaseContainer.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { computed } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { useStore } from 'vuex'

const store = useStore()
const hasConsumers = computed(() => store.getters[`consumers/${types.HAS_CONSUMERS_STATE}`])
const dataByTransTypeDistribution = computed(
  () => store.getters[`consumers/${types.TRANSACTION_TYPE_DISTRIBUTION_STATE}`],
)
const dataByTransLocation = computed(
  () => store.getters[`consumers/${types.TRANSACTION_LOCATION_STATE}`],
)
</script>

<template>
  <section>
    <the-container>
      <h2>Charts page</h2>
      <template v-if="hasConsumers">
        <pie-chart id="transaction-type" :data="dataByTransTypeDistribution" />
        <pie-chart id="transaction-location" :data="dataByTransLocation" />
      </template>
      <p v-else>Loading...</p>
    </the-container>
  </section>
</template>
