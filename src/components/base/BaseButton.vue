<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<template>
  <button :class="mode">
    <slot></slot>
  </button>
</template>
