<script setup>
import { useStore } from 'vuex'
import { computed, provide, shallowRef } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry, themeBalham } from 'ag-grid-community'
import TheContainer from '@/components/base/BaseContainer.vue'
import DeleteButtonComponent from '@/components/the-table/DeleteButtonComponent.vue'
import {
  currencyFormatter,
  dateFormatter,
  emptyCellFormatter,
  formatPhoneNumber,
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
  ACCOUNT_ID: 'account_id',
  ACCOUNT_TYPE: 'account_type',
  ACCOUNT_BALANCE: 'account_balance',
  CURRENCY: 'currency',
  ACCOUNT_OPEN_DATE: 'account_open_date',
  ACCOUNT_STATUS: 'account_status',
  TRANSACTION_ID: 'transaction_id',
  TRANSACTION_DATE: 'transaction_date',
  TRANSACTION_TYPE: 'transaction_type',
  TRANSACTION_AMOUNT: 'transaction_amount',
  TRANSACTION_CURRENCY: 'currency',
  BALANCE_AFTER_TRANSACTION: 'balance_after_transaction',
  TRANSACTION_METHOD: 'transaction_method',
  TRANSACTION_LOCATION: 'transaction_location',
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
      totals.totalTransactionAmount += +row.transaction_amount || 0
      totals.totalAccountBalance += +row.account_balance || 0
      return totals
    },
    { totalTransactionAmount: 0, totalAccountBalance: 0 },
  )

  return [
    {
      [COLUMNS_FIELDS.FULL_NAME]: 'Total',
      [COLUMNS_FIELDS.TRANSACTION_AMOUNT]: totalTransactionAmount,
      [COLUMNS_FIELDS.ACCOUNT_BALANCE]: totalAccountBalance,
    },
  ]
})

const gridApi = shallowRef(null)

const gridOptions = {
  theme: themeBalham,
  defaultColDef: {
    filter: true,
    sortable: true,
    valueFormatter: emptyCellFormatter,
  },
  columnDefs: [
    {
      headerName: 'General',
      children: [
        {
          headerName: '№',
          pinned: 'left',
          filter: false,
          width: 70,
          valueGetter: (params) => params.node.rowIndex + 1,
        },
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
          valueFormatter: formatPhoneNumber,
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
    {
      headerName: 'Actions',
      filter: false,
      sortable: false,
      resizable: false,
      width: 100,
      cellRendererSelector: (params) => {
        if (params.node.rowPinned === 'bottom') {
          return undefined
        }

        return {
          component: DeleteButtonComponent,
          params,
        }
      },
    },
  ],
  readOnlyEdit: true,
  pagination: true,
  paginationPageSize: 500,
  paginationPageSizeSelector: Array.from({ length: 5 }, (_, i) => (i + 1) * 100),
  paginationNumberFormatter: (params) => {
    return '[' + params.value.toLocaleString() + ']'
  },
}

const onGridReady = (params) => {
  gridApi.value = params.api
}

function onCellEditRequest(event) {
  const path = event.colDef.field

  store.dispatch(`consumers/${types.UPDATE_CONSUMER_INFO_ACTION}`, {
    id: event.data.id,
    data: {
      [path]: event.newValue,
    },
  })
}

provide('store', store)
</script>

<template>
  <the-container>
    <div class="table-page">
      <ag-grid-vue
        :rowData="rowData"
        :gridOptions="gridOptions"
        style="width: 100%; height: 100%"
        :pinnedBottomRowData="pinnedBottomRowData"
        @grid-ready="onGridReady"
        @cell-edit-request="onCellEditRequest"
      />
    </div>
  </the-container>
</template>

<style scoped lang="scss">
.table-page {
  height: calc(100vh - var(--header-height));
}
</style>
