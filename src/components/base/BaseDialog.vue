<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <div v-if="$slots.header" class="dialog-header">
          <slot name="header" />
        </div>

        <div v-if="$slots.default" class="dialog-content">
          <slot />
        </div>

        <div v-if="$slots.actions" class="dialog-footer">
          <slot name="actions" />
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()

const emit = defineEmits(['close'])

function tryClose() {
  emit('close')
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40%;
  z-index: 100;
  border-radius: var(--radius);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  background-color: white;
  transform: translate(-50%, -50%);
}

.dialog-header,
.dialog-content,
.dialog-footer {
  padding: 1rem;
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active {
  transition: opacity 0.3s ease-out;
}

.dialog-leave-active {
  transition: opacity 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
}
</style>
