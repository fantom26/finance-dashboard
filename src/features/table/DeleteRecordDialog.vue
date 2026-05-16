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
defineProps<{ show: boolean }>()

const emit = defineEmits(['agree', 'close'])
</script>

<style scoped>
.dialog-title {
  text-align: center;
}
</style>
