<script setup>
import {useStore} from 'vuex'
import {computed, onMounted} from "vue";
import types from "@/store/modules/consumers/types.js"

const store = useStore()
const consumers = computed(() => store.state.consumers[types.CONSUMERS_STATE])

onMounted(() => {
  store.dispatch(`consumers/${types.LOAD_CONSUMERS_ACTION}`);
});

</script>

<template>
  <div>
    <h1>Consumers</h1>
    <ul>
      <li v-for="consumer in consumers" :key="consumer.customer_id">
        {{ consumer.full_name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
