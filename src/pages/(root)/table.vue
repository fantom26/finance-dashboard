<!-- eslint-disable vue/multi-word-component-names -- TODO(file-based routes): reconcile with vue/multi-word-component-names; remove this when decided. -->

<template>
  <base-container>
    <div v-if="isLoading">Loading...</div>
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
      <delete-record-dialog
        :show="deleteRowInfo.show"
        @agree="agreeDeleting"
        @close="closeDialog"
      />
    </div>
  </base-container>
</template>

<script setup lang="ts">
import { computed, provide, ref, shallowRef } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import {
  ModuleRegistry,
  ColumnHoverModule,
  PinnedRowModule,
  RowStyleModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  TextEditorModule,
  NumberEditorModule,
  ValueCacheModule,
  ClientSideRowModelModule,
} from 'ag-grid-community'
import PieChart from '@/components/charts/PieChart.vue'
import DeleteRecordDialog from '@/features/table/DeleteRecordDialog.vue'
import USER_FIELDS from '@/entities/user'
import gridOptions from '@/features/table/config'
import { useConsumersStore } from '@/stores/consumers'

ModuleRegistry.registerModules([
  ColumnHoverModule,
  PinnedRowModule,
  RowStyleModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  TextEditorModule,
  NumberEditorModule,
  ValueCacheModule,
  ClientSideRowModelModule,
])

const consumersStore = useConsumersStore()
const rowData = computed(() => consumersStore.consumers)

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

const onGridReady = (params) => {
  gridApi.value = params.api
}

function onCellEditRequest(event) {
  const path = event.colDef.field

  consumersStore.updateConsumer({
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
  consumersStore.deleteConsumer({
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

const isLoading = computed(
  () => rowData.value.length === 0 || dataByTransLocation.value.length === 0,
)

const dataByTransLocation = computed(() => consumersStore.dataByTransLocation)

provide('deleteRowInfo', deleteRowInfo)
</script>

<style scoped>
.table-page {
  height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  gap: 1.6rem;
}

.table-page__chart {
  flex: 0 0 23%;
  height: 500px;
}
</style>
