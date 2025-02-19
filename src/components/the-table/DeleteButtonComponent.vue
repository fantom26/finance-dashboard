<script setup>
import { inject, ref } from 'vue'
import types from '@/store/modules/consumers/types.js'

const showAgreeDialog = ref(false)
const store = inject('store')
const { params } = defineProps(['params'])

function closeDialog() {
  showAgreeDialog.value = false
}

function showDialog() {
  showAgreeDialog.value = true
}

function agreeDeleting() {
  store.dispatch(`consumers/${types.DELETE_CONSUMER_ACTION}`, {
    id: params.data.id,
  })
}
</script>

<template>
  <div>
    <base-dialog :show="showAgreeDialog" @close="closeDialog">
      <template #header>
        <h2 class="dialog-title">Are you sure?</h2>
      </template>

      <template #actions>
        <base-button v-on:click="closeDialog">No</base-button>
        <base-button v-on:click="agreeDeleting">Yes</base-button>
      </template>
    </base-dialog>
    <base-button v-on:click="showDialog">Delete</base-button>
  </div>
</template>

<style lang="scss">
.dialog-title {
  text-align: center;
}
</style>
