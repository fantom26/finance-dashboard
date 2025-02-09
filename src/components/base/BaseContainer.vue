<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-inline: auto;
  padding-inline: var(--container-offset);
}
</style>
