<script setup lang="ts">
import { ref } from 'vue'

const inventorySubsidebarLinks = ref('')
const categorySubsidebarLinks = ref('')

const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Products</h3>
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
        <VCollapseLinks v-model:open="inventorySubsidebarLinks" collapse-id="lists">
          <template #header>
            <i aria-hidden="true" class="lnil lnil-package pr-3"></i>
            Inventories
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>
          <RouterLink :to="{ name: 'index' }" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-list-alt pr-3"></i>
            <span>Branch</span>
          </RouterLink>
          <RouterLink :to="{ name: 'index' }" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-list-alt pr-3"></i>
            <span>Item</span>
          </RouterLink>
          <RouterLink :to="{ name: 'index' }" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
            <span>New Product</span>
          </RouterLink>
        </VCollapseLinks>

        <VCollapseLinks v-model:open="categorySubsidebarLinks" collapse-id="lists">
          <template #header>
            <i class="lnir lnir-trees-alt pr-3" aria-hidden="true"></i>
            Categories
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>
          <RouterLink :to="{ name: 'index' }" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-list-alt pr-3"></i>
            <span>List</span>
          </RouterLink>
          <RouterLink :to="{ name: 'index' }" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
            <span>New Category</span>
          </RouterLink>
        </VCollapseLinks>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
