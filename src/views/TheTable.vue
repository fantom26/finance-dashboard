<script setup>
import { useStore } from 'vuex'
import { computed, provide, ref, shallowRef } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import PieChart from '@/components/charts/PieChart.vue'
import USER_FIELDS from '@/entities/user.js'
import gridOptions from '@/views/home/Table/config.js'

ModuleRegistry.registerModules([AllCommunityModule])

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
