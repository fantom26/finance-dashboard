<!-- eslint-disable vue/multi-word-component-names -- TODO(file-based routes): reconcile with vue/multi-word-component-names; remove this when decided. -->

<template>
  <base-container>
    <div v-if="isLoading">Loading...</div>
    <div class="table-page" v-else>
      <ag-grid-vue
        :rowData="consumers"
        :gridOptions="gridOptions"
        style="width: 100%; height: 100%; flex: 0 0 76%"
        :pinnedBottomRowData="consumerTotal"
        @grid-ready="onGridReady"
        @cell-edit-request="onCellEditRequest"
      />
      <div class="table-page__chart">
        <pie-chart :data="dataByTransLocation" />
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
import { computed, shallowRef } from 'vue'
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
  type CellEditRequestEvent,
  type GridReadyEvent,
  type GridApi,
} from 'ag-grid-community'
import PieChart from '@/components/charts/PieChart.vue'
import DeleteRecordDialog from '@/features/table/DeleteRecordDialog.vue'
import gridOptions from '@/features/table/config'
import { useConsumersStore } from '@/stores/consumers'
import type { Consumer } from '@/types/consumer'
import { useConsumerTotals } from '@/composables/useConsumerTotals'
import { useDeleteTableRow } from '@/composables/useDeleteTableRow'
import { storeToRefs } from 'pinia'

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
const { deleteRowInfo, agreeDeleting, closeDialog } = useDeleteTableRow({
  deleteRow: consumersStore.deleteConsumer,
})
const { consumers, dataByTransLocation } = storeToRefs(consumersStore)
const consumerTotal = useConsumerTotals(consumers)

const gridApi = shallowRef<GridApi<Consumer> | null>(null)

const onGridReady = (params: GridReadyEvent<Consumer>) => {
  gridApi.value = params.api
}

function onCellEditRequest(event: CellEditRequestEvent<Consumer>) {
  const path = event.colDef.field as keyof Consumer

  consumersStore.updateConsumerInfo({
    id: event.data.id,
    data: {
      [path]: event.newValue,
    },
  })
}

const isLoading = computed(
  () => consumers.value.length === 0 || dataByTransLocation.value.length === 0,
)
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
