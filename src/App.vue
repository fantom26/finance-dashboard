<template>
  <div>
    <the-header/>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import TheHeader from "@/components/Layouts/TheHeader.vue";

</script>
