<template>
  <header>
    <div class="header__wrapper">
      <router-link :to="routes.TABLE">Table</router-link>
      <router-link :to="routes.CHARTS">Charts</router-link>
    </div>
  </header>
</template>

<script setup>
import routes from "@/router/routes.js"
</script>

<style scoped>
header {
  margin-top: 10vh;
  margin-bottom: 5vh;
  padding-block: 1.6rem;
}

.header__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
}
</style>