<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link :to="routes.TABLE">Table</router-link>
      <router-link :to="routes.CHARTS">Charts</router-link>
    </div>
  </header>
</template>

<script setup>
import routes from "@/router/routes.js"
</script>

<style lang="scss" scoped>
.header {
  padding-block: 1.6rem;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
  }
}
</style>