<template>
  <div>
    <base-button v-on:click="showDialog">Delete</base-button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { DeleteRowInfoKey } from '@/composables/useDeleteTableRow'

const deleteRowInfo = inject(DeleteRowInfoKey)
const { params } = defineProps(['params'])

function showDialog() {
  if (!deleteRowInfo) return

  deleteRowInfo.value.show = true
  deleteRowInfo.value.id = params.data.id
}
</script>
