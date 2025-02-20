<template>
  <div>
    <base-button v-on:click="showDialog">Delete</base-button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const deleteRowInfo = inject('deleteRowInfo')
const { params } = defineProps(['params'])

function showDialog() {
  deleteRowInfo.value.show = true
  deleteRowInfo.value.id = params.data.id
}
</script>

<style lang="scss">
.dialog-title {
  text-align: center;
}
</style>
