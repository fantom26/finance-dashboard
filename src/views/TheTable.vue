<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'

ModuleRegistry.registerModules([AllCommunityModule])

const store = useStore()
const consumers = computed(() => store.state.consumers[types.CONSUMERS_STATE])

const colDefs = ref([
  { field: 'customer_id' },
  { field: 'full_name' },
  { field: 'date_of_birth' },
  { field: 'email' },
  { field: 'phone_number' },
  { field: 'address' },
  { field: 'city' },
  { field: 'state' },
  { field: 'country' },
  { field: 'zip_code' },
  { field: 'employment_status' },
])

onMounted(() => {
  store.dispatch(`consumers/${types.LOAD_CONSUMERS_ACTION}`)
})
</script>

<template>
  <div>
    <h1>Consumers</h1>
    <ag-grid-vue :rowData="consumers" :columnDefs="colDefs" style="height: 500px"> </ag-grid-vue>
  </div>
</template>
