<template>
  <section>
    <the-container>
      <h2>Charts page</h2>
      <pie-chart category-field="category" value-field="value" :data="data" />
    </the-container>
  </section>
</template>
<script setup>
import TheContainer from '@/components/base/BaseContainer.vue'
import PieChart from '@/components/charts/PieChart.vue'
import { ref } from 'vue'

const data = ref([
  {
    category: 'Research',
    value: 1000,
  },
  {
    category: 'Marketing',
    value: 1200,
  },
  {
    category: 'Sales',
    value: 850,
  },
])
</script>
