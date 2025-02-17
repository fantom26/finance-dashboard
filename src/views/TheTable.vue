<script setup>
import { useStore } from 'vuex'
import { computed, ref, shallowRef } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import TheContainer from '@/components/base/BaseContainer.vue'
import {
  createNestedObject,
  currencyFormatter,
  dateFormatter,
  emptyCellFormatter,
} from '@/utils/helpers.js'

ModuleRegistry.registerModules([AllCommunityModule])

const COLUMNS_FIELDS = {
  CUSTOMER_ID: 'id',
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
  TRANSACTION_ID: 'transactions.transaction_id',
  TRANSACTION_DATE: 'transactions.transaction_date',
  TRANSACTION_TYPE: 'transactions.transaction_type',
  TRANSACTION_AMOUNT: 'transactions.amount',
  TRANSACTION_CURRENCY: 'transactions.currency',
  BALANCE_AFTER_TRANSACTION: 'transactions.balance_after_transaction',
  TRANSACTION_METHOD: 'transactions.transaction_method',
  TRANSACTION_LOCATION: 'transactions.transaction_location',
}

const editMoneyCellConfig = {
  editable: true,
  cellEditor: 'agTextCellEditor',
  cellEditorParams: {
    minLength: 1,
  },
  valueParser: (params) => Number(params.newValue),
}

const store = useStore()
const rowData = computed(() => store.getters[`consumers/${types.CONSUMERS_STATE}`])

const pinnedBottomRowData = computed(() => {
  const { totalTransactionAmount, totalAccountBalance } = rowData.value.reduce(
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

const rowSelection = ref({
  mode: 'multiRow',
})

const selectionColumnDef = ref({
  sortable: true,
  resizable: false,
  width: 70,
  suppressHeaderMenuButton: false,
  pinned: 'left',
})

const defaultColDef = {
  filter: true,
  sortable: true,
  valueFormatter: emptyCellFormatter,
}

const gridApi = shallowRef(null)

const onGridReady = (params) => {
  gridApi.value = params.api
}

const columnDefs = ref([
  {
    headerName: 'General',
    children: [
      {
        headerName: 'Customer ID',
        field: COLUMNS_FIELDS.CUSTOMER_ID,
        cellDataType: 'text',
      },
      {
        headerName: 'Full Name',
        field: COLUMNS_FIELDS.FULL_NAME,
        pinned: 'left',
        editable: true,
        cellDataType: 'text',
      },
      {
        headerName: 'Birthday',
        field: COLUMNS_FIELDS.BIRTHDAY,
        cellDataType: 'dateString',
        valueFormatter: dateFormatter,
      },
      {
        headerName: 'Gender',
        field: COLUMNS_FIELDS.GENDER,
        cellDataType: 'text',
      },
      {
        headerName: 'Email',
        field: COLUMNS_FIELDS.EMAIL,
        cellDataType: 'text',
      },
      {
        headerName: 'Phone Number',
        field: COLUMNS_FIELDS.PHONE_NUMBER,
        cellDataType: 'text',
      },
      {
        headerName: 'Address',
        field: COLUMNS_FIELDS.ADDRESS,
        cellDataType: 'text',
      },
      {
        headerName: 'City',
        field: COLUMNS_FIELDS.CITY,
        cellDataType: 'text',
      },
      {
        headerName: 'Country',
        field: COLUMNS_FIELDS.COUNTRY,
        cellDataType: 'text',
      },
      {
        headerName: 'Employment Status',
        field: COLUMNS_FIELDS.EMPLOYMENT_STATUS,
        cellDataType: 'text',
      },
    ],
  },
  {
    headerName: 'Account',
    children: [
      {
        headerName: 'ID',
        field: COLUMNS_FIELDS.ACCOUNT_ID,
        cellDataType: 'text',
      },
      {
        headerName: 'Type',
        field: COLUMNS_FIELDS.ACCOUNT_TYPE,
        cellDataType: 'text',
      },
      {
        headerName: 'Balance',
        field: COLUMNS_FIELDS.ACCOUNT_BALANCE,
        pinned: 'right',
        cellDataType: 'number',
        valueFormatter: currencyFormatter,
        ...editMoneyCellConfig,
      },
      {
        headerName: 'Currency',
        field: COLUMNS_FIELDS.CURRENCY,
        cellDataType: 'text',
      },
      {
        headerName: 'Open Date',
        field: COLUMNS_FIELDS.ACCOUNT_OPEN_DATE,
        cellDataType: 'dateString',
        valueFormatter: dateFormatter,
      },
      {
        headerName: 'Status',
        field: COLUMNS_FIELDS.ACCOUNT_STATUS,
        cellDataType: 'text',
      },
    ],
  },
  {
    headerName: 'Transaction',
    children: [
      {
        headerName: 'ID',
        field: COLUMNS_FIELDS.TRANSACTION_ID,
        columnGroupShow: 'open',
        cellDataType: 'text',
      },
      {
        headerName: 'Date',
        field: COLUMNS_FIELDS.TRANSACTION_DATE,
        cellDataType: 'dateString',
        valueFormatter: dateFormatter,
      },
      {
        headerName: 'Type',
        field: COLUMNS_FIELDS.TRANSACTION_TYPE,
        cellDataType: 'text',
      },
      {
        headerName: 'Amount',
        field: COLUMNS_FIELDS.TRANSACTION_AMOUNT,
        cellDataType: 'number',
        valueFormatter: currencyFormatter,
        ...editMoneyCellConfig,
      },
      {
        headerName: 'Currency',
        field: COLUMNS_FIELDS.TRANSACTION_CURRENCY,
        cellDataType: 'text',
      },
      {
        headerName: 'Balance After Transaction',
        field: COLUMNS_FIELDS.BALANCE_AFTER_TRANSACTION,
        cellDataType: 'number',
        valueFormatter: currencyFormatter,
      },
      {
        headerName: 'Method',
        field: COLUMNS_FIELDS.TRANSACTION_METHOD,
        cellDataType: 'text',
      },
      {
        headerName: 'Location',
        field: COLUMNS_FIELDS.TRANSACTION_LOCATION,
        cellDataType: 'text',
      },
    ],
  },
])

function onCellEditRequest(event) {
  let data
  const path = event.colDef.field

  if (path.includes('.')) {
    data = createNestedObject(path, event.newValue)
  } else {
    data = {
      [path]: event.newValue,
    }
  }

  store.dispatch(`consumers/${types.UPDATE_CONSUMER_INFO_ACTION}`, {
    id: event.data.id,
    data,
  })
}
</script>

<template>
  <the-container>
    <div class="table-page">
      <ag-grid-vue
        :rowData="rowData"
        :columnDefs="columnDefs"
        style="width: 100%; height: 100%"
        :defaultColDef="defaultColDef"
        :pagination="true"
        :pinnedBottomRowData="pinnedBottomRowData"
        :selectionColumnDef="selectionColumnDef"
        :rowSelection="rowSelection"
        @grid-ready="onGridReady"
        @cell-edit-request="onCellEditRequest"
        :readOnlyEdit="true"
      />
    </div>
  </the-container>
</template>

<style scoped lang="scss">
.table-page {
  height: calc(100vh - var(--header-height));
}
</style>
