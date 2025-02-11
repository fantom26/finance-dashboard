<script setup>
import TheContainer from '@/components/base/BaseContainer.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { computed } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { useStore } from 'vuex'

const store = useStore()
const hasConsumers = computed(() => store.getters[`consumers/${types.HAS_CONSUMERS_STATE}`])
const data = computed(() => store.getters[`consumers/${types.TRANSACTION_TYPE_DISTRIBUTION_STATE}`])
</script>

<template>
  <section>
    <the-container>
      <h2>Charts page</h2>
      <pie-chart :data="data" v-if="hasConsumers" />
      <p v-else>Loading...</p>
    </the-container>
  </section>
</template>
