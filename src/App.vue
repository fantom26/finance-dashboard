<template>
  <div>
    <the-header />
    <main>
      <router-view v-slot="{ Component, route }">
        <transition name="route" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import { onMounted } from 'vue'
import types from '@/store/modules/consumers/types.js'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  store.dispatch(`${types.CONSUMERS_MODULE}/${types.LOAD_CONSUMERS_ACTION}`)
})
</script>

<style lang="scss" scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-3rem);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}

.route-enter-active {
  transition: all var(--page-transition) ease-out;
}

.route-leave-active {
  transition: all var(--page-transition) ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
