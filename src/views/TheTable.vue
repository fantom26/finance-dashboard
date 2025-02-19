<script setup>
import { useStore } from 'vuex'
import { computed, provide, ref, shallowRef } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry, themeBalham } from 'ag-grid-community'
import DeleteButtonComponent from '@/components/the-table/DeleteButtonComponent.vue'
import {
  currencyFormatter,
  dateFormatter,
  emptyCellFormatter,
  formatPhoneNumber,
} from '@/utils/helpers.js'
import PieChart from '@/components/charts/PieChart.vue'
import USER_FIELDS from '@/entities/user.js'

ModuleRegistry.registerModules([AllCommunityModule])

const editMoneyCellConfig = {
  editable: true,
  cellEditor: 'agTextCellEditor',
  cellEditorParams: {
    minLength: 1,
  },
  valueParser: (params) => Number(params.newValue),
}

const store = useStore()
const rowData = computed(() => store.getters[`${types.CONSUMERS_MODULE}/${types.CONSUMERS_STATE}`])

const pinnedBottomRowData = computed(() => {
  const { totalTransactionAmount, totalAccountBalance } = rowData.value.reduce(
    (totals, row) => {
      totals.totalTransactionAmount += +row[USER_FIELDS.TRANSACTION_AMOUNT] || 0
      totals.totalAccountBalance += +row[USER_FIELDS.ACCOUNT_BALANCE] || 0
      return totals
    },
    { totalTransactionAmount: 0, totalAccountBalance: 0 },
  )

  return [
    {
      [USER_FIELDS.FULL_NAME]: 'Total',
      [USER_FIELDS.TRANSACTION_AMOUNT]: totalTransactionAmount,
      [USER_FIELDS.ACCOUNT_BALANCE]: totalAccountBalance,
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
          field: USER_FIELDS.CUSTOMER_ID,
          cellDataType: 'text',
        },
        {
          headerName: 'Full Name',
          field: USER_FIELDS.FULL_NAME,
          pinned: 'left',
          editable: true,
          cellDataType: 'text',
        },
        {
          headerName: 'Birthday',
          field: USER_FIELDS.BIRTHDAY,
          cellDataType: 'dateString',
          valueFormatter: dateFormatter,
        },
        {
          headerName: 'Gender',
          field: USER_FIELDS.GENDER,
          cellDataType: 'text',
        },
        {
          headerName: 'Email',
          field: USER_FIELDS.EMAIL,
          cellDataType: 'text',
        },
        {
          headerName: 'Phone Number',
          field: USER_FIELDS.PHONE_NUMBER,
          cellDataType: 'text',
          valueFormatter: formatPhoneNumber,
        },
        {
          headerName: 'Address',
          field: USER_FIELDS.ADDRESS,
          cellDataType: 'text',
        },
        {
          headerName: 'City',
          field: USER_FIELDS.CITY,
          cellDataType: 'text',
        },
        {
          headerName: 'Country',
          field: USER_FIELDS.COUNTRY,
          cellDataType: 'text',
        },
        {
          headerName: 'Employment Status',
          field: USER_FIELDS.EMPLOYMENT_STATUS,
          cellDataType: 'text',
        },
      ],
    },
    {
      headerName: 'Account',
      children: [
        {
          headerName: 'ID',
          field: USER_FIELDS.ACCOUNT_ID,
          cellDataType: 'text',
        },
        {
          headerName: 'Type',
          field: USER_FIELDS.ACCOUNT_TYPE,
          cellDataType: 'text',
        },
        {
          headerName: 'Balance',
          field: USER_FIELDS.ACCOUNT_BALANCE,
          pinned: 'right',
          cellDataType: 'number',
          valueFormatter: currencyFormatter,
          ...editMoneyCellConfig,
        },
        {
          headerName: 'Currency',
          field: USER_FIELDS.CURRENCY,
          cellDataType: 'text',
        },
        {
          headerName: 'Open Date',
          field: USER_FIELDS.ACCOUNT_OPEN_DATE,
          cellDataType: 'dateString',
          valueFormatter: dateFormatter,
        },
        {
          headerName: 'Status',
          field: USER_FIELDS.ACCOUNT_STATUS,
          cellDataType: 'text',
        },
      ],
    },
    {
      headerName: 'Transaction',
      children: [
        {
          headerName: 'ID',
          field: USER_FIELDS.TRANSACTION_ID,
          columnGroupShow: 'open',
          cellDataType: 'text',
        },
        {
          headerName: 'Date',
          field: USER_FIELDS.TRANSACTION_DATE,
          cellDataType: 'dateString',
          valueFormatter: dateFormatter,
        },
        {
          headerName: 'Type',
          field: USER_FIELDS.TRANSACTION_TYPE,
          cellDataType: 'text',
        },
        {
          headerName: 'Amount',
          field: USER_FIELDS.TRANSACTION_AMOUNT,
          cellDataType: 'number',
          valueFormatter: currencyFormatter,
          ...editMoneyCellConfig,
        },
        {
          headerName: 'Currency',
          field: USER_FIELDS.TRANSACTION_CURRENCY,
          cellDataType: 'text',
        },
        {
          headerName: 'Balance After Transaction',
          field: USER_FIELDS.BALANCE_AFTER_TRANSACTION,
          cellDataType: 'number',
          valueFormatter: currencyFormatter,
        },
        {
          headerName: 'Method',
          field: USER_FIELDS.TRANSACTION_METHOD,
          cellDataType: 'text',
        },
        {
          headerName: 'Location',
          field: USER_FIELDS.TRANSACTION_LOCATION,
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

  store.dispatch(`${types.CONSUMERS_MODULE}/${types.UPDATE_CONSUMER_INFO_ACTION}`, {
    id: event.data.id,
    data: {
      [path]: event.newValue,
    },
  })
}

const deleteRowInfo = ref({
  show: false,
  id: null,
})

function agreeDeleting() {
  store.dispatch(`${types.CONSUMERS_MODULE}/${types.DELETE_CONSUMER_ACTION}`, {
    id: deleteRowInfo.value.id,
  })

  closeDialog()
}

function closeDialog() {
  deleteRowInfo.value = {
    show: false,
    id: null,
  }
}

const dataByTransLocation = computed(
  () => store.getters[`${types.CONSUMERS_MODULE}/${types.TRANSACTION_LOCATION_STATE}`],
)

provide('deleteRowInfo', deleteRowInfo)
</script>

<template>
  <base-container>
    <div v-if="rowData.length === 0 || dataByTransLocation.length === 0">Loading...</div>
    <div class="table-page" v-else>
      <ag-grid-vue
        :rowData="rowData"
        :gridOptions="gridOptions"
        style="width: 100%; height: 100%; flex: 0 0 76%"
        :pinnedBottomRowData="pinnedBottomRowData"
        @grid-ready="onGridReady"
        @cell-edit-request="onCellEditRequest"
      />
      <div class="table-page__chart">
        <pie-chart id="transaction-location" :data="dataByTransLocation" />
      </div>
    </div>
    <base-dialog :show="deleteRowInfo.show" @close="closeDialog">
      <template #header>
        <h2 class="dialog-title">Are you sure?</h2>
      </template>

      <template #actions>
        <base-button v-on:click="closeDialog">No</base-button>
        <base-button v-on:click="agreeDeleting">Yes</base-button>
      </template>
    </base-dialog>
  </base-container>
</template>

<style scoped lang="scss">
.table-page {
  height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &__chart {
    flex: 0 0 23%;
    height: 500px;
  }
}
</style>
