<template>
  <base-dialog :show="show" @close="emit('close')">
    <template #header>
      <h2 class="dialog-title">Are you sure?</h2>
    </template>

    <template #actions>
      <base-button v-on:click="emit('close')">No</base-button>
      <base-button v-on:click="emit('agree')">Yes</base-button>
    </template>
  </base-dialog>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
})

const { show } = toRefs(props)

const emit = defineEmits(['agree', 'close'])
</script>

<style scoped>
.dialog-title {
  text-align: center;
}
</style>
