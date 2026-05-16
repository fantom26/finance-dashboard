<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const chartRef = ref<HTMLElement | null>(null)

defineExpose({ chartRef })
</script>
