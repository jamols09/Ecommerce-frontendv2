<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Orders</h3>
      <div
        class="panel-close"
        @click="emit('close')"
        @keydown.space.prevent="emit('close')"
      >
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li>
          <RouterLink
            :to="{ name: 'app-order-add' /*'app-order-list'*/ }"
            title="List order"
          >
            <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
            List
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'app-order-add' }" title="Add order">
            <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
            New Order
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
