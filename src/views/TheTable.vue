<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import TheContainer from '@/components/UI/TheContainer.vue'

ModuleRegistry.registerModules([AllCommunityModule])

const store = useStore()
const consumers = computed(() => store.state.consumers[types.CONSUMERS_STATE])

const defaultColDef = ref({
  filter: true,
  sortable: true,
})

const columnDefs = ref([
  { headerName: 'Customer ID', valueGetter: (params) => params.data?.customer_id || '' },
  { headerName: 'Full Name', valueGetter: (params) => params.data?.full_name || '' },
  { headerName: 'Birthday', valueGetter: (params) => params.data?.date_of_birth || '' },
  { headerName: 'Gender', valueGetter: (params) => params.data?.gender || '' },
  { headerName: 'Email', valueGetter: (params) => params.data?.email || '' },
  { headerName: 'Phone Number', valueGetter: (params) => params.data?.phone_number || '' },
  { headerName: 'Address', valueGetter: (params) => params.data?.address || '' },
  { headerName: 'City', valueGetter: (params) => params.data?.city || '' },
  { headerName: 'State', valueGetter: (params) => params.data?.state || '' },
  { headerName: 'Country', valueGetter: (params) => params.data?.country || '' },
  { headerName: 'Zip Code', valueGetter: (params) => params.data?.zip_code || '' },
  {
    headerName: 'Employment Status',
    valueGetter: (params) => params.data?.employment_status || '',
  },

  { headerName: 'Account ID', valueGetter: (params) => params.data?.account?.account_id || '' },
  { headerName: 'Account Type', valueGetter: (params) => params.data?.account?.account_type || '' },
  {
    headerName: 'Account Balance',
    valueGetter: (params) => params.data?.account?.account_balance || '',
  },
  { headerName: 'Currency', valueGetter: (params) => params.data?.account?.currency || '' },
  {
    headerName: 'Account Open Date',
    valueGetter: (params) => params.data?.account?.account_open_date || '',
  },
  {
    headerName: 'Account Status',
    valueGetter: (params) => params.data?.account?.account_status || '',
  },
  { headerName: 'Branch ID', valueGetter: (params) => params.data?.account?.branch_id || '' },

  {
    headerName: 'Transaction ID',
    valueGetter: (params) => params.data?.transactions?.transaction_id || '',
  },
  {
    headerName: 'Transaction Date',
    valueGetter: (params) => params.data?.transactions?.transaction_date || '',
  },
  {
    headerName: 'Transaction Type',
    valueGetter: (params) => params.data?.transactions?.transaction_type || '',
  },
  {
    headerName: 'Transaction Amount',
    valueGetter: (params) => params.data?.transactions?.amount || '',
  },
  {
    headerName: 'Transaction Currency',
    valueGetter: (params) => params.data?.transactions?.currency || '',
  },
  {
    headerName: 'Balance After Transaction',
    valueGetter: (params) => params.data?.transactions?.balance_after_transaction || '',
  },
  {
    headerName: 'Transaction Method',
    valueGetter: (params) => params.data?.transactions?.transaction_method || '',
  },
  {
    headerName: 'Transaction Location',
    valueGetter: (params) => params.data?.transactions?.transaction_location || '',
  },

  { headerName: 'Loan ID', valueGetter: (params) => params.data?.loan?.loan_id || '' },
  { headerName: 'Loan Type', valueGetter: (params) => params.data?.loan?.loan_type || '' },
  { headerName: 'Loan Amount', valueGetter: (params) => params.data?.loan?.loan_amount || '' },
  { headerName: 'Loan Term', valueGetter: (params) => params.data?.loan?.loan_term || '' },
  { headerName: 'Interest Rate', valueGetter: (params) => params.data?.loan?.interest_rate || '' },
  {
    headerName: 'Loan Start Date',
    valueGetter: (params) => params.data?.loan?.loan_start_date || '',
  },
])

onMounted(() => {
  store.dispatch(`consumers/${types.LOAD_CONSUMERS_ACTION}`)
})
</script>

<template>
  <the-container>
    <div class="table-page">
      <ag-grid-vue
        :rowData="consumers"
        :columnDefs="columnDefs"
        style="width: 100%; height: 100%"
        :defaultColDef="defaultColDef"
      />
    </div>
  </the-container>
</template>

<style scoped lang="scss">
.table-page {
  height: calc(100vh - var(--header-height));
}
</style>
