<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">People</h3>
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
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-user pr-3"></i>
              Customers
              <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'app-people-customers-list' }"
                class="is-submenu"
                title="List customers"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>List</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-people-customers-add' }"
                class="is-submenu"
                title="Add customer directly"
              >
                <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
                <span>Add</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-user pr-3"></i>
              Employees
              <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'app-people-employees-list' }"
                class="is-submenu"
                title="List Employees"
              >
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>List</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'app-people-employees-add' }"
                class="is-submenu"
                title="Add employee"
              >
                <i aria-hidden="true" class="lnil lnil-circle-plus pr-3"></i>
                <span>Add</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
