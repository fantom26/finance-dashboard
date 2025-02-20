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

<script setup>
import routes from '@/router/routes.js'
</script>

<style lang="scss" scoped>
.header {
  padding-block: 1.6rem;
  height: var(--header-height);

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;

    &-link {
      &--active {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
}
</style>
