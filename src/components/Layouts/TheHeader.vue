<template>
  <header class="header">
    <the-container>
      <div class="header__wrapper">
        <router-link :to="routes.TABLE">Table</router-link>
        <router-link :to="routes.CHARTS">Charts</router-link>
      </div>
    </the-container>
  </header>
</template>

<script setup>
import routes from '@/router/routes.js'
import TheContainer from '@/components/UI/TheContainer.vue'
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
