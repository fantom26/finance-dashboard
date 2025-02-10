<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import TheContainer from '@/components/base/BaseContainer.vue'
import { formatEmptyCell, formatToUSD } from '@/utils/helpers.js'

ModuleRegistry.registerModules([AllCommunityModule])

const COLUMNS_FIELDS = {
  CUSTOMER_ID: 'customer_id',
  FULL_NAME: 'full_name',
  BIRTHDAY: 'date_of_birth',
  GENDER: 'gender',
  EMAIL: 'email',
  PHONE_NUMBER: 'phone_number',
  ADDRESS: 'address',
  CITY: 'city',
  COUNTRY: 'country',
  EMPLOYMENT_STATUS: 'employment_status',
  ACCOUNT_ID: 'account.account_id',
  ACCOUNT_TYPE: 'account.account_type',
  ACCOUNT_BALANCE: 'account.account_balance',
  CURRENCY: 'account.currency',
  ACCOUNT_OPEN_DATE: 'account.account_open_date',
  ACCOUNT_STATUS: 'account.account_status',
  BRANCH_ID: 'account.branch_id',
  TRANSACTION_ID: 'transactions.transaction_id',
  TRANSACTION_DATE: 'transactions.transaction_date',
  TRANSACTION_TYPE: 'transactions.transaction_type',
  TRANSACTION_AMOUNT: 'transactions.amount',
  TRANSACTION_CURRENCY: 'transactions.currency',
  BALANCE_AFTER_TRANSACTION: 'transactions.balance_after_transaction',
  TRANSACTION_METHOD: 'transactions.transaction_method',
  TRANSACTION_LOCATION: 'transactions.transaction_location',
}

const store = useStore()
const consumers = computed(() => store.state.consumers[types.CONSUMERS_STATE])

const pinnedBottomRowData = computed(() => {
  const { totalTransactionAmount, totalAccountBalance } = consumers.value.reduce(
    (totals, row) => {
      totals.totalTransactionAmount += +row.transactions?.amount || 0
      totals.totalAccountBalance += +row.account?.account_balance || 0
      return totals
    },
    { totalTransactionAmount: 0, totalAccountBalance: 0 },
  )

  return [
    {
      [COLUMNS_FIELDS.CUSTOMER_ID]: 'Total',
      [COLUMNS_FIELDS.TRANSACTION_AMOUNT]: totalTransactionAmount,
      [COLUMNS_FIELDS.ACCOUNT_BALANCE]: totalAccountBalance,
    },
  ]
})

const defaultColDef = ref({
  filter: true,
  sortable: true,
})

const columnDefs = ref([
  {
    headerName: 'Customer ID',
    field: COLUMNS_FIELDS.CUSTOMER_ID,
    valueGetter: (params) => formatEmptyCell(params.data?.customer_id),
  },
  {
    headerName: 'Full Name',
    field: COLUMNS_FIELDS.FULL_NAME,
    valueGetter: (params) => formatEmptyCell(params.data?.full_name),
  },
  {
    headerName: 'Birthday',
    field: COLUMNS_FIELDS.BIRTHDAY,
    valueGetter: (params) => formatEmptyCell(params.data?.date_of_birth),
  },
  {
    headerName: 'Gender',
    field: COLUMNS_FIELDS.GENDER,
    valueGetter: (params) => formatEmptyCell(params.data?.gender),
  },
  {
    headerName: 'Email',
    field: COLUMNS_FIELDS.EMAIL,
    valueGetter: (params) => formatEmptyCell(params.data?.email),
  },
  {
    headerName: 'Phone Number',
    field: COLUMNS_FIELDS.PHONE_NUMBER,
    valueGetter: (params) => formatEmptyCell(params.data?.phone_number),
  },
  {
    headerName: 'Address',
    field: COLUMNS_FIELDS.ADDRESS,
    valueGetter: (params) => formatEmptyCell(params.data?.address),
  },
  {
    headerName: 'City',
    field: COLUMNS_FIELDS.CITY,
    valueGetter: (params) => formatEmptyCell(params.data?.city),
  },
  {
    headerName: 'Country',
    field: COLUMNS_FIELDS.COUNTRY,
    valueGetter: (params) => formatEmptyCell(params.data?.country),
  },
  {
    headerName: 'Employment Status',
    field: COLUMNS_FIELDS.EMPLOYMENT_STATUS,
    valueGetter: (params) => formatEmptyCell(params.data?.employment_status),
  },
  {
    headerName: 'Account ID',
    field: COLUMNS_FIELDS.ACCOUNT_ID,
    valueGetter: (params) => formatEmptyCell(params.data?.account?.account_id),
  },
  {
    headerName: 'Account Type',
    field: COLUMNS_FIELDS.ACCOUNT_TYPE,
    valueGetter: (params) => formatEmptyCell(params.data?.account?.account_type),
  },
  {
    headerName: 'Account Balance',
    field: COLUMNS_FIELDS.ACCOUNT_BALANCE,
    valueGetter: (params) =>
      params.data?.account?.account_balance
        ? formatToUSD(params.data?.account?.account_balance)
        : '',
  },
  {
    headerName: 'Currency',
    field: COLUMNS_FIELDS.CURRENCY,
    valueGetter: (params) => formatEmptyCell(params.data?.account?.currency),
  },
  {
    headerName: 'Account Open Date',
    field: COLUMNS_FIELDS.ACCOUNT_OPEN_DATE,
    valueGetter: (params) => formatEmptyCell(params.data?.account?.account_open_date),
  },
  {
    headerName: 'Account Status',
    field: COLUMNS_FIELDS.ACCOUNT_STATUS,
    valueGetter: (params) => formatEmptyCell(params.data?.account?.account_status),
  },
  {
    headerName: 'Branch ID',
    field: COLUMNS_FIELDS.ACCOUNT_ID,
    valueGetter: (params) => formatEmptyCell(params.data?.account?.branch_id),
  },

  {
    headerName: 'Transaction ID',
    field: COLUMNS_FIELDS.TRANSACTION_ID,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.transaction_id),
  },
  {
    headerName: 'Transaction Date',
    field: COLUMNS_FIELDS.TRANSACTION_DATE,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.transaction_date),
  },
  {
    headerName: 'Transaction Type',
    field: COLUMNS_FIELDS.TRANSACTION_TYPE,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.transaction_type),
  },
  {
    headerName: 'Transaction Amount',
    field: COLUMNS_FIELDS.TRANSACTION_AMOUNT,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.amount),
  },
  {
    headerName: 'Transaction Currency',
    field: COLUMNS_FIELDS.TRANSACTION_CURRENCY,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.currency),
  },
  {
    headerName: 'Balance After Transaction',
    field: COLUMNS_FIELDS.BALANCE_AFTER_TRANSACTION,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.balance_after_transaction),
  },
  {
    headerName: 'Transaction Method',
    field: COLUMNS_FIELDS.TRANSACTION_METHOD,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.transaction_method),
  },
  {
    headerName: 'Transaction Location',
    field: COLUMNS_FIELDS.TRANSACTION_LOCATION,
    valueGetter: (params) => formatEmptyCell(params.data?.transactions?.transaction_location),
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
        :pagination="true"
        :pinnedBottomRowData="pinnedBottomRowData"
      />
    </div>
  </the-container>
</template>

<style scoped lang="scss">
.table-page {
  height: calc(100vh - var(--header-height));
}
</style>
