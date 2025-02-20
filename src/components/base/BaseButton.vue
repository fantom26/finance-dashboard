<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
  },
})

const { mode } = toRefs(props)
</script>
