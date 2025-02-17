<script setup>
import { inject } from 'vue'
import types from '@/store/modules/consumers/types.js'

const store = inject('store')
const { params } = defineProps(['params'])

function buttonClicked() {
  store.dispatch(`consumers/${types.DELETE_CONSUMER_ACTION}`, {
    id: params.data.id,
  })
}
</script>

<template>
  <div>
    <button v-on:click="buttonClicked">Delete</button>
  </div>
</template>
