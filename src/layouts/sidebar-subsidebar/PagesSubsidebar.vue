<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Pages</h3>
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
        <li class="divider with-label">
          <span class="divider-label">Main</span>
        </li>

        <li>
          <RouterLink :to="{ name: 'app' }" title="Landing Page">
            <i aria-hidden="true" class="lnil lnil-laptop pr-3"></i>
            Landing
          </RouterLink>
        </li>

        <li class="divider"></li>

        <li class="divider with-label">
          <span class="divider-label">Sub</span>
        </li>

        <li>
          <RouterLink :to="{ name: 'app' }" title="About Us">
            <i aria-hidden="true" class="lnil lnil-laptop pr-3"></i>
            About Us
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'app' }" title="Apply a Job">
            <i aria-hidden="true" class="lnil lnil-laptop pr-3"></i>
            Apply Job
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'app' }" title="Contact Us">
            <i aria-hidden="true" class="lnil lnil-laptop pr-3"></i>
            Contact Us
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'app' }" title="Newsletter">
            <i aria-hidden="true" class="lnil lnil-laptop pr-3"></i>
            Newsletter
          </RouterLink>
        </li>

        <li class="divider"></li>

        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              <i aria-hidden="true" class="lnil lnil-laptop pr-3"></i>
              Blog
              <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink :to="{ name: 'app' }" class="is-submenu" title="Blog list">
                <i aria-hidden="true" class="lnil lnil-list pr-3"></i>
                <span>List</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'app' }" class="is-submenu" title="Add blog">
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
@import '../../scss/layout/_sidebar-panel.scss';
</style>
