<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Delivery</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li>
          <RouterLink :to="{ name: 'app' }" title="Deliveries">
            <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
            Menu
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'app-delivery-map' }" title="Map">
            <i aria-hidden="true" class="lnil lnil-map pr-3"></i>
            Map
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
