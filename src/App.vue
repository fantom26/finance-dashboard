<template>
  <div>
    <the-header />
    <main>
      <router-view></router-view>
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
  store.dispatch(`consumers/${types.LOAD_CONSUMERS_ACTION}`)
})
</script>
