<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Branches</h3>
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
          <RouterLink :to="{ name: 'app' }" title="List order">
            <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
            List
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'app' }" title="Add order">
            <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
            Add
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
