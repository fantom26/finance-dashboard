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

<script setup>
import { useStore } from 'vuex'
import { computed, provide, ref, shallowRef } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import PieChart from '@/components/charts/PieChart.vue'
import USER_FIELDS from '@/entities/user.js'
import gridOptions from '@/views/home/Table/config.js'
import { getFromConsumerModule } from '@/store/modules/consumers/getters.js'

ModuleRegistry.registerModules([AllCommunityModule])

const store = useStore()
const rowData = computed(() => store.getters[getFromConsumerModule(types.CONSUMERS_STATE)])

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

  store.dispatch(getFromConsumerModule(types.UPDATE_CONSUMER_INFO_ACTION), {
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
  store.dispatch(getFromConsumerModule(types.DELETE_CONSUMER_ACTION), {
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

const dataByTransLocation = computed(
  () => store.getters[getFromConsumerModule(types.TRANSACTION_LOCATION_STATE)],
)

provide('deleteRowInfo', deleteRowInfo)
</script>

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
