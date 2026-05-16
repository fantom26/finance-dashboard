<template>
  <header class="header">
    <base-container>
      <div class="header__wrapper">
        <div class="header__nav">
          <router-link
            :to="routes.HOME"
            class="header__nav-link"
            active-class="header__nav-link--active"
            >Table
          </router-link>
          <router-link
            :to="routes.CHARTS"
            class="header__nav-link"
            active-class="header__nav-link--active"
            >Charts
          </router-link>
        </div>
      </div>
    </base-container>
  </header>
</template>

<script setup lang="ts">
import routes from '@/router/routes'
</script>

<style scoped>
.header {
  padding-block: 1.6rem;
  height: var(--header-height);
}

.header__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
}

.header__nav-link--active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
