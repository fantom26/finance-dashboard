<script setup>
import { inject } from 'vue'
import types from '@/store/modules/consumers/types.js'
import BaseButton from '@/components/base/BaseButton.vue'

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
    <base-button v-on:click="buttonClicked">Delete</base-button>
  </div>
</template>
